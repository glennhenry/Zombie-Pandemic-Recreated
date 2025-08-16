package dev.zprecreated.api.game

import dev.zprecreated.model.GameMetadata
import io.ktor.http.HttpStatusCode
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get

fun Route.gameMetadataRoutes() {
    get("/metadata") {
        val response = GameMetadata(version = "0.0.0")
        call.respond(HttpStatusCode.OK, response)
    }
}
