import type { UserConfig } from "tsdown";

export function buildConfig(cwd: string) {
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
  } as const satisfies UserConfig;
}
