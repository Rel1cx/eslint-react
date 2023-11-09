import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { createRequire } from "module";
// import pattycake from "pattycake";
import { defineConfig, type RollupOptions } from "rollup";
import { dts } from "rollup-plugin-dts";
import { swc } from "rollup-plugin-swc3";
const require = createRequire(import.meta.url);
const packageJson = require("./package.json");
const external = Object.keys(packageJson.dependencies);

const plugins = [
  nodeResolve({
    exportConditions: ["import", "require", "default"],
  }),
  commonjs({
    esmExternals: true,
  }),
  json(),
] as const;

const options = {
  external: [
    "eslint",
    ...external,
  ],
  plugins: [
    ...plugins,
    // Enable when pattycake is more stable
    // pattycake.rollup({ disableOptionalChaining: false }),
    swc({
      jsc: {
        minify: {
          compress: true,
          mangle: false,
          module: true,
        },
        target: "es2021",
      },
      minify: true,
    }),
  ],
} satisfies RollupOptions;

export default defineConfig([
  {
    ...options,
    input: "src/index.ts",
    output: [
      { file: "dist/index.cjs", format: "cjs" },
      { file: "dist/index.js", format: "cjs" },
      { file: "dist/index.mjs", format: "esm" },
    ],
  },
  {
    ...options,
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
    },
    plugins: [
      ...plugins,
      dts(),
    ],
  },
]);
