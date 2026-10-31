# Changelog

All notable changes to the `react-x/no-missing-key` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.20] - 2026-10-31

### Changed

- Inlined iterator callback handling and removed the shared `getIteratorCallback` helper from `src/utils/jsx-iterator.ts`. No behavior change.

## [5.30.0-beta.7] - 2026-10-27

### Fixed

- Iterator callbacks wrapped in TypeScript expressions (ex: `items.map((item => <Row />) as Callback)`) are now unwrapped before checking, so missing keys are still reported.

### Changed

- Iterator callback detection now uses the shared `getIteratorCallback` helper from `src/utils/jsx-iterator.ts`; the rule-local `lib.ts` helper was removed.

## [5.30.0-beta.6] - 2026-10-27

### Fixed

- Elements with a spread attribute are no longer reported as missing `key`, since spread props are not statically resolved and may provide `key`.

## [5.30.0-beta.2] - 2026-10-25

### Changed

- Return-expression collection now uses the shared `Collect.getReturnExpressions` helper from `@eslint-react/ast`, replacing the rule-local `getReturnStatements` implementation. No behavior change. (#2080)

## [5.10.2] - 2026-07-03

### Fixed

- Fixed a false negative where a computed identifier key in spread props (e.g. `items.map((item) => <li {...{ [key]: item.id }} />)`) was treated as the static `key` prop, suppressing the missing-key report. The actual property name is the runtime value of the variable; computed string literal keys (e.g. `{...{ ["key"]: item.id }}`) still count as providing `key`.

## [5.8.18] - 2026-06-11

### Fixed

- Fixed checks being incorrectly resumed inside an outer `Children.toArray()` after a nested `Children.toArray()` call exits, by tracking nesting depth instead of a boolean flag.

### Added

- Check `.flatMap()` callbacks in addition to `.map()` and `Array.from()`.
- Check conditional (`? :`) and logical (`&&`, `||`, `??`) branches of elements in array literals.

## [5.7.8] - 2026-05-14

### Fixed

- Fixed `no-missing-key` not detecting `ConditionalExpression`/`LogicalExpression` returned from block-bodied `.map`/`Array.from` callbacks. Closes #1766.
- `no-missing-key` now reports both branches of a `ConditionalExpression`/`LogicalExpression` when both lack a `key`, instead of only the first.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-missing-key/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.7.0] - 2026-01-16

### Fixed

- Fixed `no-missing-key` misdetecting non-map calls as map calls since v2.6.4. Closes #1412. (#1413)

## [1.12.2] - 2024-08-27

### Changed

- Improved the performance of the `no-missing-key` rule.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-missing-key` rule.
- Reports missing key props in iterators and array methods used in JSX.
