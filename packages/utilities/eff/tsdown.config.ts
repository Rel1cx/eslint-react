import type { UserConfig } from "tsdown";

export default {
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  fixedExtension: false,
  platform: "neutral",
  target: "node20",
  dts: true,
  deps: { neverBundle: ["eslint", "typescript"] },
  treeshake: true,
  minify: false,
  sourcemap: false,
  clean: true,
} satisfies UserConfig;
