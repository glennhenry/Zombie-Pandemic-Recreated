# Game Design

This document outlines the game design, including its goals.

## Basics

Zombie Pandemic is a zombie RPG centered on map exploration, with the ultimate objective of escaping the city. Players begin in a specific location on the map and navigate through blocks to enter buildings, loot containers, encounter zombies, and complete missions to earn XP, level up, and upgrade their skills.

### Terminology

- P is shorthand for Player.
- Map is the location of the game. It has a particular width and height.
- Block is the unit within a map. Block consist of entities.
- Entity is interactable object within a block. Entity has type, which could be:
  - Container: a lootable place.
  - Building: entrance that takes P to specific area.
  - Misc.: fallback for uncategorized type of entities.
- Blocks are grouped into zone, which describe the difficulty.

## Gameplay Flow

The main objective is escaping the city.

1. P spawns in a map.
2. P moves through blocks in 8 directions (N, NE, E, SE, S, SW, W, NW).
3. Within a block, P could interact with container to loot items; enter a building to open shop (called vendor), meet particular NPC, or encounter specific events inside or outside the building;
4. During travel, P could encounter zombies, in which fight will be 1-vs-many with turn-based manner.
5. P obtain items, completes missions and events to gain EXP to level up and upgrade their skills, all to make them stronger.
6. The stronger P is, they could progress to harder areas.
7. The main quests consist of chain of tasks, which ends in the said harder areas.
8. The final objective involves crafting specific vehicle to plan escape from the city.
9. When a player dies, they will be able to recover after a particular time, while losing some of their stuff.

## Design

TBD

The design aims to set standards for the minimal game resources needed for the base game to be completable.  
This does not account for optional, extra, fan-made content; it focuses strictly on the resources necessary to reach the final objective.

- How big is the game's map
- How many zones, buildings, items, missions, approximately
- What kind of skills and progression matter we want to bring into the game
- How should we penalize player's death
- The final objective itself, how hard is it going to be

Then decide the content itself, such as type of items, the kind of buildings, type of missions, list of player's skills, etc.