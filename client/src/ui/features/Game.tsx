import { useEffect, useState } from "react";
import type { Account } from "../../core/model/account/Account";
import { Network } from "../../network/Network";
import { bglinearGradientStyle } from "../../utils/ui/linearGradient";
import MainView from "./map/MainView";
import type { MapMetadata } from "../../core/model/map/MapMetadata";
import type { GameMetadata } from "../../core/model/GameMetadata";

interface GameProps {
  account?: Account | null;
}

export default function Game(_props: GameProps) {
  const [_gameMetadata, setGameMetadata] = useState<GameMetadata | null>(null);
  const [mapMetadata, setMapMetadata] = useState<MapMetadata | null>(null);

  useEffect(() => {
    Network.getInstance()
      .getMapMetadata()
      .then(setMapMetadata)
      .catch((err) => console.error("Failed to fetch map metadata:", err));
  }, []);

  useEffect(() => {
    Network.getInstance()
      .getGameMetadata()
      .then(setGameMetadata)
      .catch((err) => console.error("Failed to fetch game metadata:", err));
  }, []);

  if (!mapMetadata) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="noselect mx-auto h-[800px] w-full max-w-[1200px] min-w-[800px] border-1 border-gray-500 bg-[#d4d4d4]">
      {/* Topbar */}
      <div
        className="h-20"
        style={bglinearGradientStyle(
          "bottom",
          "--color-topbar-gradient-start",
          "--color-topbar-gradient-end",
          36,
          80,
        )}
      >
        <p>Top bar</p>
      </div>
      {/* Game view*/}
      <MainView metadata={mapMetadata} />
    </div>
  );
}
