# Changelog

All notable changes to the `react-web-api/no-leaked-event-listener` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.7.0] - 2026-05-02

### Changed

- Removed detection for Class Component lifecycles (`componentDidMount` / `componentWillUnmount`) and now only report on Hook Effects (`useEffect`, etc.).

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-web-api/src/rules/no-leaked-event-listener/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.5] - 2026-03-16

### Fixed

- Recognize function parameter as valid signal. Closes #1622. (#1623)

## [2.3.12] - 2025-12-02

### Fixed

- Fix false positive when using React Native `BackHandler`. Closes #1323. (#1336)

## [2.3.7] - 2025-11-21

### Fixed

- Does not report event listeners with `signal`. Closes #1282. (#1325)

## [1.53.1] - 2025-06-12

### Fixed

- Fix `useEffect` setup function check to handle `React.useEffect()` calls correctly. Closes #1228. (#1229)

## [1.12.3] - 2024-08-29

### Added

- Added support for detecting event listeners removed by abort signal.

## [1.11.0] - 2024-08-20

### Added

- Initial release of the `no-leaked-event-listener` rule. (#726)
- Reports leaked `addEventListener` calls in React components.
