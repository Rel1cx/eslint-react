# Changelog

All notable changes to the `react-x/use-state` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.7] - 2026-10-27

### Changed

- Options are now resolved with `complete(context.options[0], defaultOptions[0])`, and the option schema properties use descriptions instead of inline `default` values. No behavior change.

## [5.30.0-beta.2] - 2026-10-25

### Changed

- Nested call and `new` expression collection now uses the shared `Collect.getCallExpressions` and `Collect.getNewExpressions` helpers from `@eslint-react/ast`; the rule-local visitor-key tables were removed. (#2080)

### Fixed

- Calls in computed object property keys (ex: `useState({ [getKey()]: value })`) and JSX subtrees are now detected by the lazy-initialization check instead of being missed. (#2080)

## [5.24.0] - 2026-10-04

### Changed

- Aligned the `CallExpression`/`NewExpression` visitor keys of the nested-expression collectors to callee-first order, matching `eslint-visitor-keys`. No behavior change.

## [5.22.1] - 2026-09-29

### Changed

- Returning the `useState` result directly (ex: `return React.useState()`) is now allowed regardless of the rule's options, matching the exemption in the original `react/hook-use-state` rule — a common pattern in custom hooks. This includes explicit `return` statements, arrow function implicit returns, and type-asserted returns (ex: `return useState(0) as [number, Dispatch<number>]`). Lazy initialization checks still apply to the arguments. (#1963)

## [5.3.1-beta.0] - 2026-04-20

### Fixed

- Fixed detection of `useState` usage inside type expressions and chain expressions by adding missing `Extract.unwrap`. (#1717)

## [5.2.3-beta.0] - 2026-04-12

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/use-state/`.
- Moved pattern utilities to rule directories for better co-location.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.0] - 2026-03-08

### Added

- Initial release of the `use-state` rule, relocated from `react-naming-convention/use-state`. (#1530)
- Enforces correct usage of the `useState` hook — destructuring, symmetric naming of the value and setter (e.g., `count` / `setCount`), and lazy initialization of expensive initial state.
- Consolidated lazy-initialization behavior from the deprecated `prefer-use-state-lazy-initialization` rule, controlled by the `enforceLazyInitialization` option (default: `true`).
- Registered in the `recommended` and `x` configuration presets.
