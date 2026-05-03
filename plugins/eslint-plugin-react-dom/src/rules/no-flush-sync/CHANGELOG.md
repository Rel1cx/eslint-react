# Changelog

All notable changes to the `react-dom/no-flush-sync` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-flush-sync/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.33.0] - 2025-03-14

### Changed

- Updated rule severity. (#988)

## [1.28.0] - 2025-02-23

### Added

- Initial release of the `no-flush-sync` rule. (#942)
- Reports usage of `flushSync` which should be avoided in most cases.
