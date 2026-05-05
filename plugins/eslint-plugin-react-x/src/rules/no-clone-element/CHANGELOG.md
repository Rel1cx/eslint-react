# Changelog

All notable changes to the `react-x/no-clone-element` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-clone-element/`.

## [0.10.1] - 2024-01-21

### Changed

- Added rule to `recommended` and `recommended-legacy` presets.

## [0.10.0] - 2023-12-21

### Added

- Initial release of the `no-clone-element` rule. (#55)
- Reports usage of `React.cloneElement` and recommends alternative patterns for passing props to children.
