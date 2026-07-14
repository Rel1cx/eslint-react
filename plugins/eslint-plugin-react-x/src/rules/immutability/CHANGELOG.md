# Changelog

All notable changes to the `react-x/immutability` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.14.9] - 2026-07-15

### Changed

- Replaced `Extract.getPropertyName` with `Extract.getCalleeName` when resolving mutating method names.
- Mutating method calls made through computed string-literal member access (e.g. `obj["push"](1)`) are no longer treated as captured local mutations, since the runtime property name cannot be statically determined.

## [5.14.7] - 2026-07-13

### Fixed

- Extended the navigation-hook mutation exemption to values initialized by `useNavigate()` and `useNavigation()`, preventing navigation methods such as `.push()` from being treated as in-place mutations inside frozen callbacks.

## [5.14.6] - 2026-07-13

### Changed

- Simplified immutability analysis helpers by sharing initializer provenance checks for `useRef()` and `useRouter()` and using AST parent traversal for function-boundary detection.

### Fixed

- Fixed a false positive where Next.js `useRouter().push()` calls inside frozen callbacks were treated as in-place mutations of the captured router value; variable-declarator aliases of the router are recognized too.

## [5.14.3] - 2026-07-11

### Changed

- Split AST fact collection from captured-mutation effect inference and reporting.
- Synchronized `immutability.spec.md` with the current React Compiler validation pass, including conditional known-effect propagation and terminal operand validation.

### Fixed

- Excluded resolvable global/module-scope bindings from captured-local mutation effects.
- Followed identifier-only variable-declarator aliases when resolving mutation targets and `useRef()` provenance.

## [5.13.2] - 2026-07-09

### Fixed

- Fixed a false positive where mutating `.current` on a `useRef()`-initialized variable whose name didn't follow the `ref`/`*Ref` naming convention (e.g. `const mounted = useRef(false); mounted.current = true;`) was incorrectly flagged when the containing function was passed to a hook. Added `isInitializedFromUseRef`/`isRefLikeChain` in `lib.ts` to also exempt refs by call-site detection (`useRef()`), not naming alone. Closes #1893. (#1893)

## [5.12.0] - 2026-07-08

### Added

- Added a second, mutation-site diagnostic (`mutates`: "This modifies 'name'.") reported alongside the existing usage-site diagnostic, so each violation now surfaces both locations described by `immutability.spec.md`'s dual-location error format (as two separate ESLint problems, since ESLint has no native multi-location diagnostic).

### Changed

- Replaced the naming-heuristic-only ref exemption plumbing with a leaner `lib.ts` (`isRefLikeName`, `hasRefLikeNameInChain`, `MUTATING_METHODS`) scoped to the new detection algorithm.
- Reworded the `default` message to closely follow the SPEC's usage-site message ("This function may (indirectly) reassign or modify 'name' after render") plus its description ("...which can cause inconsistent behavior on subsequent renders. Consider using state instead").
- Reworked the rule from scratch to match the React Compiler's `ValidateNoFreezingKnownMutableFunctions` validation pass described in `immutability.spec.md`: it now detects functions that (transitively) mutate a captured local variable and flags them when passed as a JSX prop, passed as a hook argument, or returned from a hook, instead of flagging direct state/props mutations.

### Removed

- Removed the `mutatingArrayMethod`, `mutatingAssignment`, and `noRefLikeStateName` diagnostics along with the direct state/props mutation checks and the `additionalStateHooks` dependency; this behavior may return as a separate rule/pass in the future.

## [5.7.3] - 2026-05-02

### Added

- Added `noRefLikeStateName` diagnostic to prevent state variables from being named `ref` or ending with `Ref`, which would otherwise bypass the ref exemption heuristic.
- Added ref mutation exemption via a naming heuristic: any object whose identifier is `ref` or ends with `Ref` is treated as a mutable ref and skipped from immutability checks. This covers both local refs and refs received as props (e.g., `inputRef.current = x`, `props.myRef.current.push(1)`).

### Changed

- `isUseReducerCall` detection now delegates to `core.isUseReducerCall` instead of a local implementation.

### Fixed

- Fixed false positives when mutating `RefObject<T>` values received as props. Closes #1751. (#1751)

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added spec documentation (`immutability.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Added IMPL–SPEC diff document (`immutability.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 4 additional invalid and 4 additional valid test cases ported from React Compiler fixtures.

## [5.3.1-beta.0] - 2026-04-20

### Fixed

- Fixed detection of mutations inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/immutability/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.0.2-beta.1] - 2026-03-28

### Fixed

- Excluded event handler parameters from props mutation checks to reduce false positives. Closes #1647. (#1647)

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `immutability` rule, consolidating and replacing `prefer-read-only-props`. (#1541)
- Validates against mutating props, state, and other values that are immutable. Detects in-place array mutations (e.g., `push`, `sort`, `splice`) and direct property assignments on state variables from `useState` and props objects. Mirrors the [`immutability`](https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability) lint rule described in the React docs.
- Registered in the `all` configuration preset.
