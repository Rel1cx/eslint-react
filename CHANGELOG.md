## v2.0.0 (2025-09-26)

### 💥 Breaking Changes

**Target Environment Updates: Now ESM and ESLint Flat Config Only**

- Drop support for CommonJS (CJS) module format, packages are now distributed only as ECMAScript Modules (ESM)
- Drop support for ESLint legacy config system, packages now support only ESLint Flat Config (`eslint.config.js`)
- Drop support for Node.js 16 and 18, minimum required version is now Node.js 20
- Drop support for ESLint 8, minimum required version is now ESLint 9.3.6
- Drop support for TypeScript 4, minimum required version is now TypeScript 5.9.2

**The following rules have been removed:**

- `react-x/no-complicated-conditional-rendering` (discontinued)

**The following rules have been renamed:**

- `react-x/ensure-forward-ref-using-ref` to `react-x/no-useless-forward-ref`
- `react-x/no-comment-textnodes` to `react-x/jsx-no-comment-textnodes`
- `react-x/no-duplicate-props` to `react-x/jsx-no-duplicate-props`
- `react-x/no-nested-components` to `react-x/no-nested-component-definitions`
- `react-x/prefer-react-namespace-import` to `react-x/prefer-namespace-import`
- `react-x/use-jsx-vars` to `react-x/jsx-uses-vars`
- `react-dom/no-children-in-void-dom-elements` to `react-dom/no-void-elements-with-children`

**The following rules have been consolidated into new rules:**

- `react-x/jsx-shorthand-boolean` replaces `avoid-shorthand-boolean` and `prefer-shorthand-boolean`
- `react-x/jsx-shorthand-fragment` replaces `avoid-shorthand-fragment` and `prefer-shorthand-fragment`
- `react-hooks-extra/no-direct-set-state-in-use-effect` replaces `no-direct-set-state-in-use-layout-effect`

**The following rules have been moved from `react-hooks-extra` to `react-x`:**

- `react-hooks-extra/no-unnecessary-use-callback` to `react-x/no-unnecessary-use-callback`
- `react-hooks-extra/no-unnecessary-use-memo` to `react-x/no-unnecessary-use-memo`
- `react-hooks-extra/no-unnecessary-use-prefix` to `react-x/no-unnecessary-use-prefix`
- `react-hooks-extra/prefer-use-state-lazy-initialization` to `react-x/prefer-use-state-lazy-initialization`

**The following presets have been removed:**

- `core` (replaced by `x`)
- `off-dom` (replaced by `disable-dom`)

**The following settings have been removed from `settings["react-x"]`:**

- `additionalComponents` (discontinued)
- `additionalHooks` (discontinued)
- `skipImportCheck` (discontinued)

Rules previously using these settings have been refactored to use improved heuristics and no longer require manual configuration.

