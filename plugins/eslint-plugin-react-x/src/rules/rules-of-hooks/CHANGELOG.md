# Changelog

All notable changes to the `react-x/rules-of-hooks` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/rules-of-hooks/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0] - 2026-03-16

### Changed

- Refactored code-path-analysis modules for more accurate hook validation. (#1539)

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `rules-of-hooks` rule. (#1499)
- Enforces the [Rules of Hooks](https://react.dev/reference/rules/rules-of-react#rules-of-hooks).
