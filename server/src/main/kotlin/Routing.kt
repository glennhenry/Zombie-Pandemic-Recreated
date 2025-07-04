package dev.zprecreated

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import java.io.File

object Data {
    val x = 1
}

@Serializable
data class ZPResponse(val a: Int)

fun Application.configureRouting() {
    routing {
        get("/testapi") {
            call.respond(HttpStatusCode.OK, ZPResponse(Data.x))
        }

        staticResources("/assets", "game-assets")

        // Serve the static website only in production; the development environment will use the Vite server.
        if (!application.developmentMode) {
            singlePageApplication {
                react("web")
            }
        }
    }
}
