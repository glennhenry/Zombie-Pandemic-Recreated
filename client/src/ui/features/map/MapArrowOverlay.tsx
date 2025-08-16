import { CiLocationArrow1 } from "react-icons/ci";
import type { Direction } from "../../../core/types/Direction";

const order: Direction[] = ["nw", "n", "ne", "w", "c", "e", "sw", "s", "se"];

export const MapArrowOverlay = ({ onMove }: { onMove: (d: Direction) => void }) => {
  return (
    <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 place-items-center">
      {order.map((d, i) =>
        d === "c" ? (
          <div key={i} className="h-full w-full" />
        ) : (
          <button
            key={i}
            onClick={() => onMove(d)}
            className="pointer-events-auto rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            aria-label={`move ${d}`}
          >
            {<CiLocationArrow1 />}
          </button>
        ),
      )}
    </div>
  );
};
