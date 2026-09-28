# Changelog

All notable changes to the `react-web-api/no-leaked-interval` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Fixed a false negative where a `setInterval` created in one effect was treated as cleared when a cleanup in another effect cleared a different variable with the same name (e.g. two effects each declaring their own `const intervalId`); identifier matching now resolves both sides to their variables by scope instead of comparing names only.

### Changed

- Replaced manual function-context stack tracking with `Traverse.findParent` ancestor lookup when checking whether a call is inside an effect setup or cleanup callback.

## [5.14.9] - 2026-07-15

### Changed

- Replaced `Extract.getPropertyName` with `Extract.getCalleeName` for callee name checks.
- Calls made through computed string-literal member access (e.g. `obj["setInterval"]()` / `obj["clearInterval"]()`) are no longer matched, since the runtime property name cannot be statically determined.

## [5.7.0] - 2026-05-02

### Changed

- Removed detection for Class Component lifecycles (`componentDidMount` / `componentWillUnmount`) and now only report on Hook Effects (`useEffect`, etc.).

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-web-api/src/rules/no-leaked-interval/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.11.0] - 2024-08-20

### Added

- Initial release of the `no-leaked-interval` rule. (#729)
- Reports leaked `setInterval` calls in React components.
