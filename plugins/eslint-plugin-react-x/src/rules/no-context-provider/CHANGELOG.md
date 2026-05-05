# Changelog

All notable changes to the `react-x/no-context-provider` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-context-provider/`.

## [3.0.0-rc.0] - 2026-03-08

### Changed

- Converted auto-fix to suggestions to prevent automatic code modifications that could break existing code.

## [2.10.0] - 2026-02-05

### Changed

- Updated documentation to use TIP callout instead of warning callout.

## [1.34.1] - 2025-03-15

### Fixed

- Fixed false positive on components named `Provider` that are imported from third-party libraries. Closes #991. (#992)

## [1.32.1] - 2025-03-13

### Fixed

- Fixed auto-fix incorrectly replacing `<Provider>` with `<>` in certain cases. Closes #984. (#985)

## [1.26.2] - 2025-02-07

### Changed

- Enhanced error messages to include the context name for clearer reporting. (#935)

## [1.19.0] - 2024-12-16

### Added

- Initial release of the `no-context-provider` rule. (#873)
- Reports usage of `<Context.Provider>` and recommends using `<Context>` directly, as supported in React 19.
