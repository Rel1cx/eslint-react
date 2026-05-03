# Changelog

All notable changes to the `react-x/no-class-component` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-class-component/`.

## [1.44.0] - 2025-04-11

### Changed

- Updated rule description to clarify the exception for error boundaries.

## [1.10.0] - 2024-08-11

### Added

- Added exception for class components that use `componentDidCatch`, as they are required for error boundaries. Closes #495.

### Fixed

- Fixed components using `getDerivedStateFromError` being incorrectly warned. Closes #531.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the `no-class-component` rule. (#39)
- Reports usage of class components to encourage migrating to function components.
