# Changelog

All notable changes to the `react-x/no-unused-state` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.7.1] - 2026-05-02

### Changed

- Updated rule wording and documentation examples for clarity.

## [5.7.0] - 2026-05-02

### Added

- Fully implemented the `no-unused-state` rule. (#1741)
- Detects state variables declared via `useState` (or similar state hooks) that are defined but never read, or only read inside an effect or effect dependency array.

## [5.6.5] - 2026-05-01

### Added

- Re-added the `react-x/no-unused-state` rule as a no-op placeholder for future implementation.
- Rule was previously removed in `v5.0.0`.

## [0.10.7] - 2024-01-11

### Added

- Initial release of the `no-unused-state` rule. Closes #294. (#296)
- Detects unused state variables and methods in class components.
