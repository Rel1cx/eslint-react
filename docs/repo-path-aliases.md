# Repo Path Aliases

This monorepo uses TypeScript `paths` aliases to avoid deep relative imports.

| Alias | Target             | Purpose                                                                                    |
| ----- | ------------------ | ------------------------------------------------------------------------------------------ |
| `@/`  | `./src/*` or `./*` | Current package's source tree (`plugins/*` tsconfigs → `./src/*`; `apps/website` → `./*`). |
| `#/`  | `./*`              | Workspace root — declared only in the root `tsconfig.json`, used by root-level scripts.    |

## Usage

```ts
// Inside a plugin's src/ (packages/* do not define the `@/` alias)
import { createRule } from "@/utils/create-rule"; // 🟢 Preferred
import { createRule } from "../../utils/create-rule"; // 🔴 Avoid
```

Test infrastructure lives in the internal `@local/testkit` package (`.pkgs/testkit`). Plugin rule tests import it directly — this is the import the scaffold script generates for new rules:

```ts
// Inside a rule's *.spec.ts or a package's *.test.ts
import { getFirstNodeOfType, parseCode, ruleTester, runInRule } from "@local/testkit"; // 🟢 Preferred
```

## Configuration

Per-plugin `tsconfig.json`:

```json
{
  "extends": ["@local/configs/tsconfig.base.json", "@tsconfig/node24/tsconfig.json"],
  "compilerOptions": {
    "paths": {
      "@": ["./src"],
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

(Other compiler options and the `exclude` array are omitted for brevity.)

The workspace root `tsconfig.json` declares `#` / `#/*` pointing at the repo root for root-level files (e.g. `scripts/20-check-rules.ts` imports plugin configs via `#/plugins/...`). Plugin tsconfigs do not declare the `#` alias.

Vitest resolves these aliases via `resolve.tsconfigPaths: true` in `vitest.config.ts`.

## Notes

- Cross-package imports use real package names (e.g. `@eslint-react/ast`, `@local/testkit`), not aliases.
- Aliases are resolved and inlined by the bundler; published packages never expose `@/` imports.
