# ESLint React — Agent Guide

This document is a quick-start reference for AI coding agents working on the ESLint React monorepo.

## Project Overview

ESLint React is a set of performant, composable ESLint rules for React and related ecosystems. It is distributed as multiple modular plugins plus a unified "all-in-one" plugin. The project is a **pnpm monorepo** managed with **Nx** for task caching and orchestration.

- **Repository**: https://github.com/Rel1cx/eslint-react
- **License**: MIT
- **Package Manager**: pnpm 11.5.0
- **Node.js Requirement**: >= 22.0.0
- **TypeScript**: 5.9.3
- **ESM only**: all packages use `"type": "module"`

## Monorepo Structure

```
.
├── .pkgs/
│   ├── configs/          # Shared tsconfig, ESLint, typedoc, tsdown, and tsl configs
│   ├── eff/              # Internal utility library (inlined into published packages)
│   └── samples/          # Sample fixtures and shared example configs
├── apps/
│   ├── playground/       # Development playground
│   └── website/          # Documentation website (Next.js + Fumadocs)
├── examples/             # Example projects: next, preact, react-dom, etc.
├── packages/             # Published utility libraries
│   ├── ast/              # @eslint-react/ast — TSESTree AST utilities
│   ├── core/             # @eslint-react/core — React core static analysis
│   ├── eslint/           # @eslint-react/eslint — ESLint types and helpers
│   ├── jsx/              # @eslint-react/jsx — JSX pattern analysis
│   ├── kit/              # @eslint-react/kit — helpers for custom rule authors
│   ├── shared/           # @eslint-react/shared — shared constants and functions
│   └── var/              # @eslint-react/var — variable analysis utilities
├── plugins/              # Published ESLint plugins
│   ├── eslint-plugin/                          # Unified plugin (@eslint-react/eslint-plugin)
│   ├── eslint-plugin-react-x/                  # Core React rules (renderer-agnostic)
│   ├── eslint-plugin-react-dom/                # DOM-specific rules
│   ├── eslint-plugin-react-jsx/                # React flavored JSX rules
│   ├── eslint-plugin-react-rsc/                # React Server Component rules
│   ├── eslint-plugin-react-web-api/            # Web API rules
│   ├── eslint-plugin-react-naming-convention/  # Naming convention rules
│   └── eslint-plugin-react-debug/              # Debug plugin
├── scripts/              # Automation scripts (scaffold-rule, rename-rule, verify-docs, etc.)
└── test/                 # Shared test infrastructure and fixtures
```

## Build and Test Commands

### Full Build

```bash
pnpm install
pnpm run build          # update metadata + build .pkgs + packages + plugins
```

The `postinstall` script runs `pnpm run build` automatically.

### Partial Builds

```bash
pnpm run build:pkgs      # internal .pkgs/* only
pnpm run build:packages  # packages/* only
pnpm run build:plugins   # plugins/* only
pnpm run build:docs      # typedoc docs for packages
pnpm run build:website   # build the docs website
```

### Testing

```bash
pnpm run test            # run all tests with Vitest
```

Run a single rule test:

```bash
pnpm vitest related plugins/eslint-plugin-react-x/src/rules/<rule-name>/<rule-name>.spec.ts
```

Run tests matching a pattern:

```bash
pnpm vitest run -t "<test-name-pattern>"
```

### Lint and Format

```bash
pnpm run lint            # all lint checks (publish, TS, ESLint, examples, text)
pnpm run lint:es         # ESLint
pnpm run lint:ts         # tsl type-checking
pnpm run lint:publish    # publint package validation
pnpm run lint:arch       # architecture gate (sentrux)
pnpm run lint:mdx        # MDX linting
pnpm run lint:website    # website-specific linting
pnpm run format:check    # dprint formatting check
pnpm run format:write    # dprint formatting fix
```

### Verification Scripts

```bash
pnpm run verify:configs  # ensure preset configs are consistent
pnpm run verify:docs     # ensure rule docs match source metadata
```

## Technology Stack

| Layer              | Tool                                                        |
| ------------------ | ----------------------------------------------------------- |
| Package Manager    | pnpm (workspace monorepo)                                   |
| Task Orchestration | Nx (caching, parallel execution, target defaults)           |
| Bundler            | tsdown (Rollup-based, ESM-only, Node 22 target)             |
| Test Runner        | Vitest                                                      |
| Rule Tester        | `@typescript-eslint/rule-tester`                            |
| Type Checker       | `tsl` (TypeScript linter)                                   |
| Formatter          | dprint                                                      |
| Linting            | ESLint + `typescript-eslint` with strict type-checked rules |
| Language Features  | TypeScript 5.9.3, ESM, `"moduleResolution": "bundler"`      |
| Runtime Library    | Effect 3.x (used in scripts and some packages)              |
| Website            | Next.js 16 + Fumadocs                                       |

