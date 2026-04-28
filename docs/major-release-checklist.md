# Major Release Checklist

> Checklist for shipping a new **major** version (`vX.0.0`) of the ESLint React monorepo.

---

## 1. Preparation

- [ ] **Define release scope** — identify every package and plugin included in this release.
- [ ] **Document breaking changes** — summarize all removals, renames, preset behavior changes, dropped deprecated APIs, and minimum version bumps (Node.js / TypeScript / ESLint / `engines.node`) in `CHANGELOG.md`.
- [ ] **Cut release branch** — create `release/vX.0.0` from `main`; land all release-related changes there.
- [ ] **Freeze main** — pause feature merges into `main`; accept only release-blocking fixes.

## 2. Version & Dependencies

- [ ] **Bump version** — update the `VERSION` file to `X.0.0` (this is the source of truth for all downstream version sync).
- [ ] **Sync workspace versions** — run `pnpm run update:version` to propagate the `VERSION` into `package.json`, `packages/*/package.json`, and `plugins/*/package.json`. Note: `.pkgs/*` are **not** updated by this script (they have independent version cycles).
- [ ] **Review peer dependencies** — bump constraints in plugins if needed (`eslint`, `typescript`, etc.).
- [ ] **Verify workspace references** — no circular `workspace:*` deps and all internal versions align.
- [ ] **Refresh lockfile** — run `pnpm install` and inspect `pnpm-lock.yaml` for unexpected changes.

## 3. Rule System

- [ ] **Removed rules cleanup** — if any rules were removed, confirm:
  - Source directory deleted from `plugins/*/src/rules/`.
  - Docs deleted from `apps/website/content/docs/rules/`.
  - Rule removed from `plugin.ts` exports.
  - Rule removed from all `configs/*.ts` presets.
  - Removal documented in `apps/website/content/docs/removed.md` (or equivalent) with migration path.
- [ ] **Renamed rules cleanup** — if any rules were renamed, confirm:
  - Rename applied via `scripts/rename-rule.ts` conventions.
  - **Old name kept as an alias** in `plugin.ts` for at least one major cycle, or explicitly announced as hard removal. (`rename-rule.ts` does **not** create aliases automatically.)
  - Cross-references in docs updated.
- [ ] **Preset consistency** — run `pnpm run verify:configs`; it validates:
  - Every registered rule appears in `all.ts`, `disable-experimental.ts`, or `disable-type-checked.ts`.
  - All config keys reference real rules.
  - `recommended ⊂ strict ⊂ all` hierarchy holds.
  - Domain configs (`dom`, `jsx`, `rsc`, `web-api`, `naming-convention`) only contain rules from their respective plugins.
- [ ] **Rule features** — review `RULE_FEATURES` on new/changed rules; remove `EXP` from rules graduating to stable.
- [ ] **Rule relations table** — run `pnpm run update:readme` (or equivalent) to sync `docs/rule-relations-table.md`.

## 4. Code & Build

- [ ] **Formatting** — `pnpm run format:check` passes.
- [ ] **Linting** — `pnpm run lint` passes; evaluate and resolve any warnings.
- [ ] **Type checking** — `pnpm run lint:ts` passes across the entire repo.
- [ ] **Dependency audit** — `pnpm run lint:deps` passes; no unused deps or illegal cross-package imports.
- [ ] **Full build** — `pnpm run build` succeeds for `.pkgs/*`, `packages/*`, and `plugins/*` with no build/typegen warnings.
  > ⚠️ `build` internally runs `update:all` first, which will mutate `package.json` versions, `README.md`, and website content. Ensure `VERSION` is already updated before running build, or commit the resulting changes separately.
- [ ] **Artifacts spot-check** — sampled `dist/` directories contain:
  - Valid `index.js` and `index.d.ts` with complete exports.
  - No leaked test files or source maps (`sourcemap: false`).
  - Correct `main` / `types` / `exports` fields in `package.json`.

## 5. Testing

- [ ] **Unit tests** — `pnpm run test` passes (Vitest: AST, core utilities, variable tracking, etc.).
- [ ] **Rule tests** — all `*.spec.ts` pass; pay extra attention to:
  - Modified rule test cases.
  - New rule edge cases.
  - Type-aware tests (`ruleTesterWithTypes`).
