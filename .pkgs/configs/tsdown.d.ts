declare const _default: {
    readonly clean: true;
    readonly deps: {
        readonly alwaysBundle: ["@local/eff"];
        readonly neverBundle: ["eslint", "typescript"];
    };
    readonly dts: true;
    readonly entry: ["src/index.ts"];
    readonly fixedExtension: false;
    readonly format: ["esm"];
    readonly minify: false;
    readonly outDir: "dist";
    readonly platform: "node";
    readonly sourcemap: false;
    readonly target: "node22";
    readonly treeshake: true;
};
export default _default;
