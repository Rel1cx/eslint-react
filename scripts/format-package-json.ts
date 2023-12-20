const GLOBS = [
  "{packages,examples}/*/package.json",
  "packages/{plugins,utilities}/*/package.json",
  "website/package.json",
  "package.json",
] as const;

for (const glob of GLOBS) {
  Bun.spawnSync(["bun", "x", "sort-package-json", glob]);
  Bun.spawnSync(["bun", "x", "dprint", "fmt", glob]);
}
