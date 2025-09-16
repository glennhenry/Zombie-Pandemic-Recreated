package dev.zprecreated.model

import kotlinx.serialization.Serializable

/**
 * Global game metadata.
 */
@Serializable
data class GameMetadata(
    val version: String,
)
