import { type InventoryItem } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";

// Generate a random loot item based on location type
export function generateLootTable(locationType: string, buildingType?: string): InventoryItem {
  // Common items that can be found anywhere
  const commonItems: InventoryItem[] = [
    {
      id: uuidv4(),
      name: "Water Bottle",
      type: "food",
      effect: "Restores 15 hunger",
      hunger: 15
    },
    {
      id: uuidv4(),
      name: "Candy Bar",
      type: "food",
      effect: "Restores 10 hunger",
      hunger: 10
    },
    {
      id: uuidv4(),
      name: "Bandage",
      type: "medical",
      effect: "Restores 15 health",
      healing: 15
    },
    {
      id: uuidv4(),
      name: "Duct Tape",
      type: "misc",
      effect: "Useful for crafting"
    }
  ];

  // Building-specific items
  const buildingItems: Record<string, InventoryItem[]> = {
    // Pharmacies and medical buildings
    pharmacy: [
      {
        id: uuidv4(),
        name: "First Aid Kit",
        type: "medical",
        effect: "Restores 50 health",
        healing: 50
      },
      {
        id: uuidv4(),
        name: "Painkillers",
        type: "medical",
        effect: "Restores 25 health",
        healing: 25
      },
      {
        id: uuidv4(),
        name: "Antibiotics",
        type: "medical",
        effect: "Prevents infection",
        healing: 10
      }
    ],
    
    // Food stores
    supermarket: [
      {
        id: uuidv4(),
        name: "Canned Soup",
        type: "food",
        effect: "Restores 30 hunger",
        hunger: 30
      },
      {
        id: uuidv4(),
        name: "Dried Meat",
        type: "food",
        effect: "Restores 40 hunger",
        hunger: 40
      },
      {
        id: uuidv4(),
        name: "Energy Bar",
        type: "food",
        effect: "Restores 20 hunger",
        hunger: 20
      }
    ],
    
    // Weapon shops and police stations
    gun_shop: [
      {
        id: uuidv4(),
        name: "Pistol",
        type: "weapon",
        effect: "Ranged weapon, requires ammo",
        damage: 30
      },
      {
        id: uuidv4(),
        name: "Shotgun",
        type: "weapon",
        effect: "Powerful ranged weapon, requires ammo",
        damage: 50
      },
      {
        id: uuidv4(),
        name: "Pistol Ammo",
        type: "ammo",
        effect: "Ammo for pistol",
        rounds: 10
      }
    ],
    
    // Hardware stores
    hardware: [
      {
        id: uuidv4(),
        name: "Crowbar",
        type: "weapon",
        effect: "Melee weapon",
        damage: 15
      },
      {
        id: uuidv4(),
        name: "Hammer",
        type: "weapon",
        effect: "Melee weapon",
        damage: 12
      },
      {
        id: uuidv4(),
        name: "Nail Board",
        type: "weapon",
        effect: "Makeshift melee weapon",
        damage: 10
      }
    ],
    
    // Clothing shops
    clothes: [
      {
        id: uuidv4(),
        name: "Leather Jacket",
        type: "armor",
        effect: "Light protection",
        defense: 5
      },
      {
        id: uuidv4(),
        name: "Heavy Boots",
        type: "armor",
        effect: "Foot protection",
        defense: 3
      }
    ],
    
    // Houses and apartments
    residential: [
      {
        id: uuidv4(),
        name: "Kitchen Knife",
        type: "weapon",
        effect: "Basic weapon",
        damage: 8
      },
      {
        id: uuidv4(),
        name: "Canned Food",
        type: "food",
        effect: "Restores 25 hunger",
        hunger: 25
      },
      {
        id: uuidv4(),
        name: "Flashlight",
        type: "misc",
        effect: "Helps seeing in dark areas"
      }
    ]
  };

  // Handle various building type aliases
  let normalizedBuildingType = 'residential';
  if (buildingType) {
    if (['pharmacy', 'hospital', 'doctors', 'clinic'].includes(buildingType)) {
      normalizedBuildingType = 'pharmacy';
    } else if (['supermarket', 'convenience', 'grocery', 'restaurant', 'cafe'].includes(buildingType)) {
      normalizedBuildingType = 'supermarket';
    } else if (['gun_shop', 'police', 'military'].includes(buildingType)) {
      normalizedBuildingType = 'gun_shop';
    } else if (['hardware', 'DIY', 'tools'].includes(buildingType)) {
      normalizedBuildingType = 'hardware';
    } else if (['clothes', 'boutique', 'fashion'].includes(buildingType)) {
      normalizedBuildingType = 'clothes';
    } else if (['house', 'apartment', 'residential', 'flat', 'dwelling'].includes(buildingType)) {
      normalizedBuildingType = 'residential';
    }
  }

  // Select items based on location and building type
  let possibleItems: InventoryItem[] = [...commonItems];
  
  if (locationType === 'building' && buildingItems[normalizedBuildingType]) {
    possibleItems = [...possibleItems, ...buildingItems[normalizedBuildingType]];
  }
  
  // Special case for road loot
  if (locationType === 'road') {
    possibleItems = commonItems.filter(item => item.type !== 'weapon');
  }
  
  // Pick a random item
  return possibleItems[Math.floor(Math.random() * possibleItems.length)];
}

// Generate zombie types
export function generateZombieType(): string {
  const zombieTypes = [
    "Walker",
    "Runner",
    "Crawler",
    "Bloated Zombie",
    "Screamer",
    "Shambler",
    "Decayed Zombie",
    "Fresh Turned",
    "Lurker"
  ];
  
  return zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
}

// Calculate damage for combat
export function calculateDamage(baseDamage: number, variance: number = 0.2): number {
  const minDamage = Math.floor(baseDamage * (1 - variance));
  const maxDamage = Math.floor(baseDamage * (1 + variance));
  return Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
}

// Check if player is dead
export function isPlayerDead(health: number): boolean {
  return health <= 0;
}

// Get effective weapon damage including equipped weapon
export function getPlayerDamage(equippedWeapon: string | null, inventory: InventoryItem[]): number {
  if (!equippedWeapon) return 5; // Base unarmed damage
  
  const weapon = inventory.find(item => item.name === equippedWeapon);
  return weapon?.damage || 5;
}

// Get player's defense from equipped armor
export function getPlayerDefense(equippedArmor: string | null, inventory: InventoryItem[]): number {
  if (!equippedArmor) return 0;
  
  const armor = inventory.find(item => item.name === equippedArmor);
  return armor?.defense || 0;
}
