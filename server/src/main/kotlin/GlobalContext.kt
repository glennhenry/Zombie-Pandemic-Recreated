package dev.zprecreated

import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO

object GlobalContext {
    val httpClient = HttpClient(CIO)
}
