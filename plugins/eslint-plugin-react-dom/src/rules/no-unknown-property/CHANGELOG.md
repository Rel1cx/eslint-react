# Changelog

All notable changes to the `react-dom/no-unknown-property` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-unknown-property/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.12.4] - 2026-02-11

### Changed

- Refactored to fix ESLint and TypeScript issues. (#1490)

## [1.52.8] - 2025-08-29

### Changed

- Updated rule implementation and documentation.

## [1.17.1] - 2024-11-22

### Fixed

- Added popover API props to known properties. Closes #865.

## [1.16.2] - 2024-11-20

### Changed

- Disabled rule in presets by default.

## [1.16.0] - 2024-10-31

### Added

- Initial release of the `no-unknown-property` rule. (#847)
- Reports unknown DOM properties on JSX elements.
