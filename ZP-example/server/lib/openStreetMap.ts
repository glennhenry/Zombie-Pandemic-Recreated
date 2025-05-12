import type { MapTile, GameMap, Coordinates } from "@shared/schema";
import { v4 as uuidv4 } from 'uuid';

const OSM_API_URL = "https://nominatim.openstreetmap.org";
const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

interface OsmElement {
  id: number;
  type: string;
  tags?: {
    [key: string]: string;
  };
  lat?: number;
  lon?: number;
  nodes?: number[];
}

interface OverpassResponse {
  elements: OsmElement[];
}

// Fetch map data from OpenStreetMap
export async function fetchLocationData(latitude: number, longitude: number, radius: number = 300): Promise<GameMap> {
  try {
    // Use Overpass API to get buildings, roads, and other features around the location
    // Fixed Overpass query syntax with proper lat/lon parameters for all node types
    const overpassQuery = `
      [out:json];
      (
        node["building"](around:${radius},${latitude},${longitude});
        way["building"](around:${radius},${latitude},${longitude});
        node["amenity"](around:${radius},${latitude},${longitude});
        way["amenity"](around:${radius},${latitude},${longitude});
        way["highway"](around:${radius},${latitude},${longitude});
        node["shop"](around:${radius},${latitude},${longitude});
        way["shop"](around:${radius},${latitude},${longitude});
        way["natural"="water"](around:${radius},${latitude},${longitude});
      );
      out body;
      >;
      out body;
    `;

    // Use timeout parameter to avoid request timeouts
    const response = await fetch(`${OVERPASS_API_URL}?data=${encodeURIComponent(overpassQuery)}&timeout=60`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Zombie-Survival-Game/1.0'
      }
    });
    
    if (!response.ok) {
      console.log(`OpenStreetMap API response status: ${response.status} - ${response.statusText}`);
      throw new Error(`Failed to fetch OSM data: ${response.statusText}`);
    }
    
    const data: OverpassResponse = await response.json();
    console.log(`Received ${data.elements ? data.elements.length : 0} OSM elements`);
    
    // Process the raw OSM data into our game map format
    const mapTiles = processOsmData(data, latitude, longitude);
    
    return {
      tiles: mapTiles,
      center: { latitude, longitude },
      zoom: 15
    };
  } catch (error) {
    console.error("Error fetching data from OpenStreetMap:", error);
    // Return a default map if API fails
    return generateDefaultMap(latitude, longitude);
  }
}

// Process OpenStreetMap data into our game's map tiles
function processOsmData(data: OverpassResponse, centerLat: number, centerLon: number): MapTile[] {
  const tiles: MapTile[] = [];
  const gridSize = 10; // 10x10 grid

  // Track seen coordinates to avoid duplicates
  const seenCoordinates: Set<string> = new Set();
  
  // Calculate the bounding box for our grid
  const latStep = 0.001; // Approximate 100 meters
  const lonStep = 0.001;
  
  // Initialize the grid with open spaces
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const tile: MapTile = {
        id: uuidv4(),
        type: 'open',
        x: x,
        y: y,
        hasZombie: Math.random() < 0.15, // 15% chance of zombie
        hasLoot: Math.random() < 0.1, // 10% chance of loot
      };
      tiles.push(tile);
    }
  }
  
  // Process buildings and other elements
  data.elements.forEach(element => {
    if (element.tags) {
      let tileType: 'building' | 'road' | 'water' | 'open' = 'open';
      let name = '';
      let buildingType = '';
      
      // Determine tile type based on OSM tags
      if (element.tags.building) {
        tileType = 'building';
        buildingType = element.tags.building;
        name = element.tags.name || `${buildingType} building`;
      } else if (element.tags.highway) {
        tileType = 'road';
        name = element.tags.name || 'Road';
      } else if (element.tags.amenity) {
        tileType = 'building';
        buildingType = element.tags.amenity;
        name = element.tags.name || `${buildingType}`;
      } else if (element.tags.shop) {
        tileType = 'building';
        buildingType = element.tags.shop;
        name = element.tags.name || `${buildingType} shop`;
      } else if (element.tags.water) {
        tileType = 'water';
        name = element.tags.name || 'Water';
      }
      
      // If it's a node with coordinates, place it on our grid
      if (element.lat && element.lon) {
        // Convert lat/lon to grid coordinates
        const x = Math.floor((element.lon - (centerLon - (lonStep * gridSize / 2))) / lonStep);
        const y = Math.floor((element.lat - (centerLat - (latStep * gridSize / 2))) / latStep);
        
        // Check if within grid bounds
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
          const coordKey = `${x},${y}`;
          
          // Skip if this coordinate already has a feature
          if (!seenCoordinates.has(coordKey)) {
            seenCoordinates.add(coordKey);
            
            // Find the tile at this position
            const tileIndex = y * gridSize + x;
            if (tileIndex < tiles.length) {
              // Update tile properties
              tiles[tileIndex].type = tileType;
              tiles[tileIndex].name = name;
              if (buildingType) {
                tiles[tileIndex].buildingType = buildingType;
              }
              
              // Buildings have higher chance of containing loot
              if (tileType === 'building' && Math.random() < 0.3) {
                tiles[tileIndex].hasLoot = true;
              }
            }
          }
        }
      }
    }
  });
  
  return tiles;
}

