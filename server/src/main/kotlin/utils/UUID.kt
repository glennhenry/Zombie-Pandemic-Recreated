package dev.zprecreated.utils

import java.util.UUID

object UUID {
    fun new(): String {
        return UUID.randomUUID().toString()
    }

    fun withPrefix(prefix: String): String {
        return prefix + new()
    }
}
