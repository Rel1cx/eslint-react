# Changelog

All notable changes to the `react-x/no-missing-key` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-missing-key/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.7.0] - 2026-01-16

### Fixed

- Fixed `no-missing-key` misdetecting non-map calls as map calls since v2.6.4. Closes #1412. (#1413)

## [1.12.2] - 2024-08-27

### Changed

- Improved the performance of the `no-missing-key` rule.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-missing-key` rule.
- Reports missing key props in iterators and array methods used in JSX.
