import type { InlineConfig } from "tsdown";

export default {
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  external: ["eslint", "typescript"],
  format: ["esm"],
  minify: false,
  outDir: "dist",
  platform: "neutral",
  sourcemap: false,
  target: "node20",
  treeshake: true,
  fixedExtension: false,
} satisfies InlineConfig;
