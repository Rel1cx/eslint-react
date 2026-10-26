# Changelog

All notable changes to the `react-dom/no-string-style-prop` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.6] - 2026-10-27

### Changed

- Spread props are no longer statically resolved, so a `style` provided through a spread attribute is ignored; only direct `style` attributes are checked. Direct values are read through `getAttributeValueByName` and `getAttributeStaticValue`.

## [5.10.2] - 2026-07-03

### Fixed

- Fixed a false positive where a computed identifier key in spread props (e.g. `<div {...{ [key]: "color: red" }} />`) was treated as the static `style` prop. The actual property name is the runtime value of the variable; computed string literal keys are still recognized.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-string-style-prop/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-string-style-prop` rule. (#59)
- Reports string values passed to the `style` prop instead of objects.
