import type { Options } from "tsup";

export default {
  clean: false,
  dts: true,
  entry: [
    "eslint.ts",
    // ...
  ],
  external: ["eslint", "typescript"],
  format: ["esm"],
  minify: false,
  outDir: ".",
  platform: "neutral",
  sourcemap: false,
  splitting: false,
  target: "node18",
  treeshake: true,
} satisfies Options;
