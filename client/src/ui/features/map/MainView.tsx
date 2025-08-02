import { useState } from "react";
import { ResourceManager } from "../../../utils/ResourceManager";
import { MapBlock } from "./MapBlock";
import { Overlay } from "../../components/Overlay";
import type { Position } from "../../../core/types/Position";

interface MainViewProps {
  map: string;
}

export default function MainView(props: MainViewProps) {
  const [position, setPosition] = useState({ x: 1, y: 1 } as Position);
  const maps9 = getAllSurroundingTiles(props.map, position);

  return (
    <div className="relative h-[calc(100%-5rem)] w-full overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 grid-cols-3 grid-rows-3"
        style={{
          width: `${3 * 500}px`, // Assuming each tile is 500x500
          height: `${3 * 500}px`,
        }}
      >
        {maps9.map((block, i) => (
          <Overlay enabled={i != 4}>
            <MapBlock key={i} blockImagePath={block} />
          </Overlay>
        ))}
      </div>
    </div>
  );
}

function getAllSurroundingTiles(map: string, pos: Position): string[] {
  const tiles: string[] = [];

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const tilePos = { x: pos.x + dx, y: pos.y + dy };
      tiles.push(getMapTileOnPosition(map, tilePos));
    }
  }

  return tiles;
}

function getMapTileOnPosition(map: string, pos: Position): string {
  return ResourceManager.getBlock(map, pos.x, pos.y);
}
