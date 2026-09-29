# Changelog

All notable changes to the `react-x/static-components` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Dynamic creation-site tracing now follows both sides of logical expressions (ex: `const C = DefaultComponent || (() => <div />)`) and the final element of sequence expressions (ex: `const C = (setup(), () => <div />)`), in variable initializers and reassignments alike.
- Added 14 boundary test cases characterizing creation-site resolution (aliasing, type-assertion and optional-chaining unwrapping, logical/sequence expressions), render-boundary checks (class lifecycle methods, effect callbacks, shadowing), and per-usage reporting.

### Changed

- Restructured the rule to the fact-based implementation pattern without changing behavior:
  - `collect.ts` (new): `createFactCollector()` gathers JSX component usages as typed `ComponentUsageFact`s.
  - `origins.ts` (new): `getDynamicComponentSource` is now `resolveDynamicComponentOrigin`, resolving a component binding to its dynamic creation site together with `findDynamicCreationSite` and `findReassignmentCreationSite`.
  - `effects.ts` (new): `inferCreatedComponents` turns usage facts plus the render-boundary predicate into typed `CreatedComponentEffect`s without reporting.
  - `lib.ts`: now holds only pure helpers — the `KNOWN_DYNAMIC_EXPRESSION_TYPES` constant and `createRenderBoundaryChecker`, which takes component nodes instead of the core collectors.
  - `static-components.ts`: reduced to wiring the collectors, running the pipeline in `Program:exit`, and reporting `default`/`createdHere` in one place.

### Fixed

- Component parameters of nested non-component functions (ex: `function render(Comp) { return <Comp /> }`) are no longer mistaken for components created during render; definitions are now judged by definition type (`DefinitionType.FunctionName`/`DefinitionType.ClassName`) instead of AST node type, so a parameter's def node (its enclosing function) is not misclassified as a function declaration created during render.
- The `createdHere` diagnostic is no longer reported once per JSX usage of the same component; it is now reported once per creation site, while the `default` diagnostic remains per usage.

## [5.11.0] - 2026-07-05

### Changed

- Refactored the rule's internals without changing behavior:
  - `lib.ts`: `findVariableForIdentifier` now delegates to `@typescript-eslint/utils/ast-utils`'s `findVariable` instead of a hand-rolled scope-chain walk; split `resolveDynamicValue` into `findDynamicCreationSite` (expression resolution) and `findReassignmentCreationSite` (reassignment tracking); removed the unused `isDynamicComponent` export.
  - `static-components.ts`: extracted `createRenderBoundaryChecker` (merges function/class component nodes into a single `Set` for the render-boundary check) and `reportIfCreatedDuringRender` (per-candidate reporting) out of the `Program:exit` handler; JSX candidates are now collected as a typed `JsxComponentCandidate` list holding the `JSXIdentifier` directly.

## [5.6.0-beta.1] - 2026-04-28

### Added

- Registered the rule in the `all`, `x`, and `disable-experimental` configuration presets. (`1d179849c`)

## [5.5.3-beta.1] - 2026-04-27

### Added

- Added IMPL–SPEC diff document (`static-components.spec.diff.md`) for tracking deviations from the React Compiler specification.

### Changed

- Expanded compiler fixture coverage with 2 additional invalid and 2 additional valid test cases ported from React Compiler fixtures.

## [5.5.3-beta.0] - 2026-04-26

### Added

- Added `createdHere` diagnostic to reduce false positives by distinguishing components created in the current scope from those passed as arguments or imported.

## [5.5.2-beta.0] - 2026-04-26

### Added

- Enhanced rule with variable reference tracking for more accurate static component detection.
- Added spec documentation (`static-components.spec.md`) documenting algorithms, validation rules, edge cases, and examples.
- Extracted rule helpers into co-located `lib.ts` module.

## [5.4.0-beta.0] - 2026-04-25

### Added

- Initial release of the `static-components` rule. (#1723)
- Enforces static component definitions by detecting components defined inside render or other function scopes, which can cause unnecessary re-renders and state loss.
