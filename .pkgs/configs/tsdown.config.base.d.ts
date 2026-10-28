export declare function buildConfig(cwd: string): {
    readonly cwd: string;
    readonly entry: ["src/index.ts"];
    readonly deps: {
        readonly alwaysBundle: ["@local/eff"];
        readonly neverBundle: ["eslint", "typescript"];
    };
    readonly clean: true;
    readonly outDir: "dist";
    readonly fixedExtension: false;
    readonly format: ["esm"];
    readonly platform: "node";
    readonly target: "node20";
    readonly dts: true;
    readonly minify: "dce-only";
    readonly outputOptions: {
        readonly comments: {
            readonly annotation: true;
            readonly jsdoc: false;
            readonly legal: true;
        };
    };
    readonly sourcemap: false;
    readonly treeshake: true;
};
