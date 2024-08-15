import type { Options } from "tsup";

export default {
  clean: true,
  dts: true,
  entry: ["index.ts"],
  external: ["eslint", "typescript"],
  format: ["cjs", "esm"],
  minify: false,
  outDir: "dist",
  platform: "node",
  shims: false,
  sourcemap: false,
  splitting: false,
  target: "node18",
  treeshake: true,
} satisfies Options;
