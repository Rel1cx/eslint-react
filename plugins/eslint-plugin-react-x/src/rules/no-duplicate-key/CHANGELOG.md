# Changelog

All notable changes to the `react-x/no-duplicate-key` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.24] - 2026-11-04

### Fixed

- Only keys that provably have a duplicate are now reported: unique siblings in a partially duplicate group (ex: `[A, B, B]`) are no longer reported, and duplicates followed by a unique key (ex: `[A, A, B]`) are now correctly reported.
- Keys collected through `Children.toArray()` and `Children.map()` are no longer reported, since React re-assigns the keys of their output. Keys nested inside an element passed to these APIs are still reported, since they are not re-assigned.
- Inside `.map()` callbacks, only elements returned by the callback are checked, so keyed elements passed to other functions, used as prop values, or placed in expression containers are no longer reported.
- Literal keys in `.map()` callbacks are no longer overwritten by later keys; every returned element with a literal key is now reported.
- `.map()` calls on array literals with at most one element are no longer reported, since no duplicate can occur.

## [5.30.0-beta.8] - 2026-10-27

### Changed

- Reverted the rule to the v5.28.8 implementation, removing the changes from v5.30.0-beta.7.

### Fixed

- The fast-path text check now matches bare `key` attributes and keys separated from `=` by whitespace (ex: `<div key />`, `<div key = {id} />`), so such elements are no longer silently skipped.

## [5.30.0-beta.7] - 2026-10-27

### Fixed

- Duplicate keys are now tracked per key instead of per group, so a later unique key can no longer clear an earlier duplicate (ex: `[A, A, B]`).
- Literal keys in `.map()` callbacks are no longer overwritten by later dynamic keys.
- Braced, numeric, template-literal, and valueless keys are now compared and reported as duplicates.
- Fixed keys in `.flatMap()` and `Array.from()` callbacks are now reported, sharing iterator callback detection with `no-missing-key`.
- Elements inside `Children.toArray()` and `Children.map()` calls are no longer reported as duplicates, since React re-assigns the keys of their output.
- The fast-path text check now matches bare `key` attributes and keys separated from `=` by whitespace (ex: `<div key />`, `<div key = {id} />`), so such elements are no longer silently skipped.

## [5.14.9] - 2026-07-15

### Changed

- Replaced `Extract.getPropertyName` with `Extract.getCalleeName` for callee name checks.
- Calls made through computed string-literal member access are no longer matched, since the runtime property name cannot be statically determined.

## [5.11.0] - 2026-07-05

### Changed

- Use `Extract.getPropertyName` to simplify `MemberExpression` property name checks and detect computed string property access.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-duplicate-key/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.0.2-beta.5] - 2026-03-30

### Fixed

- Fixed false positive for SVG `xlink` attributes.

## [2.5.5] - 2026-01-12

### Changed

- Removed rule from recommended configs and updated documentation.

## [1.27.0] - 2025-02-21

### Changed

- Changed severity of `no-duplicate-key` rule from `error` to `warn`. (#939)

## [1.22.2] - 2024-12-30

### Fixed

- Corrected bind name from `ietr` to `iter`.

### Changed

- Re-implemented rule to improve its performance. (#891)
- Added support for TypeScript's `as`, `satisfies`, and non-null assertion operator.
- Skip processing when no `key=` attribute is present.

## [1.12.3] - 2024-08-29

### Fixed

- Fixed false positives when the key is a variable. Closes #746.

## [1.12.2] - 2024-08-27

### Changed

- Improved performance of key comparison.

## [0.10.1] - 2023-12-27

### Fixed

- Fixed key prop's value in error message.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the `no-duplicate-key` rule.
- Reports duplicate key props in JSX elements.
