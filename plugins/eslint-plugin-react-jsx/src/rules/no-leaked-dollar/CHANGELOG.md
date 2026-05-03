# Changelog

All notable changes to the `react-jsx/no-leaked-dollar` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-jsx/src/rules/no-leaked-dollar/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.3] - 2026-04-03

### Added

- Initial release of the `no-leaked-dollar` rule. (#1688)
- Reports leaked dollar signs (`$`) in JSX text nodes that may be rendered unexpectedly.
