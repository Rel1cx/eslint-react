# Changelog

All notable changes to the `react-x/no-leaked-conditional-rendering` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-leaked-conditional-rendering/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.10.0] - 2025-02-05

### Fixed

- Added support for enum types in conditional rendering checks. Closes #1428. (#1429)

## [1.47.3] - 2025-04-15

### Fixed

- Fixed potential false negatives when logical expressions are wrapped by type expressions. (#1068)

## [1.16.2] - 2024-11-20

### Fixed

- Fixed rule not reporting empty strings in conditional rendering. Closes #853. (#857)

## [1.10.0] - 2024-08-11

### Added

- Added BigInt literal support on the left side of logical expressions.
- Added support for truthy number literals on the left side of logical expressions.

### Fixed

- Fixed object types not being considered as valid left-hand types. Closes #568.

## [0.10.1] - 2024-01-21

### Fixed

- Fixed handling of conditional expressions with same test and consequent. (#95)

## [0.10.0] - 2023-12-21

### Changed

- Re-implemented rule to use type information for more accurate detection of leaked conditional rendering values. (#91)

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-leaked-conditional-rendering` rule.
- Reports leaked conditional rendering values that may render unexpectedly.
