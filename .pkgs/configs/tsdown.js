export default {
    clean: true,
    deps: {
        alwaysBundle: [
            "@local/eff",
        ],
        neverBundle: [
            "eslint",
            "typescript",
        ],
    },
    dts: true,
    entry: ["src/index.ts"],
    fixedExtension: false,
    format: ["esm"],
    minify: false,
    outDir: "dist",
    platform: "node",
    sourcemap: false,
    target: "node22",
    treeshake: true,
};
