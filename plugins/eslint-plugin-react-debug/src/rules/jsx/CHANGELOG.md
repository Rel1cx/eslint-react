# Changelog

All notable changes to the `react-debug/jsx` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-debug/src/rules/jsx/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.41.0] - 2025-04-08

### Added

- Initial release of the `jsx` rule. (#1041)
- Reports JSX elements and their properties for debugging purposes.
