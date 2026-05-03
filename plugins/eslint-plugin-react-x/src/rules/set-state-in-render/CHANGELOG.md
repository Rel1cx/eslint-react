# Changelog

All notable changes to the `react-x/set-state-in-render` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.0] - 2026-04-29

### Fixed

- Fixed type expression handling by unwrapping type expressions before inspecting AST node types. (#1732)

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added spec documentation (`set-state-in-render.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Added IMPL vs SPEC diff document (`set-state-in-render.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 3 additional invalid and 4 additional valid test cases ported from React Compiler fixtures.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/set-state-in-render/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-beta.33] - 2026-02-20

### Added

- Enhanced detection to catch `setState` calls inside custom hook bodies, not just component render functions. (#1522, #1523)

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `set-state-in-render` rule. (#1502)
- Validates against unconditionally setting state during render, which can trigger additional renders and potential infinite render loops.
- Registered in the `recommended` and `x` configuration presets.
