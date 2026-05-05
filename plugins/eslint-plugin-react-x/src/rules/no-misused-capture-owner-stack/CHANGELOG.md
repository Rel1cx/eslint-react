# Changelog

All notable changes to the `react-x/no-misused-capture-owner-stack` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-misused-capture-owner-stack/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.45.0] - 2025-04-11

### Added

- Initial release of the `no-misused-capture-owner-stack` rule. (#1047)
- Detects misuse of the `captureOwnerStack` API and related internal debugging utilities that should not be used in production code.
