import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const gameStates = pgTable("game_states", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  saveDate: text("save_date").notNull(),
  saveData: jsonb("save_data").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameStateSchema = createInsertSchema(gameStates).pick({
  userId: true,
  saveDate: true,
  saveData: true,
});

// Game type definitions
export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MapTile = {
  id: string;
  type: 'road' | 'building' | 'open' | 'water';
  x: number;
  y: number;
  hasZombie: boolean;
  hasLoot: boolean;
  name?: string;
  description?: string;
  buildingType?: string;
};

export type GameMap = {
  tiles: MapTile[];
  center: Coordinates;
  zoom: number;
};

export type InventoryItem = {
  id: string;
  name: string;
  type: 'weapon' | 'food' | 'medical' | 'ammo' | 'armor' | 'misc';
  effect?: string;
  damage?: number;
  healing?: number;
  hunger?: number;
  ammo?: number;
  defense?: number;
  rounds?: number;
  quantity?: number;
  weight?: number;
};

export type PlayerStats = {
  health: number;
  hunger: number;
  daysSurvived: number;
  zombiesKilled: number;
  equipped: {
    weapon: string | null;
    armor: string | null;
  };
};

export type Inventory = {
  items: InventoryItem[];
  usedSlots: number;
  totalSlots: number;
};

export type Location = {
  name: string;
  coordinates: Coordinates;
  description: string;
};

export type Zombie = {
  id: string;
  name: string;
  health: number;
  damage: number;
  description: string;
};

export type CombatState = {
  inCombat: boolean;
  enemy: Zombie | null;
  playerDamage: number;
  enemyDamage: number;
  logs: string[];
};

export type GameState = {
  player: {
    position: { x: number; y: number };
    stats: PlayerStats;
    inventory: Inventory;
  };
  map: GameMap;
  location: Location;
  combatState: CombatState;
  gameMessages: string[];
  gameId: string;
};

export const locationRequestSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const saveGameStateSchema = z.object({
  gameState: z.custom<GameState>(),
  userId: z.number().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertGameState = z.infer<typeof insertGameStateSchema>;
export type GameStateRecord = typeof gameStates.$inferSelect;
export type LocationRequest = z.infer<typeof locationRequestSchema>;
export type SaveGameStateRequest = z.infer<typeof saveGameStateSchema>;
