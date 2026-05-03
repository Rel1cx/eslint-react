# Changelog

All notable changes to the `react-jsx/no-useless-fragment` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-jsx/src/rules/no-useless-fragment/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.1] - 2026-04-01

### Added

- Relocated rule from `eslint-plugin-react-x` to `eslint-plugin-react-jsx`.

## [1.15.1] - 2024-10-26

### Added

- Added `allowEmptyFragment` option. Closes #1265. (#1335)

## [1.7.2] - 2024-08-07

### Fixed

- Fixed false positive when passing a `ref` to a `Fragment`. Closes #1567. (#1568)

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-useless-fragment` rule. (#64)
- Reports unnecessary `Fragment` usage that can be simplified.
