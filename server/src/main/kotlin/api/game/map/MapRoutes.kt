package dev.zprecreated.api.game.map

import dev.zprecreated.model.NetworkResponse
import dev.zprecreated.model.map.MapMetadata
import io.ktor.http.HttpStatusCode
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get

fun Route.mapRoutes() {
    get("/maps") {
        val response = MapMetadata.mainCity()
        call.respond(HttpStatusCode.OK, NetworkResponse.success(response))
    }
}
