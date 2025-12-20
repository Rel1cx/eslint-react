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

### `verify-rules-overview.ts`

Verifies that the rules tables in `apps/website/content/docs/rules/overview.mdx` are accurate and up-to-date.

This script:

1. Checks that all rules from each plugin are present in the overview table
2. Verifies that rule metadata (fixable, codemod, experimental, etc.) matches between the rule implementation and the overview table
3. Reports any discrepancies found

```bash
pnpm run verify:rules
```

Run this script:

- After adding a new rule to ensure it's included in the overview
- After modifying rule metadata to ensure the overview is updated
- As part of the CI/CD pipeline to catch inconsistencies

The script will exit with code 0 if all checks pass, or code 1 if any issues are found.
