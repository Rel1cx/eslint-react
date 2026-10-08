# Changelog

All notable changes to the `react-x/set-state-in-effect` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.24.9] - 2026-10-08

### Fixed

- Optional chaining in a `setState` argument (ex: `setData(ref.current?.value)`, `setWidth(el?.offsetWidth ?? 0)` where `el` is ref-derived) no longer defeats the ref-value exemption; the `ChainExpression` wrapper is now unwrapped during ref-source detection.

## [5.24.6] - 2026-10-06

### Fixed

- Object-pattern destructuring of the `useState` tuple is now resolved by numeric key: a name bound at key 0 (ex: `const { 0: value } = useState()`) is no longer mistaken for the setter, while key 1 (ex: `const { 1: setData } = useState()`) is still recognized.

## [5.24.0] - 2026-10-04

### Fixed

- More value shapes are recognized as ref-derived `setState` arguments: interpolations in template literals (ex: ``setData(`${ref.current}`)``), tagged templates (both the quasi and a ref-derived tag), object and array literals (ex: `setData({ value: ref.current })`), and spreads (ex: `setData({ ...ref.current })`) — previously these fell through to the default case and were reported.

### Changed

- Reworked the rule implementation to the fact-based pipeline (collect → resolve → infer → report): `collect.ts` gathers call, setup-identifier, and setter-reference facts with their function-phase context, `origins.ts` resolves setState and ref provenance, and `effects.ts` infers violations without reporting; `lib.ts` is replaced by a pure-AST `helpers.ts`. No behavior change. (#1983)
- A hook name configured as both `additionalStateHooks` and `additionalEffectHooks` is now classified as a state hook first, matching the original call-kind precedence, so such a call is not mistaken for an effect setup. (#1983)

## [5.23.5] - 2026-10-03

### Fixed

- The ref-derived value exemption now also applies to `setState` calls reached indirectly — via a function or hook callback invoked from the effect setup (ex: a `measureOverflow` `useCallback` called from the setup whose `setState` carries DOM measurements) — previously only `setState` written directly in the setup body was exempted. (#1982)
- More ref read shapes are recognized as ref-derived values: a `<ref-named>.current` link anywhere in a member chain (ex: `const surface = popover.contentRef.current`), locals rooted at another ref-derived local (ex: `scroller.clientWidth` where `const scroller = scrollerRef.current`), and reads through a parameter named `ref`/`xxxRef` (ex: `function useDetect(ref) { ... ref.current ... }`). (#1982)

## [5.23.3] - 2026-09-30

### Fixed

- Ref reads traced through intermediate local computations (ex: `const dv = visible - prevVisible.current`) are now recognized as ref-derived values, and a preceding early-return guard whose test is ref-derived (ex: `if (dv === 0) return;`) now exempts the `setState` calls that follow it — previously only `setState` nested directly inside a ref-gated `if`/conditional was exempted. Aligns with `react-hooks` 7.1.1. (#1979)

## [5.21.2] - 2026-09-29

### Fixed

- Local variables initialized from a nested member expression rooted at a ref (ex: `const offsetWidth = containerRef.current.offsetWidth; setWidth(offsetWidth)`) are now recognized as ref-derived values and no longer reported — previously only single-level member expressions like `const el = containerRef.current` were detected.

## [5.18.0] - 2026-07-23

### Changed

- Replaced `isUseRefCall` with `isUseRefLikeCall` when checking whether a value is initialized from a ref; custom ref hooks matching the `additionalRefHooks` setting are now recognized.

## [5.14.9] - 2026-07-15

### Changed

- Replaced `Extract.getPropertyName` with `Extract.getCalleeName` for callee name checks.
- Calls made through computed string-literal member access are no longer matched, since the runtime property name cannot be statically determined.

## [5.11.0] - 2026-07-05

### Changed

- Use `Extract.getPropertyName` to simplify `MemberExpression` property name checks and detect computed string property access.

## [5.6.0] - 2026-04-29

### Fixed

- Fixed type expression handling by unwrapping type expressions before inspecting AST node types. (#1732)

## [5.5.5-beta.0] - 2026-04-28

### Added

- Improved validation accuracy with enhanced detection logic.
- Added IMPL–SPEC diff document (`set-state-in-effect.spec.diff.md`) for tracking deviations from the React Compiler specification.
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
