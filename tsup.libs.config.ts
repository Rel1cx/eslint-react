import { defineConfig } from "tsup";

export default defineConfig(() => ({
    clean: true,
    dts: true,
    entry: ["libs/index.ts"],
    format: ["cjs", "esm"],
    minify: false,
    outDir: "libs/dist",
    platform: "node",
    replaceNodeEnv: false,
    shims: false,
    skipNodeModulesBundle: false,
    sourcemap: true,
    splitting: false,
    target: "es2022",
    treeshake: true,
}));
