package dev.zprecreated

import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.calllogging.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.CORS
import kotlinx.serialization.json.Json

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
    install(CORS) {
        allowHost("localhost:8081", schemes = listOf("http")) // kobweb dev server
        allowHeader(HttpHeaders.ContentType)
        allowMethod(HttpMethod.Get)
    }
    install(CallLogging)
}
