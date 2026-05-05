# Changelog

All notable changes to the `react-dom/no-string-style-prop` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-string-style-prop/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-string-style-prop` rule. (#59)
- Reports string values passed to the `style` prop instead of objects.
