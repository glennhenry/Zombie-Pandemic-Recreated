package dev.zprecreated

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.calllogging.CallLogging
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.statuspages.StatusPages
import io.ktor.server.response.respondFile
import io.ktor.server.response.respondText
import kotlinx.serialization.json.Json
import java.io.File

fun main(args: Array<String>) {
    EngineMain.main(args)
}

fun Application.module() {
    configureRouting()
    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            isLenient = true
        })
    }
    install(StatusPages) {
        status(HttpStatusCode.NotFound) { call, status ->
            // Only exist in prod build
            val file = File("web/404.html")
            if (file.exists()) {
                call.respondFile(file)
            } else {
                // In dev, when web/404.html doesn't exist yet
                call.respondText(
                    "404 - Not Found",
                    ContentType.Text.Plain,
                    HttpStatusCode.NotFound
                )
            }
        }
    }
    install(CallLogging)
}
