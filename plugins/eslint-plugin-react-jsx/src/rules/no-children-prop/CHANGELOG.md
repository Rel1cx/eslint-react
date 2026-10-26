# Changelog

All notable changes to the `react-jsx/no-children-prop` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.6] - 2026-10-27

### Fixed

- `children` supplied through a nested spread or a statically resolvable computed key in a `createElement` props object is now detected (ex: `createElement("div", { ...{ children: "x" } })`, `const propName = "children"; createElement("div", { [propName]: "x" })`). Property lookup now follows JavaScript object semantics (later properties win) and matches the JSX spread path. This aligns with TSX/TS semantics, where object spread and const-typed computed keys produce the same property as writing `children` directly.

### Changed

- Refactored the rule to use `parseCreateElementCall` and `findCreateElementProp` from `@eslint-react/jsx`; no further behavior change.

## [5.27.3] - 2026-10-16

### Fixed

- A `children` prop alongside nested children content (ex: `<div children="x">y</div>`, `createElement("div", { children: "x" }, "y")`) is no longer reported by this rule; that conflict case belongs to `react-jsx/no-children-prop-with-children`. This removes the unsafe merge suggestion (ex: `<div>yx</div>`) and the duplicate diagnostics for such code. (#2044)

## [5.17.0] - 2026-07-17

### Changed

- Refactored rule implementation: extracted `createElement` children-prop detection into the shared `@/utils/find-create-element-children-prop` helper and the JSX attribute removal fix into `@/utils/remove-jsx-attribute`.

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
