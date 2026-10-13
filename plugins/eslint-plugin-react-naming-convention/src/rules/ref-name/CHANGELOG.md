# Changelog

All notable changes to the `naming-convention/ref-name` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.26.4] - 2026-10-13

### Fixed

- The name lookup now stops at function boundaries, so expression-bodied factory functions and custom hooks (ex: `export const useAnchor = () => useRef<HTMLDivElement>(null)`) are no longer reported on the hook's name, matching the block-bodied version. Closes #2026.
- Calls inside JSX expressions (ex: `const el = <div ref={useRef(null)} />`) are no longer reported on the enclosing element variable.
- Calls used as computed object literal keys (ex: `const obj = { [useRef(null)]: 1 }`) or placed in class static blocks are no longer reported on the outer variable.
- The name lookup no longer crosses containers or derived values, so calls inside array literals, spreads, template literals, operators, yields, or callee positions (ex: `const refs = [useRef(null)]`, `const n = useRef(0) + 1`) are no longer reported on the enclosing variable. Within a sequence expression only the last value is checked (ex: `const value = (foo(), useRef(null))` is still reported).
- An object literal property with an unresolvable computed key (ex: `const refs = { [key]: useRef(null) }`) no longer falls back to reporting the outer variable, matching the behavior for member expression assignments and class properties.

## [5.26.3] - 2026-10-12

### Fixed

- Immediate dereferences of the `useRef` result through TypeScript type wrappers (ex: `(useRef(null) as { current: null }).current`, `useRef(null)!.current`, `useRef(null)?.current`) are no longer reported; this extends the #1375 fix, which only handled a bare member access.
- An enclosing object literal property key now takes precedence over the outer assignment target when statically known, so `const refs = { myRef: useRef(0) }` is no longer reported just because `refs` is not a valid ref name; conversely `{ value: useRef(0) }` is now reported on the `value` key.
- Computed member expression and class property keys with string literals are now checked (ex: `refs["value"] = useRef(null)`), while unresolvable computed keys (ex: `refs[value] = useRef(null)`) are no longer reported.

## [5.18.0] - 2026-07-23

### Changed

- Replaced `isUseRefCall` with `isUseRefLikeCall`; identifiers assigned from custom ref hooks matching the `additionalRefHooks` setting are now checked by this rule.
- Removed the `includes("useRef")` text precheck so files that only use custom ref hooks matching `additionalRefHooks` are no longer skipped.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-naming-convention/src/rules/ref-name/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.5.1] - 2026-01-05

### Fixed

- Fixed false positive with immediate dereference. Closes #1375. (#1376)

## [2.5.0] - 2025-12-31

### Added

- Initial release of the `use-ref-name` rule. (#1366)
- Reports `useRef` hooks that do not follow the recommended naming convention.

### Changed

- Renamed rule from `use-ref-name` to `ref-name` and added it to recommended presets. (#1367)
