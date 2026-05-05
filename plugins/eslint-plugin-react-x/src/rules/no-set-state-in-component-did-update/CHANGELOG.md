# Changelog

All notable changes to the `react-x/no-set-state-in-component-did-update` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-set-state-in-component-did-update/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [0.9.2] - 2023-12-06

### Added

- Initial release of the `no-set-state-in-component-did-update` rule. Closes #198. (#201)
- Reports usage of `setState` inside `componentDidUpdate`.
