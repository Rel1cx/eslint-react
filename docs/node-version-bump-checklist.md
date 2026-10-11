# Node.js Minimum Version Bump Checklist

Checklist for raising the minimum supported Node.js version (e.g. dropping Node 20 support). It reverses the downgrade to `>=20.19.0` and re-enables everything that floor had disabled.

The examples below assume the new floor is Node 22; adjust targets and version strings proportionally for a different floor.

## 1. `engines` Fields (26 packages)

- [ ] Bump `engines.node` from `>=20.19.0` to the new floor in every workspace `package.json`:
  - root, `.pkgs/{eff,testkit,samples,configs}`, `packages/*` (7), `plugins/*` (8), `examples/*` (6)
  - **Exclude** `examples/react-dom-oxlint` — it stays at `>=22.15.0` on its own track (its lint script requires `module.registerHooks`).
- [ ] `rg --hidden '"node": ">=20' --glob 'package.json' --glob '!node_modules/' .` — no leftovers (`--hidden` is needed for `.pkgs/`; `pnpm-lock.yaml` hits are third-party engines and don't count).

## 2. Build Target

- [ ] `.pkgs/configs/tsdown.config.base.ts`: `target: "node20"` → the new target (e.g. `"node22"`). This is the single definition point shared by all 17 buildable packages (`packages/*` ×7, `plugins/*` ×8, `.pkgs/{eff,testkit}`).
- [ ] Re-run `node --run build` and confirm the committed build artifacts `tsdown.config.base.js` / `tsdown.config.base.d.ts` are regenerated and staged.

## 3. Type-Level Guardrails

- [ ] Bump `@types/node` from `^20.19.0` in the 7 packages that pin it (root, `apps/website`, `packages/{eslint,shared}`, `examples/{next,preact,preact-compat}`).
- [ ] Replace `@tsconfig/node20` with the matching base (e.g. `@tsconfig/node22`): 25 tsconfig `extends` entries + 11 `package.json` devDependencies.
- [ ] Update the example in `docs/repo-path-aliases.md` to match.
- [ ] Run `pnpm install`, then `node --run lint:ts` — new types may deprecate APIs in current use; address each report.

## 4. Dependency Policy Cleanup (`pnpm-workspace.yaml`)

- [ ] Remove `trustPolicyExclude: [undici-types]` and its comment (the `undici-types` 7.28+/8.x line pulled in by newer `@types/node` publishes with provenance, so `trustPolicy: no-downgrade` no longer blocks it).
- [ ] If a single `undici-types` resolution is wanted, restore a version pin under `overrides:` with a comment naming the transitive source (see git history for the previous form).

## 5. Re-Adopt Newer APIs (optional, separate commit recommended)

With the floor raised, these compatibility forms can be reverted:

- [ ] `plugins/eslint-plugin-react-x/src/rules/immutability/helpers.ts`: `[...KNOWN_MUTATING_HOOKS].some(...)` → `KNOWN_MUTATING_HOOKS.values().some(...)` (ES2025 Iterator helpers).
- [ ] `plugins/eslint-plugin/src/no-eslint.test.ts`: if the new floor is >= 22.15, restore the static `import { registerHooks } from "node:module"` and drop the runtime-probe binding and its comments.
- [ ] Scan for other Node 20-era compatibility patterns worth modernizing (not mandatory).

## 6. CI (`.github/workflows/test.yml`)

- [ ] Delete the Node 20 smoke-test block (the "Setup node@20" / "Setup pnpm" / "Smoke test on node@20" steps and their comment).
- [ ] If the new floor is supported by the toolchain (tsdown, vitest), add a full `node --run test` step on that version instead of a smoke test; the build-here/run-there split is only needed while the floor is below the toolchain's own `engines`.

## 7. Documentation

- [ ] `README.md` prerequisites block: bump the Node.js version, then run `node --run update:readme` to sync `plugins/eslint-plugin/README.md`.
- [ ] `apps/website/content/docs/getting-started/{typescript,javascript}.mdx`: bump the Node.js version in the prerequisites callout.
- [ ] `apps/website/content/docs/roadmap.md`: update the relevant Node.js entries — unlike historical records, this is a planning document and a support drop is a roadmap event.
- [ ] Add CHANGELOG / release-notes entries for the bump, following the v3.0.0 wording ("The minimum required Node.js version is now `>=X` (previously `>=Y`)").

## 8. Verify

- [ ] `pnpm install`
- [ ] `node --run build`
- [ ] `node --run lint:ts`
- [ ] `node --run lint`
- [ ] `node --run test`
- [ ] `node --run format:check`
- [ ] Spot-check a built `dist/index.js` for the new target (no unexpected downleveling).
- [ ] If a runtime matching the new floor is available (e.g. via a version manager), run `pnpm -F @examples/react-dom run lint` on it as a final check.

## Suggested Order

Sections 2 → 3 first (build output and type boundaries), then 1, 4, 7; section 5 last as an independent commit for easier review; sections 6 and 8 to close. Raising the floor is the safer direction — it cannot break users on already-supported versions.
