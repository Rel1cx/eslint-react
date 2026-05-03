# Changelog

All notable changes to the `react-web-api/no-leaked-interval` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.7.0] - 2026-05-02

### Changed

- Removed detection for Class Component lifecycles (`componentDidMount` / `componentWillUnmount`) and now only report on Hook Effects (`useEffect`, etc.).

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-web-api/src/rules/no-leaked-interval/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.11.0] - 2024-08-20

### Added

- Initial release of the `no-leaked-interval` rule. (#729)
- Reports leaked `setInterval` calls in React components.
