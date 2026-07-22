# Changelog

All notable changes to the `react-x/refs` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.18.0] - 2026-07-23

### Changed

- Replaced `isUseRefCall` with `isUseRefLikeCall` in binding resolution; values initialized by custom ref hooks matching the `additionalRefHooks` setting are now treated as refs.

## [5.14.9] - 2026-07-15

### Changed

- Replaced the local `getCalleeName` helper with `Extract.getCalleeName` from `@eslint-react/ast`.
- Ref-like name checks and `.current` property checks now only apply to non-computed identifier properties.

## [5.14.0] - 2026-07-10

### Added

- Added render-reachability support for function declarations, IIFEs, synchronous array callbacks, and render-time callbacks passed to `useMemo` and `useReducer`.
- Added lazy-initialization support for explicit `undefined` guards and for null guards enclosing additional nested conditions.

### Changed

- Refactored ref aliases, function bindings, JSX refs, and duplicate initialization tracking to use scoped ESLint variable identities and position-aware binding events instead of file-wide identifier names.
- Reworked render-time call analysis as an unbounded fixed-point propagation, removing the previous 50-iteration cap.
- Tightened inverted lazy-initialization handling so the non-null branch must unconditionally return or throw.
- Stopped treating `!ref.current` as a null guard because initialized refs may contain falsy values.

## [5.13.1] - 2026-07-09

### Changed

- Aligned error message wording for `readDuringRender`, `writeDuringRender`, and `refPassedToFunction` with the React Compiler specification (`refs.spec.md`).

## [5.13.0] - 2026-07-09

### Added

- Added detection of nested property writes on a ref's value (e.g. `ref.current.inner = value`), which are now reported as `writeDuringRender` instead of being misclassified as a read.
- Added tracking of functions bound to (and called through) simple object-member-expression targets (e.g. `object.foo = () => ref.current; object.foo();`), closing a gap in the render-reachability analysis that previously only covered plain variable bindings.
- Added detection of `ref.current` accesses inside the lazy initializer function passed directly as `useState`'s first argument, since it runs synchronously during the initial render unlike other hook-callback arguments.
- Added an exemption for calls to a function named `render` (e.g. `props.render(ref)`, a common render-prop pattern) from the `refPassedToFunction` diagnostic, alongside the existing `mergeRefs`/hook exemptions.

### Changed

- Made lazy-init guard-block detection direction-aware: inside the branch of an `if (ref.current == null)`-style guard that is guaranteed to see `ref.current` as null, only a direct write is now treated as the (single) valid initialization - reads or values passed to a function there are still reported, matching `refs.spec.md`'s `ValidateNoRefAccessInRender` semantics. Reading the already-initialized value back in the other branch (the `if (x.current !== null) { return x.current; }` memoization idiom) remains allowed.
- Replaced `isRefCurrentNullCheck` with `getRefCurrentNullCheckBranch` in `lib.ts`, which reports which branch of a guard is the null branch instead of just whether the test is a recognized null check.
- Updated `refs.spec.diff.md` to reflect the fixes above and corrected the "Non-null Lazy Init Guards" entry, which was not an actual gap since `refs.spec.md` itself treats guards like `if (r.current == DEFAULT_VALUE)` as errors.

## [5.11.0] - 2026-07-05

### Added

- Added detection of ref mutations/reads inside helper functions that are called (directly, or through a simple variable alias) during render, closing a gap where any nested function was previously treated as a safe boundary regardless of whether it was actually invoked during render.
- Added `duplicateRefInit` diagnostic: only a single `if (ref.current == null) { ref.current = ... }` guarded initialization is now allowed per ref per component/hook; a second guarded write (in the same or a different `if` block) is now reported.
- Added support for `.current` accesses whose base is a member expression that looks like a ref (e.g. `props.ref.current`), not just a plain identifier.

### Changed

- Refactored rule internals (`computeReachedFunctions`, `isReachedDuringRender`) to more closely follow the phased algorithm described in `refs.spec.md`.
- Updated `refs.spec.diff.md` to reflect closed gaps and document remaining, intentional deviations from the React Compiler specification (e.g. callbacks passed to array methods or hooks are still treated as safe, to preserve existing accepted patterns).

## [5.6.4] - 2026-05-01

### Changed

- Refactored internal traversal to use the new `findParent` with `stop` predicate for more controlled ancestor traversal. (#1736)

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added spec documentation (`refs.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Added IMPL–SPEC diff document (`refs.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 2 additional invalid and 4 additional valid test cases ported from React Compiler fixtures.

## [5.3.1-beta.0] - 2026-04-20

### Fixed

- Fixed detection of ref usage inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/refs/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-beta.55] - 2026-02-28

### Changed

- Refactored refs rule internals for improved maintainability and detection accuracy. (#1563)

## [3.0.0-beta.33] - 2026-02-18

### Added

- Initial release of the `refs` rule. (#1519)
- Validates correct usage of refs by checking that `ref.current` is not read or written during render.
- Registered in the `all` configuration preset.