**Reference for Removed**: [https://eslint-react.xyz/docs/removed](https://eslint-react.xyz/docs/removed)

### ✨ New Features

**Added the following new rules:**

- `react-x/jsx-shorthand-boolean`: Enforces a consistent style for boolean attributes (@Rel1cx)
- `react-x/jsx-shorthand-fragment`: Enforces a consistent style for React Fragments (@Rel1cx)
- `react-x/no-forbidden-props`: Disallows specific props on components (@reteps)
- `react-x/no-unnecessary-key`: Reports unnecessary `key` props on elements (@Rel1cx, @kachkaev)
- `react-x/no-unused-props`: Reports unused props in components (@ulrichstark)
- `react-dom/no-string-style-prop`: Disallows string values for the `style` prop (@Rel1cx, @karlhorky)
- `react-dom/prefer-namespace-import`: Enforces using a namespace import for `react-dom` (@Rel1cx)

**The following new rule has been added to the `recommended-type-checked` preset:**

- `react-x/no-unused-props`: Reports unused props in components

**The following rules now support Codemod features:**

- `react-x/no-component-did-update` (@Rel1cx)
- `react-x/no-component-will-receive-props` (@Rel1cx)
- `react-x/no-component-will-update` (@Rel1cx)
- `react-x/no-context-provider` (@Rel1cx)
- `react-x/no-forward-ref` (@Rel1cx)
- `react-x/no-string-refs` (@Rel1cx)

**The following rules now support auto-fix:**

- `react-x/no-missing-context-display-name` (@k-yle)

**The following rules now support suggestion fixes:**

- `react-dom/no-missing-button-type` (@Rel1cx)
- `react-dom/no-missing-iframe-sandbox` (@Rel1cx)
- `react-dom/no-unsafe-target-blank` (@Rel1cx)

**New configuration preset added:**

- `disable-conflict-eslint-plugin-react`: Disables rules in `eslint-plugin-react` that conflict with rules in our plugins (@reteps)

### 🐞 Bug Fixes

- `fix(react-x/no-unnecessary-use-prefix)`: Fixed a false positive for React Hooks defined within the callback function of `vi.mock(...)` in Vitest test files (@Rel1cx)
- `fix(react-web-api/no-leaked-event-listener)`: Fixed the `useEffect` setup function check to correctly handle `React.useEffect()` calls (@Rel1cx)
- `fix(react-naming-convention/filename)`: Fixed a false positive on well-known filenames like `404.tsx`, `_app.tsx`, `[slug].tsx` (@Rel1cx)

### 🪄 Improvements

- refactor: Simplified the React API detection logic (@Rel1cx)
- refactor: Cleaned up utilities and simplified rule implementations (@Rel1cx)
- docs: Added a comparison table between `eslint-plugin-react` and `eslint-react` rules (@reteps)
- docs: Replaced `tseslint.config` with `defineConfig` in all examples (@Rel1cx)
- build: Migrated the build system from `tsup` to `tsdown` for better performance (@Rel1cx)

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.53.1...v2.0.0

## v1.53.1 (2025-09-11)

### 🐞 Fixes

- fix: fix useEffect setup function check in `web-api/no-leaked-event-listener`, closes #1228 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1229

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.53.0...v1.53.1

## v1.53.0 (2025-09-04)

### ✨ New

- feat: update naming convention rules default excepts to include common patterns by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1216

### 🪄 Improvements

- build: replace `tsup` with `tsdown` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1213

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.52.8...v1.53.0

## v1.52.9 (2025-08-31)

### 🐞 Fixes

- fix: issue introduced in version [v1.52.7](https://github.com/Rel1cx/eslint-react/releases/tag/v1.52.7) where the `react-hooks-extra` rules were not exported, closes #1207 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1208

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.52.8...v1.52.9

## v1.52.8 (2025-08-29)

### 🐞 Fixes

- fix: restore ESLint legacy config compatibility, closes #1203 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1204

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.52.7...v1.52.8

## v1.52.7 (2025-08-29)

### 🐞 Fixes

- fix: add ESLint compatibility types and update plugins exports, closes #1200 by @Rel1cx in https://github.com/Rel1cx/eslint-react/commit/f3083c78f680d486f8894532b7714d1bdf8f9cd7

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.52.6...v1.52.7

## v1.52.6 (2025-08-18)

### 🐞 Fixes

- fix: correct logic in `naming-convention/component-name` validation to continue on valid names, closes #1176 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1177>

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.52.5...v1.52.6

## v1.52.5 (2025-08-15)

### 🐞 Fixes

- fix: refactor `is-from-react` utility in `react-debug/is-from-react` rule and improve `react-x/no-forward-ref` rule autofix handling, closes #1172 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1173

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.52.4...v1.52.5

## v1.52.4 (2025-08-13)

### 🐞 Fixes

- fix: improve logic for detecting significant children in JSX elements, closes #1163 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1165

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.52.3...v1.52.4

## v1.52.3 (2025-07-13)

### 🐞 Fixes

- fix: remove `bun` engine requirement from `package.json` files, closes #1157 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1158

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.52.2...v1.52.3

## v1.52.2 (2025-06-12)

### 🐞 Fixes

- fix: `react-x/no-default-props` should report only function components, closes #1131 by @Rel1cx in https://github.com/Rel1cx/eslint-react/commit/681b10a7873e4764336a9e7a49dfd33c8bf1fbef

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.52.1...v1.52.2

## v1.52.1 (2025-06-11)

### ✨ New

- feat: add autofix for `no-missing-context-display-name` by @k-yle in https://github.com/Rel1cx/eslint-react/pull/1128

### New Contributors

- @k-yle made their first contribution in https://github.com/Rel1cx/eslint-react/pull/1128

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.51.3...v1.52.1

## v1.51.3 (2025-06-09)

### 🐞 Fixes

- fix: update messages for `react-x/jsx-no-iife` and `react-x/jsx-uses-vars` rules by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1127

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.51.2...v1.51.3

## v1.51.2 (2025-06-08)

### 🐞 Fixes

- fix: skip function components without name in `react-x/prefer-read-only-props` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1125

### 🪄 Improvements

- docs: update references from 'Language Config' to 'Project Config' across documentation by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1126

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.51.1...v1.51.2

## v1.51.1 (2025-06-06)

### 🐞 Fixes

- fix: fixed jsx detection method not respect SkipEmptyArray hint, closes #1122 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1124

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.51.0...v1.51.1

## v1.51.0 (2025-06-03)

### ✨ New

- feat(react-x): add `jsx-no-iife` rule, closes #1112 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1113

### 🐞 Fixes

- fix: fixed `no-direct-set-state-in-use-effect` deferred setState calls detection, closes #1117 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1119

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.50.0...v1.51.0

## v1.50.0 (2025-05-25)

### 🐞 Fixes

- fix: `polymorphicPropName` not work with `no-void-elements-with-children` by @huynhducduy in https://github.com/Rel1cx/eslint-react/pull/1108
- fix: use stable version `zod`, closes #1110

### New Contributors

- @huynhducduy made their first contribution in https://github.com/Rel1cx/eslint-react/pull/1108

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.49.0...v1.50.0

## v1.49.0 (2025-05-05)

### ✨ New

- feat: add `jsx-key-before-spread`, closes #1093, closes #1087 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1105

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.48.5...v1.49.0

## v1.48.5 (2025-04-25)

### 🐞 Fixes

- fix: fixed named export 'JsxEmit' not found, closes #1095 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1096

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.48.4...v1.48.5

## v1.48.4 (2025-04-19)

### 🐞 Fixes

- fix: update fallback react version in settings to "19.1.0"

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.48.3...v1.48.4

## v1.48.3 (2025-04-17)

### 🪄 Improvements

- refactor: improve settings handling by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1080
- docs: add more examples to `web-api/no-leaked-event-listener` docs by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1082

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.48.2...v1.48.3

## v1.48.2 (2025-04-16)

### 🐞 Fixes

- fix: could not find `hooks-extra/no-direct-set-state-in-use-effect` in plugin `react-hooks-extra`, closes #1077 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1078

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.48.1...v1.48.2

## v1.48.1 (2025-04-16)

### 🐞 Fixes

- fix: rewrite react api detection to better align with `eslint-plugin-react-hook` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1074
- fix: use preferred loc in error maker in `hooks-extra/no-unnecessary-use-prefix` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1073

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.47.4...v1.48.0

## v1.47.4 (2025-04-15)

### 🐞 Fixes

- fix: update `hooks-extra/no-unnecessary-use-prefix` to skip well-known hooks like `useMDXComponents` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1072

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.47.3...v1.47.4

## v1.47.3 (2025-04-15)

### 🐞 Fixes

- fix: fixed potential false negatives in `no-leaked-conditional-rendering` when logical expressions are wrapped by type expressions by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1068

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.47.2...v1.47.3

## v1.47.2 (2025-04-14)

### 🐞 Fixes

- fix: use smaller error marker range to reduce visual noise by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1064

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.47.1...v1.47.2

## v1.47.1 (2025-04-14)

### 🐞 Fixes

- fix: better debug rules message formatting by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1062

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.47.0...v1.47.1

## v1.47.0 (2025-04-14)

### 🪄 Improvements

- refactor: remove `@eslint-react/jsx` package and move functionality to `@eslint-react/core` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1060

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.46.0...v1.47.0

## v1.46.0 (2025-04-13)

### ✨ New

- feat: use json for diagnostic output format of debug rules by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1058

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.45.3...v1.45.4

## v1.45.4 (2025-04-13)

### 🪄 Improvements

- perf: replace `Map` with `WeakMap` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1057

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.45.3...v1.45.4

## v1.45.3 (2025-04-12)

### 🪄 Improvements

- pref: replace `picomatch.makeRe` with `RE.toRegExp` for pattern matching by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1055

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.45.2...v1.45.3

## v1.45.2 (2025-04-12)

### 🪄 Improvements

- docs: add table of contents to the README by @Rel1cx in https://github.com/Rel1cx/eslint-react/commit/b880cb95d2245f7034f47e883d944c9a8b4ecf5f

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.45.1...v1.45.2

## v1.45.1 (2025-04-12)

### 🐞 Fixes

- fix: fixed `hooks-extra/no-unnecessary-use-prefix` case sensitivity fails, closes #1053 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1054

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.45.0...v1.45.1

## v1.45.0 (2025-04-11)

### ✨ New

- feat: add `react-x/no-misused-capture-owner-stack` rule, closes #1049 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1047
- feat: add `react-x/no-nested-lazy-component-declarations` rule, closes #1048 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1052
- feat: add `react-x/no-nested-lazy-component-declarations` rule to recommended presets by @Rel1cx

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.44.0...v1.45.0

## v1.44.0 (2025-04-11)

### ✨ New

- feat: add JSX fragment factory to error message of `react-x/avoid-shorthand-fragment` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1051

### 🪄 Improvements

- perf: replace `valibot` with `@zod/mini` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1050

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.43.0...v1.44.0

## v1.43.0 (2025-04-10)

### ✨ New

- feat: add codemod feature to `react-x/no-string-refs`, closes #1044 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1045

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.42.1...v1.43.0

## v1.42.1 (2025-04-08)

### ✨ New

- feat: rename `core` preset to `x` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1042

### 📝 Changes you should be aware of

The following presets have been renamed:

- `core` to `x`
- `core-legacy` to `x-legacy`

The old preset names will still be available until the next major update to avoid breaking changes.

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.41.0...v1.42.1

## v1.41.0 (2025-04-08)

### ✨ New

- feat: add `react-debug/jsx` rule by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1041

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.40.4...1.41.0

## v1.40.4 (2025-04-07)

### 🐞 Fixes

- fix: refactor JSX runtime annotation handling by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1038

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.40.3...v1.40.4

## v1.40.3 (2025-04-04)

### 🐞 Fixes

- fix: fixed `no-useless-fragment` false positive when using `&nbsp;`, closes #1035 by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1036

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.40.2...v1.40.3

## v1.40.2 (2025-04-03)

### 🐞 Fixes

- fix(react-x): fixed `jsx-uses-react` rule for `preserve` mode by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1031
- fix: use initial release year and consistent username in LICENSE by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1032

### 🪄 Improvements

- refactor(kit): simplify `LanguagePreferenceSchema` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1033
- refactor(website): reorganize CSS and improve theme by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1034

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.40.1...v1.40.2

## v1.40.1 (2025-04-01)

### ✨ New

- feat(react-x): enhance `jsx-uses-react` rule to support `@jsx` and `@jsxFrag` annotation comments by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1029
- feat(kit): add `LanguagePreference` by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1028

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.40.0...v1.40.1

## v1.40.0 (2025-04-01)

### ✨ New

- feat(react-x): add `react-x/jsx-uses-react` rule by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1027
- feat: enable `react-x/jsx-uses-react` rule in recommended presets by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1027
- feat: enable `naming-convention/context-name` rule in recommended presets by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1024
- feat(kit): add `JsxRuntime` module by @Rel1cx in https://github.com/Rel1cx/eslint-react/pull/1025

**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v1.38.4...v1.40.0

## v1.38.4 (2025-03-29)

### 🪄 Improvements

- chore: update default React version to 19.1.0 in documentation and settings by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1023>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.38.3...v1.38.4>

## v1.38.3 (2025-03-28)

### 🪄 Improvements

- docs: switch back to the original slogan by @Rel1cx in <https://github.com/Rel1cx/eslint-react/commit/e0e4d460c>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.38.2...v1.38.3>

## v1.38.2 (2025-03-27)

### 🐞 Fixes

- fix(eslint-plugin): disable `prefer-shorthand-*` rules in `all` config by @Rel1cx in <https://github.com/Rel1cx/eslint-react/commit/a9e6ef9f97f968bb9366af3e5b40138fb4b6b679>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.38.0...v1.38.2>

## v1.38.0 (2025-03-25)

### ✨ New

- feat: add `react-x/jsx-no-undef` rule, closes #1016 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1018>
- feat: add `hooks-extra/prefer-use-state-lazy-initialization` rule to recommended presets by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1019>
- docs: add experimental status to rules overview by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1012>

### 🪄 Improvements

- refactor: undeprecate `react-x/jsx-uses-vars` and `react-x/jsx-no-duplicate-props` rules by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1017>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.37.3...v1.38.0>

## v1.37.3 (2025-03-22)

### 🐞 Fixes

- fix: the requested module `ts-api-utils` does not provide an export named `unionConstituents`, closes #1009 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1010>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.37.2...v1.37.3>

## v1.37.2 (2025-03-22)

### 🐞 Fixes

- fix: `prefer-read-only-props` false positive using React types, closes #962 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1008>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.37.1...v1.37.2>

## v1.37.1 (2025-03-22)

### 🐞 Fixes

- fix: enhance `hooks-extra/prefer-use-state-lazy-initialization` to correctly detect other hooks called within `useState(...)` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1006>

### 🪄 Improvements

- docs: improve rule description and error message by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1003> and <https://github.com/Rel1cx/eslint-react/pull/1007>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.37.0...v1.37.1>

## v1.37.0 (2025-03-20)

### 🪄 Improvements

- refactor: remove `hooks-extra/prefer-use-state-lazy-initialization` from recommended presets by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1001>
  > Based on feedback of this rule, the current implementation produces more false positives than expected, so to ensure the overall quality of the rules in the recommended presets we provide, I'm removing it from the presets for now, and should add it back after we implement a better heuristic for deciding which function calls should be allowed.

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.36.3...v1.37.0>

## v1.36.3 (2025-03-20)

### 🐞 Fixes

- fix: `hooks-extra/prefer-use-state-lazy-initialization` false positive on `useState(use(promise))` closes #999 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/1000>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.36.2...v1.36.3>

## v1.36.2 (2025-03-20)

No notable changes have been made in this release.

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.36.1...v1.36.2>

## v1.36.1 (2025-03-19)

### 🪄 Improvements

- refactor(naming-convention/use-state): enhance error messaging and docs, closes #980 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/997>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.35.0...v1.36.1>

## v1.35.0 (2025-03-18)

### ✨ New

- feat(plugins/dom): add `no-render` rule to replace `ReactDom.render()` with `createRoot(node).render()`, closes #972 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/993>
- feat(plugins/dom): add `no-hydrate` rule to replace `ReactDom.hydrate()` with `hydrateRoot()`, closes #973 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/995>

### 🪄 Improvements

- refactor: rename `hooks-extra/no-useless-custom-hooks` to `hooks-extra/no-unnecessary-use-prefix` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/996>

### 📝 Changes you should be aware of

The following rules have been renamed:

- `react-hooks-extra/no-useless-custom-hooks` to `react-hooks-extra/no-unnecessary-use-prefix`
- `@eslint-react/hooks-extra/no-useless-custom-hooks` to `@eslint-react/hooks-extra/no-unnecessary-use-prefix`

The old rule names will still be available until the next major update to avoid breaking changes.

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.34.1...v1.35.0>

## v1.34.1 (2025-03-15)

### 🐞 Fixes

- fix: false positive in `react-x/no-context-provider` on symbols named `Provider` which are imported from third-party libs, closes #991 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/992>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.34.0...v1.34.1>

## v1.34.0 (2025-03-15)

### 🪄 Improvements

- refactor: export the create function of each rule by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/989>
- refactor(plugins/x): rename `no-nested-components` rule to `no-nested-component-definitions` and update related docs by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/990>

### 📝 Changes you should be aware of

The following rules have been renamed:

- `react-x/no-nested-components` to `react-x/no-nested-component-definitions`
- `@eslint-react/no-nested-components` to `@eslint-react/no-nested-component-definitions`

The old rule names will still be available until the next major update to avoid breaking changes.

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.33.0...v1.34.0>

## v1.33.0 (2025-03-14)

### 🐞 Fixes

- fix: update rule severity for `no-flush-sync` and `no-void-elements-with-children` in recommended presets by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/988>

### 🪄 Improvements

- refactor(plugins/x): rename `ensure-forward-ref-using-ref` to `no-useless-forward-ref` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/987>

### 📝 Changes you should be aware of

The following rules have been renamed:

- `react-x/ensure-forward-ref-using-ref` to `react-x/no-useless-forward-ref`
- `@eslint-react/ensure-forward-ref-using-ref` to `@eslint-react/no-useless-forward-ref`

The old rule names will still be available until the next major update to avoid breaking changes.

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.32.1...v1.33.0>

## v1.32.1 (2025-03-13)

### 🐞 Fixes

- fix: fixed `no-context-provider` replaces `<Provider>` with `<>`, closes #984 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/985>

## v1.32.0 (2025-03-12)

### ✨ New

- feat: revert 'feat: add naming-convention/use-state and naming-convention/context-name to recommended presets by @Rel1cx in #956' by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/982>

### 🪄 Improvements

- docs: update eslint configs in examples to use extends by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/978>
- docs: update ts configs in examples to use project references by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/979>

## v1.31.0 (2025-03-07)

### ✨ New

- feat: enhance regex handling in naming convention rules by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/969>

### 🪄 Improvements

- docs: improve rules descriptions by @Rel1cx

## v1.30.2 (2025-03-05)

### 🐞 Fixes

- fix(plugins/hooks-extra): misidentification of `set` function in IIFE inside of hooks as its inside of `useEffect`, `useLayoutEffect`, closes [#967](https://github.com/Rel1cx/eslint-react/issues/967) by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/968>

## v1.30.1 (2025-03-04)

### 🐞 Fixes

- fix(utilities/var): fix variable init node retrieval, fixes [#964](https://github.com/Rel1cx/eslint-react/pull/964) by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/965>

### 🪄 Improvements

- refactor(plugins/hooks-extra): improve code reusability by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/963>

### New Contributors

- @mrginglymus made their first contribution in <https://github.com/Rel1cx/eslint-react/pull/964>

## v1.30.0 (2025-03-03)

### ✨ New

- feat: add `naming-convention/use-state` and `naming-convention/context-name` to recommended presets by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/956>

### 🐞 Fixes

- fix: correct readonly checks and test cases in `prefer-read-only-props` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/957>
- fix: rework `naming-convention/component-name` rule to follow [eslint-plugin-react-hooks@5.0](https://github.com/facebook/react/releases/tag/eslint-plugin-react-hooks%405.0.0) by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/959>
  > Component names now need to start with an uppercase letter instead of a non-lowercase letter. This means `_Button` or `_component` are no longer valid.
- fix: `naming-convention/use-state` fails with multiple words, closes #960 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/961>

## v1.29.0 (2025-03-01)

### ✨ New

- feat(plugins/naming-convention): add `context-name` rule by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/952>

### 🐞 Fixes

- fix: fixed `naming-convention/use-state` works in components only, closes #953 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/954>

### 🪄 Improvements

- docs: use `recommended-typescript` for typescript files by @bluwy in <https://github.com/Rel1cx/eslint-react/pull/949>

### New Contributors

- @bluwy made their first contribution in <https://github.com/Rel1cx/eslint-react/pull/949>

## v1.28.0 (2025-02-26)

### ✨ New

- feat(plugins/dom): add `no-flush-sync` rule by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/942>
- feat: add [`skipImportCheck`](https://eslint-react.xyz/docs/configurations#skipimportcheck) setting by @Rel1cx

### 🪄 Improvements

- refactor: code optimization by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/945>
- refactor: consistent ordering of arguments to context-aware utility functions by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/946>

## v1.27.0 (2025-02-21)

### ✨ New

- feat: add presets exports to modular plugins by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/940>
- feat: add `no-missing-context-display-name` rule by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/941>

### 🪄 Improvements

- refactor: improve error messages by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/936> and <https://github.com/Rel1cx/eslint-react/pull/937>
- refactor: add `useEffect` to `additionalHooks` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/938>
- refactor: change severity of `no-duplicate-key` rule from `error` to `warn` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/939>

## v1.26.2 (2025-02-06)

### 🐞 Fixes

- fix(plugins/x): enhance `no-context-provider` rule to include context name in error messages by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/935>

## v1.26.1 (2025-02-03)

No notable changes have been made in this release.

## v1.26.0 (2025-01-31)

### ✨ New

- feat(plugins/x): add 'no-use-context', closes #930 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/931>

## v1.25.0 (2025-01-27)

### ✨ New

- feat(no-useless-fragment): auto fix support, closes #899 by @hyoban in <https://github.com/Rel1cx/eslint-react/pull/926>
- docs: add [setup guide](https://eslint-react.xyz/docs/getting-started/typescript-with-alternative-parser) for `ts-blank-eslint-parser` by @Rel1cx
- docs: add [setup example](https://github.com/Rel1cx/eslint-react/blob/98f3a6ccc83132c2e0a82c0f500dc88dcd1dcfc7/examples/vite-react-dom-with-ts-blank-eslint-parser-app/eslint.config.js) for `ts-blank-eslint-parser` by @Rel1cx

### 🐞 Fixes

- fix(no-forward-ref): loose fix by @hyoban in <https://github.com/Rel1cx/eslint-react/pull/925>

### 🪄 Improvements

- refactor(website): switch from nextra to fumadocs by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/928>

## v1.24.1 (2025-01-22)

### 🐞 Fixes

- fix: fixed invalid rules for `disable-debug`, `disable-dom`, and `disable-web-apis` configs, closes <https://github.com/Rel1cx/eslint-react/issues/923> by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/924>

## v1.24.0 (2025-01-21)

### 🪄 Improvements

- perf: overhaul performance optimizations

## v1.23.2 (2025-01-07)

### ✨ New

- feat(plugins/x): add auto-fix to `prefer-shorthand-fragment`, closes #898 (#902)

## v1.23.1 (2025-01-03)

### 🐞 Fixes

- fix(plugins/x): fixed false positives in `no-unstable-context-value` and `no-unstable-default-props` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/896>

## v1.23.0 (2024-12-31)

### 🪄 Improvements

- refactor: JSX fragments related rules no longer rely on `jsxPragma` and `jsxPragmaFrag` settings to perform their checks by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/893>
- refactor: improve applicability of the `no-useless-fragment` and `prefer-shorthand-fragment` rules
- refactor: deprecate `settings["react-x"].jsxPragma` and `settings["react-x"].jsxPragmaFrag` as they are no longer needed by any rules
- refactor: replace `short-unique-id` w/ `uid` by @SukkaW in <https://github.com/Rel1cx/eslint-react/pull/894>

### 🐞 Fixes

- fix(plugins/hooks-extra): fix `call` and `new` expression related false positives in `no-unnecessary-use-memo` and `no-unnecessary-use-callback` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/895>

## v1.22.2 (2024-12-30)

### 🪄 Improvements

- perf: re-implement `no-duplicate-key` rule to improve its performance @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/891> and [33ab3cc](https://github.com/Rel1cx/eslint-react/commit/33ab3cc6ca11bf8412e07efa35f640dfbad77f6e)
- refactor: prevent potential interference from TypeScript's `as`, `satisfies`, and non-null assertion operator in various rules

## v1.22.1 (2024-12-24)

### 🪄 Improvements

- docs: add getting started guides for JavaScript, TypeScript, and JavaScript with Babel
- docs: improve code samples in rules docs
- docs: improve `eslint.config.js` examples in README.md, docs and the examples folder
- docs: improve the error message and description of various rules
- refactor(website): better website layout and navigation experience

### 📝 Changes in examples

The `eslint.config.js` in the examples now uses `tsconfig`'s `includes` and `excludes` as the SSoT glob patterns for ESLint's `files` and `ignores` fields.

This approach can fundamentally avoid the errors[[1](https://typescript-eslint.io/troubleshooting/typed-linting/#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided), [2](https://typescript-eslint.io/troubleshooting/typed-linting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file), [3](https://typescript-eslint.io/troubleshooting/typed-linting/#i-get-errors-telling-me--was-not-found-by-the-project-service-consider-either-including-it-in-the-tsconfigjson-or-including-it-in-allowdefaultproject)] caused by mismatched config scopes between `tsconfig.json` and `eslint.config.js` when using type-checked rules.

## v1.22.0 (2024-12-22)

### 🪄 Improvements

- refactor(plugins/x): rename `jsx-use-vars` to `use-jsx-vars`
- refactor(plugins/x): rename `jsx-no-duplicate-props` to `no-duplicate-jsx-props`
- refactor(plugins/dom): rename `no-children-in-void-dom-elements` to `no-void-elements-with-children`

### 📝 Changes you should be aware of

The following rules have been renamed:

- `jsx-uses-vars` to `use-jsx-vars`
- `jsx-no-duplicate-props` to `no-duplicate-jsx-props`
- `dom/no-children-in-void-dom-elements` to `dom/no-void-elements-with-children`

The new rule names are aligned with the same rules in the [biomejs/rules-sources/#eslint-plugin-react](https://biomejs.dev/linter/rules-sources/#eslint-plugin-react) (if any) to enhance consistency. The old rule names will still be available until the next major update to avoid breaking changes.

## v1.21.0 (2024-12-20)

### ✨ New

- feat(plugins/hooks-extra): add `no-useless-custom-hooks` rule by @Rel1cx

### 🪄 Improvements

- refactor(plugins/hooks-extra): deprecate rule `no-redundant-custom-hook` in favor of `no-useless-custom-hooks` (the previous rule will still be available until the next major update to avoid breaking changes)

### 📝 Changes in Rule implementation

`no-useless-custom-hooks` now detects Hook calls within comments and the following code no longer triggers a warning:

```tsx
// ✅ Good: A Hook that will likely use some other Hooks later
function useAuth() {
  // TODO: Replace with this line when authentication is implemented:
  // return useContext(Auth);
  return TEST_USER;
}
```

## v1.20.1 (2024-12-18)

### 🪄 Improvements

- refactor(shared): replace `local-pkg` package with node built-in API by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/881>

## v1.20.0 (2024-12-16)

### ✨ New

- feat(plugins/x): add codemod-autofix to `no-component-will-*` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/879>

### 🪄 Improvements

- refactor: use default settings when no settings are provided in `settings["react-x"]` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/commit/40ca3bd1cd7adc44f40841b5b4635e0200b73a54>
- docs: update `no-context-provider.mdx` by @danielrentz in <https://github.com/Rel1cx/eslint-react/pull/877>
- docs: add 'Min. React' column to rules overview page by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/880>
- docs: add features section to rules overview page by @Rel1cx

### New Contributors

- @danielrentz made their first contribution in <https://github.com/Rel1cx/eslint-react/pull/877>

## v1.19.0 (2024-12-10)

### ✨ New

- feat(plugins/x): add `no-context-provider` rule by @Rel1cx
- feat(plugins/x): add autofix for `no-forward-ref` rule by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/874>
- feat(plugins/eslint-plugin): add `no-forward-ref` and `no-context-provider` to recommended presets by @Rel1cx

### 🪄 Improvements

- refactor(plugins/eslint-plugin): remove `prefer-read-only-props` from `recommended-type-checked` preset by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/872>
- refactor(plugins/eslint-plugin): hide `avoid-shorthand-boolean` and `avoid-shorthand-fragment` from presets and docs by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/876>
- Update `@typescript-eslint`'s packages to `^8.18.0`

## v1.18.0 (2024-12-08)

### ✨ New

- feat(plugins/x): add `no-forward-ref` rule by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/870>

### 🪄 Improvements

- perf(plugins/dom): improve performance of `no-void-elements-with-children` by @Rel1cx

## v1.17.3 (2024-12-03)

### 🐞 Fixes

- fix(plugins/web-api): add 'forEach' support to 'no-leaked-event-listener', closes #842 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/867>
- fix(plugins/web-api): add 'for of' support to 'no-leaked-event-listener', closes #842 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/869>
- fix(plugins/x): 'no-array-index-key' mistaking 'foo.bar.map' for 'Rea… by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/868>

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `^8.17.0`

## v1.17.2 (2024-12-01)

### 🪄 Improvements

- Update `eslint`'s packages to `^9.16.0`
- Update `@typescript-eslint`'s packages to `^8.16.0`
- Update `ts-api-utils` to `^2.0.0`

## v1.17.1 (2024-11-22)

### ✨ New

- feat(shared): add version detection logic;

### 🐞 Fixes

- fix(plugins/x): 'no-leaked-conditional-rendering' should also warn 'anyStringVar' when react version is lower than 18, closes #853 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/864>
- fix(plugins/dom): add popover api props to 'no-unknown-property', closes #855 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/865>
- fix(plugins/debug): 'is-from-react' use correct settings when calling 'isInitializedFromReact', by @Rel1cx

## v1.17.0 (2024-11-21)

### ✨ New

- feat(plugins/naming-convention): add 'ignoreFilesWithoutCode' option to 'filename-extension'

### 🐞 Fixes

- refactor(plugins/x): xhtml entities should be allowed inside of 'no-useless-fragment', closes: #850
- fix(plugins/eslint-plugin): unexpected top-level property 'name' in legacy presets, closes #863
- fix(plugins/eslint-plugin): rules list in 'debug' and 'disable-debug' presets

## v1.16.2 (2024-11-20)

### 🐞 Fixes

- fix(plugins/x): 'no-leaked-conditional-rendering' report empty string, closes #853 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/857>

### 🪄 Improvements

- refactor: update the default behavior of import check, closes #858 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/860>

## v1.16.1 (2024-11-10)

### ✨ New

- feat(plugins/x): add `jsx-no-duplicate-props` by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/851>

### 🪄 Improvements

- docs: use correct link for `prefer-react-namespace-import` in rule list by @rakleed in <https://github.com/Rel1cx/eslint-react/pull/849>

## v1.16.0 (2024-11-01)

### ✨ New

- feat(plugins/react-x): add `jsx-uses-vars`, closes #834 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/845>
- feat(plugins/react-dom): add `no-unknown-property`, closes #846 by @Rel1cx
- feat: add `recommended-typescript` and `recommended-typescript-legacy` presets by @Rel1cx

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `^8.12.2`

## v1.15.2 (2024-10-29)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `^8.12.1`

## v1.15.1 (2024-10-26)

### ✨ New

- feat: added code fixer to `react-x/avoid-shorthand-boolean` and `react-x/prefer-shorthand-fragment` by @Rel1cx

### 🐞 Fixes

- fix(plugins/react-x): respect semicolon by @hyoban in <https://github.com/Rel1cx/eslint-react/pull/841>
- fix(utilities/ast): added missing ts `as` and `satisfies` expressions handling to `getFunctionIdentifier` by @Rel1cx , closes <https://github.com/Rel1cx/eslint-react/issues/843>

## v1.15.0 (2024-10-12)

### ✨ New

- feat: add support for constructors in `hooks-extra/prefer-use-state-lazy-initialization` by @imjordanxd in <https://github.com/Rel1cx/eslint-react/pull/829>
- feat: add `prefer-react-namespace-import`, closes #803 by @imjordanxd in <https://github.com/Rel1cx/eslint-react/pull/832>
- feat: add support for `allowExpressions` in `no-useless-fragment` by @imjordanxd in <https://github.com/Rel1cx/eslint-react/pull/836>

### 🐞 Fixes

- fix: Fix false positives when 'web-api/no-leaked-event-listener' passes a signal to an intermediate variable, closes #838

### 🪄 Improvements

- docs: Update `hooks-extra-no-direct-set-state-in-use-effect.mdx` by @neovov in <https://github.com/Rel1cx/eslint-react/pull/831>
- docs: use a standard mono-width font for the docs, closes #835 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/837>
- Undeprecate `hooks-extra-no-direct-set-state-in-use-layout-effect` and remove it from recommended presets, closes #839 by @Rel1cx in <https://github.com/Rel1cx/eslint-react/pull/840>

### New Contributors

- @imjordanxd made their first contribution in <https://github.com/Rel1cx/eslint-react/pull/829>
- @neovov made their first contribution in <https://github.com/Rel1cx/eslint-react/pull/831>

**Full Changelog**: <https://github.com/Rel1cx/eslint-react/compare/v1.14.3...v1.15.0>

## v1.14.3 (2024-09-29)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `^8.7.0`

## v1.14.2 (2024-09-20)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `^8.6.0`

## v1.14.1 (2024-09-12)

### 🐞 Fixes

- Fixed false positives in rule `web-api/no-leaked-resize-observer`

## v1.14.0 (2024-09-10)

### 🐞 Fixes

- Fixed modular plugins missing default export
- Fixed component name detection when the component name starts with a underscore

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `^8.5.0`

## v1.13.1 (2024-09-09)

### 🐞 Fixes

- Fixed `hooks-extra/no-unnecessary-use-callback` and `hooks-extra/no-unnecessary-use-memo` false positives when there are references from nested scopes

## v1.13.0 (2024-09-04)

### ✨ New

- Added `web-api/no-leaked-resize-observer` rule to prevent leaked `ResizeObserver`

### 🐞 Fixes

- `hooks-extra/no-redundant-custom-hook` should allow custom Hooks with empty body

### 🪄 Improvements

- Rename `debug/react-hooks` to `debug/hook`
- Rename `hooks-extra/ensure-custom-using-hooks` to `hooks-extra/no-redundant-custom-hook`
- Rename `hooks-extra/ensure-use-memo-has-non-empty-deps` to `hooks-extra/no-unnecessary-use-memo`
- Rename `hooks-extra/ensure-use-callback-has-non-empty-deps` to `hooks-extra/no-unnecessary-use-callback`
- Upgrade `@typescript-eslint`'s packages to `^8.4.0`

(The rules that were renamed in this release will still be available until the next major update to avoid breaking changes.)

## v1.12.4 (2024-08-31)

### ✨ New

- Added `useLayoutEffect` and `useInsertionEffect` support to `hooks-extra/no-direct-set-state-in-use-effect`

### 🪄 Improvements

- Deprecate rule `hooks-extra/no-direct-set-state-in-use-layout-effect` in favor of `hooks-extra/no-direct-set-state-in-use-effect` (the previous rule will still be available until the next major update to avoid breaking changes)

## v1.12.3 (2024-08-29)

### ✨ New

- Added support for detecting event listeners removed by abort signal in rule `web-api/no-leaked-event-listener`

### 🐞 Fixes

- Fixed `no-duplicate-key` rule false positives when the key is a variable
- Fixed `web-api/no-leaked-set-timeout` and `web-api/no-leaked-set-interval` false positives when a timer is assigned to a variable declared by `let` but not initialized

## v1.12.3 (2024-08-29)

### ✨ New

- Added support for detecting event listeners removed by abort signal in rule `web-api/no-leaked-event-listener`

### 🐞 Fixes

- Fixed `no-duplicate-key` rule false positives when the key is an variable
- Fixed `web-api/no-leaked-set-timeout` and `web-api/no-leaked-set-interval` false positives when a timer is assigned to a variable declared by `let` but not initialized

### 🪄 Improvements

- Allow upper case letters in the rule `naming-convention/component-name` when the component name is less than 4 characters, e.g. `UI`, `CSS`, `SVG`

## v1.12.2 (2024-08-27)

### ✨ New

- Added type declarations for `react-x` settings to the `@typescript-eslint/utils/ts-eslint` module via the `SharedConfigurationSettings` interface

### 🪄 Improvements

- Improve the performance of the `no-missing-key` and `no-duplicate-key` rules
- Upgrade `@typescript-eslint`'s packages to `^8.3.0`

## v1.12.1 (2024-08-22)

### ✨ New

- Add the options `allowAllCaps`, `allowNamespace`, `allowLeadingUnderscore` to `naming-convention/component-name` and set their default values to `false`

### 🪄 Improvements

- Normalize the component name in rule `naming-convention/component-name` before checking it against the pattern

## v1.12.0 (2024-08-21)

### ✨ New

- Added `hooks-extra` rules to `recommended` and `recommended-legacy` presets

## v1.11.0 (2024-08-20)

### ✨ New

- Added `eslint-plugin-react-web-api` - A plugin that provides rules for interacting with Web APIs in React applications
- Added `web-api/no-leaked-timeout` rule to prevent leaked `setTimeout`
- Added `web-api/no-leaked-interval` rule to prevent leaked `setInterval`
- Added `web-api/no-leaked-event-listener` rule to prevent leaked `addEventListener`
- Added `web-api` and `web-api-legacy` presets to enable all rules provided by `eslint-plugin-react-web-api`
- Added `react-web-api/no-leaked-event-listener` to `recommended` and `recommended-legacy` presets

### 🪄 Improvements

- Improve performance by skipping unnecessary checks when possible
- Improve dts generation of the `@eslint-react/eslint-plugin` package
- Improve website and documentation
- Upgrade `@typescript-eslint`'s packages to `^8.2.0`

## v1.10.1 (2024-08-13)

### 🐞 Fixes

- Fixed `hooks-extra/prefer-use-state-lazy-initialization` false positive when using an initializer function

### 🪄 Improvements

- Improve rule `no-implicit-key` error marker position and range
- Upgrade `@typescript-eslint`'s packages to `^8.1.0`
- Improve website and documentation

## v1.10.0 (2024-08-11)

### ✨ New

- Added `disable-type-checked` and `disable-type-checked-legacy` presets to disable all type-checked rules

### 🪄 Improvements

- Rename `off-dom` and `off-dom-legacy` presets to `disable-dom` and `disable-dom-legacy` (the old names will still be available until the next major update to avoid breaking changes)

## v1.9.1 (2024-08-08)

### 🐞 Fixes

- Fixed `dom/no-missing-iframe-sandbox` false positive when the `sandbox` attribute is set to `sandbox=""`
- Fixed `all` and `all-legacy` presets not including `hooks-extra` rules

## v1.9.0 (2024-08-06)

### ✨ New

- Add `core` preset that includes the most essential rules

### 🪄 Improvements

- Upgrade `@typescript-eslint`'s packages to `8.0.1`

## v1.8.2 (2024-08-03)

### 🐞 Fixes

- Fixed legacy presets not being exported correctly in `@eslint-react/eslint-plugin`

## v1.8.1 (2024-08-03)

### 🪄 Improvements

- Enhance rule `hooks-extra/no-direct-set-state-in-use-effect` and `hooks-extra/no-direct-set-state-in-use-layout-effect` to support `set` function directly passed to `useCallback` and `useMemo` without explicitly calling it
- Improve website and documentation

## v1.8.0 (2024-08-02)

### 🐞 Fixes

- Fixed `ESLintReactSettings` type not being exported correctly
- Fixed the `set` function calls that are wrapped in a `useMemo` or `useCallback` like hook not being detected by `hooks-extra/no-direct-set-state-in-use-effect` and `hooks-extra/no-direct-set-state-in-use-layout-effect`

### 🪄 Improvements

- Upgrade `@typescript-eslint`'s packages to `8.0.0`
- Improve website and documentation

## v1.7.1 (2024-07-31)

### 🐞 Fixes

- Fixed the spread attributes support for dom related rules
- Fixed the issue where the overridden value was retrieved when there were duplicate attributes on a JSX element

### 🪄 Improvements

- Rule `no-leaked-conditional-rendering` now allows a falsy boolean literal to be used on the left side of the logical expression
- Tweaked the default settings shipped with various presets
- Overall performance improvements

## v1.7.0 (2024-07-30)

### ✨ New

- Add `settings["react-x"].polymorphicPropName` setting to specify the name of the prop that is used to determine the component type

### 🪄 Improvements

- Dropped the current incomplete lint support for `React.createElement` to improve performance and subsequent code maintainability

## v1.6.0 (2024-07-27)

### ✨ New

- Add `controlled` setting to `settings["react-x"].additionalComponents`' `attributes` object to set whether it is controlled or not
- Add glob support to `settings["react-x"].additionalComponents`' `name` setting
- Add default settings for `react-x` settings to presets
- Undeprecate rule `no-implicit-key` and improve its usefulness
- Undeprecate rule `no-complicated-conditional-rendering` and rename it to `no-complex-conditional-rendering` (the previous rule will still be available until the next major update to avoid breaking changes)

### 🐞 Fixes

- `no-direct-set-state-in-use-(layout?)-effect` should warn only for the `set` function

### 🪄 Improvements

- Remove `no-direct-set-state-in-use-(layout?)-effect` from recommended presets

## v1.5.30 (2024-07-22)

### 🐞 Fixes

- Revert ~~change `@typescript-eslint`'s packages in `dependencies` to `"^7.16.1 || ^rc-v8"`~~ as this format is not supported by all package managers

## v1.5.29 (2024-07-22)

### ✨ New

- Add rule `no-prop-types`
- Add rule `no-default-props`
- Add experimental `settings["react-x"].additionalComponents` settings (currently only the `no-unsafe-target-blank` rule uses it, but more rules will use it in the future)

### 🪄 Improvements

- Add rule `no-prop-types` to recommended presets
- Add rule `no-default-props` to recommended presets
- Remove rule `no-useless-fragment` from recommended presets
- Optimize performance of rule `no-create-ref`
- Change `@typescript-eslint`' packages in `dependencies` to `"^7.16.1 || ^rc-v8"`

## v1.5.28 (2024-07-20)

### 🐞 Fixes

- Fix false positives and negatives in rule `hooks-extra/no-direct-set-state-in-use-effect`
- Fix false positives and negatives in rule `hooks-extra/no-direct-set-state-in-use-layout-effect`
- Fix rule `prefer-read-only-props` reports only the first component in a file

### 🪄 Improvements

- Improve website and documentation

## v1.5.27 (2024-07-16)

### 🐞 Fixes

- Fix rule `prefer-read-only-props` that was accidentally added to the recommended type-checked presets
- Fix false negatives in rule `hooks-extra/no-direct-set-state-in-use-effect` when call `set` function inside a non-function scope
- Fix false negatives in rule `hooks-extra/no-direct-set-state-in-use-layout-effect` when call `set` function inside a non-function scope

### 🪄 Improvements

- Rule `no-leaked-conditional-rendering` now supports BigInt literals on the left side of the logical expression
- Rule `no-leaked-conditional-rendering` now allows a truthy number literal to be used on the left side of the logical expression
- Optimize bundle size

## v1.5.26 (2024-07-15)

### ✨ New

- Add rule `hooks-extra/no-direct-set-state-in-use-effect`
- Add rule `hooks-extra/no-direct-set-state-in-use-layout-effect`

### 🐞 Fixes

- Fix false positives in rule `hooks-extra/ensure-use-memo-has-non-empty-deps` when referencing component block scope
- Fix false positives in rule `hooks-extra/no-unnecessary-use-callback` when referencing component block scope

### 🪄 Improvements

- Add rule `hooks-extra/no-direct-set-state-in-use-effect` to recommended presets
- Add rule `hooks-extra/no-direct-set-state-in-use-layout-effect` to recommended presets
- Add rule `hooks-extra/prefer-use-state-lazy-initialization` to recommended presets

## v1.5.25 (2024-07-13)

### 🪄 Improvements

- Optimize bundle size

## v1.5.24 (2024-07-11)

### 🐞 Fixes

- Fix rule `prefer-read-only-props` false positive when using `ObjectPattern` in function arguments

### 🪄 Improvements

- Change `typescript` version in `peerDependencies` to `"^4.9.5 || ^5.3.3"`

## v1.5.23 (2024-07-07)

### 🐞 Fixes

- Fix rule `prefer-read-only-props` false negative when using `ObjectPattern` in function arguments

### 🪄 Improvements

- Improve website and documentation

## v1.5.22 (2024-07-05)

### ✨ New

- Add rule `prefer-read-only-props`

### 🪄 Improvements

- Downgrade `@typescript-eslint`'s packages to v7, due to stability issues with v8

## v1.5.21 (2024-07-03)

### 🐞 Fixes

- Add missing dependencies to `@eslint-react/eslint-plugin`
- Fix rule `no-nested-components` false negative when placing components inside JSX props

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to v8
- Improve rule `no-leaked-conditional-rendering` compatibility with different versions of `typescript-eslint`

## v1.5.20 (2024-07-02)

### 🐞 Fixes

- Fix rule `prefer-destructuring-assignment` false positive when the function looks like a component

### 🪄 Improvements

- Improve `utilities/jsx/is-jsx-value` to better distinguish between normal values and JSX values
- Improve `core/component-collector` to better distinguish between normal functions and components
- Prevent potential function component detection related false positives
- Switch to a more appropriate value for `DEFAULT_COMPONENT_DETECTION_HINT`

## v1.5.19 (30 Sun Jun 2024)

### 🪄 Improvements

- Reduce the number of dependencies by inlining tree-shaking optimized code while bundling
- Deprecate `reactOptions` in favor of `react-x` in [ESLint Shared Settings](https://eslint.org/docs/latest/use/configure/configuration-files#configuring-shared-settings)

## v1.5.18 (28 Fri Jun 2024)

### 🐞 Fixes

- Fix rule `no-useless-fragment` not respecting `jsxPragma` settings

### 🪄 Improvements

- Update documentation for rule `no-useless-fragment` to reflect the actual behavior of the rule

## v1.5.17 (2024-06-26)

### 🪄 Improvements

- Remove rule `no-children-prop` from recommended presets
- Improve documentation for rule `no-useless-fragment`

## v1.5.16 (2024-06-17)

### 🐞 Fixes

- Fix debug rules not exporting correctly in `@eslint-react/eslint-plugin`

### 🪄 Improvements

- Remove rule `prefer-shorthand-boolean` from recommended presets
- Remove rule `prefer-shorthand-fragment` from recommended presets
- Remove rule `prefer-destructuring-assignment` from recommended presets

## v1.5.15 (2024-06-08)

### 🐞 Fixes

- Remove `languageOptions.parser` from presets
- Remove `@typescript-eslint/parser` from peer dependencies
- Rule `no-leaked-conditional-rendering`: object should be considered as valid left-hand type

## v1.5.14 (2024-05-30)

### ✨ New

- Add rule `avoid-shorthand-boolean`
- Add rule `avoid-shorthand-fragment`

### 🐞 Fixes

- Fix rule `dom/no-missing-button-type` false positive when using `type` attribute in a JSX expression

## v1.5.13 (2024-05-28)

### 🐞 Fixes

- Fix components that use `getDerivedStateFromError` should not be warned by rule `no-class-component`

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.11.0`

## v1.5.12 (2024-05-17)

### 🐞 Fixes

- Fix ESLint peer dependency range in `package.json`

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.9.0`
- Minor improvements

## v1.5.11 (2024-05-08)

### ✨ New

- Rule `no-class-component` rule now allows class components with a `componentDidCatch` method
- Settings `reactOptions` now supports `importSource` to specify the import source for React

### 🗑️ Deprecations

- Deprecate rule `no-implicit-key` because it is stylistic and opinionated
- Deprecate rule `no-complicated-conditional-rendering` because it is stylistic and opinionated

### 🪄 Improvements

- Refactor React pragma and import name retrieval utils to support custom import source
- Update `@typescript-eslint`'s packages to `7.8.0`

## v1.5.10 (2024-04-28)

### 🪄 Improvements

- Update `react` to `18.3.1`
- Update `@typescript-eslint`'s packages to `7.7.1`
- Use a wider range of peerDependencies

## v1.5.9 (2024-04-19)

### 🪄 Improvements

- Optimize error messages of rules
- Update `@typescript-eslint`'s packages to `7.7.0`

## v1.5.8 (2024-04-11)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.6.0`

## v1.5.7 (2024-03-28)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.4.0`

## v1.5.6 (2024-03-12)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.2.0`

## v1.5.5 (2024-02-18)

### 🐞 Fixes

- Fix rule `no-component-will-receive-props` not working as expected

### 🪄 Improvements

- Improve error messages and code samples in rule docs

## v1.5.4 (2024-02-16)

### 🐞 Fixes

- Fix rule `dom/no-render-return-value` not renamed in v1.0.0

### 🪄 Improvements

- Improve code samples in rule docs
- Update `effect` to `2.3.5`
- Update `@typescript-eslint`'s packages to `7.0.1`

## v1.5.3 (2024-02-10)

### 🪄 Improvements

- Improve diagnostic messages
- Remove needless deps from `peerDependencies`
- Update `@typescript-eslint`'s packages to `6.21.0`

## v1.5.2 (2024-01-31)

### 🪄 Improvements

- Remove needless deps from `peerDependencies`
- Update `@typescript-eslint`'s packages to `6.20.0`
- Update `effect` to `2.2.3`

## v1.5.2-beta.2 (2024-01-31)

### 🪄 Improvements

- Update `effect` to `2.2.3`
- Remove needless deps from `peerDependencies`

## v1.5.2-beta.0 (2024-01-30)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.20.0`

## v1.5.1 (2024-01-29)

### ✨ New

- Add `off-dom` and `off-dom-legacy` presets to disable all DOM related rules

### 🪄 Improvements

- Reduce dependencies size

## v1.5.0 (2024-01-29)

### 💥 Breaking Changes

- Remove rule `max-depth`
- Rename rule `no-spreading-key` to `no-implicit-key`
- Rename rule `no-constructed-context-value` to `no-unstable-context-value`
- Rename rule `no-unstable-nested-components` to `no-nested-components`
- Switch to new name prefix of rules in `@eslint-react/eslint-plugin`
  - Replace `jsx/` with `` in rule names
  - Replace `react/` with `` in rule names
  - Replace `react-dom/` with `dom/` in rule names
  - Replace `react-hooks/` with `hooks-extra/` in rule names
- Switch to new settings schema
  - Put settings under `reactOptions` instead of `eslintReact`
  - Replace `jsx.pragma` with `jsxPragma`
  - Replace `jsx.fragment` with `jsxPragmaFrag`
  - Replace `react.version` with `version`
  - Remove `jsx.extensions`

## v1.0.2 (2024-01-27)

### 🐞 Fixes

- Fix rule `react-dom/no-namespace` not renamed in v1.0.0
- Fix rule `react-dom/no-void-elements-with-children` not renamed in v1.0.0

### 🪄 Improvements

- Improve rules overview page on website
- Remove `jsx` and `hooks` presets from documentation

## v1.0.1 (2024-01-27)

### 🪄 Improvements

- Improve `jsx` and `jsx-legacy` presets
- Improve `core` and `core-legacy` presets
- Improve `recommended` and `recommended-legacy` presets
- Improve `recommended-type-checked` and `recommended-type-checked-legacy` presets

## v1.0.0 (2024-01-27)

### 💥 Breaking Changes

#### All DOM related rules are moved to `react-dom` namespace

- Rename rule `react/no-void-elements-with-children` to `react-dom/no-void-elements-with-children`
- Rename rule `react/no-dangerously-set-innerhtml-with-children` to `react-dom/no-dangerously-set-innerhtml-with-children`
- Rename rule `react/no-dangerously-set-innerhtml` to `react-dom/no-dangerously-set-innerhtml`
- Rename rule `react/no-find-dom-node` to `react-dom/no-find-dom-node`
- Rename rule `react/no-missing-button-type` to `react-dom/no-missing-button-type`
- Rename rule `react/no-missing-iframe-sandbox` to `react-dom/no-missing-iframe-sandbox`
- Rename rule `react/no-namespace` to `react-dom/no-namespace`
- Rename rule `react/no-render-return-value` to `react-dom/no-render-return-value`
- Rename rule `react/no-script-url` to `react-dom/no-script-url`
- Rename rule `react/no-unsafe-iframe-sandbox` to `react-dom/no-unsafe-iframe-sandbox`
- Rename rule `react/no-unsafe-target-blank` to `react-dom/no-unsafe-target-blank`

### ✨ New

- Make `dom` an alias of `react-dom` preset
- Make `hooks` an alias of `react-hooks` preset
- Add preset `jsx` and `jsx-legacy`
- Add preset `react-dom` and `dom-legacy`
- Add preset `core` and `core-legacy`
- Add preset `react-hooks` and `hooks-legacy`

### 🐞 Fixes

- Fix the lint message for rule `react-dom/no-dangerously-set-innerhtml`

## v1.0.0-beta.3 (2024-01-26)

### 🐞 Fixes

- Fix the name prefix for react-dom rules

## v1.0.0-beta.2 (2024-01-26)

### ✨ New

- Make `dom` an alias of `react-dom` preset
- Make `hooks` an alias of `react-hooks` preset

## v1.0.0-beta.1 (2024-01-26)

### ✨ New

- Add preset `jsx` and `jsx-legacy`
- Add preset `dom` and `dom-legacy`
- Add preset `core` and `core-legacy`
- Add preset `hooks` and `hooks-legacy`

## v1.0.0-beta.0 (2024-01-26)

### 💥 Breaking Changes

#### All DOM related rules are moved to `react-dom` namespace

- Rename rule `react/no-dangerously-set-innerhtml` to `react-dom/no-dangerously-set-innerhtml`
- Rename rule `react/no-dangerously-set-innerhtml-with-children` to `react-dom/no-dangerously-set-innerhtml-with-children`
- Rename rule `react/no-find-dom-node` to `react-dom/no-find-dom-node`
- Rename rule `react/no-missing-button-type` to `react-dom/no-missing-button-type`
- Rename rule `react/no-missing-iframe-sandbox` to `react-dom/no-missing-iframe-sandbox`
- Rename rule `react/no-script-url` to `react-dom/no-script-url`
- Rename rule `react/no-unsafe-iframe-sandbox` to `react-dom/no-unsafe-iframe-sandbox`
- Rename rule `react/no-unsafe-target-blank` to `react-dom/no-unsafe-target-blank`

## v0.10.12 (2024-01-21)

### 🪄 Improvements

- Remove unnecessary `parserOptions` fields from presets

## v0.10.12-beta.0 (2024-01-21)

### 🪄 Improvements

- Remove unnecessary `parserOptions` fields from presets

## v0.10.11 (2024-01-20)

### ✨ New

- Add rule `react/no-access-state-in-setstate`

### 🪄 Improvements

- Improve rule `react/no-unused-state` to respect the usage of `getDerivedStateFromProps`
- Update `@typescript-eslint`'s packages to `6.19.0`

## v0.10.11-beta.2 (2024-01-19)

### ✨ New

- Add rule `react/no-access-state-in-setstate`

## v0.10.11-beta.1 (2024-01-16)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.19.0`

## v0.10.11-beta.0 (2024-01-15)

### 🪄 Improvements

- Improve rule `react/no-unused-state` to respect the usage of `getDerivedStateFromProps`

## v0.10.10 (2024-01-14)

### 🪄 Improvements

- Improve rule `react/no-unused-state` to support checking for more cases
- Improve rule `react/no-direct-mutation-state` to support checking for more cases
- Improve rule `react/no-unused-class-component-members` to support checking for more cases

## v0.10.10-beta.0 (2024-01-14)

### 🪄 Improvements

- Improve rule `react/no-unused-state` to support checking for more cases
- Improve rule `react/no-direct-mutation-state` to support checking for more cases
- Improve rule `react/no-unused-class-component-members` to support checking for more cases

## v0.10.9 (2024-01-12)

### 🐞 Fixes

- Fix bundle size is larger than expected

## v0.10.8 (2024-01-11)

### 🐞 Fixes

- Fix version format in v0.10.7's package.json

## v0.10.7 (2024-01-11)

### ✨ New

- Add rule `react/no-unused-state`

## v0.10.6 (2024-01-09)

### 🐞 Fixes

- Fix an issue where `react/no-constructed-context-value` and `react/no-unstable-default-props` would report false negatives when using LogicalExpression and ConditionalExpression

## v0.10.6-beta.0 (2024-01-08)

### 🐞 Fixes

- Fix an issue where `react/no-constructed-context-value` and `react/no-unstable-default-props` would report false negatives when using LogicalExpression and ConditionalExpression

## v0.10.5 (2024-01-08)

### ✨ New

- Add rule `react/no-unused-class-component-members`

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.18.0`

## v0.10.5-beta.0 (2024-01-07)

### ✨ New

- Add rule `react/no-unused-class-component-members`

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.18.0`

## v0.10.4 (2024-01-06)

### 🪄 Improvements

- Improve rule `react/no-unstable-default-props` to support checking for ObjectPatterns within VariableDeclarators that occur on props
- Improve function component detection in rule `react/no-unstable-nested-components` and `debug/function-component`

### 🐞 Fixes

- Fix same kind of error inside a component should not only be reported once in rule `react/no-create-ref` and `react/no-constructed-context-value`
- Fix an issue where render functions wrapped in `useCallback` were accidentally detected as function components in rules `react/no-unstable-nested-components` and `debug/function-component`

## v0.10.4-beta.1 (2024-01-06)

### 🪄 Improvements

- Improve function component detection in rule `react/no-unstable-nested-components` and `debug/function-component`

### 🐞 Fixes

- Fix an issue where render functions wrapped in `useCallback` were accidentally detected as function components in rules `react/no-unstable-nested-components` and `debug/function-component`

## v0.10.4-beta.0 (2024-01-06)

### 🪄 Improvements

- Improve rule `react/no-unstable-default-props` to support checking for ObjectPatterns within VariableDeclarators that occur on props

### 🐞 Fixes

- Fix same kind of error inside a component should not only be reported once in rule `react/no-create-ref` and `react/no-constructed-context-value`

## v0.10.3 (2024-01-05)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.17.0`

## v0.10.3-beta.0 (2024-01-02)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.17.0`

## v0.10.2 (2023-12-30)

### ✨ New

- Add [`reactHooks.alias`](https://eslint-react.xyz/docs/configuration#reacthooksalias) setting support

## v0.10.2-beta.0 (2023-12-30)

### ✨ New

- Add [`reactHooks.alias`](https://eslint-react.xyz/docs/configuration#reacthooksalias) setting support

## v0.10.1 (2023-12-27)

### 🪄 Improvements

- Add `react/no-clone-element` to `recommended` and `recommended-legacy` presets
- Improve rule `react/no-unstable-nested-components`, make its behavior closer to [react-hooks/no-nested-components](https://github.com/facebook/react/pull/25360)
- Update `@typescript-eslint`'s packages to `6.16.0`

## v0.10.1-beta.1 (2023-12-26)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.16.0`

## v0.10.1-beta.0 (2023-12-25)

### 🪄 Improvements

- Add `react/no-clone-element` to `recommended` and `recommended-legacy` presets
- Improve rule `react/no-unstable-nested-components`, make its behavior closer to [react-hooks/no-nested-components](https://github.com/facebook/react/pull/25360)

## v0.10.0 (2023-12-21)

### ✨ New

- Add rule `jsx/max-depth`

### 🪄 Improvements

- Improve `recommended` and `recommended-legacy` presets

## v0.10.0-beta.0 (2023-12-21)

### ✨ New

- Add rule `jsx/max-depth`

### 🪄 Improvements

- Improve `recommended` and `recommended-legacy` presets

## v0.9.8 (2023-12-19)

### ✨ New

- Add rule `react/ensure-forward-ref-using-ref`

### 🪄 Improvements

- Reduce false positives in rule `react/no-unstable-nested-components`
- Reduce false positives in rule `debug/function-component`
- Optimize `recommended` and `recommended-legacy` presets
- Update `@typescript-eslint`'s packages to `6.15.0`

## v0.9.8-beta.2 (2023-12-19)

### 🪄 Improvements

- Optimize `recommended` and `recommended-legacy` presets

## v0.9.8-beta.1 (2023-12-19)

### 🪄 Improvements

- Minor improvements

## v0.9.8-beta.0 (2023-12-17)

### ✨ New

- Add rule `react/ensure-forward-ref-using-ref`

### 🪄 Improvements

- Reduce false positives in rule `react/no-unstable-nested-components`

- Reduce false positives in rule `debug/function-component`

## v0.9.7 (2023-12-17)

### 💥 Breaking Changes

- Rule `named-convention/filename-extension` rename `rule` option to `allow`

### 🐞 Fixes

- Fix where functions in `<Component footer={() => <div />} />` or `<Component Footer={() => <div />} />` are treated as components
- Fix false positive in rule `react/no-unstable-nested-components`
- Fix false positive in rule `debug/function-component`

### 🪄 Improvements

- Rules now support reading JSX extensions from `settings.eslintReact.jsx.extensions`

- Replace ❌ Incorrect and ✅ Correct with Failing and Passing in rule docs

## v0.9.7-beta.2 (2023-12-16)

### 🐞 Fixes

- Update default rule option in `named-convention/filename` to `PascalCase`

## v0.9.7-beta.1 (2023-12-14)

### 🪄 Improvements

- Minor improvements

## v0.9.7-beta.0 (2023-12-14)

### 💥 Breaking Changes

- Rule `named-convention/filename-extension` rename `rule` option to `allow`

✨ New

- Rule `named-convention/filename` add `extensions` option
- Rule `named-convention/filename-extension` add `extensions` option

## v0.9.6 (2023-12-12)

### ✨ New

- Add rule `react-hooks/prefer-use-state-lazy-initialization`

### 🪄 Improvements

- Rule `named-convention/component-name` add both `string` and `object` options support
- Rule `named-convention/filename` add both `string` and `object` options support
- Rule `named-convention/filename-extension` add both `string` and `object` options support
- Rule `debug/react-hooks` reports `hookCalls.length` instead of `cost`
- Update `@typescript-eslint`'s packages to `6.14.0`

## v0.9.6-beta.5 (2023-12-12)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.14.0`

## v0.9.6-beta.4 (2023-12-11)

### 🪄 Improvements

- Rule `named-convention/component-name` add both `string` and `object` options support
- Rule `named-convention/filename` add both `string` and `object` options support
- Rule `named-convention/filename-extension` add both `string` and `object` options support

## v0.9.6-beta.3 (2023-12-11)

### 🪄 Improvements

- Remove rule `react-hooks/prefer-use-state-lazy-initialization` from `recommended` and `recommended-legacy` presets

## v0.9.6-beta.2 (2023-12-11)

### ✨ New

- Add rule `react-hooks/prefer-use-state-lazy-initialization`

### 🪄 Improvements

- Rule `named-convention/filename-extension` switch options format from object to string

## v0.9.6-beta.1 (2023-12-11)

### 🪄 Improvements

- Rule `debug/react-hooks` reports `hookCalls.length` instead of `cost`

## v0.9.5 (2023-12-11)

### 🪄 Improvements

- Improve rule `jsx/no-leaked-conditional-rendering` error marker position and range
- Improve rule `react/no-missing-button-type` error marker position and range
- Improve rule `react/no-missing-iframe-sandbox` error marker position and range
- Improve rule `react/no-unsafe-iframe-sandbox` error marker position and range

## v0.9.4 (2023-12-08)

### 🪄 Improvements

- Improve rule docs

## v0.9.3 (2023-12-08)

### ✨ New

- Add rule `react/no-direct-mutation-state`
- Add rule `naming-convention/use-state`

### 🪄 Improvements

- Update `recommended` and `recommended-legacy` presets
- Improve rules overview page

## v0.9.2 (2023-12-06)

### ✨ New

- Add rule `react/no-component-will-update`
- Add rule `react/no-unsafe-component-will-update`
- Add rule `react/no-component-will-receive-props`
- Add rule `react/no-unsafe-component-will-receive-props`
- Add rule `react/no-set-state-in-component-did-mount`
- Add rule `react/no-set-state-in-component-did-update`
- Add rule `react/no-set-state-in-component-will-update`

## v0.9.1 (2023-12-05)

### ✨ New

- Add rule `react/no-component-will-mount`
- Add rule `react/no-unsafe-component-will-mount`

## v0.9.0 (2023-12-01)

### 💥 Breaking Changes

- `@eslint-react/eslint-plugin-jsx`
  - Remove `allowExpressions` option from rule `jsx/no-useless-fragment`
- `@eslint-react/jsx`
  - Remove `isFragmentWithOnlyTextAndIsNotChild`, `isFragmentHasLessThanTwoChildren`, `isFragmentWithSingleExpression` from `@eslint-react/jsx`'s API

### ✨ New

- Add rule `react/no-redundant-should-component-update`

### 🪄 Improvements

- Update Options of rule `jsx/no-useless-fragment`
- Optimize bundle size
