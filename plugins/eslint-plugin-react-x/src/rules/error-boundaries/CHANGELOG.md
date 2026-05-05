# Changelog

All notable changes to the `react-x/error-boundaries` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.0] - 2026-04-29

### Fixed

- Resolved catch block over-reporting in error boundary detection. Closes #1617. (#1730)

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added spec documentation (`error-boundaries.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Added IMPL vs SPEC diff document (`error-boundaries.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 3 additional invalid and 12 additional valid test cases ported from React Compiler fixtures.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/error-boundaries/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.5-beta.1] - 2026-04-03

### Fixed

- Fixed false positives on non-React code. Closes #1690. (#1693)

## [3.0.0-rc.3] - 2026-03-13

### Fixed

- Fixed false positive by skipping non-JSX-like values in error boundary detection. (#1615)

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `error-boundaries` rule.
- Validates usage of Error Boundaries instead of `try`/`catch` for errors in child components. `try`/`catch` blocks cannot catch errors during React's rendering process — only [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) can catch these errors. (#1506)
