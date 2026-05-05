# Changelog

All notable changes to the `react-x/no-nested-component-definitions` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-nested-component-definitions/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-beta.33] - 2026-02-18

### Changed

- Improved detection of React components created via conditional (ternary) expressions. (#1503)

## [1.38.0] - 2025-03-25

### Changed

- Enhanced error messages with more descriptive reporting. (#1014)

## [1.36.1] - 2025-03-19

### Fixed

- Minor fixes and improvements in detection logic.

## [1.34.0] - 2025-03-14

### Changed

- Renamed from `no-nested-components` to `no-nested-component-definitions` for clearer intent. (#990)

## [1.10.0] - 2024-08-11

### Added

- Initial release of the rule as `no-nested-components`.
- Detects component definitions nested inside other components or functions, which can cause unexpected unmounting/remounting and state loss.
