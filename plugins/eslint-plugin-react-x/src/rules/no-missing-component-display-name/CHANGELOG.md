# Changelog

All notable changes to the `react-x/no-missing-component-display-name` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-missing-component-display-name/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.0] - 2026-03-08

### Changed

- Changed rule type from `problem` to `suggestion` for better categorization.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-missing-component-display-name` rule. Closes #107. (#170)
- Reports components that are missing a `displayName` property.
