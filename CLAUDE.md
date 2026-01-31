# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ESLint React is a high-performance ESLint plugin for React (4-7x faster than alternatives). It provides composable ESLint rules for React and related libraries. It's a monorepo with multiple specialized ESLint plugins that can be used individually or as a unified plugin.

## Build System

- **Package Manager**: pnpm (v10.28.2)
- **Build Tool**: tsdown - TypeScript to JavaScript bundler
- **Formatter**: dprint
- **Test Runner**: vitest
- **TypeScript**: v5.9.3 with strict configuration

## Common Commands

```bash
# Build all packages (must be run before tests/linting)
pnpm run build

# Run all tests
pnpm run test

# Run a single test file
pnpm vitest packages/plugins/eslint-plugin-react-x/src/rules/no-missing-key.spec.ts

# Run all linting checks
pnpm run lint

# Run specific lint checks
pnpm run lint:es      # ESLint
pnpm run lint:ts      # TypeScript type checking
pnpm run lint:deps    # Dependency analysis with skott
pnpm run lint:publish # Package linting with publint

# Format code
pnpm run format:write

# Update generated files (versions, READMEs, website docs)
pnpm run update:all
```

## Monorepo Structure

### Packages (`/packages/`)

**Core packages:**
- `@eslint-react/core` - Core ESLint utility module for static analysis of React core APIs
- `@eslint-react/shared` - Shared constants, types, and functions

**Plugin packages** (`/packages/plugins/`):
- `eslint-plugin` - Unified plugin combining all individual plugins
- `eslint-plugin-react-x` - Core React rules (renderer-agnostic)
- `eslint-plugin-react-dom` - DOM-specific rules
- `eslint-plugin-react-web-api` - Web API interaction rules
- `eslint-plugin-react-hooks-extra` - Additional React Hooks rules
- `eslint-plugin-react-naming-convention` - Naming convention rules
- `eslint-plugin-react-debug` - Debug utilities

**Utility packages** (`/packages/utilities/`):
- `@eslint-react/ast` - AST manipulation utilities
- `@eslint-react/eff` - Effect/functional programming utilities
- `@eslint-react/var` - Variable analysis utilities

### Local Packages (`/.pkgs/`)

Private workspace packages:
- `@local/configs` - Shared ESLint and TypeScript configurations
- `@local/function-rules` - Custom function-based lint rules

### Applications (`/apps/`)

- `website` - Documentation website built with Next.js and Fumadocs

### Examples (`/examples/`)

Example projects showing integrations with Next.js, React DOM, and various parsers.

## Rule Structure

Each ESLint rule follows this structure:

```
packages/plugins/[plugin-name]/src/rules/
├── rule-name.ts           # Rule implementation
├── rule-name.spec.ts      # Test file
└── rule-name.mdx          # Documentation
```

### Rule Implementation Pattern

Rules are created using `createRule` from `@typescript-eslint/utils`:

```typescript
import { createRule } from "../utils";

export const RULE_NAME = "rule-name";
export const RULE_FEATURES = [] as const satisfies RuleFeature[];
export type MessageID = "messageId";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: { description: "..." },
    messages: { messageId: "Error message" },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(ctx: RuleContext<MessageID, []>): RuleListener {
  return {
    // AST visitors
  };
}
```

### Testing Pattern

Tests use the TypeScript ESLint Rule Tester with vitest:

```typescript
import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./rule-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [{ code: "...", errors: [{ messageId: "..." }] }],
  valid: ["..."],
});
```

Use `ruleTesterWithTypes` for type-aware rules. Import test helpers from `/test`:

```typescript
import { allValid, ruleTester, ruleTesterWithTypes } from "../../../../../test";
```

## Key Dependencies

- `@typescript-eslint/*` - TypeScript ESLint integration
- `effect` - Functional programming library used throughout
- `ts-pattern` - Pattern matching library
- `tsdown` - TypeScript bundler for building packages

## Adding a New Rule

1. Create the rule file in the appropriate plugin's `src/rules/` directory
2. Create the corresponding `.spec.ts` test file
3. Export the rule in the plugin's `src/plugin.ts` entry file
4. Add documentation as `.mdx` file with the same name
5. Update preset configurations if the rule should be enabled by default
6. Update the unified plugin to include the new rule
7. Run `pnpm run build` and `pnpm run test`

## Architecture Notes

- Rules use the `@eslint-react/core` package for React-specific analysis (component detection, hook analysis, JSX analysis)
- The `@eslint-react/shared` package provides common types, settings, and reporting utilities
- The `effect` library is used for functional programming patterns
- Each plugin is independently publishable but the unified plugin (`@eslint-react/eslint-plugin`) combines them all
