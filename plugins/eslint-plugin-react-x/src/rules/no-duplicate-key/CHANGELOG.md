# Changelog

All notable changes to the `react-x/no-duplicate-key` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-duplicate-key/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.0.2-beta.5] - 2026-03-30

### Fixed

- Fixed false positive for SVG `xlink` attributes.

## [2.5.5] - 2026-01-12

### Changed

- Removed rule from recommended configs and updated documentation.

## [1.27.0] - 2025-02-21

### Changed

- Changed severity of `no-duplicate-key` rule from `error` to `warn`. (#939)

## [1.22.2] - 2024-12-30

### Fixed

- Corrected bind name from `ietr` to `iter`.

### Changed

- Re-implemented rule to improve its performance. (#891)
- Added support for TypeScript's `as`, `satisfies`, and non-null assertion operator.
- Skip processing when no `key=` attribute is present.

## [1.12.3] - 2024-08-29

### Fixed

- Fixed false positives when the key is a variable. Closes #746.

## [1.12.2] - 2024-08-27

### Changed

- Improved performance of key comparison.

## [0.10.1] - 2023-12-27

### Fixed

- Fixed key prop's value in error message.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the `no-duplicate-key` rule.
- Reports duplicate key props in JSX elements.
