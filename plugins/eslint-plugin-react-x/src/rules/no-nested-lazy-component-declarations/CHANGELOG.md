# Changelog

All notable changes to the `react-x/no-nested-lazy-component-declarations` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-nested-lazy-component-declarations/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.1] - 2026-03-12

### Changed

- Added rule to the static-components mapping in migration documentation.

## [1.52.7] - 2025-08-29

### Fixed

- Fixed rule name and message ID key mismatch.

## [1.45.0] - 2025-04-11

### Added

- Initial release of the `no-nested-lazy-component-declarations` rule. (#1052)
- Detects nested lazy component declarations (e.g., `lazy(() => import(...))` defined inside other functions or components), which can cause unexpected behavior and performance issues.
- Registered in the `recommended` and `x` configuration presets.
