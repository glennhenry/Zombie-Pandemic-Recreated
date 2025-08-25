# Specification

This document explains the design and data flow for the game, technically.

## Terminology

- P is shorthand for Player.
- Map is the location of the game. It has a particular width and height.
- Block is the unit within a map. Block consist of entities.
- Entity is interactable object within a block. Entity has type, which could be:
  - Container: a lootable place.
  - Building: entrance that takes P to specific area.
  - Misc.: fallback for uncategorized type of entities.

## Gameplay Flow

The main objective is escaping the city.

1. P spawns in a map.
2. P moves through blocks in 8 directions (N, NE, E, SE, S, SW, W, NW).
3. Within a block, P could interact with container to loot items; enter a building to open shop, meet particular NPC, or encounter specific events inside or outside the building;
4. During travel, P could encounter zombies, in which fight will be 1-vs-many turn-based manner.
5. P obtain items, completes missions and events to gain EXP to level up and upgrade their skills, all to make them stronger.
6. The stronger P is, they could progress to harder areas.
7. The main quests consist of chain of tasks, which ends in the said harder areas.
8. The final objective involves crafting specific vehicle to plan escape from the city.
9. When a player dies, they will be able to recover after a particular time, while losing some of their stuff.

## Data Structure

```
data/
├── maps/
│   └── main_city/
│       ├── main_city.json
│       └── blocks/
│           ├── main_city-000_000.jpg
│           ├── main_city-001_000.jpg
│           ├── main_city-002_000.jpg
│           └── ...
├── items.json
├── buildings.json
├── zombies.json
├── events.json
├── missions.json
├── zones.json
├── strings.json
├── misc.json (for uncategorized entities)
```

### Maps

The game world, most of the things happen here.

The “Main City” will be used as the main map. More maps could be made for focused or special areas (e.g., event map, sewer map).

The `main_city.json` specifies content of map including its metadata like map's width, height, and block image size; and most importantly the list of blocks within the map.

### Blocks

The basic unit of map where P interacts with the world. Maps are divided into a grid of blocks. Each block is identified by its **coordinates** (`x`, `y`) and belongs to a map.

Blocks themselves do not store data, but they describe behavior. It contains list of entities, which are interactable objects that gives meaning to the game (e.g., loot, building, event).

Blocks are grouped logically into **zones** and for cosmetic purposes.

#### Zones

Zone cosmetically represents the district name of the block. For progression purpose, it specifies the area level and the difficulty of surrounding blocks. These are useful to restrict loots and zombies spawns.

### Entities

An entity describe interactable game object which refer to a specific object table.

There are three types of entity:

1. Container → `containers.json`: a lootable spot (e.g., car trunks, crates, lockers).
2. Building → `buildings.json`: an entrance that leads to particular area within the same map.
3. Misc → `misc.json`: temporary or uncategorized objects (expandable later).

#### Container

The game has finite numbers of containers, but can be in multiple places.

`containers.json` would describe list of container in the game, where each container has metadata like cooldown to loot and chance of finding an item.

Then, each container entry would hold a loot table. The loot table contains list of items, their rarity, and locations they can be looted in.

As an example, the container “broken-trunk” may be present in some blocks. The block correspond to a zone, say it's stadium (assume a high-level area). We don't want a “pipe” (assume a low-level weapon) to be looted in such high-end area. Therefore, “pipe” entry within the loot table shouldn't list stadium area, so it gets filtered.

#### Building

Building will be place where P could create a safe zone for resting and defending against the zombies.

They may also encounter shops, NPC that gives them mission, and random events.

#### Misc

We will use this type for those uncategorized entities.

### Items

Some items can be looted in container or bought from the shop inside buildings.

`items.json` is the catalog for items.

Item will be categorized based on type, which can be:

1. **Consumable**: an item which can be consumed, such as food, drink, meds, and ammo.
2. **Equippable**: items like weapon, armors, and clothing.
3. **Material**: such as player's resources and crafting materials.
4. **Junk**: unmeaningful items usually for cosmetic. Maybe, they could be recycled or used as generic crafting requirement.
5. **Quest**: items necessary to progress quests.
6. **Misc**: uncategorized items.

Each type is then further classified:

1. food, drink, meds, drugs, ammo,
2. melee, firearm, throwable,
3. armor head, armor body, armor legs, tool
4. craft, resource, fuel,
5. key, document, special object,
6. misc

### Zombies

Zombies are the primary hostile entities in the game.

They are encountered randomly in a block, where a fight goes turn-based.

#### Zombie Fight

The fight area is 1-dimensional. In other word, there is only one axis of direction, which is the distance of player to zombies.

It can be thought like this:

```
----P-----Z1---Z2--------Z3
```

- Zombies have speed, describing how fast they approach the P.
- P could act: move forward or backward, attack close, attack far, or even try escaping from the fight.
- When moving forward, P could dash (just move) or strike (move with attack) the zombies, increasing risk but is necessary to avoid zombies grouping or cornering the P.
- Zombies would have mechanics that spice up the gameplay, such as range-based zombies. For example, a spitter has a long-range attack, so you would need to be close to deal with it easier; though, there may be boomer zombie, which causes damage upon dying on close contact.

### Events

They are random encounter during gameplay, which can be met inside buildings, when entering a block, or after certain conditions.

