const fs = require("fs");
const path = require("path");

const ASSETS_DIR = path.join(
  __dirname,
  "server",
  "src",
  "main",
  "resources",
  "game-assets"
);

function generateObjectFromDir(dirPath) {
  const result = {};

  for (const item of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      result[item] = generateObjectFromDir(fullPath);
    } else {
      const nameWithoutExt = path.parse(item).name;
      result[nameWithoutExt] = item;
    }
  }

  return result;
}

function formatObject(obj, indent = 2) {
  const indentStr = " ".repeat(indent);
  const entries = Object.entries(obj).map(([key, value]) => {
    const formattedKey = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(key)
      ? key
      : `'${key}'`;

    if (typeof value === "object") {
      return `${indentStr}${formattedKey}: ${formatObject(value, indent + 2)}`;
    } else {
      return `${indentStr}${formattedKey}: \`${value}\``;
    }
  });

  return `{\n${entries.join(",\n")},\n${" ".repeat(indent - 2)}}`;
}

const rawAssets = generateObjectFromDir(ASSETS_DIR);

const output = `const rawAssets = ${formatObject(rawAssets)};`;

fs.writeFileSync(path.join(__dirname, "rawAssets.ts"), output, "utf8");
console.log("rawAssets.ts generated at root directory.");
