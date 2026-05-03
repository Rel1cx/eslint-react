# Changelog

All notable changes to the `react-x/no-use-context` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-use-context/`.

## [3.0.0-rc.0] - 2026-03-08

### Changed

- Converted auto-fix to suggestions to prevent automatic code modifications that could break existing code.

## [1.26.1] - 2026-02-07

### Changed

- Minor internal improvements.

## [1.26.0] - 2026-02-06

### Added

- Initial release of the `no-use-context` rule. (#931)
- Reports usage of `useContext` and recommends migrating to the `use` API introduced in React 19.

### Fixed

- Fixed auto-fix to also remove associated imports when removing `useContext` usage. (#932)

### Changed

- Improved auto-fix output format for cleaner code transformations.
- Enhanced auto-fix to support removing aliased imports. (#933)
