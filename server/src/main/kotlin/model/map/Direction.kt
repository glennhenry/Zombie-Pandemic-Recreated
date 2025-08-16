package dev.zprecreated.model.map

enum class Direction {
    NW, N, NE, W, C, E, SW, S, SE
}

val directionChange = mapOf(
    "nw" to Pair(-1, -1),
    "n"  to Pair( 0,  0),
    "ne" to Pair(-1,  1),
    "w"  to Pair(-1, -1),
    "c"  to Pair( 0,  0),
    "e"  to Pair(-1,  1),
    "sw" to Pair(-1, -1),
    "s"  to Pair( 0,  0),
    "se" to Pair(-1,  1),
)