- [ ] **Example projects** — `pnpm run lint:examples` passes for every project under `examples/*`.
- [ ] **Website build** — `pnpm run build:website` produces a clean static build.
- [ ] **Dogfooding** _(optional)_ — validate the new version in an example project (e.g., `examples/react-dom-with-custom-rules`) since the repo's own `eslint.config.ts` uses `@local/configs/eslint` rather than the published plugin.

## 6. Documentation & Website

- [ ] **Rule docs integrity** — `pnpm run verify:rule-docs` passes:
  - Every rule has a matching `.mdx` doc.
  - Removed rule docs are deleted.
  - Each doc's `description`, `features` (emoji icons), `presets` (severity), and `resources` links match the rule source.
  - The rules index (`apps/website/content/docs/rules/index.mdx`) "View by Domain" table matches actual rule metadata.
- [ ] **Migration guide** — create or update migration doc (e.g., `apps/website/content/docs/migrating-from-eslint-plugin-react.mdx` or equivalent) containing:
  - Rename/removal mapping tables.
  - Configuration migration examples.
- [ ] **Release notes** — add `apps/website/content/docs/release-notes/vX.0.0.mdx` covering:
  - Highlights
  - Breaking Changes
  - New Rules
  - Improvements
  - Bug Fixes
- [ ] **README sync** — run `pnpm run update:readme`; rule lists, badges, and version references are current in the root `README.md` and `plugins/eslint-plugin/README.md`.
- [ ] **Website content sync** — run `pnpm run update:website`; confirm:
  - Rule docs are copied from `plugins/*/src/rules/*/*.mdx` to `apps/website/content/docs/rules/`.
  - `See Also` sections are generated from `docs/rule-relations-table.md`.
  - `apps/website/content/docs/rules/meta.json` (sidebar navigation) is regenerated.
  - `CHANGELOG.md` is synced to `apps/website/content/docs/changelog.md`.
  - Community page (`docs/community.mdx`) has no dead or stale links.
  - Presets page (`docs/presets.mdx`) reflects current code.
  - Rules index (`apps/website/content/docs/rules/index.mdx`) is updated **manually**; it is not auto-generated.
- [ ] **Changelog entry** — `CHANGELOG.md` `vX.0.0` section is complete and follows [Keep a Changelog](https://keepachangelog.com/) format.

## 7. Release

- [ ] **Release commit** — commit all changes with message `release: vX.0.0`.
- [ ] **Git tag** — `git tag -a vX.0.0 -m "Release vX.0.0"`.
- [ ] **Push & PR** — push `release/vX.0.0` and open the Release Pull Request.
- [ ] **CI green** — all GitHub Actions workflows (lint, test, build) pass on the release branch.
- [ ] **Merge & tag push** — merge the Release PR into `main`, then `git push origin vX.0.0`.
- [ ] **GitHub Release** — publish a GitHub Release from the tag including:
  - Summary (Highlights + Breaking Changes).
  - Link to full Changelog.
  - Link to migration guide.
- [ ] **npm publish** — confirm CI auto-published every package and plugin to the npm registry (`.github/workflows/publish.yml` triggers on the `release: vX.0.0` commit pushed to `main`).

## 8. Post-Release

- [ ] **Deploy website** — confirm `apps/website` is deployed to production (`eslint-react.xyz`). If deployment is not automated, trigger it manually.
- [ ] **Announce** — post on Bluesky / X / community channels.
- [ ] **Monitor** — watch Issues and Discussions for 48 hours and respond to regression reports.
- [ ] **Cleanup** — delete the `release/vX.0.0` branch after confirming no follow-up tasks remain.
- [ ] **Plan next cycle** — move pending experimental (`EXP`) rules or deferred improvements into the next Milestone.

---

## Quick Commands

```bash
# Sync
pnpm run update:all          # version + readme + website

# Verify
pnpm run verify:configs      # preset consistency
pnpm run verify:rule-docs    # docs completeness
pnpm run verify:lockfile     # lockfile drift check

# Build & Test
pnpm run build               # full build (includes update:all)
pnpm run test                # all tests
pnpm run lint:examples       # example projects
pnpm run build:website       # website build

# Quality
pnpm run format:check        # formatting
pnpm run lint                # linting
pnpm run lint:ts             # type checking
pnpm run lint:deps           # dependency audit
```
