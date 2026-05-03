# Changelog

All notable changes to the `react-x/no-unused-class-component-members` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.6.4] - 2026-05-01

### Added

- Now flags `shouldComponentUpdate` methods defined in classes extending `PureComponent` as unused, since `PureComponent` implements its own `shouldComponentUpdate` with shallow prop and state comparison. (#1738)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-unused-class-component-members/`.
- Extracted rule helpers into co-located `lib.ts` module.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.0] - 2026-03-08

### Added

- Registered the rule in the `recommended` and `x` configuration presets.

## [1.15.1] - 2024-07-22

### Changed

- Improved detection to support checking for more cases.

## [0.10.10] - 2024-01-14

### Added

- Initial release of the `no-unused-class-component-members` rule. (#293)
- Detects unused methods and properties in class components to help clean up dead code.
