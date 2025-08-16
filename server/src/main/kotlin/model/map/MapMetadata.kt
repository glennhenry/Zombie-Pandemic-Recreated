package dev.zprecreated.model.map

import dev.zprecreated.core.map.MapParser
import kotlinx.serialization.Serializable

@Serializable
data class MapMetadata(
    val mapId: String,
    val name: String,
    val width: Int,
    val height: Int,
    val startPos: Position
) {
    companion object {
        fun mainCity(): MapMetadata {
            return MapParser.parse("to-do")
        }
    }
}
