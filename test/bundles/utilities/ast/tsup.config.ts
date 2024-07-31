import { defineConfig } from "tsup";

export default defineConfig(() => ({
  clean: true,
  dts: true,
  entry: ["index.ts"],
  format: ["cjs", "esm"],
  minify: true,
  outDir: "dist",
  platform: "node",
  shims: false,
  sourcemap: false,
  splitting: false,
  target: "node18",
  treeshake: true,
}));
