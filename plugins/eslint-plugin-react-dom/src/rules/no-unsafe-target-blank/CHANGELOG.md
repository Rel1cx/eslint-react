# Changelog

All notable changes to the `react-dom/no-unsafe-target-blank` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.10] - 2026-10-27

### Changed

- Options are now read directly from `context.options[0] ?? {}` and defaults are captured per property with `??`, replacing the spread copy and `??=` mutation; the `RuleOptions` alias was removed. No change to reported problems.

## [5.30.0-beta.9] - 2026-10-27

### Changed

- Options are now resolved in `create` by copying `context.options[0]` into a mutable options object and applying defaults per property with `??=`, replacing the shared `complete` helper; `meta.defaultOptions: [{}]` now only provides the merge slot. No change to reported problems.

## [5.30.0-beta.7] - 2026-10-27

### Changed

- Rule options and schema now follow the standard tuple/`defaultOptions` pattern, with options resolved via the shared `complete` helper (`complete(context.options[0], defaultOptions[0])`), and `defaultOptions` is no longer exported. No behavior change.

## [5.30.0-beta.6] - 2026-10-27

### Changed

- Spread props are no longer statically resolved, so `target`, `href`, and `rel` provided through spread attributes are ignored; only direct attributes are checked. Direct `rel` values are read through `getAttributeValueByName` and `getAttributeStaticValue`.
- The suggestion for a missing `rel` attribute now inserts it after the last JSX attribute, so a spread attribute cannot override the suggested value.

## [5.28.5] - 2026-10-22

### Changed

- The suggested fix now adds `rel="noreferrer"` instead of `rel="noreferrer noopener"`, since `noreferrer` already implies `noopener` per the HTML spec. Values combining both tokens remain valid. Closes #2067.

## [5.25.0] - 2026-10-11

### Added

- Added an `allowReferrer` option (default: `false`). When enabled, `rel="noopener"` alone is accepted and the suggested fix adds `rel="noopener"` instead of `rel="noreferrer noopener"`, preserving referrer information while still requiring an explicit token. Closes #2012.

## [5.20.2] - 2026-09-20

### Fixed

- Fixed a false negative where member-expression components (e.g. `<motion.div as="a" href="..." target="_blank">`) were mistaken for host elements and the polymorphic prop was ignored; they are now resolved through the polymorphic prop and checked like the underlying DOM element.
- String values of the polymorphic prop are now normalized to lowercase, so `as="A"` is treated as `a`.

## [5.10.2] - 2026-07-03

### Changed

- Computed identifier keys in spread props (e.g. `<a {...{ [key]: "_blank" }} />`) are no longer treated as statically providing the `target`, `href`, or `rel` props, since the actual property name is the runtime value of the variable. Computed string literal keys are still recognized. This avoids both false positives (a computed key mistaken for `target="_blank"`) and false negatives (a computed key mistaken for a safe `rel`).

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-dom/src/rules/no-unsafe-target-blank/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [2.12.4] - 2026-02-11

### Changed

- Refactored to remove unnecessary `P.shape` usages.

## [2.3.12] - 2025-12-02

### Fixed

- Fixed to skip unrelated components.

## [1.15.1] - 2024-10-26

### Fixed

- Fixed links with `rel="noreferrer"` to be valid. Closes #562.
- Refactored to skip links that are not `href` or used as `href`.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-unsafe-target-blank` rule. (#79)
- Reports unsafe `target="_blank"` links without `rel="noopener noreferrer"`.
