# Changelog

All notable changes to the `react-x/no-set-state-in-component-did-mount` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- A `componentDidMount` defined as a class property (ex: `componentDidMount = () => { this.setState(...) }` or `componentDidMount = function () { ... }`, including type-expression-wrapped values) is now recognized; a direct `this.setState` call in it is reported just like the method shorthand form.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-set-state-in-component-did-mount/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [0.9.2] - 2023-12-06

### Added

- Initial release of the `no-set-state-in-component-did-mount` rule. Closes #197. (#201)
- Reports usage of `setState` inside `componentDidMount`.
