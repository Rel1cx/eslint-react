# Import Paths Convention

This monorepo uses TypeScript `paths` aliases to avoid deep relative imports.

| Alias | Target    | Purpose                                                           |
| ----- | --------- | ----------------------------------------------------------------- |
| `@`   | `./src`   | Current package's source root.                                    |
| `@/*` | `./src/*` | Current package's source sub-module.                              |
| `#`   | `../..`   | Workspace root (test infrastructure and validation scripts only). |
| `#/*` | `../../*` | Workspace root sub-module.                                        |

## `@` — Package Source Root

Use `@/` for imports inside the current package's `src/` directory.

```ts
// 🔴 Avoid
import { createRule } from "../../utils/create-rule";

// 🟢 Preferred
import { createRule } from "@/utils/create-rule";
```

Maps to:

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

Use `#/` for shared test helpers, build scripts, or workspace-wide types.

```ts
// 🔴 Avoid
import { ruleTester } from "../../../../../test";

// 🟢 Preferred
import { ruleTester } from "#/test";
```

Maps to `../..` in packages and `.` at the workspace root.

## Configuration

Plugin `tsconfig.json` files declare both aliases:

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

The workspace root `tsconfig.json` declares only `#` / `#/*` for root-level files.

Vitest resolves them via `resolve.tsconfigPaths: true` in `vitest.config.ts`.

## Examples

```ts
// plugins/eslint-plugin-react-x/src/rules/use-state/use-state.ts
import { createRule } from "@/utils/create-rule";

// plugins/eslint-plugin-react-x/src/rules/use-state/use-state.spec.ts
import { ruleTester } from "#/test";
```

Cross-package imports still use the real package name (e.g. `@eslint-react/ast`). These aliases are resolved and inlined by the bundler; published packages never expose `@/` or `#/` imports.
