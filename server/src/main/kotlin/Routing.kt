package dev.zprecreated

import dev.zprecreated.api.game.gameMetadataRoutes
import dev.zprecreated.api.game.map.mapRoutes
import dev.zprecreated.model.ExampleModel
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.respondText
import io.ktor.server.routing.*
import java.io.File

fun Application.configureRouting() {
    routing {
        staticFiles("assets", File("assets/web"))
        staticFiles("game", File("assets/game"))
        get("/testapi") {
            call.respondText("hello from server" + ExampleModel("example common model"))
        }
        get("/") {
            call.respondText("response of / from server")
        }
        gameMetadataRoutes()
        mapRoutes()
    }
}
