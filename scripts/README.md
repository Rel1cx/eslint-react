# Scripts

Automation scripts for the eslint-react monorepo. All scripts are written in TypeScript using the [Effect](https://effect.website/) library and executed via [`tsx`](https://github.com/privatenumber/tsx).

## Table of Contents

- [Overview](#overview)
- [Quick Reference](#quick-reference)
- [Shared Libraries](#shared-libraries)
- [Workflow 1 — Rule Development](#workflow-1--rule-development)
  - [`scaffold-rule.ts`](#scaffold-rulets)
  - [`rename-rule.ts`](#rename-rulets)
- [Workflow 2 — Quality Assurance](#workflow-2--quality-assurance)
  - [`verify-configs.ts`](#verify-configsts)
  - [`verify-rule-docs.ts`](#verify-rule-docsts)
  - [`verify-lockfile.ts`](#verify-lockfilets)
- [Workflow 3 — Sync & Build](#workflow-3--sync--build)
  - [`update-version.ts`](#update-versionts)
  - [`update-readme.ts`](#update-readmets)
  - [`update-website.ts`](#update-websitets)
- [Workflow 4 — Release](#workflow-4--release)
  - [`generate-changelog.ts`](#generate-changelogts)
  - [`prepare-release.ts`](#prepare-releasets)

---

## Overview

```
scripts/
├── lib/
│   ├── glob.ts        # Synchronous glob wrapper (tinyglobby)
│   ├── ignores.ts     # .gitignore parser → ignore patterns
│   └── version.ts     # Reads canonical version from VERSION file
├── scaffold-rule.ts   # Generate new rule boilerplate
├── rename-rule.ts     # Rename/move an existing rule
├── verify-configs.ts  # Validate preset config consistency
├── verify-rule-docs.ts# Validate rule docs match source metadata
├── verify-lockfile.ts # Warn on lockfile drift after git pull
├── update-version.ts  # Propagate VERSION → all package.json
├── update-readme.ts   # Sync root README → npm package README
├── update-website.ts  # Copy rule docs to website, gen meta.json
├── generate-changelog.ts # Generate changelog from git history
├── prepare-release.ts # One-command release preparation
└── README.md          # This file
```

All scripts are invoked from the **repository root** via `tsx` or through their corresponding `pnpm run` aliases defined in the root `package.json`.

---

## Quick Reference

| pnpm script                   | Script file             | Workflow          | Takes args? |
| ----------------------------- | ----------------------- | ----------------- | ----------- |
| `pnpm run scaffold:rule`      | `scaffold-rule.ts`      | Rule Development  | Yes         |
| `pnpm run rename:rule`        | `rename-rule.ts`        | Rule Development  | Yes         |
| `pnpm run verify:configs`     | `verify-configs.ts`     | Quality Assurance | No          |
| `pnpm run verify:rule-docs`   | `verify-rule-docs.ts`   | Quality Assurance | No          |
| _(git hook)_                  | `verify-lockfile.ts`    | Quality Assurance | No          |
| `pnpm run update:version`     | `update-version.ts`     | Sync & Build      | No          |
| `pnpm run update:readme`      | `update-readme.ts`      | Sync & Build      | No          |
| `pnpm run update:website`     | `update-website.ts`     | Sync & Build      | No          |
| `pnpm run update:all`         | _(runs the above 3)_    | Sync & Build      | No          |
| `pnpm run generate:changelog` | `generate-changelog.ts` | Release           | Optional    |
| `pnpm run prepare:release`    | `prepare-release.ts`    | Release           | Yes         |

---

## Shared Libraries

Helper modules in `scripts/lib/` used by multiple scripts.

### `lib/glob.ts`

Thin synchronous wrapper around [`tinyglobby`](https://github.com/SuperchupuDev/tinyglobby). Accepts glob patterns and an optional ignore list (defaults to `**/node_modules/**`).

### `lib/ignores.ts`

Reads the project's `.gitignore` and returns an Effect yielding an array of ignore patterns, stripping comments, negation lines, leading slashes, and empty lines.

### `lib/version.ts`

Reads the `VERSION` file at the repo root, trims whitespace, strips a leading `v` prefix, and returns an Effect yielding the canonical version string (e.g. `4.2.0-beta.2`). This file is the **single source of truth** for the monorepo version.

---

## Workflow 1 — Rule Development

Scripts used when creating or reorganizing ESLint rules. This is typically the **first step** in the development lifecycle.

### `scaffold-rule.ts`

Generates the full boilerplate for a new ESLint rule: implementation, tests, documentation, and plugin registration.

**pnpm alias:** `pnpm run scaffold:rule`

**Usage:**

```
tsx ./scripts/scaffold-rule.ts <plugin> <rule-name> [description]
```

**Arguments:**

| Argument      | Required | Description                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------------- |
| `plugin`      | Yes      | Target plugin domain: `x`, `dom`, `jsx`, `rsc`, `web-api`, `naming-convention`, `debug` |
| `rule-name`   | Yes      | Rule name in kebab-case (e.g. `no-foo-bar`)                                             |
| `description` | No       | One-line rule description for the `.mdx` frontmatter                                    |

**Examples:**

```sh
# Scaffold a core rule in eslint-plugin-react-x
tsx ./scripts/scaffold-rule.ts x no-unstable-ref "Disallows unstable ref usage."

# Scaffold a DOM rule
tsx ./scripts/scaffold-rule.ts dom no-missing-form-action "Disallows forms without an action."
```

**What it does:**

1. Creates the rule directory `packages/plugins/eslint-plugin-react-<plugin>/src/rules/<rule-name>/`
2. Generates `<rule-name>.ts` — rule implementation skeleton with `createRule`, `RULE_NAME`, `RULE_FEATURES`, `MessageID`, and an empty `create` function
3. Generates `<rule-name>.spec.ts` — test file wired to the shared `ruleTester` with empty `valid`/`invalid` arrays
4. Generates `<rule-name>.mdx` — documentation with frontmatter, full name blocks, and Resources links
5. Updates `plugin.ts` — inserts the import and rules-map entry in alphabetical order

**After scaffolding, you should:**

1. Implement the rule logic in the generated `.ts` file
2. Add test cases in the `.spec.ts` file
3. Write documentation in the `.mdx` file
4. Add the rule to the appropriate preset configs (e.g. `all.ts`, `recommended.ts`) if needed
5. Run `pnpm run build` and `pnpm run test` to verify

---

### `rename-rule.ts`

Automates the full rule rename/move checklist documented in `docs/rule-rename-checklist.md`. Handles file renaming, content updates, plugin registration, and config propagation across the entire monorepo.

**pnpm alias:** `pnpm run rename:rule`

**Usage:**

```
tsx ./scripts/rename-rule.ts <plugin> <old-name> <new-name>
```

**Arguments:**

| Argument   | Required | Description                                                                      |
| ---------- | -------- | -------------------------------------------------------------------------------- |
| `plugin`   | Yes      | Plugin domain: `x`, `dom`, `jsx`, `rsc`, `web-api`, `naming-convention`, `debug` |
| `old-name` | Yes      | Current rule name (kebab-case)                                                   |
| `new-name` | Yes      | New rule name (kebab-case)                                                       |

**Examples:**

```sh
# Rename a rule within eslint-plugin-react-x
tsx ./scripts/rename-rule.ts x no-missing-use-memo-return use-memo

# Rename a DOM rule
tsx ./scripts/rename-rule.ts dom no-render no-render-call
```

**What it does (9 automated steps):**

1. **Rename source files** — copies files to new directory, removes old directory
2. **Update rule implementation** — rewrites the `RULE_NAME` constant
3. **Update test file** — fixes the import path
4. **Update documentation** — rewrites frontmatter title, full name blocks, Rule/Test Source links
5. **Update plugin registration** — rewrites the import statement and rules-map entry in `plugin.ts` (handles `"key":`, `["key"]:`, and unquoted key styles)
6. **Update aggregated plugin configs** — replaces the old `@eslint-react/` config key in all `packages/plugins/eslint-plugin/src/configs/*.ts` files
7. **Update sub-plugin configs** — replaces rule keys in `packages/plugins/eslint-plugin-react-<plugin>/src/configs/*.ts`
8. **Update rule relations table** — replaces references in `docs/rule-relations-table.md`
9. **Verify no leftovers** — scans all relevant files and reports any remaining references to the old name

**After renaming, you should:**

1. Update `CHANGELOG.md` with the rename entry
2. Run `pnpm run build` to verify the build
3. Run `pnpm run test` to verify tests pass
4. Run `pnpm run verify:rule-docs` to verify documentation consistency

---

## Workflow 2 — Quality Assurance

Verification scripts that run during development and in CI to catch consistency issues before they reach users.

### `verify-configs.ts`

Validates the consistency and integrity of all ESLint preset configurations across the aggregated plugin.

**pnpm alias:** `pnpm run verify:configs`

**Usage:**

```
tsx ./scripts/verify-configs.ts
```

Takes no arguments. Exits with code 0 on success, 1 on failure.

**What it checks (4 categories):**

1. **Rule registration coverage** — every rule registered in a sub-plugin (excluding `debug`) must appear in `all.ts`, `disable-experimental.ts`, or `disable-type-checked.ts`. Catches rules that were added to a plugin but forgotten in configs.
2. **Config key validity** — every rule key referenced in `all.ts`, `recommended.ts`, `strict.ts`, `disable-experimental.ts`, and `disable-type-checked.ts` must correspond to an actually registered rule. Catches typos in config files.
3. **Preset hierarchy** — verifies that `recommended ⊂ strict` and `strict ⊂ all`. Catches rules that were added to a lower tier but not propagated upward.
4. **Domain config integrity** — verifies that rules in domain configs (`dom.ts`, `jsx.ts`, `rsc.ts`, `web-api.ts`) belong to the correct domain plugin. Also reports (informational, not error) rules registered in a domain but only present in higher-tier configs.

**Example output:**

```
Verifying config consistency...

Found 90 registered rules (excluding debug).

1. Checking all registered rules are accounted for in configs...
  All registered rules are accounted for.

2. Checking config keys reference valid rules...
  Config all: all rule keys are valid.
  Config recommended: all rule keys are valid.
  Config strict: all rule keys are valid.

3. Checking preset hierarchy...
  recommended ⊂ strict: hierarchy is valid.
  strict ⊂ all: hierarchy is valid.

4. Checking domain config integrity...
  Domain dom.ts: 6 rule(s) not in base config (strict/all only): ...
  Domain config rsc.ts: all registered rules are present.

All config consistency checks passed!
```

---

### `verify-rule-docs.ts`

Validates that every rule's `.mdx` documentation matches its actual source metadata, and that the website overview page is consistent.

**pnpm alias:** `pnpm run verify:rule-docs`

**Usage:**

```
tsx ./scripts/verify-rule-docs.ts
```

Takes no arguments. Also runs as part of CI (`check.yml`).

**What it checks:**

- **Per-rule docs** — for every rule `.ts` file, verifies the companion `.mdx` has:
  - Matching `description:` frontmatter
  - Correct **Features** icons (`🔧`, `💭`, `🧪`, etc.) matching `RULE_FEATURES`
  - **Presets** section (if the rule has non-zero severity in recommended/strict)
  - Correct **Rule Source** and **Test Source** GitHub links in the **Resources** section
- **Overview page** — verifies that every row in the `apps/website/content/docs/rules/overview.mdx` "View by Domain" tables has correct link format, description, feature icons, and severity icons matching the preset configs

---

### `verify-lockfile.ts`

Detects lockfile changes after a `git pull` or `git merge` and warns the developer to reinstall dependencies.

**pnpm alias:** _(typically used as a post-merge git hook)_

**Usage:**

```
tsx ./scripts/verify-lockfile.ts
```

Takes no arguments. Runs `git diff HEAD@{1} --stat -- ./pnpm-lock.yaml` and warns if changes are detected:

```
⚠ Detected changes in pnpm-lock.yaml!
⚠ Please run `pnpm install --fix-lockfile && pnpm dedupe` to update local dependencies.
```

---

## Workflow 3 — Sync & Build

Scripts that synchronize derived artifacts from source-of-truth files. These run as part of the build pipeline (`pnpm run build` → `pnpm run update:all`).

The three update scripts run **in sequence** via the `update:all` npm script:

```
pnpm run update:all
  → pnpm run update:version   (1st)
  → pnpm run update:readme    (2nd)
  → pnpm run update:website   (3rd)
```

### `update-version.ts`

Reads the canonical version from the `VERSION` file and propagates it to every `package.json` across the monorepo.

**pnpm alias:** `pnpm run update:version`

**Usage:**

```
tsx ./scripts/update-version.ts
```

Takes no arguments.

**What it does:**

1. Reads `VERSION` file (single source of truth)
2. Globs all `package.json` files (`package.json`, `packages/*/package.json`, `packages/*/*/package.json`)
3. Skips packages already at the correct version
4. Updates the `version` field in-place (concurrent, up to 8 at a time)

---

### `update-readme.ts`

Syncs the root `README.md` to the npm-published package README with absolute links and updated badges.

**pnpm alias:** `pnpm run update:readme`

**Usage:**

```
tsx ./scripts/update-readme.ts
```

Takes no arguments.

**What it does:**

1. Reads `package.json` to get the current `tsdown` devDependency version
2. Updates the tsdown badge URL in the root `README.md`
3. Converts all relative Markdown links to absolute GitHub links (pinned to `main` branch)
4. Writes the badge-updated version back to `README.md`
5. Writes the fully-absolutized version to `packages/plugins/eslint-plugin/README.md`

---

### `update-website.ts`

Populates the documentation website with rule docs, navigation metadata, and the changelog.

**pnpm alias:** `pnpm run update:website`

**Usage:**

```
tsx ./scripts/update-website.ts
```

Takes no arguments.

**What it does (3 tasks):**

1. **Copy rule docs** — globs all `.mdx` files from `packages/plugins/eslint-plugin-react-*/src/rules/*/`, copies each to `apps/website/content/docs/rules/`, and appends a "See Also" section from `docs/rule-relations-table.md`
2. **Generate `meta.json`** — produces `apps/website/content/docs/rules/meta.json` listing all rule pages grouped and ordered by category (x, jsx, rsc, dom, web-api, naming-convention, debug) for the website sidebar
3. **Process changelog** — copies `CHANGELOG.md` → `apps/website/content/docs/changelog.md` with YAML frontmatter

---

## Workflow 4 — Release

Scripts for preparing and publishing a new release. These are used **after** development and QA are complete.

### `generate-changelog.ts`

Generates a changelog entry from git history using [Conventional Commits](https://www.conventionalcommits.org/) format and prepends it to `CHANGELOG.md`.

**pnpm alias:** `pnpm run generate:changelog`

**Usage:**

```
tsx ./scripts/generate-changelog.ts [from-ref]
```

**Arguments:**

| Argument   | Required | Description                                                                                     |
| ---------- | -------- | ----------------------------------------------------------------------------------------------- |
| `from-ref` | No       | Git ref to start from (tag, commit, or `HEAD~N`). If omitted, auto-detects the latest `v*` tag. |

**Examples:**

```sh
# Auto-detect from latest tag
tsx ./scripts/generate-changelog.ts

# From a specific tag
tsx ./scripts/generate-changelog.ts v4.1.0

# From a relative ref
tsx ./scripts/generate-changelog.ts HEAD~20
```

**What it does:**

1. Reads the current version from the `VERSION` file
2. Determines the starting ref (CLI argument or latest git tag)
3. Collects all commits since that ref via `git log`
4. Parses [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `perf`, `refactor`, `docs`, `!` for breaking)
5. Groups and formats them using the project's emoji categories:
   - `💥 Breaking Changes`
   - `✨ New`
   - `🐞 Fixes`
   - `🪄 Improvements`
   - `📝 Documentation`
6. Prepends the generated entry to `CHANGELOG.md`
7. Reports skipped non-conventional commits for manual review

> **Note:** The generated entry is a **draft**. Always review and edit it before committing.

---

### `prepare-release.ts`

One-command release preparation that bumps the version, runs all sync scripts, and outputs the exact git commands to finalize the release.

**pnpm alias:** `pnpm run prepare:release`

**Usage:**

```
tsx ./scripts/prepare-release.ts <version | bump-type>
```

**Arguments:**

| Argument  | Required | Description                                                                                            |
| --------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `version` | Yes      | An explicit version (e.g. `4.3.0`) **or** a bump type: `patch`, `minor`, `major`, `rc`, `beta`, `next` |

**Examples:**

```sh
# Bump to a specific version
tsx ./scripts/prepare-release.ts 4.3.0

# Bump patch version (e.g. 4.2.0 → 4.2.1)
tsx ./scripts/prepare-release.ts patch

# Bump to next beta (e.g. 4.2.0-beta.2 → 4.2.0-beta.3)
tsx ./scripts/prepare-release.ts beta

# Bump minor (e.g. 4.2.1 → 4.3.0)
tsx ./scripts/prepare-release.ts minor
```

**What it does:**

1. Resolves the new version (auto-increment or explicit)
2. Validates the version format (`X.Y.Z`, `X.Y.Z-rc.N`, `X.Y.Z-beta.N`, `X.Y.Z-next.N`)
3. Checks `git status` for uncommitted changes (warns if dirty)
4. Writes the new version to the `VERSION` file
5. Runs `update:version` — propagates to all `package.json` files
6. Runs `update:readme` — syncs README with updated badges
7. Runs `update:website` — copies docs and regenerates metadata
8. Prints a summary with the exact commands to finalize:

```
--- Release preparation complete ---

  Version:        4.3.0
  npm tag:        latest
  Commit message: release: 4.3.0

Next steps:

  1. Review the changes:
     git diff

  2. Stage and commit:
     git add -A
     git commit -m "release: 4.3.0"

  3. Push to main to trigger publishing:
     git push origin main
```

> **Important:** The CI pipeline (`.github/workflows/publish.yml`) detects the `release: X.Y.Z` commit message pattern and automatically publishes to npm with the appropriate dist-tag (`latest`, `rc`, `beta`, or `next`).
