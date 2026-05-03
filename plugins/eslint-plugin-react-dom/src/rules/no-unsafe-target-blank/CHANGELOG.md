# Changelog

All notable changes to the `react-dom/no-unsafe-target-blank` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-unsafe-target-blank/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.12.4] - 2026-02-11

### Changed

- Refactored to remove unnecessary `P.shape` usages.

## [2.3.12] - 2025-12-02

### Fixed

- Fixed to skip unrelated components.

## [1.15.1] - 2024-10-26

### Fixed

- Fixed links with `rel="noreferrer"` to be valid. Closes #562.
- Refactored to skip links that are not `href` or used as `href`.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-unsafe-target-blank` rule. (#79)
- Reports unsafe `target="_blank"` links without `rel="noopener noreferrer"`.
