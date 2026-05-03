# Changelog

All notable changes to the `react-web-api/no-leaked-resize-observer` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-web-api/src/rules/no-leaked-resize-observer/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.14.1] - 2024-09-12

### Fixed

- Fixed false positives in rule `web-api/no-leaked-resize-observer`.

## [1.13.0] - 2024-09-04

### Added

- Initial release of the `no-leaked-resize-observer` rule. (#759)
- Reports leaked `ResizeObserver` calls in React components.
