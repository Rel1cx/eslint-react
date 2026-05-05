# Changelog

All notable changes to the `react-x/set-state-in-effect` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.0] - 2026-04-29

### Fixed

- Fixed type expression handling by unwrapping type expressions before inspecting AST node types. (#1732)

## [5.5.5-beta.0] - 2026-04-28

### Added

- Improved validation accuracy with enhanced detection logic.
- Added IMPL vs SPEC diff document (`set-state-in-effect.spec.diff.md`) for tracking deviations from the React Compiler specification.
- Extracted rule helpers into co-located `lib.ts` module.

## [5.5.3-beta.1] - 2026-04-26

### Added

- Added spec documentation (`set-state-in-effect.spec.md`) documenting algorithms, validation rules, edge cases, and examples.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/set-state-in-effect/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-beta.33] - 2026-02-28

### Added

- Improved rule to allow `setState` calls when the new state is derived from refs, aligning with React's recommended patterns. (#1521)

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `set-state-in-effect` rule, relocated and renamed from `react-hooks-extra/no-direct-set-state-in-use-effect`. (#1502)
- Validates against calling `setState` synchronously in an effect, which can lead to re-renders that degrade performance.
- Registered in the `recommended` and `x` configuration presets.
