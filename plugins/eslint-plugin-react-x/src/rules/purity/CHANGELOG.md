# Changelog

All notable changes to the `react-x/purity` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added spec documentation (`purity.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Added IMPL vs SPEC diff document (`purity.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 2 additional invalid and 2 additional valid test cases ported from React Compiler fixtures.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/purity/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.0-beta.3] - 2026-04-01

### Fixed

- Removed console methods from impurity detection to reduce false positives. Closes #1616. (#1676)
- Treat `new Date(arg)` as pure, since creating a Date with an argument does not cause side effects. Closes #1582. (#1677)

## [4.0.2-beta.1] - 2026-03-28

### Fixed

- Removed `AbortController` from impure constructors to reduce false positives. Closes #1648. (#1648)

## [3.0.0-beta.75] - 2026-03-06

### Fixed

- Fixed purity detection logic and cleaned up related packages. (#1593)

## [3.0.0-beta.39] - 2026-02-25

### Changed

- Enhanced purity rule with TypeScript type expression support for more accurate detection of impure constructs. (#1547)

## [3.0.0-beta.33] - 2026-02-18

### Added

- Initial release of the `purity` rule. (#1511)
- Validates that components and hooks are pure by checking that they do not call known-impure functions during render.
- Registered in the `recommended` and `x` configuration presets.
