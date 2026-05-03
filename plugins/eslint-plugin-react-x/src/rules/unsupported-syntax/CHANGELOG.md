# Changelog

All notable changes to the `react-x/unsupported-syntax` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.3.1-beta.0] - 2026-04-20

### Fixed

- Fixed detection of unsupported syntax inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/unsupported-syntax/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `unsupported-syntax` rule, consolidating and replacing `jsx-no-iife`. (#1518)
- Validates against syntax that React Compiler does not support, including `eval`, `with` statements, and IIFEs in JSX (previously covered by `jsx-no-iife`).
- Registered in the `recommended` and `x` configuration presets.
