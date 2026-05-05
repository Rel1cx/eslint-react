# Changelog

All notable changes to the `react-x/use-state` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.3.1-beta.0] - 2026-04-20

### Fixed

- Fixed detection of `useState` usage inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)

## [5.2.3-beta.0] - 2026-04-12

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/use-state/`.
- Moved pattern utilities to rule directories for better co-location.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `use-state` rule, relocated from `react-naming-convention/use-state`. (#1530)
- Enforces correct usage of the `useState` hook — destructuring, symmetric naming of the value and setter (e.g., `count` / `setCount`), and lazy initialization of expensive initial state.
- Consolidated lazy-initialization behavior from the deprecated `prefer-use-state-lazy-initialization` rule, controlled by the `enforceLazyInitialization` option (default: `true`).
- Registered in the `recommended` and `x` configuration presets.
