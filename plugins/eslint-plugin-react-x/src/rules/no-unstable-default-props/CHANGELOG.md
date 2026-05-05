# Changelog

All notable changes to the `react-x/no-unstable-default-props` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.0] - 2026-04-29

### Fixed

- Fixed type expression handling by unwrapping type expressions before inspecting AST node types. (#1732)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-unstable-default-props/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.10.0] - 2025-02-05

### Added

- Added `safeDefaultProps` option to allow configuring known-safe default prop patterns. Closes #1312. (#1313)

## [1.15.1] - 2024-07-22

### Fixed

- Fixed false negatives when using `LogicalExpression` and `ConditionalExpression` in default props.

## [0.10.10] - 2024-01-14

### Added

- Enhanced detection to support checking for `ObjectPatterns` within `VariableDeclarators` that occur on props.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the `no-unstable-default-props` rule.
- Detects unstable default prop values (e.g., object/array literals, function expressions) that cause unnecessary re-renders.
