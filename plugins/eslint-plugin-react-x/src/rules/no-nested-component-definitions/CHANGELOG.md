# Changelog

All notable changes to the `react-x/no-nested-component-definitions` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.18.3] - 2026-08-06

### Changed

- Narrowed the `with*` HOC detection in the fallback name resolution to well-known wrappers only: react-router v5's `withRouter`, Formik's `withFormik`, and recompose's `withProps`, `withState`, `withHandlers` and `withLifecycle`. Custom HOCs following the `with*` naming convention are no longer treated as component wrappers.

## [5.18.2] - 2026-08-05

### Fixed

- Fixed a regression where nested components wrapped in `useCallback` (e.g. `const C = useCallback(() => <div />, []);` inside another component) were no longer reported. The rule now falls back to resolving the component name through the wrapping call chain up to the enclosing variable declarator when the collector could not name the component. Closes #1927. (#1927)
- Excluded array method callbacks from being misreported in list rendering patterns: `flatMap` callbacks are excluded from component detection via the existing `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback` hint, and the fallback name resolution only unwraps well-known component wrappers, so member calls on data objects (e.g. `Array.from`, `items.forEach`, `items.reduce`) are never treated as component wrappers. (#1927)
- Extended the fallback name resolution to well-known component wrappers beyond `memo`/`forwardRef`/`useCallback`: `observer`, react-redux's `connect`, Relay's `create*Container` helpers, Apollo's `graphql`, and HOCs following the `with*` naming convention (recompose, `withRouter`, `withFormik`, and custom HOCs), including curried forms like `connect(...)(Component)`. (#1927)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-nested-component-definitions/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-beta.33] - 2026-02-18

### Changed

- Improved detection of React components created via conditional (ternary) expressions. (#1503)

## [1.38.0] - 2025-03-25

### Changed

- Enhanced error messages with more descriptive reporting. (#1014)

## [1.36.1] - 2025-03-19

### Fixed

- Minor fixes and improvements in detection logic.

## [1.34.0] - 2025-03-14

### Changed

- Renamed from `no-nested-components` to `no-nested-component-definitions` for clearer intent. (#990)

## [1.10.0] - 2024-08-11

### Added

- Initial release of the rule as `no-nested-components`.
- Detects component definitions nested inside other components or functions, which can cause unexpected unmounting/remounting and state loss.
