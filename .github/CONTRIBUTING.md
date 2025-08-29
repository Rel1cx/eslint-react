# ESLint React Contributing Guide

Thank you for your interest in contributing to ESLint React! This guide will help you understand how to contribute effectively.

> [!NOTE]
> ESLint React is not a fork of or derived from `eslint-plugin-react`. Features in `eslint-plugin-react` may not appear in ESLint React.

## Issue Reporting Guidelines

- **Search First** - Your issue may already be addressed
- **Verify Version** - Confirm reproducibility with the latest stable release
- **Clear Reproduction Steps Required** - Detailed steps to reproduce are essential
- **Minimal Code Example** - Provide only the code necessary to demonstrate the issue
- **Be Patient** - The team balances many responsibilities

## Pull Request Guidelines

- **Sign Your Commits** - Ensure your commits are signed
- **Multiple Small Commits Allowed** - GitHub will squash before merging
- **New Features** - Provide strong rationale, preferably with prior discussion
- **Bug Fixes** - Include `(fix: #xxxx)` in your PR title and detailed description
- **Documentation Changes** - Include `(docs: #xxxx)` in your PR title and detailed description

## Development Commands

### Build Commands

```bash
# Build packages in packages directory (core, shared, utilities, plugins)
pnpm run build

# Build packages in .pkgs directory (local configs)
pnpm run build:pkgs

# Build documentation for all packages
pnpm run build:docs

# Build website
pnpm run build:website
```

### Testing

```bash
# Run all tests with Vitest
pnpm run test

# Run a single test file
pnpm vitest packages/plugins/eslint-plugin-react-x/src/rules/[rule-name].spec.ts
```

### Linting & Formatting

```bash
# Full lint check (deps, publish, TypeScript, ESLint, examples)
pnpm run lint

# Individual lint commands
pnpm run lint:deps      # Check dependency cycles with skott
pnpm run lint:ts        # TypeScript check across packages
pnpm run lint:es        # ESLint check
pnpm run lint:publish   # Check package.json publishing config
pnpm run lint:spell     # Spell check with cspell

# Format code
pnpm run format:write   # Format with dprint
pnpm run format:check   # Check formatting
```

### Development Utilities

```bash
# Update project metadata
pnpm run update:all        # Update version, README, and website
pnpm run update:version    # Update version across packages
pnpm run update:readme     # Update README with generated content
pnpm run update:website    # Update website content

# Package management
pnpm run sort:package-json # Sort package.json files consistently

# Inspection tools
pnpm run inspect:deps           # Visualize dependency graph
pnpm run inspect:eslint-config  # Launch ESLint config inspector
```

## Development Workflow

### Testing

- Test files located alongside source: `src/rules/[rule-name].spec.ts`
- Uses TypeScript ESLint Rule Tester with custom configurations
- Separate test setups for type-checked and non-type-checked rules
- Test fixtures support multiple TypeScript configurations (JSX variants)
- Helper functions in `test/` directory for common test utilities

### Working with Rules

When developing new ESLint rules:

1. Open an issue to discuss the rule's purpose and design if no existing issue exists
2. Add rule implementation in appropriate plugin's `src/rules/` directory
3. Create corresponding test file using rule tester setup
4. Export rule from plugin's main index file
5. Add rule documentation with summary and examples
6. Update presets/configs if rule should be included by default
7. Update the unified plugin to include the new rule
8. Update the website documentation with the new rule details
9. Run the build and test commands to ensure everything works as expected
10. Submit a pull request with clear description of the changes and any relevant issue links

## References

- [Monorepo Structure](https://beta.eslint-react.xyz/docs/contributing#monorepo-structure)
