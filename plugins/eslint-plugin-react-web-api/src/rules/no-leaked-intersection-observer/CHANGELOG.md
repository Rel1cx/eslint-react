# Changelog

All notable changes to the `react-web-api/no-leaked-intersection-observer` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Observer instances held in a ref (e.g. `const ref = useRef(new IntersectionObserver(callback))`) are now tracked: `ref.current.observe(...)` / `ref.current.unobserve(...)` / `ref.current.disconnect()` — including local aliases of `ref.current` — are checked for cleanup-phase disposal just like observers created inside the effect, and a `useRef(new IntersectionObserver(...))` whose result is not assigned to a variable reports `unexpected-floating-instance`. Closes #2003.

### Fixed

- `disconnect()` / `unobserve(...)` now only count as cleanup when they run in the effect's cleanup phase — inside the returned cleanup function, a named cleanup function returned from the setup, or a local helper called from the cleanup. Calls made during the setup phase (e.g. a `disconnect()` right after `observe(...)` with no cleanup returned) no longer satisfy the check, fixing false negatives for genuinely leaked observers. Closes #2002.
- `unobserve(...)` inside the observer's own callback no longer pairs with `observe(...)`, matching the existing `disconnect()` semantics: the observer callback may never run before unmount.

## [5.21.1] - 2026-09-28

### Fixed

- Fixed a false negative where an `IntersectionObserver` created in one effect was treated as disconnected or unobserved when a cleanup in another effect referenced a different variable with the same name; observer and element matching now resolves identifiers to their variables by scope instead of comparing names only.

### Changed

- Replaced manual function-context stack tracking with `Traverse.findParent` ancestor lookup when checking whether a call is inside an effect setup or cleanup callback.

## [5.14.9] - 2026-07-15

### Changed

- Replaced `Extract.getPropertyName` with `Extract.getCalleeName` for callee name checks.
- Calls made through computed string-literal member access (e.g. `obj["observe"]()` / `obj["disconnect"]()` on an IntersectionObserver) are no longer matched, since the runtime property name cannot be statically determined.

## [5.9.5] - 2026-06-27

### Fixed

- Fix false positive when the observed element is derived from a function call (e.g. `observer.observe(getEl())` paired with `observer.unobserve(getEl())` in the cleanup).

## [5.9.0] - 2026-06-13

### Added

- Initial release of the `no-leaked-intersection-observer` rule. (#1868)

### Fixed

- Report the observe-once pattern when `disconnect` is only called inside the observer's own callback, since the callback may never run if the component unmounts before the element intersects.
