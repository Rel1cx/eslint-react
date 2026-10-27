# Changelog

All notable changes to the `react-jsx/no-namespace` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.6] - 2026-10-27

### Changed

- Namespace syntax is now detected by checking the JSX name node type directly instead of scanning the full element type string; no behavior change.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-jsx/src/rules/no-namespace/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.1] - 2026-04-01

### Added

- Relocated rule from `eslint-plugin-react-dom` to `eslint-plugin-react-jsx`.
- Reports JSX namespace syntax, which React does not support.
