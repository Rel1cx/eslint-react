# Changelog

All notable changes to the `react-debug/function-component` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-debug/src/rules/function-component/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.1] - 2026-04-01

### Fixed

- Marked rule as 🔧 (has auto-fix). (#1633)

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `function-component` rule.
- Reports detected function components for debugging purposes.
