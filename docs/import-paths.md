# Import Paths Convention

This monorepo uses TypeScript `paths` to provide clean, stable import aliases. Instead of relying on brittle relative paths like `../../utils/create-rule`, use the aliases defined in each package's `tsconfig.json`.

## Table of Contents

- [Overview](#overview)
- [`@` — Package Source Root](#-package-source-root)
- [`#` — Workspace Root](#-workspace-root)
- [Configuration](#configuration)
- [Examples](#examples)
- [FAQ](#faq)

## Overview

| Alias | Target    | Purpose                                                                |
| ----- | --------- | ---------------------------------------------------------------------- |
| `@`   | `./src`   | Import from the current package's source directory.                    |
| `@/*` | `./src/*` | Import a sub-module from the current package's source directory.       |
| `#`   | `../..`   | Import from the workspace root (shared utilities, test helpers, etc.). |
| `#/*` | `../../*` | Import a sub-module from the workspace root.                           |

## `@` — Package Source Root

Use `@` whenever you need to reference a module inside the **current package's `src/` directory**.

This eliminates the need to count `../` segments and makes refactorings (moving files between directories) much safer.

```ts
// ❌ Avoid — breaks when the file is moved
import { createRule } from "../../utils/create-rule";

// ✅ Preferred — stable regardless of file depth
import { createRule } from "@/utils/create-rule";
```

### Where it resolves

In every package under `packages/*` and `plugins/*`, `@` is mapped to that package's own `src/` folder:

```json
{
  "compilerOptions": {
    "paths": {
      "@": ["./src"],
      "@/*": ["./src/*"]
    }
  }
}
```

## `#` — Workspace Root

Use `#` when you need to reference a module at the **monorepo root** (e.g. shared test helpers in `test/`, build scripts, or workspace-wide types).

```ts
// ❌ Avoid — fragile and hard to read
import { ruleTester } from "../../../../../test";

// ✅ Preferred — always points to the workspace root
import { ruleTester } from "#/test";
```

### Where it resolves

In each package, `#` is mapped two levels up (`../..`) to reach the workspace root:

```json
{
  "compilerOptions": {
    "paths": {
      "#": ["../.."],
      "#/*": ["../../*"]
    }
  }
}
```

The workspace root `tsconfig.json` also defines `#` for root-level files:

```json
{
  "compilerOptions": {
    "paths": {
      "#": ["."],
      "#/*": ["./*"]
    }
  }
}
```

## Configuration

### Per-package `tsconfig.json`

Every plugin and package must declare both aliases in its local `tsconfig.json`:

```json
{
  "extends": ["@local/configs/tsconfig.base.json"],
  "compilerOptions": {
    "paths": {
      "@": ["./src"],
      "#": ["../.."],
      "@/*": ["./src/*"],
      "#/*": ["../../*"]
    }
  },
  "include": ["src"]
}
```

### Vitest support

Vitest is configured to resolve these aliases via `resolve.tsconfigPaths: true` in `vitest.config.ts`, so tests run with the same mappings as the TypeScript compiler.

## Examples

### Inside a plugin rule implementation

```ts
// plugins/eslint-plugin-react-x/src/rules/no-missing-key/no-missing-key.ts
import { createRule } from "@/utils/create-rule";
import { getSettings } from "@/utils/get-settings";
```

### Inside a plugin test file

```ts
// plugins/eslint-plugin-react-x/src/rules/no-missing-key/no-missing-key.spec.ts
import { ruleTester } from "#/test";
import { createRule } from "@/utils/create-rule";
```

### Inside a package source file

```ts
// packages/ast/src/compare.ts
import { isTypeExpression } from "@/check";
```

## FAQ

### Why not use `~` or `#` for package-local imports?

We follow the convention where `@` represents the **current package scope** (similar to many Vite / Next.js setups) and `#` represents the **workspace scope**. This keeps the mental model simple:

- `@/*` = "inside this package"
- `#/*` = "inside the whole repo"

### What about `packages/` that import each other?

Cross-package imports should still use the real package name (e.g. `@eslint-react/ast`, `@eslint-react/core`). `paths` aliases are only for intra-package and intra-workspace references that would otherwise require deep relative paths.

### Can I use these aliases in build outputs?

No — these aliases are for **source code only**. The bundler (`tsdown`) is configured to resolve and inline them during the build. Consumers of the published packages never see `@/` or `#/` imports.
