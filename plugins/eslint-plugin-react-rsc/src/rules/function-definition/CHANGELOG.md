# Changelog

All notable changes to the `react-rsc/function-definition` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.0] - 2026-04-29

### Added

- Added directive position and quote checks. (#1721)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-rsc/src/rules/function-definition/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.9.2] - 2026-02-02

### Changed

- Separated message ids for more granular reporting. (#1460)

## [2.9.0] - 2026-02-02

### Added

- Initial release of the `rsc/function-definition` rule, migrated from `no-non-async-server-functions`. (#1457)
- Reports non-async server functions in React Server Components.
