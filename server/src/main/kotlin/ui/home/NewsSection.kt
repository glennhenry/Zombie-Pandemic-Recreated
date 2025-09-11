package dev.zprecreated.ui.home

import dev.zprecreated.GlobalContext
import dev.zprecreated.ui.Styles
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.html.*
import kotlinx.io.IOException

val RELEASE_NOTES_URL =
    "https://raw.githubusercontent.com/glennhenry/Zombie-Pandemic-Recreated/main/release-notes.md"

fun FlowContent.NewsSection(news: Pair<List<String>, Boolean>) {
    val (lines, isTrimmed) = news
    val blocks = transformNews(lines)

    div(classes = "flex flex-col gap-2") {
        h1(classes = "${Styles.font(Styles.fontParagraph)} text-xl") { +"News" }

        div(classes = "max-h-96 overflow-y-auto p-1 text-sm ${Styles.font(Styles.fontParagraph)}") {
            blocks.forEachIndexed { idx, block ->
                when (block) {
                    is NewsBlock.Heading -> {
                        val marginTop = if (idx != 0) "mt-3" else "mt-0"
                        h2(classes = "text-md $marginTop font-bold") { +block.text }
                    }

                    is NewsBlock.Paragraph -> {
                        p(classes = "mt-2 text-sm whitespace-pre-wrap") { +block.text }
                    }

                    is NewsBlock.ListBlock -> {
                        ul {
                            block.items.forEach { item ->
                                li(classes = "ml-5 list-disc") { +item }
                            }
                        }
                    }
                }
            }

            if (isTrimmed) {
                p { +"...and more\n\n" }
            }

            a(
                href = "https://github.com/glennhenry/Zombie-Pandemic-Recreated/blob/main/release-notes.md",
                target = "_blank",
                classes = "mt-4 ${Styles.font(Styles.fontParagraph)} underline"
            ) {
                +"See full →"
            }
        }
    }
}

sealed class NewsBlock {
    data class Heading(val text: String) : NewsBlock()
    data class Paragraph(val text: String) : NewsBlock()
    data class ListBlock(val items: List<String>) : NewsBlock()
}

fun transformNews(lines: List<String>): List<NewsBlock> {
    val blocks = mutableListOf<NewsBlock>()   // set of single news section
    val currentList = mutableListOf<String>() // keep track ul / li list

    // list of "-" ends, add to blocks as one list
    fun flushList() {
        if (currentList.isNotEmpty()) {
            blocks.add(NewsBlock.ListBlock(currentList.toList()))
            currentList.clear()
        }
    }

    lines.forEachIndexed { _, line ->
        when {
            // heading, the start of one section
            line.startsWith("#") -> {
                flushList()
                blocks.add(NewsBlock.Heading(line.replace(Regex("^#+\\s*"), "")))
            }

            // content of list
            line.startsWith("-") -> {
                currentList.add(line.drop(1).trim())
            }

            // paragraph text, add it directly
            line.isNotBlank() -> {
                flushList()
                blocks.add(NewsBlock.Paragraph(line.trim()))
            }

            else -> flushList() // blank line ends list
        }
    }

    flushList() // flush at end
    return blocks
}

suspend fun fetchPatchNotes(): Pair<List<String>, Boolean> {
    try {
        val response = GlobalContext.httpClient.get(urlString = RELEASE_NOTES_URL)
        if (response.status.isSuccess()) {
            val text = response.bodyAsText()

            val allLines = text.trim().lines()
            val trimmed = allLines.size > 50
            val slice = allLines.take(50)
            return slice to trimmed
        } else {
            return listOf("Unsuccessful network response") to false
        }
    } catch (e: IOException) {
        println("Network error when fetching patch notes: $e")
        return listOf("Network error: ${e.message}") to false
    } catch (e: Exception) {
        println("Generic error when fetching patch notes: $e")
        return listOf("Generic error: ${e.message}") to false
    }
}
