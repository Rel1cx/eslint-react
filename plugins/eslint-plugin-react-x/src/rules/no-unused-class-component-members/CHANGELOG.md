# Changelog

All notable changes to the `react-x/no-unused-class-component-members` rule will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.30.0-beta.7] - 2026-10-27

### Fixed

- Statically resolvable computed member reads (ex: `this["bar"]`, ``this[`bar`]``) and destructuring with static string keys are now counted as usages, so these members are no longer reported as unused.

### Changed

- Member definitions and usages are now tracked by static name, and public-method tracking moved to per-class name sets. No behavior change beyond the fix above.
- Added a fast-path text check that skips the rule when `Component` does not appear in the file. No behavior change.

## [5.26.2] - 2026-10-12

### Fixed

- Public methods (including function-valued properties) of an exported class component are no longer reported as unused, as they may be part of the component's imperative API invoked by consumers through refs (ex: react-native-gesture-handler's `DrawerLayout.openDrawer`, `Swipeable.openLeft`). Data fields, `private`/`protected` members, and members of non-exported classes are still reported.

## [5.21.2] - 2026-09-29

### Fixed

- Methods invoked by host environments through refs (React Native's `NativeMethods` interface: `setNativeProps`, `measure`, `measureInWindow`, `measureLayout`, `focus`, `blur`) are no longer reported as unused.

## [5.21.1] - 2026-09-28

### Changed

- Removed the manual class and method context stacks; the enclosing class and method are now resolved at the hit point with `Traverse.findParent` ancestor lookup, and the per-class member definition/usage maps are initialized lazily.

## [5.14.9] - 2026-07-15

### Changed

- Replaced `Extract.getPropertyName` with direct non-computed identifier checks when resolving class member names.
- Computed string-literal member definitions and usages (e.g. `this["foo"]()`) are no longer tracked, since the runtime property name cannot be statically determined.

## [5.6.4] - 2026-05-01

### Added

- Now flags `shouldComponentUpdate` methods defined in classes extending `PureComponent` as unused, since `PureComponent` implements its own `shouldComponentUpdate` with shallow prop and state comparison. (#1738)

## [5.2.3-beta.0] - 2026-04-14

### Changed

- Restructured monorepo directories: rule files moved to `plugins/eslint-plugin-react-x/src/rules/no-unused-class-component-members/`.
- Extracted rule helpers into co-located `lib.ts` module.
- Consolidated AST utilities to use normalized `Check`, `Compare`, `Extract` helpers.

## [3.0.0-rc.0] - 2026-03-08

### Added

- Registered the rule in the `recommended` and `x` configuration presets.

## [1.15.1] - 2024-07-22

### Changed

- Improved detection to support checking for more cases.

## [0.10.10] - 2024-01-14

### Added

- Initial release of the `no-unused-class-component-members` rule. (#293)
- Detects unused methods and properties in class components to help clean up dead code.
