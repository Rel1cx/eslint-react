import glob from "fast-glob";
import { defineConfig } from "tsup";

export default defineConfig(() => ({
    clean: true,
    dts: false,
    entry: [
        "src/configs/all.ts",
        "src/configs/recommended.ts",
        "src/configs/recommended-type-checked.ts",
        "src/index.ts",
        ...glob.sync("src/rules/**/*.ts", { ignore: ["**/*.spec.ts"] }),
    ],
    format: ["cjs", "esm"],
    minify: false,
    noExternal: ["tiny-invariant"],
    outDir: "dist",
    platform: "node",
    replaceNodeEnv: false,
    shims: false,
    skipNodeModulesBundle: true,
    sourcemap: false,
    // splitting: true,
    // skipNodeModulesBundle: false,
    splitting: false,
    target: "node16",
    treeshake: true,
}));