// Generate a default map when API fails
function generateDefaultMap(latitude: number, longitude: number): GameMap {
  const tiles: MapTile[] = [];
  const gridSize = 10; // 10x10 grid
  
  // Building positions - using fixed positions for the default map
  const buildings = [
    { x: 0, y: 0 }, { x: 3, y: 0 }, { x: 6, y: 0 }, { x: 9, y: 0 },
    { x: 0, y: 3 }, { x: 4, y: 4 }, { x: 7, y: 2 },
    { x: 1, y: 5 }, { x: 6, y: 5 }, { x: 2, y: 7 }, { x: 9, y: 9 }
  ];
  
  // Road positions - creating a simple road network
  const roads = [
    // Horizontal roads
    ...[...Array(10)].map((_, i) => ({ x: i, y: 1 })),
    ...[...Array(10)].map((_, i) => ({ x: i, y: 4 })),
    ...[...Array(10)].map((_, i) => ({ x: i, y: 7 })),
    
    // Vertical roads
    ...[...Array(10)].map((_, i) => ({ x: 2, y: i })),
    ...[...Array(10)].map((_, i) => ({ x: 5, y: i })),
    ...[...Array(10)].map((_, i) => ({ x: 8, y: i })),
  ];
  
  // Create the grid
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const isBuilding = buildings.some(b => b.x === x && b.y === y);
      const isRoad = roads.some(r => r.x === x && r.y === y);
      
      const tile: MapTile = {
        id: uuidv4(),
        type: isBuilding ? 'building' : isRoad ? 'road' : 'open',
        x: x,
        y: y,
        hasZombie: Math.random() < 0.15, // 15% chance of zombie
        hasLoot: isBuilding && Math.random() < 0.3, // 30% chance of loot in buildings
      };
      
      // Add names to some buildings
      if (isBuilding) {
        const buildingTypes = ['apartment', 'store', 'house', 'office', 'pharmacy', 'restaurant'];
        tile.buildingType = buildingTypes[Math.floor(Math.random() * buildingTypes.length)];
        tile.name = `${tile.buildingType.charAt(0).toUpperCase() + tile.buildingType.slice(1)}`;
      }
      
      tiles.push(tile);
    }
  }
  
  return {
    tiles,
    center: { latitude, longitude },
    zoom: 15
  };
}

// Reverse geocode to get location name
export async function getLocationName(latitude: number, longitude: number): Promise<string> {
  try {
    const response = await fetch(
      `${OSM_API_URL}/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to reverse geocode: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Format address components into a location name
    const addressParts = [];
    if (data.address) {
      if (data.address.road) addressParts.push(data.address.road);
      if (data.address.suburb) addressParts.push(data.address.suburb);
      if (data.address.city || data.address.town) {
        addressParts.push(data.address.city || data.address.town);
      }
    }
    
    return addressParts.length > 0 
      ? addressParts.join(", ")
      : `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
  }
}
