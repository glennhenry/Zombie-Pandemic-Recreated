import { useEffect, useState } from "react";
import { ResourceManager } from "../../../utils/ResourceManager";
import { MapBlock } from "./MapBlock";
import { Overlay } from "../../components/Overlay";
import type { Position } from "../../../core/model/map/Position";
import { MapArrowOverlay } from "./MapArrowOverlay";
import { directionChange } from "../../../core/model/map/Direction";
import type { MapMetadata } from "../../../core/model/map/MapMetadata";
import { motion, useMotionValue, animate } from "framer-motion";

interface MainViewProps {
  metadata: MapMetadata;
}

export default function MainView(props: MainViewProps) {
  const [position, setPosition] = useState<Position>({ x: 1, y: 1 });
  const [tiles, setTiles] = useState(() =>
    getAllSurroundingTiles(props.metadata, position),
  );

  const xMv = useMotionValue(0);
  const yMv = useMotionValue(0);

  const move = (dx: number, dy: number) => {
    const nx = position.x + dx;
    const ny = position.y + dy;

    if (
      nx < 0 ||
      ny < 0 ||
      nx >= props.metadata.width ||
      ny >= props.metadata.height
    ) {
      return;
    }

    const animationPromises = [
      new Promise<void>((resolve) =>
        animate(xMv, -dx * props.metadata.blockSizePixels, {
          type: "spring",
          stiffness: 400,
          damping: 40,
          onComplete: resolve,
        }),
      ),
      new Promise<void>((resolve) =>
        animate(yMv, -dy * props.metadata.blockSizePixels, {
          type: "spring",
          stiffness: 400,
          damping: 40,
          onComplete: resolve,
        }),
      ),
    ];

    Promise.all(animationPromises).then(() => {
      setPosition({ x: nx, y: ny });
      setTiles(getAllSurroundingTiles(props.metadata, { x: nx, y: ny }));

      xMv.set(0);
      yMv.set(0);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const dir = getDirectionFromKey(e);
      if (!dir) return;
      move(dir.dx, dir.dy);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position]);

  return (
    <div className="relative h-[calc(100%-5rem)] w-full overflow-hidden">
      {/* 5x5 grid so that there will be never blank tiles during animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 grid-cols-5 grid-rows-5"
        style={{
          width: `${5 * props.metadata.blockSizePixels}px`,
          height: `${5 * props.metadata.blockSizePixels}px`,
          x: xMv,
          y: yMv,
        }}
      >
        {tiles.map((block, i) => (
          <Overlay
            key={i}
            enabled
            overlayContent={
              i === 12 && (
                <MapArrowOverlay
                  onMove={(d) => {
                    const dir = directionChange[d];
                    move(dir.dx, dir.dy);
                  }}
                />
              )
            }
          >
            <MapBlock blockImagePath={block} />
          </Overlay>
        ))}
      </motion.div>
    </div>
  );
}

function getAllSurroundingTiles(
  metadata: MapMetadata,
  pos: Position,
): string[] {
  const tiles: string[] = [];

  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      const tilePos = { x: pos.x + dx, y: pos.y + dy };
      tiles.push(getMapTileOnPosition(metadata, tilePos));
    }
  }

  return tiles;
}

function getMapTileOnPosition(metadata: MapMetadata, pos: Position): string {
  return ResourceManager.getBlockSafe(
    metadata.mapId,
    metadata.width,
    metadata.height,
    pos.x,
    pos.y,
  );
}

function getDirectionFromKey(
  e: KeyboardEvent,
): { dx: number; dy: number } | null {
  switch (e.key.toLowerCase()) {
    case "w":
      return { dx: 0, dy: -1 };
    case "a":
      return { dx: -1, dy: 0 };
    case "s":
      return { dx: 0, dy: 1 };
    case "d":
      return { dx: 1, dy: 0 };
    default:
      return null;
  }
}
