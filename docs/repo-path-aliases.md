# Repo Path Aliases

This monorepo uses TypeScript `paths` aliases to avoid deep relative imports.

| Alias | Target    | Purpose                                               |
| ----- | --------- | ----------------------------------------------------- |
| `@/`  | `./src/*` | Current package's source tree.                        |
| `#/`  | `../../*` | Workspace root — test helpers and build scripts only. |

## Usage

```ts
// Inside a package's src/
import { createRule } from "@/utils/create-rule"; // 🟢 Preferred
import { createRule } from "../../utils/create-rule"; // 🔴 Avoid

// Inside a test or script
import { ruleTester } from "#/testing/helpers"; // 🟢 Preferred
import { ruleTester } from "../../../../testing/helpers"; // 🔴 Avoid
```

Test infrastructure lives in the internal `@local/testkit` package (`.pkgs/testkit`); `#/testing/helpers` is a thin re-export shim kept for backward compatibility. New package-level unit tests may import directly from `@local/testkit`:

```ts
// Inside a package's *.test.ts
import { getFirstNodeOfType, parseCode, runInRule } from "@local/testkit"; // 🟢 Preferred
```

## Configuration

Per-plugin `tsconfig.json`:

```json
{
  "extends": ["@local/configs/tsconfig.base.json"],
  "compilerOptions": {
    "paths": {
      "@": ["./src"],
      "@/*": ["./src/*"],
      "#": ["../.."],
      "#/*": ["../../*"]
    }
  },
  "include": ["src"]
}
```

The workspace root `tsconfig.json` only declares `#` / `#/*` for root-level files.

Vitest resolves these aliases via `resolve.tsconfigPaths: true` in `vitest.config.ts`.

## Notes

- Cross-package imports use real package names (e.g. `@eslint-react/ast`), not aliases.
- Aliases are resolved and inlined by the bundler; published packages never expose `@/` or `#/` imports.
