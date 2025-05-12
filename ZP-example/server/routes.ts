import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchLocationData, getLocationName } from "./lib/openStreetMap";
import { generateLocationDescription, generateZombieDescription, generateLootDescription } from "./lib/aiDescriptions";
import { locationRequestSchema, saveGameStateSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix

  // Get map data for location
  app.get("/api/map", async (req, res) => {
    try {
      // Default to San Francisco coordinates if missing
      let latitude = 37.7749;
      let longitude = -122.4194;
      
      // Try to parse query parameters if provided
      if (req.query.latitude && req.query.longitude) {
        const parsedLat = parseFloat(req.query.latitude as string);
        const parsedLng = parseFloat(req.query.longitude as string);
        
        // Validate that they're actually numbers
        if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
          latitude = parsedLat;
          longitude = parsedLng;
        }
      }
      
      console.log(`Fetching map data for coordinates: ${latitude}, ${longitude}`);
      
      // Validate with Zod schema
      const locationRequest = locationRequestSchema.parse({ latitude, longitude });
      
      // Fetch map data from OpenStreetMap with better error handling
      const mapData = await fetchLocationData(locationRequest.latitude, locationRequest.longitude);
      
      console.log(`Map data fetched successfully with ${mapData.tiles.length} tiles`);
      
      res.json({ success: true, data: mapData });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, message: "Invalid location coordinates", details: error.errors });
      } else {
        console.error("Error fetching map data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch map data", fallback: true });
      }
    }
  });

  // Generate location description
  app.get("/api/location/description", async (req, res) => {
    try {
      const locationName = req.query.name as string;
      const locationType = req.query.type as string;
      
      if (!locationName || !locationType) {
        return res.status(400).json({ success: false, message: "Location name and type are required" });
      }
      
      const description = await generateLocationDescription(locationName, locationType);
      res.json({ success: true, description });
    } catch (error) {
      console.error("Error generating location description:", error);
      res.status(500).json({ success: false, message: "Failed to generate location description" });
    }
  });
  
  // Get location name from coordinates
  app.get("/api/location/name", async (req, res) => {
    try {
      let latitude = parseFloat(req.query.latitude as string);
      let longitude = parseFloat(req.query.longitude as string);
      
      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ success: false, message: "Valid coordinates are required" });
      }
      
      console.log(`Getting location name for coordinates: ${latitude}, ${longitude}`);
      const locationName = await getLocationName(latitude, longitude);
      res.json({ success: true, name: locationName });
    } catch (error) {
      console.error("Error getting location name:", error);
      res.status(500).json({ success: false, message: "Failed to get location name" });
    }
  });

  // Save game state
  app.post("/api/game/save", async (req, res) => {
    try {
      const saveRequest = saveGameStateSchema.parse(req.body);
      
      const saveData = {
        userId: saveRequest.userId || null,
        saveDate: new Date().toISOString(),
        saveData: saveRequest.gameState
      };
      
      const savedGame = await storage.saveGameState(saveData);
      res.json({ success: true, savedGame });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, message: "Invalid game state data", details: error.errors });
      } else {
        console.error("Error saving game state:", error);
        res.status(500).json({ success: false, message: "Failed to save game state" });
      }
    }
  });

  // Get saved game states for user
  app.get("/api/game/saves/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
      }
      
      const savedGames = await storage.getGameStatesByUserId(userId);
      res.json({ success: true, savedGames });
    } catch (error) {
      console.error("Error fetching saved games:", error);
      res.status(500).json({ success: false, message: "Failed to fetch saved games" });
    }
  });

  // Load specific game state
  app.get("/api/game/load/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid game state ID" });
      }
      
      const gameState = await storage.getGameStateById(id);
      if (!gameState) {
        return res.status(404).json({ success: false, message: "Game state not found" });
      }
      
      res.json({ success: true, gameState: gameState.saveData });
    } catch (error) {
      console.error("Error loading game state:", error);
      res.status(500).json({ success: false, message: "Failed to load game state" });
    }
  });

  // Delete game state
  app.delete("/api/game/save/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid game state ID" });
      }
      
      const success = await storage.deleteGameState(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Game state not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting game state:", error);
      res.status(500).json({ success: false, message: "Failed to delete game state" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
