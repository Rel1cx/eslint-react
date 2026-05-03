# Changelog

All notable changes to the `naming-convention/id-name` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-naming-convention/src/rules/id-name/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.13.0] - 2026-02-15

### Added

- Initial release of the `id-name` rule. (#1497)
- Reports `React.useId()` calls that do not follow the recommended naming convention.
