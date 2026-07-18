# Changelog

All notable changes to the `react-dom/no-unsafe-iframe-sandbox` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Spread `sandbox` props provided through a string literal key, a statically evaluable computed key, or an identifier alias chain are now checked for unsafe combinations, matching the behavior documented in 5.10.2. The static value is also resolved per property, so unrelated non-static properties in the same spread object no longer block the check.

## [5.10.2] - 2026-07-03

### Fixed

- Fixed a false positive where a computed identifier key in spread props (e.g. `<iframe {...{ [key]: "allow-scripts allow-same-origin" }} />`) was treated as the static `sandbox` prop and its value checked for unsafe combinations. The actual property name is the runtime value of the variable; computed string literal keys are still checked.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-unsafe-iframe-sandbox/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.3.9] - 2025-11-22

### Fixed

- Fixed severity documentation in rule docs. (#1327)

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-unsafe-iframe-sandbox` rule. (#78)
- Reports unsafe `sandbox` attribute values on `<iframe>` elements.
