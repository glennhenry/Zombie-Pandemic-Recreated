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
3. Within a block, P could interact with container to loot items; enter a building to open shop (called vendor), meet particular NPC, or encounter specific events inside or outside the building;
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
├── zones.json
├── containers.json
├── buildings.json
├── events.json
├── dialogues.json
├── event_rewards.json
├── event_hazards.json
├── vendors.json
├── missions.json
├── items.json
├── zombies.json
├── strings.json
└── misc.json (for uncategorized entities)
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

They may also encounter vendors (shop), NPC that gives them mission, and random events.

#### Misc

We will use this type for those uncategorized entities.

### Events

They are random encounter during gameplay, which can be met inside buildings, when entering a block, or after certain conditions.

They are typically associated with story and lore as cosmetics.

For example, it could be a dialog to bridge before zombie fight, random encounters when entering building that harms the player, or something random like encountering a survivor that steals your item.

#### Dialogues

Subset of event which is used to deliver story, world-building, or choices to the player. It's an important aspect of an event, which regularly available during events.

It consists of lines with the speaker and text, which could serve as bridge between setting context such as mission and building or block entrance. Furthermore, it may include choices, where player could respond and receives a positive or negative outcome.

### Missions

Missions are objectives for player to complete.

Types of missions:

1. Main missions: necessary to complete for game ending.
2. Sub missions: optional objectives to earn rewards for game progression or lore purposes.
3. Daily missions: sub missions which are available daily.

Objectives types:

1. Reach: reach a particular block, zone, or building.
2. Defeat: defeat some amount of a particular zombie.
3. Obtain: obtain an item, either by looting, crafting, or buying (expandable to a more specific goal).
4. Deliver: deliver an item to particular NPC, which may be inside building.
5. Trigger: trigger specific condition (e.g., survive zombie fight for particular time, use melee attacks 10 times in a battle, etc.).

Should be expandable easily.

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
- When moving forward, P is not able to bypass zombie, and will instead take hit from them. There is no limit for moving backward.
- Zombies would have mechanics that spice up the gameplay, such as range-based zombies. For example, a spitter has a long-range attack, so you would need to be close to deal with it easier; though, there may be boomer zombie, which causes damage upon dying on close contact.

### Strings

`strings.json` serve as central place of texts used for in-game display. Languages are centralized to enable possible translation of the game. Texts inside dialogue, events, and missions will refer to this JSON.

## Technical Data Structure

JSON contains all game data. The schema is identical to the game runtime data model. This allows for direct transformation of deserialized JSON data into data models. However, this results in a significant amount of redundant data in the JSON, which can be minimized using GZIP compression.

Below are examples of the JSON data along with the corresponding data model definitions in Kotlin and TypeScript.

### Map

