import glob from "fast-glob";
import { defineConfig } from "tsup";

export default defineConfig(() => ({
    clean: true,
    dts: false,
    entry: [
        "src/configs/all.ts",
        "src/configs/debug.ts",
        "src/configs/recommended.ts",
        "src/configs/recommended-type-checked.ts",
        "src/index.ts",
        ...glob.sync("src/rules/**/*.ts", { ignore: ["**/*.spec.ts"] }),
    ],
    format: ["cjs", "esm"],
    minify: false,
    noExternal: [
        "@effect/data",
        "@effect/typeclass",
        "ts-pattern",
        "fast-equals",
        "micro-memoize",
        "@rizzzse/bimap",
        "birecord",
        "pathe",
        "tiny-invariant",
    ],
    outDir: "dist",
    platform: "neutral",
    replaceNodeEnv: false,
    shims: false,
    skipNodeModulesBundle: true,
    sourcemap: false,
    // skipNodeModulesBundle: false,
    // splitting: false,
    splitting: true,
    target: "es2022",
    treeshake: true,
}));
