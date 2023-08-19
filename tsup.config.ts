import glob from "fast-glob";
import { defineConfig } from "tsup";

export default defineConfig(() => ({
    clean: true,
    dts: false,
    entry: [
        "configs/all.ts",
        "configs/recommended.ts",
        "configs/recommended-requiring-type-checking.ts",
        "index.ts",
        ...glob.sync("rules/**/*.ts", { ignore: ["**/*.test.ts"] }),
    ],
    format: ["cjs", "esm"],
    minify: false,
    noExternal: [],
    outDir: "dist",
    platform: "node",
    replaceNodeEnv: false,
    shims: false,
    skipNodeModulesBundle: true,
    sourcemap: false,
    splitting: false,
    target: "node16",
    treeshake: true,
}));
