# ESLint React Contributing Guide

Welcome to contributing to ESLint React! This guide will help you contribute effectively.

> [!NOTE]
> ESLint React is not a fork of or derived from `eslint-plugin-react`. Features in `eslint-plugin-react` may not appear in ESLint React.

## Issue Reporting Guide

- **Search first**: Your issue may have already been reported.
- **Verify version**: Ensure the issue is reproducible in the latest stable version.
- **Provide clear reproduction steps**.
- **Provide a minimal reproducible code example**.

## Pull Request Guide

- **Sign your commits**.
- **Small commits are welcome**: We will squash them before merging.
- **New features**: Please provide a good reason, preferably by discussing it in an Issue first.
- **Bug fixes**: Include `(fix: #xxxx)` in the PR title.
- **Documentation changes**: Include `(docs: #xxxx)` in the PR title.

## Development Commands

### Build

```bash
# Build packages that are needed for development and publishing
pnpm run build

# Build packages that are used in the monorepo (e.g., plugins, configs)
pnpm run build:pkgs

# Build docs for all packages
pnpm run build:docs

# Build the website
pnpm run build:website
```

### Testing

```bash
# Run all tests
pnpm run test

# Run a single test file
pnpm vitest packages/plugins/eslint-plugin-react-x/src/rules/[rule-name].spec.ts
```

### Code Linting and Formatting

```bash
# Format the code
pnpm run format:write

# Run all checks
pnpm run lint

## Development Workflow

### Testing

- Test files coexist with source files: `src/rules/[rule-name].spec.ts`.
- Uses `TypeScript ESLint Rule Tester`.
- Provides separate test setups for type-aware and non-type-aware rules.
- Test fixtures support multiple TypeScript configurations (e.g., JSX variants).
- Test helpers are located in the `test/` directory.

### Developing a New Rule

1. If there isn't a related Issue, create one first to discuss the new rule.
2. Implement the rule in the plugin's `src/rules/` directory.
3. Create the corresponding test file.
4. Export the rule in the plugin's entry file (`src/plugin.ts`).
5. Add documentation for the rule.
6. If the rule should be enabled by default, update the preset configurations.
7. Update the unified plugin to include the new rule.
8. Update the website documentation.
9. Run build and test commands.
10. Submit a PR with a clear description of the changes.

## Reference

- [Monorepo Structure](https://eslint-react.xyz/docs/contributing#monorepo-structure)
```
