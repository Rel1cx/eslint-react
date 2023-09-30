import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig, type RollupOptions } from "rollup";
// import { dts } from "rollup-plugin-dts";
import { swc } from "rollup-plugin-swc3";

const options = {
    external: [
        "eslint",
        "@typescript-eslint/parser",
        "@typescript-eslint/scope-manager",
        "@typescript-eslint/type-utils",
        "@typescript-eslint/types",
        "@typescript-eslint/utils",
    ],
    plugins: [
        nodeResolve({
            exportConditions: ["import", "require", "default"],
        }),
        commonjs({
            esmExternals: true,
        }),
        json(),
        swc({
            jsc: {
                minify: {
                    compress: false,
                    mangle: false,
                    module: false,
                },
                target: "es2021",
            },
            minify: false,
        }),
    ],
} satisfies RollupOptions;

const configs = ["all", "recommended", "recommended-type-checked", "debug"] as const;

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
    ...configs.map(name => ({
        ...options,
        input: `src/configs/${name}.ts`,
        output: [
            { file: `dist/configs/${name}.cjs`, format: "cjs" },
            { file: `dist/configs/${name}.js`, format: "cjs" },
            { file: `dist/configs/${name}.mjs`, format: "esm" },
        ],
    } satisfies RollupOptions)),
    // {
    //     ...options,
    //     input: "src/index.ts",
    //     output: {
    //         file: "dist/index.d.ts",
    //     },
    //     plugins: [
    //         dts(),
    //     ],
    // },
]);
