import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  type GameState, type InventoryItem, type Location, type Zombie, 
  type Coordinates, type MapTile, type CombatState, type PlayerStats, type Inventory
} from "@shared/schema";
import { v4 as uuidv4 } from "uuid";
import { apiRequest } from "@/lib/queryClient";
import { generateLootTable, generateZombieType } from "@/lib/gameEngine";

// Default values
const DEFAULT_COORDINATES: Coordinates = { latitude: 37.7749, longitude: -122.4194 };
const DEFAULT_LOCATION: Location = {
  name: "Unknown Location",
  coordinates: DEFAULT_COORDINATES,
  description: "A mysterious area with no clear landmarks. You should try to find your bearings."
};

const DEFAULT_PLAYER_STATS: PlayerStats = {
  health: 100,
  hunger: 100,
  daysSurvived: 1,
  zombiesKilled: 0,
  equipped: {
    weapon: null,
    armor: null
  }
};

const DEFAULT_INVENTORY: Inventory = {
  items: [],
  usedSlots: 0,
  totalSlots: 20
};

const DEFAULT_COMBAT_STATE: CombatState = {
  inCombat: false,
  enemy: null,
  playerDamage: 0,
  enemyDamage: 0,
  logs: []
};

// Starting inventory items
const STARTER_ITEMS: InventoryItem[] = [
  {
    id: uuidv4(),
    name: "First Aid Kit",
    type: "medical",
    effect: "Restores 50 health",
    healing: 50
  },
  {
    id: uuidv4(),
    name: "Candy Bar",
    type: "food",
    effect: "Restores 15 hunger",
    hunger: 15
  },
  {
    id: uuidv4(),
    name: "Baseball Bat",
    type: "weapon",
    effect: "Basic melee weapon",
    damage: 10
  }
];

// Initial game state
const initialGameState: GameState = {
  player: {
    position: { x: 4, y: 4 },
    stats: DEFAULT_PLAYER_STATS,
    inventory: {
      ...DEFAULT_INVENTORY,
      items: STARTER_ITEMS,
      usedSlots: STARTER_ITEMS.length
    }
  },
  map: {
    tiles: [],
    center: DEFAULT_COORDINATES,
    zoom: 15
  },
  location: DEFAULT_LOCATION,
  combatState: DEFAULT_COMBAT_STATE,
  gameMessages: ["You wake up in an unfamiliar place. The world has changed. Survival is now your only goal."],
  gameId: uuidv4()
};

// Context type definition
interface GameContextType {
  gameState: GameState;
  isLoading: boolean;
  error: string | null;
  
  // Game actions
  movePlayer: (direction: 'north' | 'south' | 'east' | 'west') => void;
  searchLocation: () => void;
  enterBuilding: () => void;
  useItem: (itemId: string) => void;
  dropItem: (itemId: string) => void;
  equipItem: (itemId: string) => void;
  rest: () => void;
  
  // Combat actions
  startCombat: (zombie: Zombie) => void;
  attackZombie: () => void;
  fleeCombat: () => void;
  endCombat: () => void;
  
  // Game state management
  saveGame: () => Promise<void>;
  loadGame: (gameId: string) => Promise<void>;
  startNewGame: () => void;
  
  // UI state
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
}

// Create context
// Create context with a default value that will throw an error 
// if used outside of a provider
const defaultValue: GameContextType = {
  gameState: initialGameState,
  isLoading: true,
  error: null,
  movePlayer: () => {},
  searchLocation: () => {},
  enterBuilding: () => {},
  useItem: () => {},
  dropItem: () => {},
  equipItem: () => {},
  rest: () => {},
  startCombat: () => {},
  attackZombie: () => {},
  fleeCombat: () => {},
  endCombat: () => {},
  saveGame: async () => {},
  loadGame: async () => {},
  startNewGame: () => {},
  selectedItemId: null,
  setSelectedItemId: () => {},
};

const GameContext = createContext<GameContextType>(defaultValue);

