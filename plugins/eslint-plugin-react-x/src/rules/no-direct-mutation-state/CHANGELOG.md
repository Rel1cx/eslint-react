# Changelog

All notable changes to the `react-x/no-direct-mutation-state` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-direct-mutation-state/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [0.10.10] - 2024-01-14

### Changed

- Improved detection to support checking for more cases.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the `no-direct-mutation-state` rule. (#203)
- Detects direct mutation of `this.state` in class components, which should always be treated as immutable.
