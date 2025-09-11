package dev.zprecreated

import io.ktor.client.HttpClient

object GlobalContext {
    val httpClient = HttpClient()
}
