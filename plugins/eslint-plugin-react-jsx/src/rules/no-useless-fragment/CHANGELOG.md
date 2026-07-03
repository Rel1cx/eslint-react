# Changelog

All notable changes to the `react-jsx/no-useless-fragment` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.10.2] - 2026-07-03

### Fixed

- Fixed a false negative where a computed identifier key in spread props (e.g. `<Fragment {...{ [key]: value }}>`) was treated as the static `key` or `ref` prop, suppressing the useless-fragment report. The actual property name is the runtime value of the variable; computed string literal keys are still recognized.

## [5.8.12] - 2026-06-05

### Changed

- Migrated child text cleanup logic to `@eslint-react/jsx/collapseMultilineText` and `@eslint-react/jsx/getChildren`, removing local `lib.ts` helpers. (#1836, #1838)
- Improved auto-fixer to use `collapseMultilineText` for JSX text children, aligning with Babel's `cleanJSXElementLiteralChild` pattern. (#1836)

### Added

- Added targeted test cases for whitespace boundary handling, multiline text collapsing, tab conversion, and `JSXEmptyExpression` edge cases. (#1837)

## [5.8.7] - 2026-05-29

### Fixed

- Fixed false negative: `<>{''}</>` is now correctly reported as useless because React ignores empty string children. (#1805)
- Corrected `trimLikeReact` JSDoc to clarify it is an auto-fixer formatting utility, not a model of React's rendering behaviour.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-jsx/src/rules/no-useless-fragment/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.1] - 2026-04-01

### Added

- Relocated rule from `eslint-plugin-react-x` to `eslint-plugin-react-jsx`.

## [1.15.1] - 2024-10-26

### Added

- Added `allowEmptyFragment` option. Closes #1265. (#1335)

## [1.7.2] - 2024-08-07

### Fixed

- Fixed false positive when passing a `ref` to a `Fragment`. Closes #1567. (#1568)

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-useless-fragment` rule. (#64)
- Reports unnecessary `Fragment` usage that can be simplified.
