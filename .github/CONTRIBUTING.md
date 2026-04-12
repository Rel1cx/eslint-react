# ESLint React Contributing Guide

Thank you for your interest in contributing to ESLint React! Whether you're fixing a bug, proposing a new rule, improving documentation, or helping with tooling, every contribution is welcome.

> [!NOTE]
> ESLint React is not a fork of or derived from `eslint-plugin-react`. Features in `eslint-plugin-react` may not appear in ESLint React.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Monorepo Structure](#monorepo-structure)
- [Development Commands](#development-commands)
- [Reporting Issues](#reporting-issues)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Developing a New Rule](#developing-a-new-rule)
- [Testing](#testing)
- [Code Style](#code-style)
- [Code of Conduct](#code-of-conduct)

## Prerequisites

Before you begin, make sure you have the following installed:

| Requirement | Version  |
| ----------- | -------- |
| Node.js     | ≥ 22.0.0 |
| pnpm        | 10.33.0  |
| TypeScript  | ≥ 5.0    |
| ESLint      | ≥ 10     |

> [!TIP]
> If you use [corepack](https://nodejs.org/api/corepack.html), running `corepack enable` in the repo root will automatically configure the correct pnpm version.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/eslint-react.git
   cd eslint-react
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Build** the project (this also runs on `prepare`):
   ```bash
   pnpm run build
   ```
5. **Run tests** to verify everything works:
   ```bash
   pnpm run test
   ```

## Monorepo Structure

```
.
├── .github/                    # GitHub templates, workflows, and community files
├── .pkgs/                      # Internal monorepo packages (not published)
│   ├── configs/                #   Shared ESLint, TypeScript, and typedoc configs
│   └── eff/                    #   Internal Effect library wrapper
├── apps/
│   └── website/                # Documentation website
├── examples/                   # Example projects (Next.js, Preact, React DOM, etc.)
├── packages/
│   ├── core/                   # @eslint-react/core — core analysis logic
│   ├── shared/                 # @eslint-react/shared — shared types and utilities
│   ├── utilities/              # Utility packages (ast, jsx, kit, var)
│   └── plugins/                # Published ESLint plugins
│       ├── eslint-plugin/                          # Unified plugin (@eslint-react/eslint-plugin)
│       ├── eslint-plugin-react-x/                  # Core React rules (renderer-agnostic)
│       ├── eslint-plugin-react-dom/                # DOM-specific rules
│       ├── eslint-plugin-react-jsx/                # JSX rules
│       ├── eslint-plugin-react-rsc/                # React Server Components rules
│       ├── eslint-plugin-react-web-api/            # Web API rules
│       ├── eslint-plugin-react-naming-convention/  # Naming convention rules
│       └── eslint-plugin-react-debug/              # Debug plugin
├── scripts/                    # Automation scripts (scaffold, rename, verify, etc.)
└── test/                       # Shared test infrastructure and fixtures
```

## Development Commands

### Build

```bash
# Full build (update metadata + build internal packages + build all packages + build docs)
pnpm run build

# Build only internal monorepo packages (.pkgs/*)
pnpm run build:pkgs

# Build only publishable packages (packages/**)
pnpm run build:packages

# Build documentation for all packages
pnpm run build:docs

# Build the website
pnpm run build:website
```

### Test

```bash
# Run all tests
pnpm run test

# Run a single test file
pnpm vitest related plugins/eslint-plugin-react-x/src/rules/<rule-name>/<rule-name>.spec.ts

# Run tests matching a pattern
pnpm vitest run -t "<test-name-pattern>"
```

### Lint and Format

```bash
# Check formatting (dprint)
pnpm run format:check

# Fix formatting
pnpm run format:write

# Run all linting checks (deps, publish, TypeScript, ESLint, examples)
pnpm run lint
```

### Rule Tooling

```bash
# Scaffold a new rule (generates boilerplate files)
pnpm run scaffold:rule

# Rename an existing rule
pnpm run rename:rule

# Verify preset configs are consistent
pnpm run verify:configs

# Verify rule documentation matches source metadata
pnpm run verify:rule-docs
```

## Reporting Issues

We use GitHub Issues to track bugs, feature requests, and rule requests. Before creating a new issue, please:

1. **Search existing issues** — your problem or idea may have already been reported.
2. **Verify the version** — make sure the issue is reproducible with the latest stable release.
3. **Use the appropriate template**:
   - 🐛 **Bug Report** — for unexpected behavior or errors.
   - ✨ **Feature Request** — for new capabilities or improvements.
   - 📏 **Rule Request** — for proposing a new lint rule.
   - 📝 **Docs Report** — for documentation issues or improvements.
4. **Provide a minimal reproduction** — a concise code snippet or repository that demonstrates the issue.

## Submitting Pull Requests

### General Guidelines

- **Discuss first**: For new features or new rules, open an issue to discuss the proposal before writing code.
- **Sign your commits**: All commits must be signed.
- **Keep PRs focused**: Each pull request should address a single concern.
- **Small commits are fine**: We squash commits before merging.

### PR Title Convention

Use a descriptive title that includes the type of change:

| Type                | Title Format            | Example                                           |
| ------------------- | ----------------------- | ------------------------------------------------- |
| Bug fix             | `fix: description`      | `fix: false positive in no-array-index-key`       |
| New feature or rule | `feat: description`     | `feat: add no-unstable-default-props rule`        |
| Documentation       | `docs: description`     | `docs: improve no-direct-mutation-state examples` |
| Refactor            | `refactor: description` | `refactor: simplify JSX element analysis`         |
| Chore               | `chore: description`    | `chore: update dependencies`                      |

If the change references an issue, include it: `fix: false positive in no-array-index-key (fix: #1234)`.

### Before Submitting

- [ ] Run `pnpm run build` to ensure the project builds.
- [ ] Run `pnpm run test` to ensure all tests pass.
- [ ] Run `pnpm run lint` to ensure code quality checks pass.
- [ ] Run `pnpm run format:write` to ensure consistent formatting.

## Developing a New Rule

### Step 1 — Open an Issue

If there isn't already an issue for the rule, create one using the **Rule Request** template so the proposal can be discussed before implementation.

### Step 2 — Scaffold the Rule

Use the built-in scaffolding script to generate the boilerplate:

```bash
pnpm run scaffold:rule
```

This creates the following files inside the target plugin:

```
packages/<plugin>/src/rules/<rule-name>/
├── <rule-name>.ts         # Rule implementation
├── <rule-name>.spec.ts    # Test file
└── <rule-name>.mdx        # Documentation (MDX with YAML frontmatter)
```

### Step 3 — Implement the Rule

Write the rule logic in `<rule-name>.ts`. The file should export:

- `RULE_NAME` — the kebab-case rule name.
- `RULE_FEATURES` — metadata about the rule's capabilities.
- `MessageID` — a string union type for all message IDs.
- A default export calling `createRule(...)`.

Refer to existing rules (e.g., `plugins/eslint-plugin-react-x/src/rules/no-array-index-key/`) as a reference.

### Step 4 — Write Tests

Add test cases in `<rule-name>.spec.ts`:

- Use the shared `ruleTester` (or `ruleTesterWithTypes` for type-aware rules) from `test/`.
- Use the `dedent` tagged template literal for inline test code.
- Cover both `valid` and `invalid` cases with appropriate `messageId` assertions.
- Consider edge cases such as JSX variants, different component patterns, and TypeScript-specific syntax.

### Step 5 — Write Documentation

Write the rule documentation in `<rule-name>.mdx`:

- Include YAML frontmatter with `title` and `description`.
- Document the rule under both the individual plugin name and the unified plugin name.
- List applicable presets.
- Provide **Rule Details**, **Common Violations** (with examples of invalid and valid code), **Resources**, and **Further Reading** sections.

### Step 6 — Register and Integrate

1. Export the rule in the plugin's entry file (`src/plugin.ts`).
2. If the rule should be enabled by default, update the preset configurations.
3. Update the unified plugin (`plugins/@eslint-react/eslint-plugin/`) to include the new rule.
4. Run `pnpm run update:all` to synchronize metadata across the monorepo.

### Step 7 — Verify and Submit

```bash
pnpm run build
pnpm run test
pnpm run lint
pnpm run verify:configs
pnpm run verify:rule-docs
```

Submit a pull request with a clear description linking back to the original issue.

## Testing

### Overview

- **Test runner**: [Vitest](https://vitest.dev/)
- **Rule tester**: [@typescript-eslint/rule-tester](https://typescript-eslint.io/packages/rule-tester/)
- **Test location**: Tests are co-located with source files (`<rule-name>.spec.ts` alongside `<rule-name>.ts`).

### Test Infrastructure

The shared test setup lives in the `test/` directory at the project root:

| File                  | Description                                                                  |
| --------------------- | ---------------------------------------------------------------------------- |
| `test/index.ts`       | Barrel export for helpers and rule tester                                    |
| `test/helpers.ts`     | Provides `getFixturesRootDir()` for fixture path resolution                  |
| `test/rule-tester.ts` | Configures `ruleTester` (standard) and `ruleTesterWithTypes` (type-aware)    |
| `test/fixtures/`      | Shared fixture files and multiple `tsconfig.json` variants (JSX modes, etc.) |

### Writing Tests

```ts
import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./my-rule";

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // ... valid test cases
  ],
  invalid: [
    // ... invalid test cases with expected messageId
  ],
});
```

- Use `ruleTester` for rules that do **not** require type information.
- Use `ruleTesterWithTypes` for rules that **do** require type information.
- Test fixtures support multiple TypeScript JSX configurations (e.g., `jsx-preserve`, `jsx-react`, `jsx-react-native`, `jsx-preact`).

## Code Style

- **Formatting**: Managed by [dprint](https://dprint.dev/). Run `pnpm run format:write` before committing.
- **Linting**: ESLint with TypeScript support. Run `pnpm run lint` to check.
- **Type checking**: Run `pnpm run lint:ts` to verify there are no type errors.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the contact listed in the Code of Conduct.

## Reference

- [Website & Documentation](https://eslint-react.xyz)
- [Monorepo Structure](https://eslint-react.xyz/docs/contributing#monorepo-structure)
- [GitHub Issues](https://github.com/Rel1cx/eslint-react/issues)
