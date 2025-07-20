import type { Account } from "../../core/types/Account";
import { bglinearGradientStyle } from "../../utils/ui/linearGradient";
import MainView from "./map/MainView";

interface GameProps {
  account?: Account | null;
}

export default function Game(_props: GameProps) {
  return (
    // Game container
    <div className="mx-auto h-[800px] w-full max-w-[1200px] min-w-[800px] border-1 border-gray-500 bg-[#d4d4d4]">
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
      <MainView />
    </div>
  );
}
