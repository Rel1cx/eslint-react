# Changelog

All notable changes to the `react-x/no-unnecessary-use-prefix` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-unnecessary-use-prefix/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.0.5] - 2025-10-03

### Changed

- Updated rule features and status.

## [1.48.0] - 2025-04-17

### Fixed

- Improved the error marker range for more precise reporting.

## [1.47.4] - 2025-04-15

### Added

- Updated rule to skip well-known hooks like `useMDXComponents` to reduce false positives. (#1072)

## [1.47.2] - 2025-04-14

### Fixed

- Used smaller error marker range to reduce visual noise in editor output. (#1063)

## [1.45.1] - 2025-04-13

### Fixed

- Fixed case sensitivity failures in hook name detection. Closes #1053. (#1054)

## [1.35.0] - 2025-03-18

### Changed

- Renamed from `no-useless-custom-hooks` to `no-unnecessary-use-prefix` for clearer intent. (#996)

## [1.21.0] - 2024-12-20

### Added

- Initial release of the rule as `no-useless-custom-hooks`. (#886)
- Reports functions with an unnecessary `use` prefix that do not use React hooks internally.
