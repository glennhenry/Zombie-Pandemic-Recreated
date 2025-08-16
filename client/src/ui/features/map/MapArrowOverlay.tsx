import { CiLocationArrow1 } from "react-icons/ci";
import type { Direction } from "../../../core/types/Direction";

const order: Direction[] = ["nw", "n", "ne", "w", "c", "e", "sw", "s", "se"];

const pos: Record<Direction, React.CSSProperties> = {
  nw: { top: 0, left: 0 },
  n: { top: 0, left: "50%", transform: "translateX(-50%)" },
  ne: { top: 0, right: 0 },
  w: { top: "50%", left: 0, transform: "translateY(-50%)" },
  c: {},
  e: { top: "50%", right: 0, transform: "translateY(-50%)" },
  sw: { bottom: 0, left: 0 },
  s: { bottom: 0, left: "50%", transform: "translateX(-50%)" },
  se: { bottom: 0, right: 0 },
};

const rotDeg: Record<Direction, number> = {
  ne: 0,
  e: 45,
  se: 90,
  s: 135,
  sw: 180,
  w: 225,
  nw: 270,
  n: -45,
  c: 0,
};

export const MapArrowOverlay = ({
  onMove,
}: {
  onMove: (d: Direction) => void;
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 place-items-center">
      {order.map((d, i) =>
        d === "c" ? (
          <div key={i} className="h-full w-full" />
        ) : (
          <button
            key={i}
            onClick={() => onMove(d)}
            className="pointer-events-auto cursor-pointer rounded-sm bg-black/40 p-1 text-white hover:bg-black/30"
            style={{ position: "absolute", ...pos[d] }}
            aria-label={`move ${d}`}
          >
            <CiLocationArrow1
              size={25}
              style={{ transform: `rotate(${rotDeg[d]}deg)` }}
            />
          </button>
        ),
      )}
    </div>
  );
};
