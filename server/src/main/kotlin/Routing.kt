package dev.zprecreated

import dev.zprecreated.api.game.gameMetadataRoutes
import dev.zprecreated.api.game.map.mapRoutes
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*
import java.io.File

fun Application.configureRouting() {
    routing {
        if (application.developmentMode) {
            staticFiles("assets", File("server/game-assets"))
        } else {
            staticFiles("assets", File("game-assets"))
        }
        gameMetadataRoutes()
        mapRoutes()

        // Serve the static website only in production; the development environment will use the Vite server.
        if (!application.developmentMode) {
            singlePageApplication {
                react("web")
            }
        }
    }
}
