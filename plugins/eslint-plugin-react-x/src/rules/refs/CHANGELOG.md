# Changelog

All notable changes to the `react-x/refs` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.4] - 2026-05-01

### Changed

- Refactored internal traversal to use the new `findParent` with `stop` predicate for more controlled ancestor traversal. (#1736)

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added spec documentation (`refs.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Added IMPL vs SPEC diff document (`refs.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 2 additional invalid and 4 additional valid test cases ported from React Compiler fixtures.

## [5.3.1-beta.0] - 2026-04-20

### Fixed

- Fixed detection of ref usage inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/refs/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-beta.55] - 2026-02-28

### Changed

- Refactored refs rule internals for improved maintainability and detection accuracy. (#1563)

## [3.0.0-beta.33] - 2026-02-18

### Added

- Initial release of the `refs` rule. (#1519)
- Validates correct usage of refs by checking that `ref.current` is not read or written during render.
- Registered in the `all` configuration preset.
