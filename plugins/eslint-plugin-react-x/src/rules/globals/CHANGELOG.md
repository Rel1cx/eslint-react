# Changelog

All notable changes to the `react-x/globals` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.5.3-beta.1] - 2026-04-27

### Changed

- Expanded compiler fixture coverage with 4 additional invalid and 10 additional valid test cases ported from React Compiler fixtures.

## [5.3.1-beta.0] - 2026-04-20

### Added

- Initial release of the `globals` rule. (#1716)
- Restricts usage of global variables in React components and hooks to encourage explicit dependency injection and improve testability.

### Fixed

- Fixed detection of globals inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)