// Provider component
export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Initialize game
  useEffect(() => {
    const initGame = async () => {
      try {
        // Try to load saved game from localStorage
        const savedGame = localStorage.getItem('zombieSurvivalGame');
        
        if (savedGame) {
          setGameState(JSON.parse(savedGame));
        } else {
          // Start new game with default location
          await fetchMapData(DEFAULT_COORDINATES.latitude, DEFAULT_COORDINATES.longitude);
        }
      } catch (err) {
        console.error("Failed to initialize game:", err);
        setError("Failed to initialize game. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    initGame();
  }, []);

  // Save game state to localStorage when it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('zombieSurvivalGame', JSON.stringify(gameState));
    }
  }, [gameState, isLoading]);

  // Fetch map data for a location
  const fetchMapData = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      console.log(`Client requesting map for coordinates: ${latitude}, ${longitude}`);
      
      // First get the location name
      const locationNameResponse = await fetch(`/api/location/name?latitude=${latitude}&longitude=${longitude}`);
      let locationName = "Unknown Location";
      
      if (locationNameResponse.ok) {
        const nameData = await locationNameResponse.json();
        if (nameData.success && nameData.name) {
          locationName = nameData.name;
          console.log(`Location name resolved to: ${locationName}`);
        }
      }
      
      // Then get the map data
      const response = await fetch(`/api/map?latitude=${latitude}&longitude=${longitude}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch map data: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        console.log(`Map data received with ${data.data.tiles.length} tiles`);
        
        // Update the game state with the new map and location data
        setGameState(prev => {
          const updatedState = {
            ...prev,
            map: data.data,
            location: {
              name: locationName,
              coordinates: { latitude, longitude },
              description: prev.location.description
            },
            gameMessages: [...prev.gameMessages, `You have arrived at ${locationName}.`]
          };
          return updatedState;
        });
        
        // Also get a description for this location
        await fetchLocationDescription(data.data.tiles, locationName);
      }
    } catch (err) {
      console.error("Error fetching map data:", err);
      setError("Failed to load map data. Using fallback map.");
      
      // Use fallback map (handled by the backend)
    } finally {
      setIsLoading(false);
    }
  };

  // Get AI-generated description for location
  const fetchLocationDescription = async (tiles: MapTile[], providedLocationName?: string) => {
    try {
      // Find the tile at the player's position
      const currentTile = tiles.find(
        tile => tile.x === gameState.player.position.x && tile.y === gameState.player.position.y
      );
      
      if (!currentTile) return;
      
      const locationType = currentTile.type;
      // Use the provided location name if available, otherwise use the tile name or the current location name
      const locationName = providedLocationName || currentTile.name || gameState.location.name;
      
      console.log(`Requesting description for location: ${locationName} (${locationType})`);
      
      const response = await fetch(`/api/location/description?name=${encodeURIComponent(locationName)}&type=${encodeURIComponent(locationType)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch location description');
      }
      
      const data = await response.json();
      
      if (data.success && data.description) {
        setGameState(prev => ({
          ...prev,
          location: {
            ...prev.location,
            name: locationName,
            description: data.description
          },
          gameMessages: [...prev.gameMessages, `You are now at ${locationName}.`, data.description]
        }));
      }
    } catch (err) {
      console.error("Error fetching location description:", err);
      // Use a fallback description
      const fallbackDescription = "The area seems abandoned and eerie. Signs of a hasty evacuation are everywhere.";
      
      setGameState(prev => ({
        ...prev,
        location: {
          ...prev.location,
          description: fallbackDescription
        },
        gameMessages: [...prev.gameMessages, fallbackDescription]
      }));
    }
  };

  // Player movement
  const movePlayer = (direction: 'north' | 'south' | 'east' | 'west') => {
    setGameState(prev => {
      const newPosition = { ...prev.player.position };
      
      switch (direction) {
        case 'north':
          if (newPosition.y > 0) newPosition.y--;
          break;
        case 'south':
          if (newPosition.y < 9) newPosition.y++;
          break;
        case 'east':
          if (newPosition.x < 9) newPosition.x++;
          break;
        case 'west':
          if (newPosition.x > 0) newPosition.x--;
          break;
      }
      
      // Check if position changed
      if (newPosition.x === prev.player.position.x && newPosition.y === prev.player.position.y) {
        return prev; // No change
      }
      
      // Find the tile at the new position
      const newTile = prev.map.tiles.find(
        tile => tile.x === newPosition.x && tile.y === newPosition.y
      );
      
      if (!newTile) {
        return {
          ...prev,
          gameMessages: [...prev.gameMessages, "You can't move in that direction."]
        };
      }
      
      const messages = [...prev.gameMessages, `You moved ${direction}.`];
      
      // Check for zombie encounter
      if (newTile.hasZombie && Math.random() < 0.7) { // 70% chance to trigger encounter
        const zombie: Zombie = {
          id: uuidv4(),
          name: generateZombieType(),
          health: 30 + Math.floor(Math.random() * 20), // 30-50 health
          damage: 5 + Math.floor(Math.random() * 10), // 5-15 damage
          description: "A shambling zombie notices you and starts moving in your direction."
        };
        
        messages.push(`A ${zombie.name} has spotted you!`);
        
        return {
          ...prev,
          player: {
            ...prev.player,
            position: newPosition
          },
          gameMessages: messages,
          combatState: {
            ...prev.combatState,
            inCombat: true,
            enemy: zombie,
            playerDamage: 0,
            enemyDamage: 0,
            logs: [`You encountered a ${zombie.name}!`]
          }
        };
      }
      
      // Look for location description if it changed
      if (newTile.name && newTile.name !== prev.location.name) {
        messages.push(`You arrived at ${newTile.name}.`);
        if (newTile.description) {
          messages.push(newTile.description);
        }
      }
      
      // Reduce hunger with movement
      const newHunger = Math.max(0, prev.player.stats.hunger - 1);
      
      // Check hunger effects
      if (newHunger <= 0 && prev.player.stats.hunger > 0) {
        messages.push("You're starving! Your health will start to decline unless you find food.");
      }
      
      // Apply starvation damage if hunger is at 0
      let newHealth = prev.player.stats.health;
      if (newHunger === 0) {
        newHealth = Math.max(0, newHealth - 2);
        messages.push("You take damage from starvation.");
        
        if (newHealth <= 0) {
          messages.push("You have died from starvation.");
        }
      }
      
      return {
        ...prev,
        player: {
          ...prev.player,
          position: newPosition,
          stats: {
            ...prev.player.stats,
            health: newHealth,
            hunger: newHunger
          }
        },
        location: {
          ...prev.location,
          name: newTile.name || prev.location.name,
          description: newTile.description || prev.location.description
        },
        gameMessages: messages
      };
    });
  };

  // Search current location for items
  const searchLocation = () => {
    setGameState(prev => {
      // Find the current tile
      const currentTile = prev.map.tiles.find(
        tile => tile.x === prev.player.position.x && tile.y === prev.player.position.y
      );
      
      if (!currentTile) {
        return {
          ...prev,
          gameMessages: [...prev.gameMessages, "There's nothing to search here."]
        };
      }
      
      // Check if the tile has loot
      if (!currentTile.hasLoot) {
        return {
          ...prev,
          gameMessages: [...prev.gameMessages, "You search the area but find nothing useful."]
        };
      }
      
      // Generate a random item based on location type
      const newItem = generateLootTable(currentTile.type, currentTile.buildingType);
      
      // Check if inventory is full
      if (prev.player.inventory.usedSlots >= prev.player.inventory.totalSlots) {
        return {
          ...prev,
          gameMessages: [...prev.gameMessages, `You found ${newItem.name} but your inventory is full.`]
        };
      }
      
      // Add the item to inventory
      const updatedInventory = {
        ...prev.player.inventory,
        items: [...prev.player.inventory.items, newItem],
        usedSlots: prev.player.inventory.usedSlots + 1
      };
      
      // Mark the tile as looted (remove loot flag)
      const updatedTiles = prev.map.tiles.map(tile => {
        if (tile.id === currentTile.id) {
          return { ...tile, hasLoot: false };
        }
        return tile;
      });
      
      return {
        ...prev,
        player: {
          ...prev.player,
          inventory: updatedInventory
        },
        map: {
          ...prev.map,
          tiles: updatedTiles
        },
        gameMessages: [...prev.gameMessages, `You found ${newItem.name}!`]
      };
    });
  };

  // Enter building at current location
  const enterBuilding = () => {
    setGameState(prev => {
      // Find the current tile
      const currentTile = prev.map.tiles.find(
        tile => tile.x === prev.player.position.x && tile.y === prev.player.position.y
      );
      
      if (!currentTile || currentTile.type !== 'building') {
        return {
          ...prev,
          gameMessages: [...prev.gameMessages, "There's no building to enter here."]
        };
      }
      
      const buildingType = currentTile.buildingType || 'building';
      const buildingName = currentTile.name || 'building';
      
      // 50% chance to find loot inside a building
      if (Math.random() < 0.5) {
        // Generate 1-3 items
        const itemCount = Math.floor(Math.random() * 3) + 1;
        const newItems: InventoryItem[] = [];
        
        for (let i = 0; i < itemCount; i++) {
          if (prev.player.inventory.usedSlots + newItems.length < prev.player.inventory.totalSlots) {
            newItems.push(generateLootTable(currentTile.type, buildingType));
          }
        }
        
        if (newItems.length === 0) {
          return {
            ...prev,
            gameMessages: [...prev.gameMessages, `You enter the ${buildingName} but find it completely looted.`]
          };
        }
        
        // Add items to inventory
        const updatedInventory = {
          ...prev.player.inventory,
          items: [...prev.player.inventory.items, ...newItems],
          usedSlots: prev.player.inventory.usedSlots + newItems.length
        };
        
        const itemNames = newItems.map(item => item.name).join(', ');
        
        return {
          ...prev,
          player: {
            ...prev.player,
            inventory: updatedInventory
          },
          gameMessages: [...prev.gameMessages, 
            `You enter the ${buildingName} and search inside.`,
            `You found: ${itemNames}!`
          ]
        };
      }
      
      // 20% chance to encounter a zombie inside
      if (Math.random() < 0.2) {
        const zombie: Zombie = {
          id: uuidv4(),
          name: generateZombieType(),
          health: 30 + Math.floor(Math.random() * 20), // 30-50 health
          damage: 5 + Math.floor(Math.random() * 10), // 5-15 damage
          description: `A ${generateZombieType()} lurks in the darkness of the ${buildingName}.`
        };
        
        return {
          ...prev,
          gameMessages: [...prev.gameMessages, 
            `You enter the ${buildingName} and hear movement inside.`,
            `A ${zombie.name} emerges from the shadows!`
          ],
          combatState: {
            ...prev.combatState,
            inCombat: true,
            enemy: zombie,
            logs: [`You encountered a ${zombie.name} in the ${buildingName}!`]
          }
        };
      }
      
      // Nothing happened
      return {
        ...prev,
        gameMessages: [...prev.gameMessages, 
          `You enter the ${buildingName} and look around.`,
          `The place seems empty and has already been looted.`
        ]
      };
    });
  };

  // Use an item from inventory
  const useItem = (itemId: string) => {
    setGameState(prev => {
      // Find the item
      const item = prev.player.inventory.items.find(item => item.id === itemId);
      
      if (!item) {
        return prev;
      }
      
      let messages = [...prev.gameMessages];
      let newHealth = prev.player.stats.health;
      let newHunger = prev.player.stats.hunger;
      let removeItem = true;
      
      // Apply item effects based on type
      switch (item.type) {
        case 'medical':
          newHealth = Math.min(100, newHealth + (item.healing || 0));
          messages.push(`You used ${item.name} and restored ${item.healing} health.`);
          break;
          
        case 'food':
          newHunger = Math.min(100, newHunger + (item.hunger || 0));
          messages.push(`You consumed ${item.name} and restored ${item.hunger} hunger.`);
          break;
          
        case 'weapon':
        case 'armor':
          messages.push(`You can't use ${item.name} directly. Try equipping it instead.`);
          removeItem = false;
          break;
          
        case 'ammo':
          messages.push(`You need to combine ${item.name} with a compatible weapon.`);
          removeItem = false;
          break;
          
        default:
          messages.push(`You used ${item.name}.`);
      }
      
      // Remove the item if it was consumed
      let updatedItems = prev.player.inventory.items;
      let updatedSlots = prev.player.inventory.usedSlots;
      
      if (removeItem) {
        updatedItems = updatedItems.filter(i => i.id !== itemId);
        updatedSlots--;
      }
      
      return {
        ...prev,
        player: {
          ...prev.player,
          stats: {
            ...prev.player.stats,
            health: newHealth,
            hunger: newHunger
          },
          inventory: {
            ...prev.player.inventory,
            items: updatedItems,
            usedSlots: updatedSlots
          }
        },
        gameMessages: messages
      };
    });
  };

  // Drop an item from inventory
  const dropItem = (itemId: string) => {
    setGameState(prev => {
      // Find the item
      const item = prev.player.inventory.items.find(item => item.id === itemId);
      
      if (!item) {
        return prev;
      }
      
      // Remove from inventory
      const updatedItems = prev.player.inventory.items.filter(i => i.id !== itemId);
      
      // Check if this item was equipped
      let updatedEquipped = { ...prev.player.stats.equipped };
      if (item.type === 'weapon' && prev.player.stats.equipped.weapon === item.name) {
        updatedEquipped.weapon = null;
      } else if (item.type === 'armor' && prev.player.stats.equipped.armor === item.name) {
        updatedEquipped.armor = null;
      }
      
      return {
        ...prev,
        player: {
          ...prev.player,
          stats: {
            ...prev.player.stats,
            equipped: updatedEquipped
          },
          inventory: {
            ...prev.player.inventory,
            items: updatedItems,
            usedSlots: prev.player.inventory.usedSlots - 1
          }
        },
        gameMessages: [...prev.gameMessages, `You dropped ${item.name}.`]
      };
    });
  };

  // Equip a weapon or armor
  const equipItem = (itemId: string) => {
    setGameState(prev => {
      // Find the item
      const item = prev.player.inventory.items.find(item => item.id === itemId);
      
      if (!item) {
        return prev;
      }
      
      // Check if it's equippable
      if (item.type !== 'weapon' && item.type !== 'armor') {
        return {
          ...prev,
          gameMessages: [...prev.gameMessages, `You can't equip ${item.name}.`]
        };
      }
      
      // Equip the item
      const updatedEquipped = { ...prev.player.stats.equipped };
      
      if (item.type === 'weapon') {
        updatedEquipped.weapon = item.name;
      } else if (item.type === 'armor') {
        updatedEquipped.armor = item.name;
      }
      
      return {
        ...prev,
        player: {
          ...prev.player,
          stats: {
            ...prev.player.stats,
            equipped: updatedEquipped
          }
        },
        gameMessages: [...prev.gameMessages, `You equipped ${item.name}.`]
      };
    });
  };

  // Rest to recover health
  const rest = () => {
    setGameState(prev => {
      // Check if in combat
      if (prev.combatState.inCombat) {
        return {
          ...prev,
          gameMessages: [...prev.gameMessages, "You can't rest while in combat!"]
        };
      }
      
      // 30% chance of zombie encounter while resting
      if (Math.random() < 0.3) {
        const zombie: Zombie = {
          id: uuidv4(),
          name: generateZombieType(),
          health: 30 + Math.floor(Math.random() * 20),
          damage: 5 + Math.floor(Math.random() * 10),
          description: "A zombie stumbled upon you while you were resting."
        };
        
        return {
          ...prev,
          gameMessages: [...prev.gameMessages, 
            "You try to rest, but your sleep is interrupted.",
            "A zombie has found you!"
          ],
          combatState: {
            ...prev.combatState,
            inCombat: true,
            enemy: zombie,
            logs: ["A zombie found you while you were resting!"]
          }
        };
      }
      
      // Recover health but lose hunger
      const healthRecovery = 10 + Math.floor(Math.random() * 10); // 10-20 health
      const hungerLoss = 5 + Math.floor(Math.random() * 5); // 5-10 hunger
      
      const newHealth = Math.min(100, prev.player.stats.health + healthRecovery);
      const newHunger = Math.max(0, prev.player.stats.hunger - hungerLoss);
      
      // Increment day counter
      const newDays = prev.player.stats.daysSurvived + 1;
      
      return {
        ...prev,
        player: {
          ...prev.player,
          stats: {
            ...prev.player.stats,
            health: newHealth,
            hunger: newHunger,
            daysSurvived: newDays
          }
        },
        gameMessages: [...prev.gameMessages, 
          `You rest for the day and recover ${healthRecovery} health.`,
          `You consume ${hungerLoss} hunger while resting.`,
          `It is now day ${newDays} of your survival.`
        ]
      };
    });
  };

  // Start combat with a zombie
  const startCombat = (zombie: Zombie) => {
    setGameState(prev => ({
      ...prev,
      combatState: {
        inCombat: true,
        enemy: zombie,
        playerDamage: 0,
        enemyDamage: 0,
        logs: [`You encountered a ${zombie.name}!`]
      }
    }));
  };

  // Attack zombie in combat
  const attackZombie = () => {
    setGameState(prev => {
      if (!prev.combatState.inCombat || !prev.combatState.enemy) {
        return prev;
      }
      
      const equippedWeapon = prev.player.inventory.items.find(
        item => item.type === 'weapon' && item.name === prev.player.stats.equipped.weapon
      );
      
      // Calculate player damage
      let playerDamage = 5; // Base damage with fists
      if (equippedWeapon && equippedWeapon.damage) {
        playerDamage = equippedWeapon.damage;
      }
      
      // Add some randomness to damage
      playerDamage = Math.max(1, Math.floor(playerDamage * (0.8 + Math.random() * 0.4)));
      
      // Update enemy health
      const enemy = { ...prev.combatState.enemy };
      enemy.health = Math.max(0, enemy.health - playerDamage);
      
      // Add combat log
      let logs = [...prev.combatState.logs];
      logs.push(`You attack the ${enemy.name} with ${equippedWeapon ? equippedWeapon.name : 'your fists'} for ${playerDamage} damage.`);
      
      // Check if enemy defeated
      if (enemy.health <= 0) {
        logs.push(`You defeated the ${enemy.name}!`);
        
        return {
          ...prev,
          player: {
            ...prev.player,
            stats: {
              ...prev.player.stats,
              zombiesKilled: prev.player.stats.zombiesKilled + 1
            }
          },
          combatState: {
            ...prev.combatState,
            inCombat: false,
            enemy: null,
            logs: logs
          },
          gameMessages: [...prev.gameMessages, `You defeated the ${enemy.name}!`]
        };
      }
      
      // Enemy attacks back
      const enemyDamage = Math.max(1, Math.floor(enemy.damage * (0.8 + Math.random() * 0.4)));
      
      // Calculate damage reduction from armor
      let damageReduction = 0;
      const equippedArmor = prev.player.inventory.items.find(
        item => item.type === 'armor' && item.name === prev.player.stats.equipped.armor
      );
      
      if (equippedArmor && equippedArmor.defense) {
        damageReduction = equippedArmor.defense;
      }
      
      const finalDamage = Math.max(1, enemyDamage - damageReduction);
      const newHealth = Math.max(0, prev.player.stats.health - finalDamage);
      
      logs.push(`The ${enemy.name} attacks you for ${finalDamage} damage.`);
      
      // Check player death
      if (newHealth <= 0) {
        logs.push(`You have been killed by the ${enemy.name}!`);
        
        return {
          ...prev,
          player: {
            ...prev.player,
            stats: {
              ...prev.player.stats,
              health: 0
            }
          },
          combatState: {
            ...prev.combatState,
            logs: logs
          },
          gameMessages: [...prev.gameMessages, `You have been killed by the ${enemy.name}!`]
        };
      }
      
      return {
        ...prev,
        player: {
          ...prev.player,
          stats: {
            ...prev.player.stats,
            health: newHealth
          }
        },
        combatState: {
          ...prev.combatState,
          enemy: enemy,
          logs: logs
        }
      };
    });
  };

  // Try to flee from combat
  const fleeCombat = () => {
    setGameState(prev => {
      if (!prev.combatState.inCombat) {
        return prev;
      }
      
      // 60% chance to successfully flee
      if (Math.random() < 0.6) {
        return {
          ...prev,
          combatState: {
            ...prev.combatState,
            inCombat: false,
            enemy: null,
            logs: [...prev.combatState.logs, "You successfully escaped!"]
          },
          gameMessages: [...prev.gameMessages, "You managed to escape from the zombie."]
        };
      }
      
      // Failed to flee, take damage
      const enemy = prev.combatState.enemy;
      if (!enemy) return prev;
      
      const enemyDamage = Math.max(1, Math.floor(enemy.damage * (0.8 + Math.random() * 0.4)));
      const newHealth = Math.max(0, prev.player.stats.health - enemyDamage);
      
      const logs = [...prev.combatState.logs, 
        "You failed to escape!",
        `The ${enemy.name} attacks you for ${enemyDamage} damage.`
      ];
      
      // Check player death
      if (newHealth <= 0) {
        logs.push(`You have been killed by the ${enemy.name}!`);
        
        return {
          ...prev,
          player: {
            ...prev.player,
            stats: {
              ...prev.player.stats,
              health: 0
            }
          },
          combatState: {
            ...prev.combatState,
            logs: logs
          },
          gameMessages: [...prev.gameMessages, `You have been killed by the ${enemy.name}!`]
        };
      }
      
      return {
        ...prev,
        player: {
          ...prev.player,
          stats: {
            ...prev.player.stats,
            health: newHealth
          }
        },
        combatState: {
          ...prev.combatState,
          logs: logs
        },
        gameMessages: [...prev.gameMessages, "You failed to escape from the zombie and took damage."]
      };
    });
  };

  // End combat
  const endCombat = () => {
    setGameState(prev => ({
      ...prev,
      combatState: {
        inCombat: false,
        enemy: null,
        playerDamage: 0,
        enemyDamage: 0,
        logs: []
      }
    }));
  };

  // Save game state to server
  const saveGame = async () => {
    try {
      await apiRequest("POST", "/api/game/save", {
        gameState,
        userId: 1 // Add proper user ID if auth is implemented
      });
      
      setGameState(prev => ({
        ...prev,
        gameMessages: [...prev.gameMessages, "Game saved successfully."]
      }));
    } catch (err) {
      console.error("Failed to save game:", err);
      setError("Failed to save game state.");
      
      setGameState(prev => ({
        ...prev,
        gameMessages: [...prev.gameMessages, "Failed to save game."]
      }));
    }
  };

  // Load game state from server
  const loadGame = async (gameId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/game/load/${gameId}`);
      if (!response.ok) {
        throw new Error('Failed to load game');
      }
      
      const data = await response.json();
      
      if (data.success && data.gameState) {
        setGameState(data.gameState);
      }
    } catch (err) {
      console.error("Failed to load game:", err);
      setError("Failed to load game state.");
    } finally {
      setIsLoading(false);
    }
  };

  // Start a new game
  const startNewGame = () => {
    setGameState({
      ...initialGameState,
      gameId: uuidv4()
    });
    
    // Fetch map data for the default location
    fetchMapData(DEFAULT_COORDINATES.latitude, DEFAULT_COORDINATES.longitude);
  };

  return (
    <GameContext.Provider value={{
      gameState,
      isLoading,
      error,
      movePlayer,
      searchLocation,
      enterBuilding,
      useItem,
      dropItem,
      equipItem,
      rest,
      startCombat,
      attackZombie,
      fleeCombat,
      endCombat,
      saveGame,
      loadGame,
      startNewGame,
      selectedItemId,
      setSelectedItemId
    }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook for using the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
