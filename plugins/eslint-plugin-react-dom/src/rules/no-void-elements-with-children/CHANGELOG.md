# Changelog

All notable changes to the `react-dom/no-void-elements-with-children` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-void-elements-with-children/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.50.0] - 2025-05-16

### Fixed

- Fixed `polorphicPropName` not working with the rule. Closes #1108. (#1108)

## [1.33.0] - 2025-03-14

### Changed

- Updated rule severity. (#988)

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-children-in-void-dom-elements` rule.
- Reports void DOM elements (e.g., `<img>`, `<input>`) that have children.

### Changed

- Renamed rule from `no-children-in-void-dom-elements` to `no-void-elements-with-children`. (#888)
