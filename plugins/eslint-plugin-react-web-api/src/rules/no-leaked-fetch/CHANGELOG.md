# Changelog

All notable changes to the `react-web-api/no-leaked-fetch` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.28.9] - Unreleased

### Fixed

- Only calls to the global `fetch` (a bare `fetch(...)` or `window.fetch(...)` / `globalThis.fetch(...)` / `self.fetch(...)`) are now checked, so local functions, imports, and methods on unrelated objects named `fetch` (ex: `function fetch() {}` or `api.fetch()`) are no longer reported. (#2072)

## [5.27.1] - 2026-10-15

### Fixed

- An effect cleanup is now recognized when the `useEffect` call itself is nested in an outer `return` (ex: a custom hook ending in `return useEffect(() => () => { ... })` or `return cond ? useEffect(() => ...) : null`), so fetches aborted in such cleanups are no longer reported. (#2039)

## [5.27.0] - 2026-10-15

### Fixed

- An effect setup wrapped in a type expression (ex: `useEffect((() => { fetch("/api/user"); }) as any, [])`) is now recognized as a setup callback, so the `fetch` inside is checked for an abort signal; previously it was silently skipped. (#2038)

## [5.24.7] - 2026-10-07

### Fixed

- Signal alias chains are now resolved recursively (e.g. `const s = controller.signal; const signal = s; fetch(url, { signal })`), so a fetch whose signal reaches its controller through multiple aliases correctly pairs with the cleanup's `abort` call, fixing false positives. Resolution is cycle-safe: self-referential alias loops (e.g. `let a = b; let b = a;`) no longer risk hanging and fall back to reporting. As a side effect, a parameter signal (e.g. from `useAbortableEffect`) passed through a local alias is now recognized as well. Closes #1997.

## [5.21.1] - 2026-09-28

### Fixed

- Fixed a false negative where a `fetch` started in one effect was treated as aborted when a cleanup in another effect aborted a different `AbortController` variable with the same name (e.g. two effects each declaring their own `const controller`); controller matching now resolves identifiers to their variables by scope instead of comparing names only.

### Changed

- Replaced manual function-context stack tracking with `Traverse.findParent` ancestor lookup when checking whether a `fetch` or `abort` call is inside an effect setup or cleanup callback.

## [5.20.5] - 2026-09-21

### Fixed

- Fixed a false positive where an `abort` call nested in a callback within the cleanup function (e.g. `setTimeout(() => ctrl.abort())`) was not recognized, causing a spurious `expectedAbortInCleanup` report. The `abort` lookup now finds the nearest enclosing setup/cleanup function instead of requiring the innermost one.

## [5.14.9] - 2026-07-15

### Changed

- Replaced `Extract.getPropertyName` with direct non-computed identifier checks when matching the `signal` fetch option.
- The `signal` option is no longer recognized when specified via a computed string-literal key (e.g. `{ ["signal"]: controller.signal }`), since the runtime property name cannot be statically determined.

## [5.10.2] - 2026-07-03

### Fixed

- Fixed a false negative where a computed identifier key in the fetch options (e.g. `fetch(url, { [signal]: controller.signal })`) was treated as a static `signal` option, masking leaked fetch calls. The actual property name is the runtime value of the variable, so it is no longer recognized; computed string literal keys (e.g. `{ ["signal"]: controller.signal }`) are still recognized.

## [5.9.5] - 2026-06-27

### Fixed

- Fix false positive when the `AbortController` is derived from a function call (e.g. `fetch(url, { signal: getController().signal })` paired with `getController().abort()` in the cleanup).

## [5.9.4] - 2026-06-26

### Changed

- Use `Extract.getPropertyName` to simplify `MemberExpression` property name checks and detect computed string property access.

## [5.7.0] - 2026-05-02

### Added

- Initial release of the `no-leaked-fetch` rule. (#1715)
- Reports leaked `fetch` calls in effects that are not properly aborted or cleaned up.
