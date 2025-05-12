import { useState } from "react";
import { getTileClass } from "@/lib/mapUtils";
import { type GameMap, type MapTile, type Location, type Coordinates } from "@shared/schema";

interface MapViewProps {
  mapData: GameMap;
  playerPosition: { x: number, y: number };
  currentLocation: Location;
}

export default function MapView({ mapData, playerPosition, currentLocation }: MapViewProps) {
  const [zoom, setZoom] = useState<number>(1);
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.6));
  };

  return (
    <div className="bg-neutral-dark border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-800 px-3 py-2 flex justify-between items-center">
        <h2 className="font-heading text-sm text-white">MAP LOCATION: <span className="text-accent">{currentLocation.name}</span></h2>
        <div className="flex space-x-2">
          <button 
            className="p-1 text-white bg-gray-700 rounded hover:bg-gray-600" 
            title="Zoom In"
            onClick={handleZoomIn}
          >
            +
          </button>
          <button 
            className="p-1 text-white bg-gray-700 rounded hover:bg-gray-600" 
            title="Zoom Out"
            onClick={handleZoomOut}
          >
            -
          </button>
        </div>
      </div>
      
      <div className="map-container" style={{ height: '300px' }}>
        <div 
          className="map-grid absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            height: `${100 * zoom}%`,
            width: `${100 * zoom}%`,
            transition: 'all 0.3s ease'
          }}
        >
          {mapData.tiles.map((tile) => (
            <div 
              key={tile.id} 
              className={`
                ${getTileClass(tile)}
                ${playerPosition.x === tile.x && playerPosition.y === tile.y ? 'player-position' : ''}
              `}
              style={{
                gridRow: tile.y + 1,
                gridColumn: tile.x + 1,
                minHeight: '20px',
                minWidth: '20px'
              }}
              title={tile.name || tile.type}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-gray-800 px-3 py-2 flex justify-between items-center text-xs text-gray-400">
        <div>Map data from OpenStreetMap</div>
        <div>Coordinates: {
          `${currentLocation.coordinates.latitude.toFixed(4)}, ${currentLocation.coordinates.longitude.toFixed(4)}`
        }</div>
      </div>

      {/* Map legend */}
      <div className="px-3 py-2 bg-gray-800 border-t border-gray-700">
        <div className="text-xs text-white mb-1">Map Legend:</div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 building-tile rounded"></div>
            <span>Building</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 road-tile rounded"></div>
            <span>Road</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 water-tile rounded"></div>
            <span>Water</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 open-tile rounded"></div>
            <span>Open</span>
          </div>
        </div>
      </div>
    </div>
  );
}
