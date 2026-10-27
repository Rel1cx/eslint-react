# Changelog

All notable changes to the `react-x/purity` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.6] - 2026-10-27

### Changed

- Destructured property defaults are now unwrapped inline after `resolveBindingTarget` was removed from `@eslint-react/var`; no behavior change.

## [5.30.0-beta.5] - 2026-10-27

### Changed

- Destructured property targets are now resolved with `resolveBindingTarget` from `@eslint-react/var`; no behavior change. (#2084)

## [5.28.8] - 2026-10-24

### Fixed

- Builtin member resolution no longer follows computed member segments (ex: `window[fetch]` with a local `fetch`) or chains with unknown segments in the middle (ex: `window.myLibrary.fetch`), preventing false reports of calls that are not builtin globals. (#2070)

## [5.28.7] - 2026-10-23

### Fixed

- Calling `Date` as a function (ex: `Date()`, `window.Date()`) during render is now reported. Unlike `new Date(arg)`, `Date(arg)` ignores its arguments and always returns the current time, so it is reported with arguments too. (#1761)

## [5.21.3] - 2026-09-29

### Removed

- Removed the exemption for impure calls in `useRef` initializer arguments (ex: `useRef(document.createElement("div"))`) added in 5.21.2 — such calls are reported again. (#1972)

## [5.21.2] - 2026-09-29

### Fixed

- Async function components in modules without a `use client` directive are treated as Server Components and are no longer reported — they render once per request on the server, so calls like `Date.now()` or `cookieStore.get()` are valid there.

## [5.20.6] - 2026-09-23

### Fixed

- Builtin alias resolution now preserves the property path in addition to the root object name: member-function aliases (`const random = Math.random; random()`), destructured aliases (`const { random } = Math; random()`, `const { now } = Date; now()`), and intermediate catalog objects (`window.Math.random()`, `const M = window.Math`) are now detected instead of being missed. Constructor member aliases (`const W = window.WebSocket; new W()`) are detected when the source object is a known catalog global; unknown-global roots are not followed, preventing speculative reports.

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added spec documentation (`purity.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Added IMPL–SPEC diff document (`purity.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 2 additional invalid and 2 additional valid test cases ported from React Compiler fixtures.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/purity/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.0-beta.3] - 2026-04-01

### Fixed

- Removed console methods from impurity detection to reduce false positives. Closes #1616. (#1676)
- Treat `new Date(arg)` as pure, since creating a Date with an argument does not cause side effects. Closes #1582. (#1677)

## [4.0.2-beta.1] - 2026-03-28

### Fixed

- Removed `AbortController` from impure constructors to reduce false positives. Closes #1648. (#1648)

## [3.0.0-beta.75] - 2026-03-06

### Fixed

- Fixed purity detection logic and cleaned up related packages. (#1593)

## [3.0.0-beta.39] - 2026-02-25

### Changed

- Enhanced purity rule with TypeScript type expression support for more accurate detection of impure constructs. (#1547)

## [3.0.0-beta.33] - 2026-02-18

### Added

- Initial release of the `purity` rule. (#1511)
- Validates that components and hooks are pure by checking that they do not call known-impure functions during render.
- Registered in the `recommended` and `x` configuration presets.
