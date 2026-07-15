# Changelog

All notable changes to the `react-jsx/no-children-prop` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.16.1] - 2026-07-16

### Fixed

- `React.createElement` calls whose props argument is wrapped in a TypeScript type assertion (e.g. `{ children: "x" } as Props`) are now reported.
- The suggestion fix now escapes JSX-sensitive characters (`<`, `>`, `{`, `}`, `&`) when moving a string `children` prop value into element content.
- Computed property keys written as template literals (e.g. `{ [`children`]: "x" }`) are now recognized as the `children` prop.
- Fixed a false positive where a computed identifier key in a `createElement` props object (e.g. `{ [propName]: "Children" }`) was treated as the static `children` prop.

## [5.10.2] - 2026-07-03

### Fixed

- Fixed a false positive where a computed identifier key in spread props (e.g. `<Comp {...{ [key]: value }} />`) was treated as the static `children` prop. The actual property name is the runtime value of the variable; computed string literal keys are still reported.

## [5.8.12] - 2026-06-05

### Changed

- Removed local `trimLikeReact` helper from `lib.ts` in favor of utilities from `@eslint-react/jsx`. (#1836)

## [5.8.7] - 2026-05-29

### Fixed

- Corrected `trimLikeReact` JSDoc to clarify it is an auto-fixer formatting utility, not a model of React's rendering behaviour. (#1805)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-jsx/src/rules/no-children-prop/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.1] - 2026-04-01

### Added

- Relocated rule from `eslint-plugin-react-x` to `eslint-plugin-react-jsx`.
- Added suggestion-fix feature to move children from prop to element content.

## [0.9.0] - 2023-12-01

### Added

- Initial release of the `no-children-prop` rule. (#132)
- Reports passing `children` as a prop instead of as nested content.
