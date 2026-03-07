import type { UserConfig } from "tsdown";

export default {
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  fixedExtension: false,
  platform: "neutral",
  target: "node22",
  dts: true,
  deps: {
    alwaysBundle: [
      "@local/eff",
    ],
    neverBundle: [
      "eslint",
      "typescript",
    ],
  },
  treeshake: true,
  minify: false,
  sourcemap: false,
  clean: true,
} satisfies UserConfig;
