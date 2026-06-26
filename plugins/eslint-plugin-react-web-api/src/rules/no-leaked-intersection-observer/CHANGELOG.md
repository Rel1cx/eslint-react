# Changelog

All notable changes to the `react-web-api/no-leaked-intersection-observer` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.9.5] - 2026-06-27

### Fixed

- Fix false positive when the observed element is derived from a function call (e.g. `observer.observe(getEl())` paired with `observer.unobserve(getEl())` in the cleanup).

## [5.9.0] - 2026-06-13

### Added

- Initial release of the `no-leaked-intersection-observer` rule. (#1868)

### Fixed

- Report the observe-once pattern when `disconnect` is only called inside the observer's own callback, since the callback may never run if the component unmounts before the element intersects.
