# Changelog

All notable changes to the `react-debug/function-component` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.5] - 2026-10-27

### Fixed

- Only the first argument of `memo`/`forwardRef` is treated as the wrapped component: a `propsAreEqual` comparator returning JSX is no longer reported, and a function in that position no longer inherits the surrounding binding or wrapper flags. A wrapper call in a later argument of a generic HOC (ex: `compose(enhance, memo(() => <div />))`) still applies its flag to its own first argument. (#2084)
- Optional-chained `createElement` calls (ex: `React?.createElement("div", null)`) are now recognized as JSX-like component returns. (#2084)
- Array pattern element defaults (ex: `const [Nav = () => <div />] = arr`) are no longer reported as component definitions. (#2084)

## [5.27.0] - 2026-10-15

### Changed

- Computed string-literal `displayName` keys (ex: `App["displayName"] = "TestDisplayName"`) are now recognized. (#2038)

## [5.16.0] - 2026-07-15

### Changed

- Reported component ``hookCalls`` counts now include tagged template literal hook calls (e.g. ``useMotionTemplate\``...\``). (#1909)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-debug/src/rules/function-component/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.1] - 2026-04-01

### Fixed

- Marked rule as 🔧 (has auto-fix). (#1633)

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `function-component` rule.
- Reports detected function components for debugging purposes.
