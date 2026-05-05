# Changelog

All notable changes to the `react-x/no-implicit-key` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-implicit-key/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.12.1] - 2026-02-08

### Fixed

- Check all union constituents and allow all types under `React` namespace. (#1487)

## [2.10.0] - 2026-02-05

### Changed

- Refactored rule to use type checking. (#1466)
- Moved rule from `recommended` to `type-checked` presets.

## [1.6.0] - 2024-07-27

### Changed

- Undeprecated rule and improved its usefulness.

## [1.5.11] - 2024-05-08

### Changed

- Deprecated rule because it is stylistic and opinionated.

## [1.5.0] - 2024-01-29

### Changed

- Renamed rule from `no-spreading-key` to `no-implicit-key`.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-spreading-key` rule. (#74)
- Reports spreading a `key` prop onto JSX elements.