`map.json`

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
    val zoneId: String
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
    val refId: String
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
    Container, Building, Misc
}
```

- `refId`: reference to specific entity table. There isn't universal naming scheme, each follows their own entity table. For container, the ID is just snake cased container name.

#### Zones

`zones.json`

```json
[
  {
    "zoneId": "goldfish-residence",
    "name": "Goldfish Residence",
    "dangerLevel": "Safe",
    "level": 6
  },
  {
    "zoneId": "stadium",
    "name": "Stadium",
    "dangerLevel": "Risky",
    "level": 17
  }
]
```

- `dangerLevel` to control the game's difficulty and loot.
- `level` is the minimum level to enter.

```kt
data class Zone(
    val zoneId: String,
    val name: String,
    val dangerLevel: ZoneDanger,
    val level: Int,
)
```

```kt
enum class ZoneDanger {
    None, Safe, Calm, Risky, Hostile, Dangerous, Deadly, Hell
}
```

#### Entities

`containers.json`

```json
[
  {
    "containerId": "broken-trunk-01",
    "name": "Broken Trunk",
    "cooldown": 8,
    "findChance": 0.97,
    "entries": [
      {
        "itemId": "pipe",
        "rarity": 25,
        "lootableInZones": ["stadium", "newtown"]
      },
      {
        "itemId": "stale-bread",
        "rarity": 5,
        "lootableInZones": ["stadium", "uptown"]
      },
      {
        "itemId": "bandage",
        "rarity": 20,
        "lootableInZones": ["stadium", "uptown", "military"]
      }
    ]
  }
]
```

- `containerId` naming scheme is the container name in snake-case with optional number as variant identifier.
- `cooldown` to loot in hours.
- `rarity` is weight attribute of a loot.
- `lootableInZones` is a set of zones where the loot can be obtained. This means that even if a container is found in lower-level zones, players won't be able to loot high-end items.

```kt
data class Container(
    val containerId: String,
    val name: String,
    val cooldown: Long,
    val findChance: Double,
    val entries: List<ContainerEntry>
)
```

```kt
data class ContainerEntry(
    val itemId: String,
    val rarity: Int,
    val lootableInZones: Set<String>
)
```

`buildings.json`

```json
[
  {
    "buildingId": "gym-01",
    "name": "Training Gym",
    "requirement": {
      "type": "Level",
      "value": "10"
    },
    "eventId": "gym-zombie-01"
  },
  {
    "buildingId": "store-01",
    "name": "Max's Store",
    "requirement": {
      "type": "CompleteQuest",
      "value": "main-quest-04"
    },
    "eventId": "main-quest-05-intro"
  }
]
```

- `buildingId` naming scheme is building name with a number as variant identifier.

```kt
data class Building(
    val buildingId: String,
    val name: String,
    val requirement: BuildingRequirement,
    val eventId: String,
)
```

```kt
data class BuildingRequirement(
    val type: BuildingRequirementType,
    val value: String
)
```

```kt
enum class BuildingRequirementType {
    None, Level, ItemNeeded, CompleteQuest
}
```

### Events

`events.json`

```json
[
  {
    "eventId": "vendor-gun-store-01",
    "name": "Gun Store",
    "type": "Vendor",
    "trigger": {
      "condition": "OnEnterBuilding",
      "value": "gun-store-01"
    },
    "dialogueId": "gun-store-01",
    "contentRefId": "vendor-gun-store-01"
  }
]
```

- `eventId` should describe location or context, the trigger condition, short description, and number as variant or sequence identifier. For example:
  - dialogue: `orchard-street-rescue-npc`
  - zombie: `stadium-zombiewave-01`, `stadium-spitter-boss-04`
  - reward: `downtown-reward-cache-11`, `downtown-reward-ammo-01`
  - hazard: `uptown-survivor-trap`, `uptown-bat-waste`
  - notice: `zombie-spawn-increase`, `night-has-come`
  - vendor: `vendor-gun-store-01`.
- Event may or may not have dialogue. If it does, it refers to dialogue by `dialogueId`.
- `contentRefId` refers to event's content, such as vendor to `vendors.json`, reward and hazard to `event_rewards.json` and `event_hazards.json`.

```kt
data class GameEvent(
    val eventId: String,
    val name: String,
    val type: GameEventType,
    val trigger: EventTrigger,
    val dialogueId: String?,
    val contentRefId: String?
)
```

```kt
enum class GameEventType {
    Dialogue, Zombie, Reward, Hazard, Notice, Vendor
}
```

```kt
data class EventTrigger(
    val condition: EventTriggerCondition,
    val value: String
)
```

```kt
enum class EventTriggerCondition {
    OnEnterBlock, OnEnterBuilding, OnLootContainer, OnMissionProgress, Always
}
```

#### Dialogues

`dialogues.json`

```json
[
  {
    "dialogueId": "npc-thief-demands-food-01",
    "nodes": [
      {
        "nodeId": "start",
        "stringId": "npc-thief-01-intro",
        "choices": [
          {
            "stringId": "choice-give-item",
            "outcome": { "type": "Reward", "value": "bandage" },
            "nextNode": "end-reward"
          },
          {
            "stringId": "choice-refuse",
            "outcome": { "type": "Zombie", "value": "zombie-thief-fight" },
            "nextNode": "end-fight"
          }
        ],
        "nextNode": null
      },
      {
        "nodeId": "end-reward",
        "stringId": "npc-thief-01-thanks",
        "choices": [],
        "nextNode": "end"
      },
      {
        "nodeId": "end-fight",
        "stringId": "npc-thief-01-attack",
        "choices": [],
        "nextNode": "end"
      },
      {
        "nodeId": "end",
        "stringId": "npc-thief-01-leaves",
        "choices": [],
        "nextNode": null
      }
    ]
  },
  {
    "dialogueId": "notice-found-bandage-01",
    "nodes": [
      {
        "nodeId": "single",
        "stringId": "notice-found-bandage",
        "choices": []
      }
    ]
  }
]
```

- `dialogueId` should describe context, short description, and number if there are multiple variants. For example:
  - `npc-thief-01` for a generic thief dialogue (which in the case ask an item).
  - `thief-ambushes-player` for dialogue where a thief ambushes the player.
  - `injured-survivor-asking-meds` survivor needing meds, choice to help or not.
  - `main-quest-05-intro` the intro dialogue for main quest 5.
  - `main-boss-hideout-postbattle-01` dialogue after a boss battle.
  - `ambient-rumor-survivor-warning-zombies-uptown-01` a notice for atmosphere.
- The dialogue is represented as graph connection. `nodes` being the graph of nodes, `nodeId` as the unique step, `nextNode` where the story goes.
- For convention, use `nodeId` “start” and “end” for entry and closing point. “single” is used when complex branching is not needed and only one simple notice.
- `stringId` refer to `strings.json`.
- `choices` are selectable option that result in `outcome`, which can be positive or negative.
- A valid node always have a non-empty choices or non-null `nextNode`, unless it is the `end` node.

```kt
data class Dialogue(
    val dialogueId: String,
    val nodes: List<DialogueNode>
)
```

```kt
data class DialogueNode(
    val nodeId: String,
    val stringId: String,
    val choices: List<DialogueChoice>,
    val nextNode: String?
)
```

```kt
data class DialogueChoice(
    val stringId: String,
    val outcome: ChoiceOutcome,
    val nextNode: String
)
```

```kt
data class ChoiceOutcome(
    val type: ChoiceOutcomeType,
    val value: String
)
```

```kt
enum class ChoiceOutcomeType {
    Reward, Hazard, Zombie
}
```

#### Event Rewards

`event_rewards.json`

```json
[
  {
    "rewardId": "loot-bandage-ground-01",
    "items": [{ "itemId": "item-bandage", "quantity": 1 }],
    "xp": 10,
    "cash": 0
  },
  {
    "rewardId": "reward-cash-01",
    "items": [],
    "xp": 0,
    "cash": 100
  }
]
```

- `rewardId` should be descriptive.
- `items`, `xp`, and `cash` are rewards which is expandable.
- Description of rewards is included on each event that refers to its dialogue by `dialogueId`.

```kt
data class EventReward(
    val rewardId: String,
    val items: List<EventItemReward>,
    val xp: Int,
    val cash: Int
)
```

```
data class EventItemReward(
    val itemId: String,
    val quantity: Int
)
```

#### Event Hazards

`event_hazards.json`

```json
[
  {
    "hazardId": "hazard-damage-01",
    "damage": 15,
    "itemLossRules": null
  },
  {
    "hazardId": "hazard-steal-random-any",
    "damage": 0,
    "itemLossRules": {
      "type": "RandomFromInventory",
      "filter": "food",
      "quantity": 1
    }
  },
  {
    "hazardId": "hazard-bleeding-01",
    "damage": 5,
    "itemLossRules": null
  }
]
```

- `hazardId` should be descriptive.
- `damage`, `statusEffect`, and `itemLossRules` are hazard which is expandable.
- `itemLossRules` describe how an item can be loss dynamically. In reality, it shouldn't be any rare, high-level, or essential items. Basic supplies or currency are best.

```kt
data class EventHazard(
    val hazardId: String,
    val damage: Int,
    val itemLossRules: ItemLossRules?
)
```

```
data class ItemLossRules(
    val type: ItemLossType,
    val filter: String?,
    val quantity: Int?
)
```

```
enum class ItemLossType {
    SpecificItem, AnyItemFromCategory, AnyItem
}
```

- Filter for `ItemLossRules`:
  - `SpecificItem`: “stale-bread” loses exactly the stale bread item (or none if player doesn't have it).
  - `AnyItemFromCategory`: lose a random item from a category (e.g., “armor”).
  - `AnyItem`: lose any item.

#### Notice

Notices are 1-node dialogue, without choice and only text (i.e., typically used for gameplay bridge or atmosphere). It doesn't need `contentRefId` on the event, hence the absence of `notices.json`.

Example of a notice in `dialogues.json`:

```json
{
  "dialogueId": "notice-found-bandage-01",
  "nodes": [
    {
      "nodeId": "single",
      "stringId": "notice-found-bandage",
      "choices": []
    }
  ]
}
```

#### Vendors

Vendor (shop) event is on inside building. It shows a 1-node dialogue, which is the shopkeeper greeting; then open the shop UI (`contentRefId` links to `shops.json`).

`vendors.json`

```json
{
  "vendorId": "shop-gunstore-01",
  "name": "Max's Gun Store",
  "catalog": [
    { "itemId": "talon-pistol", "price": 100 },
    { "itemId": "32-ammo", "price": 10 }
  ]
}
```

```kt
data class Vendor(
    val vendorId: String,
    val name: String,
    val catalog: List<VendorItem>
)
```

```kt
data class VendorItem(
    val itemId: String,
    val price: Int
)
```

### Missions

### Items

### Zombies

### Strings

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
