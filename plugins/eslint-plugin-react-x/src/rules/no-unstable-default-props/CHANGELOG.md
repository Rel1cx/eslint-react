# Changelog

All notable changes to the `react-x/no-unstable-default-props` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.5] - 2026-10-27

### Changed

- Object-pattern defaults are now detected with `Check.isObjectPatternElementDefault` from `@eslint-react/ast`; no behavior change. (#2084)

## [5.28.4] - 2026-10-21

### Changed

- Reverted the component-scope-bounded identifier resolution introduced in v5.28.3: destructuring declarators are no longer resolved against the closest enclosing component's scope, so default values destructured inside nested callbacks (e.g. in a `render` closure) are no longer detected, and the innermost-component attribution that reported each value only once is rolled back with it. (#2060)
- Class declarations (`class Foo {}` in a component body) remain recognized as per-render constructions and continue to be reported when used as default prop values. (#2060)

## [5.28.3] - 2026-10-20

### Added

- Destructuring declarators are now attributed to the closest enclosing component and identifier resolution is bounded by that component's scope, so default values constructed in the component's render scope but destructured inside nested callbacks (e.g. in a `render` closure) are now detected. (#2060)
- Class declarations are now recognized as per-render constructions, so `class Foo {}` declared in a component body and used as a default prop value is now reported. (#2060)

### Fixed

- In nested components, the destructuring is now attributed to the innermost component, so it is reported only once even when an outer component's props parameter has the same name. (#2060)

## [5.6.0] - 2026-04-29

### Fixed

- Fixed type expression handling by unwrapping type expressions before inspecting AST node types. (#1732)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-unstable-default-props/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.10.0] - 2025-02-05

### Added

- Added `safeDefaultProps` option to allow configuring known-safe default prop patterns. Closes #1312. (#1313)

## [1.15.1] - 2024-07-22

### Fixed

- Fixed false negatives when using `LogicalExpression` and `ConditionalExpression` in default props.

## [0.10.10] - 2024-01-14

### Added

- Enhanced detection to support checking for `ObjectPatterns` within `VariableDeclarators` that occur on props.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the `no-unstable-default-props` rule.
- Detects unstable default prop values (e.g., object/array literals, function expressions) that cause unnecessary re-renders.
