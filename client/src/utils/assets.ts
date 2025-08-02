import { BASE_URL } from "./config";

const ASSETS_BASE_URL = `${BASE_URL}/assets`;

class ResourceManager {
  static assetBase = ASSETS_BASE_URL

  static getBlock(mapname: string, x: number, y: number) {
    const xStr = x.toString().padStart(3, "0");
    const yStr = y.toString().padStart(3, "0");
    return `${this.assetBase}/data/maps/${mapname}/blocks/${mapname}-${xStr}_${yStr}.jpg`;
  }

  static getMapJson(map: string) {
    return `${this.assetBase}/data/maps/${map}/${map}.json`;
  }
}
