# Changelog

All notable changes to the `react-x/no-array-index-key` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.0] - 2026-04-29

### Fixed

- Fixed type expression handling by unwrapping type expressions before inspecting AST node types. (#1732)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-array-index-key/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.10.0] - 2026-02-05

### Changed

- Refactored array index parameter retrieval and improved callback position logic.

## [1.24.0] - 2025-01-21

### Changed

- Improved performance of the rule. (#913)

## [1.17.3] - 2024-12-03

### Fixed

- Fixed 'no-array-index-key' mistaking 'foo.bar.map' for 'React.Children.map' method. Closes #860. (#868)

## [0.10.0] - 2023-12-21

### Changed

- Re-implemented rule to use improved array method utilities for more accurate detection of array index usage as keys.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-array-index-key` rule.
- Reports usage of array indices as keys in JSX elements.
