# Changelog

All notable changes to the `react-x/static-components` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.11.0]

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
