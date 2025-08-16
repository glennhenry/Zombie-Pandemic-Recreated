package dev.zprecreated.core.map

import dev.zprecreated.model.map.MapMetadata
import dev.zprecreated.model.map.Position
import java.io.File

object MapParser {
    /**
     * Parse a game map at [path], returning [MapMetadata].
     */
    fun parse(path: String): MapMetadata {
//        val mapJson = File(path) // TO-DO
        return MapMetadata(
            mapId = "main_city",
            name = "Main City",
            width = 6,
            height = 6,
            startPos = Position(1, 1)
        )
    }
}
