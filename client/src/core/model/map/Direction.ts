export type Direction = "nw" | "n" | "ne" | "w" | "c" | "e" | "sw" | "s" | "se";
export const directionChange = {
  nw: { dx: -1, dy: -1 },
  n: { dx: 0, dy: -1 },
  ne: { dx: 1, dy: -1 },
  w: { dx: -1, dy: 0 },
  c: { dx: 0, dy: 0 },
  e: { dx: 1, dy: 0 },
  sw: { dx: -1, dy: 1 },
  s: { dx: 0, dy: 1 },
  se: { dx: 1, dy: 1 },
};
