# Changelog

All notable changes to the `react-x/unstable-exhaustive-deps` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release of the `unstable-exhaustive-deps` rule, an experimental fork of `exhaustive-deps`. (#1698)
- Added the `hooks` option, based on the `hooks` option of Biome's `useExhaustiveDependencies` rule: `closureIndex` and `dependenciesIndex` check custom Hooks with the callback and the dependencies array at any position (both must be set and must differ), and `stableResult` marks the result of a Hook (`true`), or some positions of its returned array (an index or an array of indices), as stable. `stableResult` currently supports `boolean | number | number[]`; Biome's `string[]` form for object properties is not supported yet.

### Fixed

- Fixed no-dependency autofix insertion for parenthesized last arguments and trailing commas.
- Made `stableResult` supplement the built-in stability analysis while still rejecting reassigned values.
- Fixed stability detection for React 19 `useActionState` tuples, defaulted setters, and `var` redeclarations.
- Avoided false positives for configured Hooks without a function closure while preserving built-in missing-callback errors.
- Reset stateful `additionalEffectHooks` regular expressions between calls.
