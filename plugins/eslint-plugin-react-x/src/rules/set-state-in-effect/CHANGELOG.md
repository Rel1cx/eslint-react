# Changelog

All notable changes to the `react-x/set-state-in-effect` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.2] - 2026-10-25

### Changed

- Identifier and return-expression collection now uses the shared `Collect` helpers from `@eslint-react/ast`. Identifier collection now also visits computed property keys, rest elements, and JSX expression containers, so ref provenance is recognized in these positions. (#2080)

## [5.30.0-beta.0] - 2026-10-25

### Changed

- Reworked around explicit effect roots, recursive value resolution, and a synchronous call graph. Stable aliases, multi-level helpers, named setups, IIFEs, and `useCallback`/`useMemo`/`useEffectEvent` wrappers now share one resolution path; indirect diagnostics point at the effect-side trigger and dedupe by setter sink. Async functions remain deferred (documented limitation). (#2075)
- Setters are now recognized only as the second element of a `useState` array destructuring; tuple-index access (`data[1]()`, `data.at(1)()`, `data[index]()`) and object-pattern numeric keys are no longer detected. (#2075)

### Fixed

- TypeScript-wrapped setups (ex: `useEffect((setup as () => void)!, [])`) are resolved correctly.
- Zero-argument setters called directly in the setup (ex: `setData()`) are now reported, matching indirect calls.
- Timer or event callbacks nested in `useCallback`/`useEffectEvent` are no longer treated as synchronous setters.
- Ref provenance now also covers TypeScript assertions, computed member keys, local getters, and state-held DOM nodes from callback refs; same-branch plain writes replace earlier ref-derived writes, guard-test setters cannot self-exempt, and ref guards propagate through helpers and IIFEs.
- Nested and outer effect setups are now analyzed independently.

## [5.28.6] - 2026-10-22

### Fixed

- The ref-derived parameter exemption now also applies to helpers wrapped in `useCallback` (ex: `measure(ref.current)` where `measure = useCallback((el) => { setWidth(el.offsetWidth); }, [])`) — previously call-site argument mapping stopped at the hook call, so only plain functions qualified.
- A helper call behind a ref-derived guard (`if`, ternary, short-circuit, or early return) now exempts the `setState` calls it reaches, as a `setState` written in its place would be (ex: `if (!anchorRef.current) return; commitPosition(0, true);`); each call site is judged on its own — the same helper called before the guard, or passed a plain value outside one (ex: `commitPosition(0, false)` in an `!isOpen` branch), stays reported.

## [5.26.5] - 2026-10-13

### Fixed

- A `setState` call on the right side of a short-circuit operator (`&&`, `||`, `??`) is now exempt when the left operand is ref-derived (ex: `ref.current && setData(1)`), aligning with the existing exemption for ref-gated `if` statements, conditional expressions, and early-return guards. A `setState` on the left side (ex: `setData(1) && ref.current`) still runs unconditionally and stays reported.
- Setup identifiers are now collected from the setup argument of the effect call only; the callee and the deps array are no longer scanned, so a function referenced only in the deps array (ex: `useEffect(setup, [helper])`) is no longer mistaken for the setup and its `setState` calls stay unattributed.
- Arrow function parameters are no longer collected as callback-body setter references (ex: the `setState` in `useMemo((setState) => ..., [])`), narrowing the collection to actual callback bodies (ex: `useMemo(() => setState, [])`).

## [5.26.2] - 2026-10-12

### Fixed

- Ref-derived values that reach the `setState` argument through assignment statements (rather than the declaration initializer) are now recognized (ex: `let overflow = false; if (container) { overflow = container.scrollWidth > container.clientWidth; } setIsOverflow(overflow)`). Only writes that lexically precede the use and live in the use's own function or an ancestor count — a write inside a nested callback (ex: an event listener defined in the setup) has not run when the setup executes and stays reported.
- Parameters of a helper invoked from the effect setup are now treated as ref-derived when the call-site argument is ref-derived, regardless of the parameter name (ex: `updateEdges(ref.current)` where `updateEdges = (el) => { setAtTop(el.scrollTop === 0); }`). The mapping is per call site and matched by parameter definition, so the same helper called with a plain argument (ex: `updateEdges(document.body)`) stays reported.
- A `.current` read rooted at a function parameter is now recognized as a ref read (ex: `setReferenceElement(anchor?.current)` where `anchor` is a `RefObject` prop) — previously only parameters named `ref` or ending in `Ref` were recognized.

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
