import { type MapTile, type Coordinates } from "@shared/schema";

// Convert coordinates to URL for OpenStreetMap
export function getOsmUrl(coords: Coordinates): string {
  return `https://www.openstreetmap.org/#map=15/${coords.latitude}/${coords.longitude}`;
}

// Get tile at specific position
export function getTileAtPosition(tiles: MapTile[], x: number, y: number): MapTile | undefined {
  return tiles.find(tile => tile.x === x && tile.y === y);
}

// Get tile class based on tile type
export function getTileClass(tile: MapTile): string {
  let classes = "map-tile";
  
  if (tile.type === 'building') {
    classes += " building-tile";
  } else if (tile.type === 'road') {
    classes += " road-tile";
  } else if (tile.type === 'water') {
    classes += " water-tile";
  }
  
  if (tile.hasZombie) {
    classes += " zombie-tile";
  }
  
  if (tile.hasLoot) {
    classes += " loot-tile";
  }
  
  return classes;
}

// Check if player can move to a position
export function canMoveTo(tiles: MapTile[], x: number, y: number): boolean {
  // Check bounds
  if (x < 0 || x > 9 || y < 0 || y > 9) {
    return false;
  }
  
  // Get the tile at this position
  const tile = getTileAtPosition(tiles, x, y);
  if (!tile) {
    return false;
  }
  
  // All tiles are traversable in this game, but we could add water or impassable terrain
  return true;
}

// Get a list of adjacent tiles
export function getAdjacentTiles(tiles: MapTile[], x: number, y: number): MapTile[] {
  const adjacent: MapTile[] = [];
  
  // Check north, east, south, west
  const directions = [
    { dx: 0, dy: -1 }, // North
    { dx: 1, dy: 0 },  // East
    { dx: 0, dy: 1 },  // South
    { dx: -1, dy: 0 }  // West
  ];
  
  for (const dir of directions) {
    const newX = x + dir.dx;
    const newY = y + dir.dy;
    
    // Check bounds
    if (newX >= 0 && newX <= 9 && newY >= 0 && newY <= 9) {
      const tile = getTileAtPosition(tiles, newX, newY);
      if (tile) {
        adjacent.push(tile);
      }
    }
  }
  
  return adjacent;
}

// Convert map coordinates to screen coordinates
export function mapToScreenCoords(x: number, y: number, tileSize: number): { screenX: number, screenY: number } {
  return {
    screenX: x * tileSize,
    screenY: y * tileSize
  };
}

// Format coordinates for display
export function formatCoordinates(coords: Coordinates): string {
  return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
}
