import { BASE_URL } from "./config";

const ASSETS_BASE_URL = `${BASE_URL}/assets`;

export class ResourceManager {
  static assetBase = ASSETS_BASE_URL;

  static getAssetsFromFullURL(url: string) {
    return `${this.assetBase}/${url}`;
  }

  static getBlock(mapId: string, x: number, y: number) {
    const xStr = x.toString().padStart(3, "0");
    const yStr = y.toString().padStart(3, "0");
    return `${this.assetBase}/data/maps/${mapId}/blocks/${mapId}-${xStr}_${yStr}.jpg`;
  }

  static getBlockSafe(
    mapId: string,
    width: number,
    height: number,
    x: number,
    y: number,
  ) {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      // out of bounds
      return `${this.assetBase}/data/maps/bounds.png`;
    }
    return this.getBlock(mapId, x, y);
  }

  static getMapJson(mapId: string) {
    return `${this.assetBase}/data/maps/${mapId}/${mapId}.json`;
  }
}
