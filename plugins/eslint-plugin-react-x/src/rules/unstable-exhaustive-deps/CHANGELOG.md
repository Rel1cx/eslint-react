# Changelog

All notable changes to the `react-x/unstable-exhaustive-deps` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release of the `unstable-exhaustive-deps` rule, an experimental fork of `exhaustive-deps`. (#1698)
- Added the `hooks` option, with the same shape as the `hooks` option of Biome's `useExhaustiveDependencies` rule: `closureIndex` and `dependenciesIndex` check custom Hooks with the callback and the dependencies array at any position, and `stableResult` marks the result of a Hook (`true`), or some positions of its returned array (an index or an array of indices), as stable.
