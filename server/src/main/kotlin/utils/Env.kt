package dev.zprecreated.utils

import io.ktor.server.application.Application
import java.io.File

/**
 * Utility to resolve pwd path on dev and prod mode.
 */
object Env {
    val baseDir: File = if (Application::class.java.classLoader.getResource("dev.marker") != null) {
        File("server") // dev
    } else {
        File(".") // prod
    }
}
