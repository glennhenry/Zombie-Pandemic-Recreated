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
      main_city: {
        blocks: {
          'main_city-000_000': `main_city-000_000.jpg`,
          'main_city-000_001': `main_city-000_001.jpg`,
          'main_city-000_002': `main_city-000_002.jpg`,
          'main_city-000_003': `main_city-000_003.jpg`,
          'main_city-000_004': `main_city-000_004.jpg`,
          'main_city-000_005': `main_city-000_005.jpg`,
          'main_city-001_000': `main_city-001_000.jpg`,
          'main_city-001_001': `main_city-001_001.jpg`,
          'main_city-001_002': `main_city-001_002.jpg`,
          'main_city-001_003': `main_city-001_003.jpg`,
          'main_city-001_004': `main_city-001_004.jpg`,
          'main_city-001_005': `main_city-001_005.jpg`,
          'main_city-002_000': `main_city-002_000.jpg`,
          'main_city-002_001': `main_city-002_001.jpg`,
          'main_city-002_002': `main_city-002_002.jpg`,
          'main_city-002_003': `main_city-002_003.jpg`,
          'main_city-002_004': `main_city-002_004.jpg`,
          'main_city-002_005': `main_city-002_005.jpg`,
          'main_city-003_000': `main_city-003_000.jpg`,
          'main_city-003_001': `main_city-003_001.jpg`,
          'main_city-003_002': `main_city-003_002.jpg`,
          'main_city-003_003': `main_city-003_003.jpg`,
          'main_city-003_004': `main_city-003_004.jpg`,
          'main_city-003_005': `main_city-003_005.jpg`,
          'main_city-004_000': `main_city-004_000.jpg`,
          'main_city-004_001': `main_city-004_001.jpg`,
          'main_city-004_002': `main_city-004_002.jpg`,
          'main_city-004_003': `main_city-004_003.jpg`,
          'main_city-004_004': `main_city-004_004.jpg`,
          'main_city-004_005': `main_city-004_005.jpg`,
          'main_city-005_000': `main_city-005_000.jpg`,
          'main_city-005_001': `main_city-005_001.jpg`,
          'main_city-005_002': `main_city-005_002.jpg`,
          'main_city-005_003': `main_city-005_003.jpg`,
          'main_city-005_004': `main_city-005_004.jpg`,
          'main_city-005_005': `main_city-005_005.jpg`,
        },
        main_city: `main_city.json`,
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
