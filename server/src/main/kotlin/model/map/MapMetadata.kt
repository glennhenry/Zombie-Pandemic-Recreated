package dev.zprecreated.model.map

import kotlinx.serialization.Serializable

@Serializable
data class MapMetadata(
    val id: String,
    val name: String,
    val width: Int,
    val height: Int,
    val startPos: Position
)
