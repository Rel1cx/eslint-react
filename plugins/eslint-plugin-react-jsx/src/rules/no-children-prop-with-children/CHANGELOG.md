# Changelog

All notable changes to the `react-jsx/no-children-prop-with-children` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.6] - 2026-10-27

### Fixed

- `children` supplied through a nested spread or a statically resolvable computed key in a `createElement` props object is now detected when children arguments are also present (ex: `createElement("div", { ...{ children: "x" } }, "text")`). Property lookup now follows JavaScript object semantics (later properties win) and matches the JSX spread path. This aligns with TSX/TS semantics, where object spread and const-typed computed keys produce the same property as writing `children` directly.

### Changed

- Refactored the rule to use `parseCreateElementCall` and `findCreateElementProp` from `@eslint-react/jsx`; no further behavior change.

## [5.27.3] - 2026-10-16

### Fixed

- Empty expression containers (ex: `{}`, `{/* comment */}`) are no longer treated as meaningful children, so `<div children="x">{/* comment */}</div>` is no longer reported. (#2045)

## [5.17.0] - 2026-07-17

### Changed

- Refactored rule implementation: extracted `createElement` children-prop detection into the shared `@/utils/find-create-element-children-prop` helper and the JSX attribute removal fix into `@/utils/remove-jsx-attribute`.

## [5.16.1] - 2026-07-16

### Fixed

- `React.createElement` calls whose props argument is wrapped in a TypeScript type assertion (e.g. `{ children: "x" } as Props`) are now reported.
- Computed property keys written as template literals (e.g. `{ [`children`]: "x" }`) are now recognized as the `children` prop.
- Fixed a false positive where a computed identifier key in a `createElement` props object (e.g. `{ [propName]: "Children" }`) was treated as the static `children` prop.

## [5.10.2] - 2026-07-03

### Fixed

- Fixed a false positive where a computed identifier key in spread props (e.g. `<Comp {...{ [key]: value }}>text</Comp>`) was treated as the static `children` prop. The actual property name is the runtime value of the variable; computed string literal keys are still reported.

## [5.8.7] - 2026-05-29

### Fixed

- Aligned children filtering with React source behaviour: empty string expressions are now treated as non-meaningful children, matching runtime behaviour. (#1805)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-jsx/src/rules/no-children-prop-with-children/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [4.2.1] - 2026-04-01

### Added

- Initial release of the `no-children-prop-with-children` rule.
- Reports passing `children` as a prop when children are also passed as nested content.
