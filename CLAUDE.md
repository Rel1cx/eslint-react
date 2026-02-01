# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ESLint React is a monorepo containing composable, high-performance ESLint plugins for React and related frameworks. The project provides both a unified plugin (`@eslint-react/eslint-plugin`) and modular plugins for specific concerns (react-x, react-dom, react-web-api, react-hooks-extra, react-naming-convention).

## Development Commands

### Building

```bash
# Build all packages (includes update scripts, pkgs, packages, and docs)
pnpm run build

# Build internal packages used in the monorepo (.pkgs)
pnpm run build:pkgs

# Build publishable packages only
pnpm run build:packages

# Build TypeDoc documentation for all packages
pnpm run build:docs

# Build the website
pnpm run build:website
```

### Testing

```bash
# Run all tests
pnpm test

# Run a single test file
pnpm vitest packages/plugins/eslint-plugin-react-x/src/rules/[rule-name].spec.ts

# Run tests with heap usage logging
pnpm test --logHeapUsage
```

### Linting and Formatting

```bash
# Format code with dprint
pnpm run format:write

# Check formatting
pnpm run format:check

# Run all linting checks (deps, publish, ts, es, examples)
pnpm run lint

# Run ESLint
pnpm run lint:es

# Run TypeScript type checking
pnpm run lint:ts

# Check for circular dependencies
pnpm run lint:deps

# Verify package.json for publishing
pnpm run lint:publish
```

### Maintenance Scripts

```bash
# Update version across all packages
pnpm run update:version

# Update README files
pnpm run update:readme

# Update website documentation from package sources
pnpm run update:website

# Verify rule metadata consistency
pnpm run verify:rules-metas

# Sort package.json files
pnpm run sort:package-json
```

## Architecture

### Monorepo Structure

The repository is organized as a pnpm workspace with the following structure:

- **`.pkgs/`** - Internal packages used within the monorepo (configs, function-rules)
- **`packages/`** - Publishable packages organized by type:
  - **`packages/utilities/`** - Low-level utilities (ast, eff, var)
  - **`packages/shared/`** - Shared constants, types, and utilities
  - **`packages/core/`** - Core React analysis utilities (component, hook, jsx detection)
  - **`packages/plugins/`** - ESLint plugin packages
- **`test/`** - Shared test utilities and fixtures
- **`scripts/`** - Maintenance and build scripts
- **`apps/`** - Applications (website)
- **`examples/`** - Example projects

### Package Dependencies

The dependency hierarchy flows bottom-up:

1. **`@eslint-react/eff`** - Base JavaScript/TypeScript utilities (no dependencies)
2. **`@eslint-react/ast`** - TSESTree AST utilities (depends on: eff)
3. **`@eslint-react/var`** - Variable and scope analysis (depends on: eff)
4. **`@eslint-react/shared`** - Shared constants, settings, types (depends on: eff)
5. **`@eslint-react/core`** - React-specific analysis (depends on: ast, eff, shared, var)
6. **Plugin packages** - ESLint rules (depend on: core and lower-level packages)
7. **`@eslint-react/eslint-plugin`** - Unified plugin (aggregates all individual plugins)

### Core Package Organization

The `@eslint-react/core` package provides React-specific analysis utilities organized by domain:

- **`api/`** - React API detection and analysis
- **`component/`** - Component detection, collection, and analysis
  - Component collectors for both modern and legacy patterns
  - Component definition detection
  - Component naming and identification
  - Semantic node representations
- **`function/`** - Function analysis utilities
- **`hierarchy/`** - Component hierarchy analysis
- **`hook/`** - React Hook detection and analysis
  - Hook identification and naming
  - Hook collectors for tracking hook usage
  - Semantic node representations for hooks
- **`jsx/`** - JSX element and attribute analysis
  - JSX detection and configuration
  - Attribute value extraction
  - Element type analysis
- **`ref/`** - React ref analysis
- **`semantic/`** - Semantic node type definitions

### Plugin Structure

Each plugin package follows a consistent structure:

- **`src/rules/`** - Rule implementations (`.ts`) with co-located tests (`.spec.ts`) and documentation (`.mdx`)
- **`src/configs/`** - Preset configurations
- **`src/utils/`** - Plugin-specific utilities (e.g., `create-rule.ts`)
- **`src/plugin.ts`** - Plugin definition with rule exports
- **`src/index.ts`** - Entry point with flat config adapters

