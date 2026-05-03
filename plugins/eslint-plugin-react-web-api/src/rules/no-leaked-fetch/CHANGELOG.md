# Changelog

All notable changes to the `react-web-api/no-leaked-fetch` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.7.0] - 2026-05-02

### Added

- Initial release of the `no-leaked-fetch` rule. (#1715)
- Reports leaked `fetch` calls in effects that are not properly aborted or cleaned up.
