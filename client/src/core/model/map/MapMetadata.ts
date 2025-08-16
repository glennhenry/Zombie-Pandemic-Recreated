import type { Position } from "./Position";

export interface MapMetadata {
  mapId: string;
  name: string;
  width: number;
  height: number;
  startPos: Position;
}
