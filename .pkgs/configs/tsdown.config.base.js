export function buildConfig(cwd) {
    return {
        cwd,
        entry: ["src/index.ts"],
        deps: {
            alwaysBundle: [
                "@local/eff",
            ],
            neverBundle: [
                "eslint",
                "typescript",
            ],
        },
        clean: true,
        outDir: "dist",
        fixedExtension: false,
        format: ["esm"],
        platform: "node",
        target: "node20",
        dts: true,
        minify: "dce-only",
        outputOptions: {
            comments: {
                annotation: true,
                jsdoc: false,
                legal: true,
            },
        },
        sourcemap: false,
        treeshake: true,
    };
}
