# Changelog

All notable changes to the `naming-convention/ref-name` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.18.0] - 2026-07-23

### Changed

- Replaced `isUseRefCall` with `isUseRefLikeCall`; identifiers assigned from custom ref hooks matching the `additionalRefHooks` setting are now checked by this rule.
- Removed the `includes("useRef")` text precheck so files that only use custom ref hooks matching `additionalRefHooks` are no longer skipped.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-naming-convention/src/rules/ref-name/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.5.1] - 2026-01-05

### Fixed

- Fixed false positive with immediate dereference. Closes #1375. (#1376)

## [2.5.0] - 2025-12-31

### Added

- Initial release of the `use-ref-name` rule. (#1366)
- Reports `useRef` hooks that do not follow the recommended naming convention.

### Changed

- Renamed rule from `use-ref-name` to `ref-name` and added it to recommended presets. (#1367)
