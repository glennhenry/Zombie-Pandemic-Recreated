package dev.zprecreated

import dev.zprecreated.api.game.gameMetadataRoutes
import dev.zprecreated.api.game.map.mapRoutes
import dev.zprecreated.model.ExampleModel
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File

fun Application.configureRouting() {
    routing {
        staticFiles("assets", File("assets/web"))
        staticFiles("game", File("assets/game"))

        get("/testapi") {
            call.respondText("hello from server" + ExampleModel("example common model"))
        }

        gameMetadataRoutes()
        mapRoutes()

        get("/isdev") {
            call.respondText("Am I in development mode: $developmentMode")
        }

        // if not dev mode, serve kobweb site
        // TO-DO, dev mode never worked. Likely ktor error, where application.yaml overrides everything
        // and it can't be replaced by external config file or program arguments
        if (!developmentMode) {
            staticFiles("/", File("site")) {
                enableAutoHeadResponse()
                extensions("html")
                default("index.html")
            }
        }
    }
}
