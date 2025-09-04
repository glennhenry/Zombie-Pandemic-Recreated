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
│   └── main-city/
│       ├── main-city.json
│       └── blocks/
│           ├── main-city-000_000.jpg
│           ├── main-city-001_000.jpg
│           ├── main-city-002_000.jpg
│           └── ...
├── zones.json
├── containers.json
├── buildings.json
├── npcs.json
├── events.json
├── dialogues.json
├── event_rewards.json
├── event_hazards.json
├── vendors.json
├── missions.json
├── objectives.json
├── items.json
├── zombies.json
├── strings.json
└── misc.json (for uncategorized entities)
```

### Maps

The game world, most of the things happen here.

The “Main City” will be used as the main map. More maps could be made for focused or special areas (e.g., event map, sewer map).

The `main-city.json` specifies content of map including its metadata like map's width, height, and block image size; and most importantly the list of blocks within the map.

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

Buildings are safe-zone candidates where the P can rest, defend, and encounter story/gameplay elements. They may also NPCs or random events.

##### NPCs

NPCs are found in a specific building (it's possible that they are in multiple places). They serve as the entry point to shops, missions, or story conversation.

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

Missions are objectives for player to complete. They are assigned by NPC which is seen inside a building.

A mission consist of a set of stages, which is the flow players follow to finish the mission. Each stage has some number of objectives the player must complete to progress.

Types of missions:

1. Main missions: necessary to complete for game ending.
2. Sub missions: optional objectives to earn rewards for game progression or lore purposes.
3. Daily missions: sub missions which are available daily.

#### Objectives

Types of objectives:

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
5. **Mission**: items necessary to progress missions (quests).
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

The design of game data aims to be modular. Each data instance represents a limited aspect, with additional information referenced from other data instances.

- For example, a mission only includes the stages, objectives within those stages, and the rewards. Objectives are stored separately.
- Buildings only represent the requirements for entry, along with any associated events or NPCs, which are referenced elsewhere.

This approach allows each data instance to contain a small amount of information. Another key benefit is that each piece of data is highly reusable; the same event can be used in multiple locations, and the same objectives can apply to various missions, etc.

JSON files contains all game data. The schema is identical to the game runtime data model. This allows for direct transformation of deserialized JSON data into data models. However, it can result in a significant amount of redundant data in the JSON, which can be minimized using GZIP compression.

### Identifiers

ID field for data has to be informative. It should describe relevant context such that operator knows what is it without looking up. Expect for those straight forward data or one that don't have many variants, the ID can be simple. It might be good practice to also prefix the ID with the data category and a `:` (semicolon).

ID should be written in lowercase with `-` as the separator. To properly signify specific category or variant they can use `:`. Except for complex reference such as strings or dialogues, they use `.` (dot). Try not to include variant if there is only one. In contrast, it's better to not have variant at all by enforcing unique name over everything.

If resource has URI (like block image or item icon) it should be same as the ID, except replacing special characters like dot and semicolon with `-`.

- Map: `map:<mapname>` → `map:downtown-sewer`.
- Block: `bl:<mapname>:<x>:<y>` → `b:downtown-sewer:003:009`.
- Entity: `ent:<mapname>:<x>:<y>:<seq>` → `ent:main-city:000:000:1`.
- Zone: `zone:<zonename>` → `zone-stadium`, `zone:west-orchard`.
- Container: `cnt:<containername>:<optionalvariant>` → `cnt:broken-trunk`, `cnt:first-aid-box:03`.
- Building: `bld:<buildingname>:<optionalvariant>` → `bld:grimwall-school`, `bld:skyline-station:02`.
- NPC: `npc:<npcname>-<occupation>` → `npc:max-store-owner`, `npc:ted-grimwall-school-principal`, `npc:jim-dying-survivor`. Preferably unique name over NPCs.
- Event: `ev:<eventname+context>:<optionalvariant>` → `ev:search-trash-can-found-nothing`, `ev:shout-attract-zombie`, `ev:ambient-scary:02`.
- Dialogue: `dlg:<speaker+context>:<optionalseq>`
  - `dlg:max-welcome:01` → NPC Max greets the player.
  - `dlg:ted-explain-main-quest-03:02` → Ted gives third main quest-related line (sequence 2).
  - `dlg:jim-self-lore:01` → Jim’s backstory, first line.
  - `dlg:radio-warning-radioactive:01` → A radio message warns of danger.
  - `dlg:tutorial-intro:01` → System tutorial line.
  - `dlg:choice-quest-finding-bread:1a` → Player’s dialogue choice (branch A).
- Event reward: `rwd:<rewardname>-<context>:<optionalvariant>` → `rwd:bandage-ground:03`, `rwd:broken-pipe-system`.
- Event hazard: `haz:<hazardname>:<optionalvariant>` → `haz:effect-bleeding`, `haz:steal-bandage`.
- Notice: `not:<type>-<context>:<optionalvariant>` → `not:alert-radioactive`, `not:danger-bandit-attack`, `not:usual-player-hungry:01`.
- Vendor: `shop:<shopname>:<optionalvariant>` → `shop:gun-store:02`, `shop:convenience:06`, `shop:bliss-hotel`.
- Mission: `mis:<missionname>:<optionalvariant>` → `mis:find-supplies`, `mis:help-survivor:02`, `mis:main-quest:07`. Mission has stage, where each has objectives. Objectives themselves are independent of mission, generic, and reusable.
- Mission stage: `stg:<stagenumber>:<missionname+optionalvariant>:<stagename>` → `stg:01:help-survivor-02:kill-bandits`.
- Mission objective: `obj:<objectivename>:<optionalvariant>` → `obj:find-bandage`.
- Items: `itm:<itemname>` → `itm:bandage`, `itm:cowboy-pistol`.
- Zombies: `z:<typeifboss>-<zombiename>` → `z:strong-walker`, `z:riot-police`, `z:boss-spitter`.
- Strings: `str:<datacategory>:<subcategory>:<name+context>`. The structure is flexible but should have leading alphabet.
  - `str:ui:button:start`
  - `str:ui:tooltip:stamina`
  - `str:mis:clear-stadium-stage-01:title`
  - `str:mis:clear-stadium-stage-01:desc`
  - `str:npc:ted:lore-01`
  - `str:bld:grimwall-school:desc`.

Some data also have “title”, “name” or “description” field which correspond to display name. They may refer to `strings.json` if they are intended to be translated. Likewise, they usually don't differ much from ID.

Below are examples of the JSON data along with the corresponding data model definitions in Kotlin and TypeScript.

### Map

`map.json`

```json
{
  "mapId": "map:main-city",
  "name": "Main City",
  "width": 6,
  "height": 6,
  "blockSizePixels": 500,
  "blocks": [
    [
      {
        "blockId": "bl:main-city:000:000",
        "name": "Orchard Street",
        "x": 0,
        "y": 0,
        "uri": "bl-main-city-000-000.jpg",
        "entities": [
          {
            "entId": "ent:main-city:000:000:1",
            "bbox": {
              "x": 100,
              "y": 400,
              "width": 40,
              "height": 20
            },
            "type": "Loot",
            "refId": "cnt:abandoned-sedan"
          },
          {
            "entId": "ent:main-city:000:000:2",
            "bbox": {
              "x": 400,
              "y": 200,
              "width": 70,
              "height": 90
            },
            "type": "Loot",
            "refId": "cnt:rectangle-crate"
          },
          {
            "entId": "ent:main-city:000:000:3",
            "bbox": {
              "x": 240,
              "y": 240,
              "width": 20,
              "height": 20
            },
            "type": "Building",
            "refId": "bld:autumn-school"
          }
        ],
        "exits": ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
        "zoneId": "zone:stadium"
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
    val bbox: BBox,
    val type: EntityType,
    val refId: String
)
```

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

- `refId`: ID reference to specific entity table. The name of entity can be derived from here.

#### Zones

`zones.json`

```json
[
  {
    "zoneId": "zone:goldfish-residence",
    "name": "Goldfish Residence",
    "dangerLevel": "Safe",
    "level": 6
  },
  {
    "zoneId": "zone:stadium",
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

##### Containers

`containers.json`

```json
[
  {
    "containerId": "cnt:broken-trunk:01",
    "name": "Broken Trunk",
    "cooldown": 8,
    "findChance": 0.97,
    "entries": [
      {
        "itemId": "itm:pipe",
        "rarity": 25,
        "lootableInZones": ["zone:stadium", "zone:newtown"]
      },
      {
        "itemId": "itm:stale-bread",
        "rarity": 5,
        "lootableInZones": ["zone:stadium", "zone:uptown"]
      },
      {
        "itemId": "itm:bandage",
        "rarity": 20,
        "lootableInZones": ["zone:stadium", "zone:uptown", "zone:military"]
      }
    ]
  }
]
```

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

##### Buildings

`buildings.json`

```json
[
  {
    "buildingId": "bld:gym:01",
    "name": "Training Gym",
    "requirement": {
      "type": "Level",
      "value": "10"
    },
    "eventId": "ev:building-zombie:07",
    "npcId": null
  },
  {
    "buildingId": "bld:store:09",
    "name": "Max's Store",
    "requirement": {
      "type": "CompleteMission",
      "value": "mis:main-quest:07"
    },
    "eventId": "ev:sneak-zombie",
    "npcId": "npc:max-store-owner"
  }
]
```

- `eventId` if there is an event when entering a building.
- `npcId` if the building has NPC, which could open up a shop or give mission.
- When entering building, event will pop up first. Then, NPC giving mission or opening shop.

```kt
data class Building(
    val buildingId: String,
    val name: String,
    val requirement: BuildingRequirement,
    val eventId: String?,
    val npcId: String?
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
    None, Level, ItemNeeded, CompleteMission
}
```

###### NPCs

`npcs.json`

```json
[
  {
    "npcId": "npc:max-store-owner",
    "name": "Max the Gun Store Owner",
    "dialogues": [
      {
        "dialogueId": "dlg:gunsmith-intro",
        "trigger": "FirstMeet",
        "value": null
      },
      {
        "dialogueId": "dlg:gunsmith-generic-welcome",
        "trigger": "Repeat",
        "value": null
      },
      {
        "dialogueId": "dlg:gunsmith-demand-mission-completion",
        "trigger": "MissionOnProgress",
        "value": "mis:bring-food"
      }
    ],
    "shopId": "shop:gunstore:01",
    "missionId": null
  }
]
```

- NPC can refer to shops or missions if needed.
- `dialogues` contains the possible dialogue when meeting the NPC. They have mechanism to trigger, such as first time meet, repeat, or during mission.

```kt
data class NPC(
    val npcId: String,
    val name: String,
    val dialogues: List<NPCDialogue>,
    val shopId: String?,
    val missionId: String?
)
```

```kt
data class NPCDialogue(
    val dialogueId: String,
    val trigger: NPCTriggerType,
    val value: String?
)
```

```kt
enum class NPCTriggerType {
    FirstMeet, Repeat, MissionOnProgress, CompleteMission
}
```

### Events

`events.json`

```json
[
  {
    "eventId": "ev:bandit-ambush",
    "name": "Bandit Ambush",
    "type": "Hazard",
    "trigger": {
      "condition": "OnEnterBuilding",
      "value": "bld:gun-store:01"
    },
    "dialogueId": "dlg:gun-store-01-bandit-ambush",
    "contentRefId": null
  },
  {
    "eventId": "ev:reward-bandage",
    "name": "Bandage Reward",
    "type": "Reward",
    "trigger": {
      "condition": "AfterDialogue",
      "value": null
    },
    "dialogueId": null,
    "contentRefId": "rwd:bandage"
  }
]
```

- Trigger value may be null if not needed.
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
    val value: String?
)
```

```kt
enum class EventTriggerCondition {
    OnEnterBlock, OnEnterBuilding, OnLootContainer, OnMissionProgress, AfterDialogue, Always
}
```

#### Dialogues

`dialogues.json`

```json
[
  {
    "dialogueId": "dlg:thief-tim-demands-food",
    "nodes": [
      {
        "nodeId": "start",
        "stringId": "str:dlg:thief-tim-intro",
        "choices": [
          {
            "stringId": "str:dlg:generic-give-item-choice",
            "outcome": { "type": "Reward", "value": "ev:reward-bandage" },
            "nextNode": "end-reward"
          },
          {
            "stringId": "str:dlg:generic-refuse-choice",
            "outcome": { "type": "Zombie", "value": "ev:zombie-thief-fight" },
            "nextNode": "end-fight"
          }
        ],
        "nextNode": null
      },
      {
        "nodeId": "end-reward",
        "stringId": "str:dlg:thief-tim-thanks",
        "choices": [],
        "nextNode": "end"
      },
      {
        "nodeId": "end-fight",
        "stringId": "str:dlg:thief-tim-angry",
        "choices": [],
        "nextNode": "end"
      },
      {
        "nodeId": "end",
        "stringId": "str:dlg:thief-tim-leaves",
        "choices": [],
        "nextNode": null
      }
    ]
  },
  {
    "dialogueId": "not:found-bandage:01",
    "nodes": [
      {
        "nodeId": "single",
        "stringId": "str:not:found-bandage:01",
        "choices": []
      }
    ]
  }
]
```

- The dialogue is represented as graph connection. `nodes` being the graph of nodes, `nodeId` as the unique step, `nextNode` where the story goes.
- For convention, use `nodeId` “start” and “end” for entry and closing point. “single” is used when complex branching is not needed and only one simple notice.
- `stringId` refer to `strings.json`.
- `choices` are selectable option that result in `outcome`, which can be positive or negative. Outcome is always an event of either type `Reward`, `Hazard`, and `Zombie`.
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
    "rewardId": "rwd:bandage",
    "items": [{ "itemId": "item-bandage", "quantity": 1 }],
    "xp": 10,
    "cash": 0
  },
  {
    "rewardId": "rwd:loot-cash",
    "items": [],
    "xp": 0,
    "cash": 100
  }
]
```

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
    "hazardId": "haz:damage:01",
    "damage": 15,
    "itemLossRules": null
  },
  {
    "hazardId": "haz:loss-random-food",
    "damage": 0,
    "itemLossRules": {
      "type": "RandomFromInventory",
      "filter": "food",
      "quantity": 1
    }
  },
  {
    "hazardId": "haz:effect-bleeding",
    "damage": 5,
    "itemLossRules": null
  }
]
```

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
  "dialogueId": "not:found-bandage",
  "nodes": [
    {
      "nodeId": "single",
      "stringId": "str:not:found-bandage",
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
  "vendorId": "shop:gunstore:01",
  "name": "Max's Gun Store",
  "catalog": [
    { "itemId": "itm:talon-pistol", "price": 100 },
    { "itemId": "itm:32-ammo", "price": 2 }
  ]
}
```

- Item sold is always one. The amount of stock of an item depend on each item, where it is requested to server.

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

`missions.json`

```json
[
  {
    "missionId": "mis:survivor-ask-supplies",
    "title": "str:mis:survivor-ask-supplies:title",
    "description": "str:mis:survivor-ask-supplies:desc",
    "type": "Sub",
    "requirement": {
      "type": "CompleteMission",
      "value": "mis:tutorial-01"
    },
    "stages": [
      {
        "stageId": "stg:01:survivor-ask-supplies:collect-supplies",
        "title": "str:mis:survivor-ask-supplies-stage-01:title",
        "description": "str:mis:survivor-ask-supplies-stage-01:desc",
        "objectives": ["obj:collect-water:01", "obj:collect-food:01"]
      },
      {
        "stageId": "stg:02:survivor-ask-supplies:deliver-supplies",
        "title": "str:mis:survivor-ask-supplies-stage-02:title",
        "description": "str:mis:survivor-ask-supplies-stage-02:desc",
        "objectives": ["obj:deliver-bread:01", "obj:deliver-water:01"]
      }
    ],
    "reward": {
      "items": [{ "itemId": "itm:bandage", "quantity": 1 }],
      "xp": 50,
      "cash": 20
    }
  }
]
```

- `title` and `description` refer to `strings.json`.
- Missions can have prerequisites, described by `requirements`.
- `stages` are the flow of mission, which players must complete to finish the mission.
- `objectives` are list of objectives the player need to complete to finish the stage. They refer to `objectives.json` below.

```kt
data class Mission(
    val missionId: String,
    val title: String,
    val description: String,
    val type: MissionType,
    val requirement: MissionRequirement,
    val stages: List<MissionStage>
)
```

```kt
enum class MissionType {
    Main, Sub, Daily
}
```

```kt
data class MissionRequirement(
    val type: MissionRequirementType,
    val value: String?
)
```

```kt
enum class MissionRequirementType {
    None, CompleteMission
}
```

```kt
data class MissionStage(
    val stageId: String,
    val title: String,
    val description: String,
    val objectives: List<String>
)
```

#### Objectives

`objectives.json`

```json
[
  {
    "objectiveId": "obj:collect-water:01",
    "type": "CollectItem",
    "description": "str:obj:collect-water-01:desc",
    "targetId": "itm:water-bottle",
    "refId": null,
    "value": 3
  },
  {
    "objectiveId": "obj:collect-bread:01",
    "type": "CollectItem",
    "description": "str:obj:collect-bread-01:desc",
    "targetId": "itm:stale-bread",
    "refId": null,
    "value": 3
  },
  {
    "objectiveId": "obj:deliver-bread:01",
    "type": "DeliverItem",
    "description": "str:obj:deliver-bread-01:desc",
    "targetId": "npc:survivor-oldman",
    "refId": "itm:stale-bread",
    "value": 3
  },
  {
    "objectiveId": "obj:deliver-water:01",
    "type": "DeliverItem",
    "description": "str:obj:deliver-water-01:desc",
    "targetId": "npc:survivor-oldman",
    "refId": "itm:water-bottle",
    "value": 2
  }
]
```

- `refId` being a generic, an extra ID container.

```kt
data class Objective(
    val objectiveId: String,
    val type: ObjectiveType,
    val description: String,
    val targetId: String?,
    val refId: String?,
    val value: String?
)
```

```kt
enum class ObjectiveType {
    ReachZone, ReachBlock, Defeat, Obtain, Deliver, Trigger
}
```

### Items

`items.json`

```json
[
  {
    "itemId": "itm:bread",
    "name": "Stale Bread",
    "lootable": true,
    "type": "Consumable",
    "subType": "Food",
    "properties": {
      "restoreHp": "5",
      "restoreHunger": "10"
    }
  },
  {
    "itemId": "itm:pistol-01",
    "name": "Talon Pistol",
    "lootable": true,
    "type": "Equippable",
    "subType": "Firearm",
    "properties": {
      "damage": "15",
      "range": "25",
      "ammoType": "9mm",
      "durability": "100"
    }
  },
  {
    "itemId": "itm:key-bunker",
    "name": "Bunker Key",
    "lootable": false,
    "type": "Quest",
    "subType": "Key",
    "properties": {
      "opensBuilding": "bld:military-bunker"
    }
  }
]
```

- `properties` is generic key-value map that allows item to be flexible in defining fields.
- In the Kotlin code, we don't need to use complex serialization mechanism to define the specific data class for each type and subtype of the items. We could use single `Item` object with wrapper over different types. Resources are parsed once during server load, so error will be caught ahead.

```kt
data class Item(
    val itemId: String,
    val name: String,
    val lootable: Boolean,
    val type: ItemType,
    val subtype: ItemSubtype,
    val properties: Map<String, String>
)
```

```kt
enum class ItemType {
    Consumable, Equippable, Material, Junk, Quest, Misc
}
```

```kt
enum class ItemSubType {
    Food, Drink, Meds, Drugs, Ammo,
    Melee, Firearm, Throwable,
    ArmorHead, ArmorBody, ArmorLegs,
    Tool,
    Craft, Resource, Fuel,
    Key, Document, SpecialObject,
    Misc
}
```

Example of wrappers:

```kt
class Weapon(private val item: Item) {
    val damage: Int get() = item.properties["damage"]?.toInt() ?: 0
    val ammoType: String? get() = item.properties["ammoType"]
}

class Consumable(private val item: Item) {
    val healAmount: Int get() = item.properties["heal"]?.toInt() ?: 0
    val duration: Int get() = item.properties["duration"]?.toInt() ?: 0
}

class QuestItem(private val item: Item) {
    val questId: String get() = item.properties["questId"] ?: error("Missing questId")
}
```

### Zombies

```json
[
  {
    "zombieId": "z:walker",
    "name": "Walker",
    "type": "Infected",
    "xp": 15,
    "hp": 20,
    "speed": 1,
    "attackDamage": 5,
    "attackRange": 1,
    "behavior": "Melee",
    "properties": null
  },
  {
    "zombieId": "z:boss-spitter",
    "name": "Spitter",
    "type": "Mutant",
    "xp": 100,
    "hp": 200,
    "speed": 1,
    "attackDamage": 3,
    "attackRange": 5,
    "behavior": "Ranged",
    "properties": {
      "spitDamage": 6
    }
  },
  {
    "zombieId": "z:boomer",
    "name": "Boomer",
    "type": "Infected",
    "xp": 40,
    "hp": 30,
    "speed": 0,
    "attackDamage": 1,
    "attackRange": 1,
    "behavior": "ExplodeOnDeath",
    "properties": {
      "explodeDamage": 15
    }
  }
]
```

- Similar to items `properties` will be used to define specific fields.

```kt
data class Zombie(
    val zombieId: String,
    val name: String,
    val type: ZombieType,
    val xp: Int,
    val hp: Int,
    val speed: Int,
    val attackDamage: Int,
    val attackRange: Int,
    val behavior: ZombieBehavior,
    val properties: Map<String, String>?
)
```

```kt
enum class ZombieType {
    Infected, Mutant
}
```

```kt
enum class ZombieBehavior {
    Melee, Ranged, ExplodeOnDeath, Summoner, Support
}
```

### Strings

Dictionary containing all translatable text in the game. Display and description texts are always translatable, but titles and names are not. We aim to preserve the original titles and names for global reference.

`strings-en.json`

```json
[
  "mis": [
    "survivor-ask-supplies-title": "Survivor needs supply",
    "survivor-ask-supplies-desc": "A lonely survivor hasn't eaten for days. It's a good idea for you to help him. He will need water and bread."
  ],
  "dlg": [
    "thief-tim-intro": "Hey! I'm gonna give you a minute to decide whether to hand that supply over to me or something bad will happen to you.",
    "thief-tim-angry": "Alright, you're gonna enjoy running from these",
    "thief-tim-thanks": "I didn't expect it's going to be easy, Ha-Ha.",
    "generic-give-item-choice": "Give {0} your {1}.",
    "generic-refuse-choice": "Refuse {0} offer."
  ]
]
```

- Strings are nested based on data category (e.g., mission, items), where the field is just like how each category is referenced.
- Structure is flat, but sorted manually.
- `{x}` represent a positional, placeholder variable. It can be place, amount, anything.
- For example, `generic-give-item-choice` can be substituted like: “Give Thief Tim your bandage”.

The parsed string in code:

```kt
data class StringRes(
    val text: String,
    val amount: Int
)
```

`amount` describe the amount of variables that needed to be substituted. We can create `format` method which enforces that amount and substitute to it.