## Code Style Guidelines

- **Formatter**: [dprint](https://dprint.dev/) with `lineWidth: 120`, 2-space indentation, prefer double quotes.
- **TypeScript**: strict mode enabled with `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `erasableSyntaxOnly`.
- **Imports**: sorted case-sensitively by dprint. Internal packages use `workspace:*`.
- **Path aliases**: each plugin/package may define its own aliases (e.g., `@/utils/create-rule`).
- **Effect Language Service**: the shared `tsconfig.base.json` enables `tsl/plugin`; the website app additionally enables `@effect/language-service` in its own tsconfig.

### TSL Custom Rules

The `tsl` config enforces:

- `nullish` checks (via `@eslint-react/eff` runtime)
- `noDuplicateImports`
- `noDuplicateExports`
- `noMultilineTemplateExpressionWithoutAutoDedent` (requires `dedent` tag for multiline templates)

## Testing Instructions

- **Test location**: co-located with source (`<rule-name>.spec.ts` next to `<rule-name>.ts`).
- **Shared infrastructure** in `test/`:
  - `test/rule-tester.ts` exports `ruleTester` (no types) and `ruleTesterWithTypes` (type-aware).
  - `test/helpers.ts` exports `getFixturesRootDir()`.
  - `test/fixtures/` contains multiple `tsconfig.json` variants for different JSX emit modes.
- **Test code style**: use `ts`, `tsx`, or `dedent` tagged template literals for inline code strings.
- **Rule test pattern**:
  ```ts
  import { ruleTester } from "#/test";
  import rule, { RULE_NAME } from "./my-rule";

  ruleTester.run(RULE_NAME, rule, {
    valid: [ /* ... */ ],
    invalid: [ { code: ..., errors: [{ messageId: "..." }] } ],
  });
  ```

## Developing a Rule

1. Scaffold boilerplate:
   ```bash
   pnpm run scaffold:rule
   ```
   This creates `plugins/<plugin>/src/rules/<rule-name>/` with `.ts`, `.spec.ts`, and `.mdx` files.

2. Implement the rule. Each rule file exports:
   - `RULE_NAME` — kebab-case string
   - `RULE_FEATURES` — metadata flags
   - `MessageID` — union of message identifiers
   - default export via `createRule(...)`

3. Register the rule in the plugin's `src/plugin.ts` and update preset configs if it should be enabled by default.

4. Update the unified plugin (`plugins/eslint-plugin/`) if applicable.

5. Sync metadata:
   ```bash
   pnpm run update:all
   ```

6. Verify before submitting:
   ```bash
   pnpm run build
   pnpm run test
   pnpm run lint
   pnpm run verify:docs
   pnpm run verify:configs
   ```

## Dependency and Build Conventions

- **Published packages** inline `@local/eff` (`inlinedDependencies`), but never inline `eslint` or `typescript`.
- **Peer dependencies**: `eslint: ^10.3.0`, `typescript: *`.
- **Workspace dependencies**: always use `workspace:*` for intra-monorepo references.
- **Nx caching**: build outputs go to `{projectRoot}/dist`. Builds depend on upstream `^build`.

## CI / CD

GitHub Actions workflows:

- **test.yml** — runs on PRs and `main` pushes; tests on Node 22 and 24.
- **check.yml** — runs `pnpm run lint` and `pnpm run verify:docs` on every push and PR.
- **publish.yml** — publishes to npm on merges to `main` (skips tags and docs-only changes).
- **release.yml** — creates a GitHub Release when a tag is pushed.
- **zizmor.yml** — security scanning for workflow files.

All workflows except `zizmor.yml` run on `ubuntu-24.04-arm` with `pnpm install --frozen-lockfile`; `zizmor.yml` runs on `ubuntu-latest` and does not install dependencies.

## Security Considerations

- Report vulnerabilities via **GitHub Private Vulnerability Disclosure**, not public issues or PRs.
- Supported versions: `> 1.0.0`.
- The team aims for coordinated disclosure within 90 days.
- See `SECURITY.md` for full details.

## Useful References

- Contributing guide: `.github/CONTRIBUTING.md`
- Security policy: `SECURITY.md`
- Rule docs and architecture notes: `docs/`
- Scaffolding scripts: `scripts/scaffold-rule.ts`, `scripts/rename-rule.ts`
