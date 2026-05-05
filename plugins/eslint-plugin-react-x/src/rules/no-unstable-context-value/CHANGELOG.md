# Changelog

All notable changes to the `react-x/no-unstable-context-value` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-unstable-context-value/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.23.1] - 2025-01-03

### Fixed

- Fixed false positives in context value detection. (#896)

## [1.5.0] - 2024-01-29

### Changed

- Renamed from `no-constructed-context-value` to `no-unstable-context-value` for clearer intent.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the rule as `no-constructed-context-value`.
- Detects unstable context values (e.g., object/array literals, function expressions) passed to Context providers, which cause unnecessary re-renders for all consumers.
