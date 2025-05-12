import { 
  users, type User, type InsertUser, 
  gameStates, type GameStateRecord, type InsertGameState,
  type GameState
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  saveGameState(gameState: InsertGameState): Promise<GameStateRecord>;
  getGameStatesByUserId(userId: number): Promise<GameStateRecord[]>;
  getGameStateById(id: number): Promise<GameStateRecord | undefined>;
  deleteGameState(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gameStates: Map<number, GameStateRecord>;
  userCurrentId: number;
  gameStateCurrentId: number;

  constructor() {
    this.users = new Map();
    this.gameStates = new Map();
    this.userCurrentId = 1;
    this.gameStateCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveGameState(insertGameState: InsertGameState): Promise<GameStateRecord> {
    const id = this.gameStateCurrentId++;
    const gameState: GameStateRecord = { ...insertGameState, id };
    this.gameStates.set(id, gameState);
    return gameState;
  }

  async getGameStatesByUserId(userId: number): Promise<GameStateRecord[]> {
    return Array.from(this.gameStates.values()).filter(
      (state) => state.userId === userId,
    );
  }

  async getGameStateById(id: number): Promise<GameStateRecord | undefined> {
    return this.gameStates.get(id);
  }

  async deleteGameState(id: number): Promise<boolean> {
    return this.gameStates.delete(id);
  }
}

export const storage = new MemStorage();
