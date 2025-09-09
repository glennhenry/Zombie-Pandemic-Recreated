package dev.zprecreated.ui.component

import dev.zprecreated.ui.Styles
import kotlinx.html.FlowContent
import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.footer
import kotlinx.html.p
import kotlinx.html.strong
import java.time.Year

fun FlowContent.Footer() {
    div(classes = "${Styles.bg(Styles.colorAppBar)} py-4 ${Styles.text(Styles.colorParagraph)}") {
        footer(classes = "container flex flex-col items-center justify-between gap-2 px-4 text-sm md:flex-row md:gap-0") {
            p(classes = "text-center") {
                strong {
                    +"Copyright (c) ${Year.now()} ZP Recreated Devs"
                }
                +" — Not affiliated with original developers"
            }
            div("flex gap-4 underline") {
                a(classes = "link") {
                    href = "https://github.com/glennhenry/Zombie-Pandemic-Recreated"
                    target = "_blank"
                    rel = "noopener noreferrer"
                    +"GitHub "
                }
                a(classes = "link") {
                    href = "https://discord.com/invite/Yrzsk7n6nf"
                    target = "_blank"
                    rel = "noopener noreferrer"
                    +"Discord"
                }
            }
        }
    }
}
