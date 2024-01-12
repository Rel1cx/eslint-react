import { nodeResolve } from "@rollup/plugin-node-resolve";
import { createRequire } from "module";
import { defineConfig } from "rollup";
import { dts } from "rollup-plugin-dts";
import { swc } from "rollup-plugin-swc3";
import { visualizer } from "rollup-plugin-visualizer";
const require = createRequire(import.meta.url);
const packageJson = require("./package.json");
const { dependencies = {}, peerDependencies = {} } = packageJson;
const external = Object.keys({ ...dependencies, ...peerDependencies });

export default defineConfig([{
  external,
  input: "src/index.ts",
  output: [
    { file: "dist/index.cjs", format: "cjs" },
    { file: "dist/index.js", format: "cjs" },
    { file: "dist/index.mjs", format: "esm" },
  ],
  plugins: [
    nodeResolve(),
    swc({
      jsc: {
        minify: {
          compress: false,
          mangle: false,
          module: true,
        },
        target: "es2021",
      },
      minify: false,
    }),
    visualizer(),
  ],
}, {
  external,
  input: "src/index.ts",
  output: {
    file: "dist/index.d.ts",
  },
  plugins: [
    dts(),
  ],
}]);
