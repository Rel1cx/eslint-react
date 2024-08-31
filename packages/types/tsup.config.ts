import type { Options } from "tsup";

export default {
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  external: ["eslint", "typescript"],
  format: ["cjs", "esm"],
  minify: false,
  outDir: "dist",
  platform: "node",
  sourcemap: false,
  splitting: false,
  target: "node18",
  treeshake: true,
} satisfies Options;
