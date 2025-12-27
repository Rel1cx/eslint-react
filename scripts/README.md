# Scripts

This directory contains various scripts used for maintaining and building the ESLint React monorepo.

## Available Scripts

### `update-version.ts`

Updates the version across all packages in the monorepo.

```bash
pnpm run update:version
```

### `update-readme.ts`

Updates the README files across the monorepo.

```bash
pnpm run update:readme
```

### `update-website.ts`

Processes and copies rule documentation from packages to the website, and generates the rules metadata JSON file.

```bash
pnpm run update:website
```

### `verify-lockfile.ts`

Verifies the integrity of the pnpm lockfile.

### `verify-monorepo.ts`

Verifies consistency across all published packages in the monorepo. Checks for mismatches in:
- Package versions (should match VERSION file)
- Node engine requirements
- ESLint peer dependencies
- TypeScript peer dependencies
- Author, license, and repository fields

```bash
pnpm run verify:monorepo
```

### `verify-rules-metas.ts`

Verifies that the ESLint rule metadata documented in `.mdx` files and the rules overview matches the actual rule definitions in source code.

```bash
pnpm run verify:rules-metas
```
