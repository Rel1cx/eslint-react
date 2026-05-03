# Changelog

All notable changes to the `react-x/no-forward-ref` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.0] - 2026-04-29

### Fixed

- Fixed type expression handling by unwrapping type expressions before inspecting AST node types. (#1732)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-forward-ref/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.0] - 2026-03-08

### Changed

- Converted auto-fix to suggestions to prevent automatic code modifications that could break existing code.
- Consolidated `no-useless-forward-ref` into `no-forward-ref`, which now covers all `forwardRef` usage patterns.

## [3.0.0-beta.53] - 2026-02-28

### Fixed

- Fixed auto-fix to not add ref param when type arguments are mismatched. (#1561)
- Fixed auto-fix handling for callbacks with no params. (#1560)

## [1.52.5] - 2025-06-11

### Fixed

- Refactored `is-from-react` utility and improved auto-fix handling. Closes #1172. (#1173)

## [1.25.0] - 2025-01-27

### Fixed

- Fixed loose auto-fix behavior. (#925)

## [1.19.0] - 2024-12-16

### Added

- Added auto-fix support to convert `forwardRef` patterns to regular components. (#874)
- Added destructuring props support for more accurate detection. (#875)

### Changed

- Improved rule performance.

## [1.18.0] - 2024-12-10

### Added

- Initial release of the `no-forward-ref` rule. (#870)
- Reports usage of `forwardRef` and recommends passing `ref` as a regular prop, as supported in React 19.
