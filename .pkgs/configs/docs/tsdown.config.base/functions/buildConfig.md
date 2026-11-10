[@local/configs](../../README.md) / [tsdown.config.base](../README.md) / buildConfig

# Function: buildConfig()

```ts
function buildConfig(cwd: string): {
  clean: true;
  cwd: string;
  deps: {
    alwaysBundle: ["@local/eff"];
    neverBundle: ["eslint", "typescript"];
  };
  dts: true;
  entry: ["src/index.ts"];
  fixedExtension: false;
  format: ["esm"];
  minify: "dce-only";
  outDir: "dist";
  outputOptions: {
    comments: {
      annotation: true;
      jsdoc: false;
      legal: true;
    };
  };
  platform: "node";
  sourcemap: false;
  target: "node20";
  treeshake: true;
};
```

## Parameters

| Parameter | Type     |
| --------- | -------- |
| `cwd`     | `string` |

## Returns

```ts
{
  clean: true;
  cwd: string;
  deps: {
    alwaysBundle: ["@local/eff"];
    neverBundle: ["eslint", "typescript"];
  }
  dts: true;
  entry: ["src/index.ts"];
  fixedExtension: false;
  format: ["esm"];
  minify: "dce-only";
  outDir: "dist";
  outputOptions: {
    comments: {
      annotation: true;
      jsdoc: false;
      legal: true;
    }
  }
  platform: "node";
  sourcemap: false;
  target: "node20";
  treeshake: true;
}
```

| Name                                | Type                                                                                     | Default value |
| ----------------------------------- | ---------------------------------------------------------------------------------------- | ------------- |
| `clean`                             | `true`                                                                                   | `true`        |
| `cwd`                               | `string`                                                                                 | -             |
| `deps`                              | \{ `alwaysBundle`: \[`"@local/eff"`\]; `neverBundle`: \[`"eslint"`, `"typescript"`\]; \} | -             |
| `deps.alwaysBundle`                 | \[`"@local/eff"`\]                                                                       | -             |
| `deps.neverBundle`                  | \[`"eslint"`, `"typescript"`\]                                                           | -             |
| `dts`                               | `true`                                                                                   | `true`        |
| `entry`                             | \[`"src/index.ts"`\]                                                                     | -             |
| `fixedExtension`                    | `false`                                                                                  | `false`       |
| `format`                            | \[`"esm"`\]                                                                              | -             |
| `minify`                            | `"dce-only"`                                                                             | `"dce-only"`  |
| `outDir`                            | `"dist"`                                                                                 | `"dist"`      |
| `outputOptions`                     | \{ `comments`: \{ `annotation`: `true`; `jsdoc`: `false`; `legal`: `true`; \}; \}        | -             |
| `outputOptions.comments`            | \{ `annotation`: `true`; `jsdoc`: `false`; `legal`: `true`; \}                           | -             |
| `outputOptions.comments.annotation` | `true`                                                                                   | `true`        |
| `outputOptions.comments.jsdoc`      | `false`                                                                                  | `false`       |
| `outputOptions.comments.legal`      | `true`                                                                                   | `true`        |
| `platform`                          | `"node"`                                                                                 | `"node"`      |
| `sourcemap`                         | `false`                                                                                  | `false`       |
| `target`                            | `"node20"`                                                                               | `"node20"`    |
| `treeshake`                         | `true`                                                                                   | `true`        |
