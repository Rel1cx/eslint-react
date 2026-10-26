# Changelog

All notable changes to the `react-x/no-unstable-context-value` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.6] - 2026-10-27

### Changed

- The element self name is now obtained with `getElementSelfType` instead of manually splitting the full type, and the `value` attribute is matched with `isPlainAttribute`; no behavior change.

## [5.28.4] - 2026-10-21

### Changed

- Reverted the component-scope-bounded identifier resolution introduced in v5.28.3: values referenced from nested callbacks (e.g. `items.map((item) => <Context.Provider value={foo}>)`) are no longer resolved through the enclosing component scope, and the innermost-component attribution that reported each value only once is rolled back with it. (#2060)
- Class declarations (`class Foo {}` in a component body) remain recognized as per-render constructions and continue to be reported. (#2060)

## [5.28.3] - 2026-10-20

### Added

- Identifier resolution for the `value` prop is now bounded by the enclosing component scope: values constructed in the component's render scope but referenced from nested callbacks (e.g. `items.map((item) => <Context.Provider value={foo}>)`) are now detected, while values declared outside the component (e.g. module-level constants, which are stable across renders) are treated as stable. (#2060)
- Class declarations are now recognized as per-render constructions, so `class Foo {}` declared in a component body and passed as a context value is now reported. (#2060)

### Fixed

- In nested components, the provider is now attributed to the innermost enclosing component, so each unstable value is reported only once. (#2060)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-unstable-context-value/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.23.1] - 2025-01-03

### Fixed

- Fixed false positives in context value detection. (#896)

## [1.5.0] - 2024-01-29

### Changed

- Renamed from `no-constructed-context-value` to `no-unstable-context-value` for clearer intent.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the rule as `no-constructed-context-value`.
- Detects unstable context values (e.g., object/array literals, function expressions) passed to Context providers, which cause unnecessary re-renders for all consumers.
