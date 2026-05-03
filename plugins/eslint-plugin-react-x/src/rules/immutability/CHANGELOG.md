# Changelog

All notable changes to the `react-x/immutability` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added spec documentation (`immutability.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Added IMPL vs SPEC diff document (`immutability.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 4 additional invalid and 4 additional valid test cases ported from React Compiler fixtures.

## [5.3.1-beta.0] - 2026-04-20

### Fixed

- Fixed detection of mutations inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/immutability/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.0.2-beta.1] - 2026-03-28

### Fixed

- Excluded event handler parameters from props mutation checks to reduce false positives. Closes #1647. (#1647)

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `immutability` rule, consolidating and replacing `prefer-read-only-props`. (#1541)
- Validates against mutating props, state, and other values that are immutable. Detects in-place array mutations (e.g., `push`, `sort`, `splice`) and direct property assignments on state variables from `useState` and props objects. Mirrors the [`immutability`](https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability) lint rule described in the React docs.
- Registered in the `all` configuration preset.
