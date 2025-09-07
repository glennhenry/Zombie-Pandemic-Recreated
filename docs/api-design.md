# API Design

This document outlines the game's API or the data exchange design between the game client and the server.

## Game Definitions

Game definitions are JSON files such as `map.json`, `containers.json`, `buildings.json`, `strings.json`, etc. They describe **what exists in the game world** but not **what actually happens to the player**.

For example, `buildings.json` contains the list of buildings available in the game. It consists of building image, possible event, and NPCs encounters. The client may use this to know _what building image to display_ when a player enters a block. However, **events and NPCs inside buildings shouldn't be decided client-side**. The client should only know that a building exists; and it's the server responsibility to decide what happens inside.

So, game definitions are shared references where:

- The **client** uses them to display the world.
- The **server** also has them to validate and enforce rules.
- All **outcomes** (loot rolls, mission triggers, NPC events) are decided by the server to prevent cheating.

### Map & Block

The `map.json` describes the structure of a map: its blocks and the entities within each block. For large maps this can be huge, so sending the full map upfront is unnecessary.

**Design decision:**

- Instead of sending the full `map.json`, the server provides only **lightweight metadata** first.
- The client then requests relevant block data on demand.

**Block loading:**

- Blocks are fetched in **5×5 grids**, centered on the player's location.
- Although the UI displays only a **3×3 grid**, fetching 5×5 ensures smooth transitions as the player moves.
- No custom caching strategy is planned yet; we currently rely on browser caching for block images.

#### Request & Response Format

Request nearby blocks:

- Endpoint: `GET /blocks`
- Query parameters:
  - `mapId` (string): player's current map ID
  - `x` (integer): player's current x-coordinate
  - `y` (integer): player's current y-coordinate
- Example request: `GET /blocks?mapId=map:main-city&x=10&y=15`
- Example response (not full):

```json
{
  "mapId": "map:main-city",
  "player": { "x": 10, "y": 15 },
  "blocks": [
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
  ]
}
```

## Metadata

Metadata allows the client to display essential information quickly, without loading the full dataset.

### Game Metadata

Provides global information about the game state such as game version, server's maintenance status, etc.

- Endpoint: `/meta`
- Example request: `GET /meta`
- Example response:

```json
{
  "version": "1.0.0",
  "maintenance": false
}
```

### Map Metadata

Essential details for rendering the map UI without knowing each block. This includes map width, height, map name, and block image size.

- Endpoint: `/map`
- Query parameters:
  - `mapId` (string): player's current map ID
- Example request: `GET /meta`
- Example response:

```json
{
  "mapId": "map:main-city",
  "name": "Main City",
  "width": 6,
  "height": 6,
  "blockSizePixels": 500
}
```
