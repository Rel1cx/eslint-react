# Changelog

All notable changes to the `react-x/no-create-ref` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-create-ref/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [1.10.0] - 2024-08-11

### Changed

- Optimized rule implementation to be smaller and faster.

## [1.5.28] - 2024-07-20

### Changed

- Optimized rule performance.

## [0.10.4] - 2024-01-06

### Fixed

- Fixed issue where the same kind of error inside a component was only reported once.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the `no-create-ref` rule. (#50)
- Reports usage of `createRef` in function components and recommends using `useRef` instead.
