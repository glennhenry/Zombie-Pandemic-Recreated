import { ASSETS } from "../../../utils/assets";
import { MapBlock } from "./MapBlock";

export default function MainView() {
  const maps9 = [
    ASSETS.data.maps.blocks.block_000_000,
    ASSETS.data.maps.blocks.block_000_001,
    ASSETS.data.maps.blocks.block_000_002,
    ASSETS.data.maps.blocks.block_001_000,
    ASSETS.data.maps.blocks.block_001_001,
    ASSETS.data.maps.blocks.block_001_002,
    ASSETS.data.maps.blocks.block_002_000,
    ASSETS.data.maps.blocks.block_002_001,
    ASSETS.data.maps.blocks.block_002_002,
  ];

  return (
    <div className="relative h-[calc(100%-5rem)] w-full overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 grid-cols-3 grid-rows-3"
        style={{
          width: `${3 * 500}px`, // Assuming each tile is 512x512
          height: `${3 * 500}px`,
        }}
      >
        {maps9.map((block, i) => (
          <MapBlock key={i} blockImagePath={block} />
        ))}
      </div>
    </div>
  );
}
