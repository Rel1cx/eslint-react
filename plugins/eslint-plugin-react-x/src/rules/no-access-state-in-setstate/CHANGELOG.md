# Changelog

All notable changes to the `react-x/no-access-state-in-setstate` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.14.9] - 2026-07-15

### Changed

- Replaced `Extract.getPropertyName` with direct non-computed identifier checks when resolving `state` property access and destructuring.
- Accesses like `this["state"]` or destructuring from `{ "state": value }` are no longer treated as `state` access, since the runtime property name cannot be statically determined.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-access-state-in-setstate/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [0.10.11] - 2024-01-20

### Added

- Initial release of the `no-access-state-in-setstate` rule. (#319)
- Detects accessing `this.state` inside `setState` calls, which can lead to stale state issues. Recommends using the callback form of `setState` or functional updates instead.
