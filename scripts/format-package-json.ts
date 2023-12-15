const GLOBS = [
  "{packages,examples}/*/package.json",
  "website/package.json",
  "package.json",
];

for (const glob of GLOBS) {
  Bun.spawnSync(["bun", "x", "sort-package-json", glob]);
  Bun.spawnSync(["bun", "x", "dprint", "fmt", glob]);
}
