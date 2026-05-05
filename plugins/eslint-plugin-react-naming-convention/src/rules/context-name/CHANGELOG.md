# Changelog

All notable changes to the `naming-convention/context-name` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-naming-convention/src/rules/context-name/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0] - 2026-03-16

### Changed

- Removed React 19 version restriction from the rule. (#1558)

## [2.5.3] - 2026-01-09

### Changed

- Updated rule to include React version checks. Closes #1382. (#1384)

## [1.40.0] - 2025-04-01

### Changed

- Enabled rule in recommended presets. (#1024)

## [1.29.0] - 2025-03-01

### Added

- Initial release of the `context-name` rule. (#952)
- Reports React contexts that do not follow the recommended naming convention.
