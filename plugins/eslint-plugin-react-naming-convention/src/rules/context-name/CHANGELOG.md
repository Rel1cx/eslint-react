# Changelog

All notable changes to the `naming-convention/context-name` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.26.4] - 2026-10-13

### Fixed

- The name lookup now stops at function boundaries, so expression-bodied factory functions (ex: `export const createThemeContext = () => createContext(null)`) are no longer reported on the factory's name, matching the block-bodied version. Closes #2026.
- Calls inside JSX expressions (ex: `const el = <Ctx.Provider value={createContext("")} />`) are no longer reported on the enclosing element variable.
- Calls used as computed object literal keys (ex: `const obj = { [createContext("")]: 1 }`) or placed in class static blocks are no longer reported on the outer variable.
- The name lookup no longer crosses containers or derived values, so calls inside array literals, spreads, template literals, member accesses, operators, yields, or callee positions (ex: `const contexts = [createContext("")]`, `const Provider = createContext("").Provider`) are no longer reported on the enclosing variable. Within a sequence expression only the last value is checked (ex: `const value = (foo(), createContext(""))` is still reported).
- An object literal property with an unresolvable computed key (ex: `const contexts = { [key]: createContext("") }`) no longer falls back to reporting the outer variable, matching the behavior for member expression assignments and class properties.

## [5.26.3] - 2026-10-12

### Fixed

- An enclosing object literal property key now takes precedence over the outer assignment target when statically known, so `const contexts = { ThemeContext: createContext("") }` is no longer reported just because `contexts` is not a valid context name; conversely `{ theme: createContext("") }` is now reported on the `theme` key.
- Computed member expression and class property keys with string literals are now checked (ex: `ctxs["theme"] = createContext("")`), while unresolvable computed keys (ex: `ctxs[theme] = createContext("")`) are no longer reported.

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-naming-convention/src/rules/context-name/`.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0] - 2026-03-16

### Changed

- Removed React 19 version restriction from the rule. (#1558)

## [2.5.3] - 2026-01-09

### Changed

- Updated rule to include React version checks. Closes #1382. (#1384)

## [1.40.0] - 2025-04-01

### Changed

- Enabled rule in recommended presets. (#1024)

## [1.29.0] - 2025-03-01

### Added

- Initial release of the `context-name` rule. (#952)
- Reports React contexts that do not follow the recommended naming convention.
