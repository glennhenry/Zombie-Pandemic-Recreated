import { BASE_URL } from "./config";

const ASSETS_BASE_URL = `${BASE_URL}/assets`;

type AssetTree = {
  [key: string]: string | AssetTree;
};

function appendPath<T extends AssetTree>(tree: T, currentPath = ""): T {
  return new Proxy(tree, {
    get(target, key) {
      const value = target[key as string];
      const path = currentPath
        ? `${currentPath}/${key.toString()}`
        : key.toString();

      if (typeof value === "object" && value != null) {
        return appendPath(value, path);
      }

      return `${ASSETS_BASE_URL}/${currentPath}/${value}`;
    },
  });
}

const rawAssets = {
  data: {
    maps: {
      blocks: {
        block_000_000: `block_000_000.jpg`,
        block_000_001: `block_000_001.jpg`,
        block_000_002: `block_000_002.jpg`,
        block_000_003: `block_000_003.jpg`,
        block_000_004: `block_000_004.jpg`,
        block_000_005: `block_000_005.jpg`,
        block_001_000: `block_001_000.jpg`,
        block_001_001: `block_001_001.jpg`,
        block_001_002: `block_001_002.jpg`,
        block_001_003: `block_001_003.jpg`,
        block_001_004: `block_001_004.jpg`,
        block_001_005: `block_001_005.jpg`,
        block_002_000: `block_002_000.jpg`,
        block_002_001: `block_002_001.jpg`,
        block_002_002: `block_002_002.jpg`,
        block_002_003: `block_002_003.jpg`,
        block_002_004: `block_002_004.jpg`,
        block_002_005: `block_002_005.jpg`,
        block_003_000: `block_003_000.jpg`,
        block_003_001: `block_003_001.jpg`,
        block_003_002: `block_003_002.jpg`,
        block_003_003: `block_003_003.jpg`,
        block_003_004: `block_003_004.jpg`,
        block_003_005: `block_003_005.jpg`,
        block_004_000: `block_004_000.jpg`,
        block_004_001: `block_004_001.jpg`,
        block_004_002: `block_004_002.jpg`,
        block_004_003: `block_004_003.jpg`,
        block_004_004: `block_004_004.jpg`,
        block_004_005: `block_004_005.jpg`,
        block_005_000: `block_005_000.jpg`,
        block_005_001: `block_005_001.jpg`,
        block_005_002: `block_005_002.jpg`,
        block_005_003: `block_005_003.jpg`,
        block_005_004: `block_005_004.jpg`,
        block_005_005: `block_005_005.jpg`,
      },
    },
  },
  profile: {
    avatar: {
      Tia_Sob: `Tia_Sob.png`,
    },
  },
};

export const ASSETS = appendPath(rawAssets);
export type AssetsType = typeof rawAssets;
