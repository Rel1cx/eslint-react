# Changelog

All notable changes to the `react-x/exhaustive-deps` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/exhaustive-deps/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0] - 2026-03-16

### Fixed

- Correctly handle callback-local variables and parent-object dependencies. (#1531)

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `exhaustive-deps` rule. (#1499)
- Enforces that React hook dependency arrays contain all reactive values used in the callback.
