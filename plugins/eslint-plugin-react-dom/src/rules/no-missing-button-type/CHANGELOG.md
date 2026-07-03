# Changelog

All notable changes to the `react-dom/no-missing-button-type` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.10.2] - 2026-07-03

### Fixed

- Fixed a false negative where a computed identifier key in spread props (e.g. `<button {...{ [key]: "submit" }} />`) was treated as the static `type` prop, suppressing the missing-type report. The actual property name is the runtime value of the variable; computed string literal keys (e.g. `{...{ ["type"]: "button" }}`) still count as providing `type`.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-missing-button-type/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.0.3] - 2025-09-30

### Fixed

- Fixed false positive when specifying non-trivial expression as value of type attribute. Closes #1247. (#1250)

## [1.15.1] - 2024-10-26

### Fixed

- Fixed false positive when using type attribute in a JSX expression.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-missing-button-type` rule. (#76)
- Reports `<button>` elements that are missing an explicit `type` attribute.
