export function buildConfig(cwd) {
    return {
        clean: true,
        cwd,
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
        minify: "dce-only",
        outDir: "dist",
        outputOptions: {
            comments: {
                annotation: true,
                jsdoc: false,
                legal: true,
            },
        },
        platform: "node",
        sourcemap: false,
        target: "node22",
        treeshake: true,
    };
}
