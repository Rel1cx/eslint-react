# Changelog

All notable changes to the `react-dom/no-hydrate` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.11.0] - 2026-07-05

### Changed

- Use `Extract.getPropertyName` to simplify `MemberExpression` property name checks and detect computed string property access.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-hydrate/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.35.0] - 2025-03-18

### Added

- Initial release of the `no-hydrate` rule. (#995)
- Reports usage of `ReactDOM.hydrate` and recommends using `createRoot().hydrate` instead.
