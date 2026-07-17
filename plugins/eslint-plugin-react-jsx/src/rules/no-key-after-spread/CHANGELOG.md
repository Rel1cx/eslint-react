# Changelog

All notable changes to the `react-jsx/no-key-after-spread` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.17.1] - 2026-07-17

### Changed

- Reworked the attribute scan to a pipeline style: `dropWhile` and `not` from `@local/eff` skip attributes before the first spread, `Check.is` from `@eslint-react/ast` detects spread props, and the new `isAttribute` from `@eslint-react/jsx` matches `key`.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-jsx/src/rules/no-key-after-spread/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.1] - 2026-04-01

### Added

- Relocated and renamed rule from `react-x/jsx-key-before-spread` to `react-jsx/no-key-after-spread`.
- Reports patterns that cause deoptimization when using the automatic JSX runtime (e.g. placing `key` after spread props).
