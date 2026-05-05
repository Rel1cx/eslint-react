# Changelog

All notable changes to the `react-x/no-unused-props` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.3.1-beta.0] - 2026-04-20

### Fixed

- Fixed detection of props usage inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-unused-props/`.
- Extracted rule helpers into co-located `lib.ts` module.

## [3.0.0-beta.82] - 2026-03-06

### Fixed

- Fixed false positive for anonymous callbacks passed to call expressions. (#1602)

## [3.0.0-beta.66] - 2026-03-03

### Fixed

- Fixed false positive when using `Omit` on union props type. (#1578)

## [2.0.0] - 2025-09-26

### Added

- Initial release of the `no-unused-props` rule. (#1238)
- Reports unused props in components to help keep component APIs clean and maintainable.
