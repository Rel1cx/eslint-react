# Changelog

All notable changes to the `react-debug/is-from-ref` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-debug/src/rules/is-from-ref/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.8.3] - 2026-02-02

### Fixed

- Fixed rule export. (#1445)

## [2.7.4] - 2026-01-25

### Added

- Initial release of the `is-from-ref` rule. (#1433)
- Reports whether values are initialized from refs for debugging purposes.
