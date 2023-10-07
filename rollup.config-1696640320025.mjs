import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
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
            exportConditions: [
                "import",
                "require",
                "default",
            ],
        }),
        commonjs({
            esmExternals: true,
        }),
        json(),
        // Enable when pattycake is more stable
        // pattycake.rollup({ disableOptionalChaining: false }),
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
};
const configs = [
    "all",
    "off",
    "recommended",
    "recommended-type-checked",
    "debug",
];
var rollup_config = defineConfig([
    {
        ...options,
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.cjs",
                format: "cjs",
            },
            {
                file: "dist/index.js",
                format: "cjs",
            },
            {
                file: "dist/index.mjs",
                format: "esm",
            },
        ],
    },
    ...configs.map((name) => ({
        ...options,
        input: `src/configs/${name}.ts`,
        output: [
            {
                file: `dist/configs/${name}.cjs`,
                format: "cjs",
            },
            {
                file: `dist/configs/${name}.js`,
                format: "cjs",
            },
            {
                file: `dist/configs/${name}.mjs`,
                format: "esm",
            },
        ],
    })),
]);

export { rollup_config as default };
