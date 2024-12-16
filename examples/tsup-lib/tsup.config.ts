import type { Options } from "tsup";

export default {
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  minify: true,
  outDir: "dist",
  platform: "neutral",
  shims: false,
  sourcemap: false,
  splitting: false,
  target: "es2021",
  treeshake: true,
} satisfies Options;
