import { BASE_URL } from "./config";

const ASSETS_BASE_URL = `${BASE_URL}/assets`;

const rawAssets = {
  profile: {
    avatar: `Tia_Sob.png`,
  },
};

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

      return `${ASSETS_BASE_URL}/${path}/${value}`;
    },
  });
}

export const ASSETS = appendPath(rawAssets);
export type AssetsType = typeof rawAssets;