### Rule Implementation Pattern

Rules follow a consistent pattern:

1. Import utilities from `@eslint-react/core`, `@eslint-react/ast`, `@eslint-react/shared`, etc.
2. Define rule metadata: `RULE_NAME`, `RULE_FEATURES`, `MessageID` type
3. Use `createRule` from `../utils` to create the rule with TypeScript types
4. Implement rule logic using collectors (e.g., `useComponentCollector`, `useHookCollector`)
5. Export the rule as default

Example structure:

```typescript
import * as core from "@eslint-react/core";
import { createRule } from "../utils";

export const RULE_NAME = "rule-name";
export const RULE_FEATURES = [] as const satisfies RuleFeature[];
export type MessageID = "messageId";

export default createRule<[], MessageID>({
  meta: {/* ... */},
  create(context) {
    // Rule implementation
  },
});
```

### Testing

- Tests use Vitest with `@typescript-eslint/rule-tester`
- Test files are co-located with source files: `rule-name.spec.ts` next to `rule-name.ts`
- Shared test utilities in `test/` directory:
  - `test/rule-tester.ts` - Configured rule testers (with/without type checking)
  - `test/fixtures/` - TypeScript configuration fixtures for different JSX modes
  - `test/helpers.ts` - Test helper functions
- Use `dedent` (imported as `tsx`) for formatting test code
- Two rule testers available:
  - `ruleTester` - For rules without type information
  - `ruleTesterWithTypes` - For rules requiring TypeScript type information

### Build System

- Uses `tsdown` for building packages (configured via `tsdown.config.ts`)
- Uses `dprint` for code formatting (configured via `dprint.json`)
- TypeScript configuration extends from `@local/configs/tsconfig.base.json`
- All packages target Node.js 20+ and ESM format

### Settings and Configuration

ESLint React supports custom settings via `settings["react-x"]`:

- `importSource` - Custom React import source (default: "react")
- `polymorphicPropName` - Prop name for polymorphic components (e.g., "as")
- `version` - React version (default: "detect")
- `additionalStateHooks` - Regex pattern for custom state hooks

Access settings in rules using `coerceSettings(context.settings)` from `@eslint-react/shared`.

## Development Workflow

### Adding a New Rule

1. Create the rule file in the appropriate plugin's `src/rules/` directory
2. Implement the rule following the pattern above
3. Create the test file (`.spec.ts`) with valid and invalid test cases
4. Create documentation file (`.mdx`) describing the rule
5. Export the rule in `src/plugin.ts`
6. Add the rule to appropriate preset configs in `src/configs/`
7. If adding to a modular plugin, update the unified plugin (`packages/plugins/eslint-plugin/`)
8. Run `pnpm run update:website` to sync documentation
9. Run `pnpm run verify:rules-metas` to verify metadata consistency
10. Run tests and build to ensure everything works

### Modifying Core Utilities

When modifying packages in `packages/core/` or `packages/utilities/`:

1. Make changes to the source files
2. Run `pnpm run build:pkgs` if changes affect internal packages
3. Run `pnpm run build:packages` to rebuild dependent packages
4. Run tests to ensure no regressions
5. Update TypeDoc comments if changing public APIs

### Working with the Website

The website is built from rule documentation (`.mdx` files) in plugin packages:

1. Edit `.mdx` files in `packages/plugins/*/src/rules/`
2. Run `pnpm run update:website` to sync changes to the website
3. Run `pnpm run build:website` to build the website
4. Website source is in `apps/website/`

## Important Notes

- **Never use `git add -A` or `git add .`** - Always stage specific files to avoid committing sensitive data
- **Test files are co-located with source files** - Keep `rule-name.spec.ts` next to `rule-name.ts`
- **Use workspace dependencies** - Reference internal packages with `workspace:*` in package.json
- **Follow the existing patterns** - Look at similar rules for guidance on implementation
- **Type safety is critical** - All packages use strict TypeScript settings
- **Performance matters** - This project emphasizes performance; avoid unnecessary AST traversals
- **Use collectors for stateful analysis** - Use `useComponentCollector`, `useHookCollector` from `@eslint-react/core` for tracking components and hooks across the AST
