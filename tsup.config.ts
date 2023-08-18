import { defineConfig } from "tsup";

export default defineConfig(() => ({
    clean: true,
    dts: false,
    entry: ["configs/all.ts", "configs/recommended.ts", "configs/recommended-requiring-type-checking.ts", "index.ts"],
    format: ["cjs", "esm"],
    minify: false,
    noExternal: ["rambda"],
    outDir: "dist",
    platform: "node",
    replaceNodeEnv: false,
    shims: false,
    skipNodeModulesBundle: true,
    sourcemap: false,
    splitting: false,
    target: "node18",
    treeshake: true,
}));
