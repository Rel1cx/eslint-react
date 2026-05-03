# Changelog

All notable changes to the `react-dom/no-missing-iframe-sandbox` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-missing-iframe-sandbox/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.15.1] - 2024-10-26

### Fixed

- Fixed false positive when the `sandbox` attribute is set to `sandbox=""`. Closes #700.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-missing-iframe-sandbox` rule. (#77)
- Reports `<iframe>` elements that are missing a `sandbox` attribute.
