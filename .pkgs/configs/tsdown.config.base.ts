import type { UserConfig } from "tsdown";

export function buildConfig(cwd: string) {
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
    minify: false,
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
  } as const satisfies UserConfig;
}
