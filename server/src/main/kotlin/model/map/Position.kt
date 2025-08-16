package dev.zprecreated.model.map

import kotlinx.serialization.Serializable

@Serializable
data class Position(
    val x: Int,
    val y: Int,
)
