# Changelog

All notable changes to the `react-x/no-component-will-mount` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-component-will-mount/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.20.0] - 2024-12-16

### Added

- Added codemod autofix support. (#879)

## [0.9.1] - 2023-12-05

### Added

- Initial release of the `no-component-will-mount` rule.
- Reports usage of the `componentWillMount` lifecycle method.
