package dev.zprecreated

import dev.zprecreated.api.game.gameMetadataRoutes
import dev.zprecreated.api.game.map.mapRoutes
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*
import java.io.File

fun Application.configureRouting() {
    routing {
        staticFiles("assets", File("assets"))
        gameMetadataRoutes()
        mapRoutes()
    }
}
