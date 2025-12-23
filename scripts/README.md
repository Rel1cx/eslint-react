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