They are typically associated with story and lore as cosmetics.

For example, it could be a dialog to bridge before zombie fight, random encounters when entering building that harms the player, or something random like encountering a survivor that steals your item.

### Missions

Missions are objectives for player to complete.

Types of missions:

1. Main missions: necessary to complete for game ending.
2. Sub missions: optional objectives to earn rewards for game progression or lore purposes.
3. Daily missions: sub missions which are available daily.

Objectives types:

1. Reach: reach a particular block, zone, or building.
2. Defeat: defeat some amount of a particular zombie.
3. Obtain: obtain an item, either by looting, crafting, or buying.
4. Deliver: deliver an item to particular NPC, which may be inside building.
5. Trigger: trigger specific condition (e.g., survive zombie fight for particular time, use melee attacks 10 times in a battle, etc.).

Should be expandable easily.

### Strings

`strings.json` serve as central place of texts used for in-game display. Languages are centralized to enable possible translation of the game. Texts inside dialogue, events, and missions will refer to this JSON.

## Technical Data Structure

JSON contains all game data. The schema is identical to the game runtime data model. This allows for direct transformation of deserialized JSON data into data models. However, this results in a significant amount of redundant data in the JSON, which can be minimized using gzip compression.

Below are examples of the JSON data along with the corresponding data model definitions in Kotlin and TypeScript.

### Map

`map.json`:

```json
{
  "mapId": "main_city",
  "name": "Main City",
  "width": 6,
  "height": 6,
  "blockSizePixels": 500,
  "blocks": [
    [
      {
        "blockId": "main_city:000:000",
        "name": "Orchard Street",
        "x": 0,
        "y": 0,
        "uri": "main_city-000_000.jpg",
        "entities": [
          {
            "entId": "main_city:000:000#1",
            "name": "Car",
            "bbox": {
              "x": 100,
              "y": 400,
              "width": 40,
              "height": 20
            },
            "type": "loot",
            "refId": "car"
          },
          {
            "entId": "main_city:000:000#2",
            "name": "Crate",
            "bbox": {
              "x": 400,
              "y": 200,
              "width": 70,
              "height": 90
            },
            "type": "Loot",
            "refId": "crate"
          },
          {
            "entId": "main_city:000:000#3",
            "name": "Autumn School",
            "bbox": {
              "x": 240,
              "y": 240,
              "width": 20,
              "height": 20
            },
            "type": "Building",
            "refId": "autumn_school"
          }
        ],
        "exits": ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
        "zoneId": "stadium"
      }
    ],
    []
  ]
}
```

The blocks are organized in 2D arrays for simple access by coordinates.

```kt
data class GameMap(
	val mapId: String,
	val name: String,
	val width: Int,
	val height: Int,
	val blockSizePixels: Int,
	val blocks: List<List<Block>>
)
```

- `mapId`: the naming scheme is `map_name` (e.g., `main_city`).
- `name`: similar to `mapId` but in capital case (e.g., `Main City`).

```kt
data class Block(
	val blockId: String,
	val name: String,
	val x: Int,
	val y: Int,
	val uri: String,
	val entities: List<Entity>,
	val exits: List<Direction>
	val zoneId: String,
)
```

- `blockId`: the naming scheme is `map_name:x:y` (e.g., `main_city:002:003` for block in `main_city` at x=2, y=3).
- `name`: cosmetic purpose such as `Orchard Street`.
- `uri`: same as `blockId`, but added `.jpg` suffix.
- `Direction` is an enum of compass direction:

```kt
enum class Direction {
	NW, N, NE, W, C, E, SW, S, SE
}
```

```kt
data class Entity(
	val entId: String,
	val name: String,
	val bbox: BBox,
	val type: EntityType,
	val refId: String,
)
```

- `entId`: entity identifier within the block, usually `blockId` appended with number. It's `map_name:x:y#z`, such as `main_city:003:002#2` for second entity of block within `main_city` under coordinate x=3, y=2.
- `name`: display name for the entity.
- `bbox`: bounding box to map interactable window:

```kt
data class BBox(
	val x: Int,
	val y: Int,
	val width: Int,
	val height: Int
)
```

- `type`: type of entity:

```kt
enum class EntityType {
	Container, Building, Misc,
}
```

- `refId`: reference to specific entity table. There isn't universal naming scheme, each follows their own entity table. For container, the ID is just snake cased container name.

@Serializable
data class Container(
val containerId: String,
val name: String,
val locations: List<String>,
val cooldown: Long,
val findChance: Double,
val table: List<ContainerEntry>
)

@Serializable
data class ContainerEntry(
val itemId: String,
val rarity: Int,
val minimumLevelToLoot: Int,
)

@Serializable
data class Item(
val itemId: String,
val name: String,
val lootable: Boolean,
val type: ItemType,
val subType: String,
)

@Serializable
enum class ItemType {
CONSUMABLES, EQUIPPABLE, MATERIAL, JUNK, QUEST, MISC
}

@Serializable
enum class ItemSubType {
FOOD, DRINK, MEDS, DRUGS, AMMO,
MELEE, FIREARM, THROWABLE,
ARMOR_HEAD, ARMOR_BODY, ARMOR_LEGS,
TOOL,
CRAFT, RESOURCE, FUEL,
KEY, DOCUMENT, SPECIAL_OBJECT,
MISC
}
