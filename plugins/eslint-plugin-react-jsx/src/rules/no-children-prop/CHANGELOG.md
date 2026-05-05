# Changelog

All notable changes to the `react-jsx/no-children-prop` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-jsx/src/rules/no-children-prop/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.1] - 2026-04-01

### Added

- Relocated rule from `eslint-plugin-react-x` to `eslint-plugin-react-jsx`.
- Added suggestion-fix feature to move children from prop to element content.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-children-prop` rule. (#132)
- Reports passing `children` as a prop instead of as nested content.
