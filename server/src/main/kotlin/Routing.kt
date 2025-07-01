package dev.zprecreated

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

object Data {
    val x = 1
}

@Serializable
data class ZPResponse(val a: Int)

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }

        get("/testapi") {
            call.respond(HttpStatusCode.OK, ZPResponse(Data.x))
        }

        staticResources("/assets", "assets")
    }
}
