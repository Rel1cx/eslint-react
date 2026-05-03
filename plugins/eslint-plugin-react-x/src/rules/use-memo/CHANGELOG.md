# Changelog

All notable changes to the `react-x/use-memo` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.2] - 2026-04-30

### Fixed

- Fixed false positives in `useMemo` dependency analysis by using reference/definition analysis. (#1735)

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added IMPL vs SPEC diff document (`use-memo.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 13 additional valid test cases ported from React Compiler fixtures.

## [5.5.3-beta.0] - 2026-04-26

### Added

- Added support for `for-of` and `for-in` loops in `useMemo` callback analysis.

## [5.5.2-beta.0] - 2026-04-26

### Added

- Added reassignment check to detect when `useMemo` return values are reassigned.
- Aligned message IDs with React Compiler specification.
- Added spec documentation (`use-memo.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Extracted rule helpers into co-located `lib.ts` module.

## [5.3.1-beta.0] - 2026-04-20

### Fixed

- Fixed detection of mutations inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/use-memo/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.2] - 2026-03-13

### Fixed

- Fixed false positive in arrow functions. Fixes #1611. (#1612)

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `use-memo` rule. (#1530)
- Validates that `useMemo` is called with a callback that returns a value. `useMemo` is designed for computing and caching values — without a return value it always returns `undefined`, which defeats its purpose.
- Catches `useMemo` calls whose return value is discarded (not assigned to a variable), which indicates a side-effect misuse that should use `useEffect` instead.
- Registered in the `recommended` and `x` configuration presets.
