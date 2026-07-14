# Changelog

All notable changes to the `react-web-api/no-leaked-fetch` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
