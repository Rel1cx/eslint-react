# Changelog

All notable changes to the `react-dom/no-unsafe-iframe-sandbox` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-unsafe-iframe-sandbox/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.3.9] - 2025-11-22

### Fixed

- Fixed severity documentation in rule docs. (#1327)

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-unsafe-iframe-sandbox` rule. (#78)
- Reports unsafe `sandbox` attribute values on `<iframe>` elements.
