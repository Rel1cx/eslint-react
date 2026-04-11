---
title: Roadmap
---

## Milestone 5.0

### System Requirements

Minimum supported versions:

- [x] Node.js: 22.0.0
- [x] ESLint: 10.x.x
- [x] TypeScript: 5

### Core API Refactoring

- [x] Performed a large-scale flattening refactor of the core package's internal structure, merging modules previously scattered across subdirectories like `component/`, `function/`, `hook/`, `semantic/`, and `api/` into the root directory.
- [x] Renamed several core APIs:
  - `isReactAPI` → `isAPI`
  - `isReactAPICall` → `isAPICall`
  - `isInitializedFromReact` → `isAPIFromReact`
  - `isInitializedFromReactNative` → `isAPIFromReactNative`
  - `ComponentDetectionHint` → `FunctionComponentDetectionHint`
  - `ComponentFlag` → `FunctionComponentFlag`
  - `getComponentCollector` → `getFunctionComponentCollector`
  - `getComponentCollectorLegacy` → `getClassComponentCollector`
- [x] Migrated type utilities `type-is`, `type-name`, and `type-variant` from `eslint-plugin-react-x` to `@eslint-react/core`.
- [x] Updated the `Toolkit` interface in `@eslint-react/kit` to reflect the naming changes above.

### Kit API Simplification (@eslint-react/kit)

- [x] Simplified `RuleToolkit.is` API: Removed pre-built identifier predicates (`memo`, `lazy`, `forwardRef`, etc.) from `RuleToolkit.is`. Only `*Call` variants and `API`/`APICall` factories are now available.
- [x] Renamed initialization checkers:
  - `initializedFromReact` → `APIFromReact`
  - `initializedFromReactNative` → `APIFromReactNative`
- [x] Removed deprecated `RuleDefinition` type alias: Use `RuleFunction` instead.

### Removed Rules

- [x] `@eslint-react/no-redundant-should-component-update`: This rule, along with its documentation and tests, has been removed from `eslint-plugin-react-x` and all configuration presets (`all`, `x`, `recommended`, `strict`, etc.).
- [x] `debug/class-component`: This debug rule has been removed from `eslint-plugin-react-debug` and the `debug/all` configuration.
- [x] `no-unnecessary-use-callback` (react-x): Removed from all configs.
- [x] `no-unnecessary-use-memo` (react-x): Removed from all configs.
- [x] `no-unused-state` (react-x): Removed from all configs.
- [x] `prefer-destructuring-assignment` (react-x): Removed from all configs.
- [x] `prefer-namespace-import` (react-dom): Removed from all configs.
- [x] `prefer-namespace-import` (react-x): Removed from all configs.

### Class Component Support Deprecation

- [x] All Class Component-related detection functions in the core package (such as `isClassComponent`, `isPureComponent`, and various lifecycle checkers) have been marked as `@deprecated`, retaining only minimal compatibility support for existing rules.
- [x] Rules in `eslint-plugin-react-web-api`, including `no-leaked-event-listener`, `no-leaked-interval`, and `no-leaked-timeout`, have removed detection for Class Component lifecycles (`componentDidMount` / `componentWillUnmount`) and now only report on Hook Effects (`useEffect`, etc.).

### New Features

- [x] Added support for **Universally Unique Lexicographically Sortable Identifiers (ULID)** for anonymous rules. This provides more robust identification for rules created without explicit names, improving debugging and traceability.

### Documentation

- [x] Added an Examples page (`/docs/examples`), listing all official example projects and links.
- [x] Removed redundant Overview headings in several places throughout the documentation.
- [x] Updated the migration guide and roadmap.
- [x] Added new recipes:
  - `custom-rules-of-children` recipe for creating custom ESLint rules for React Children API.
  - `custom-rules-of-context` recipe for creating custom ESLint rules for React Context API.
  - `no-multiple-children-in-title` rule example.
  - `prefer-namespace-import` recipe for enforcing namespace imports.
- [x] Updated kit documentation to reflect API renames and removals.
- [x] Synchronized API documentation across packages.
- [x] Added beta warning to Configure Project Rules documentation.

### Internal Improvements

- [x] Unified the import style for `@typescript-eslint/types` across the codebase, merging `TSESTree` types and `AST_NODE_TYPES` constants into single-line imports.
- [x] Removed `scripts/prepare-release.ts` and the accompanying `prepare:release` npm script.
- [x] Updated dependency versions for `esbuild`, `@eslint/compat`, `@types/node`, `undici`, etc.
- [x] JSX Package Refactoring: Moved rule-specific JSX helpers into per-rule `lib.ts` files for better code organization.
- [x] HOC Detection: Extracted HOC detection helpers to dedicated `lib.ts` files.
- [x] Website Improvements: Improved accessibility and unified layout configuration.
- [x] Bumped Vite to 8.0.5 across examples.

## Milestone 4.0

### System Requirements

Minimum supported versions:

- [x] Node.js: 22.0.0
- [x] ESLint: 10.x.x
- [x] TypeScript: 5

### New Packages

- [x] `eslint-plugin-react-jsx` - New dedicated plugin for React Flavored JSX rules
- [x] `@eslint-react/jsx` - New utility module for static analysis of JSX patterns in TSESTree ASTs
- [x] `@eslint-react/kit` - New utility module for building custom ESLint rules with React awareness

### Relocated Rules (to `eslint-plugin-react-jsx`)

- [x] `react-x/jsx-key-before-spread` -> `react-jsx/no-key-after-spread` (renamed)
- [x] `react-x/jsx-no-comment-textnodes` -> `react-jsx/no-comment-textnodes` (renamed)
- [x] `react-x/no-children-prop` -> `react-jsx/no-children-prop`
- [x] `react-x/no-useless-fragment` -> `react-jsx/no-useless-fragment`
- [x] `react-dom/no-namespace` -> `react-jsx/no-namespace`

### New Rules

- [x] `react-jsx/no-key-after-spread` - Prevents patterns causing deoptimization when using the automatic JSX runtime (e.g. placing `key` after spread props)
- [x] `react-jsx/no-namespace` - Disallows JSX namespace syntax, as React does not support them
- [x] `react-jsx/no-children-prop-with-children` - Disallows passing `children` as a prop when children are also passed as nested content

### Removed Rules

- [x] `react-x/jsx-dollar` - Removed (can be implemented using `@eslint-react/kit` as custom rule)
- [x] `react-x/jsx-shorthand-boolean` - Removed (can be implemented using `@eslint-react/kit` as custom rule)
- [x] `react-x/jsx-shorthand-fragment` - Removed (can be implemented using `@eslint-react/kit` as custom rule)

### Rule Prefix Changes (in `eslint-plugin-react-instant`)

- [x] `@eslint-react/rsc/<rule>` -> `@eslint-react/rsc-<rule>`
- [x] `@eslint-react/dom/<rule>` -> `@eslint-react/dom-<rule>`
- [x] `@eslint-react/web-api/<rule>` -> `@eslint-react/web-api-<rule>`
- [x] `@eslint-react/naming-convention/<rule>` -> `@eslint-react/naming-convention-<rule>`
- [x] `@eslint-react/debug/<rule>` -> `@eslint-react/debug-<rule>`

### Core API Changes (for custom rule authors)

- [x] `useComponentCollector()` -> `getComponentCollector()`
- [x] `useComponentCollectorLegacy()` -> `getComponentCollectorLegacy()`
- [x] `useHookCollector()` -> `getHookCollector()`
- [x] Collector return property `.ctx` -> `.api`
- [x] `JsxInspector` class -> Removed, replaced with standalone utility functions from `@eslint-react/jsx`
- [x] `getElementType()` -> `getElementFullType()` in `@eslint-react/jsx`
- [x] `getElementSelfName()` -> `getElementSelfType()` in `@eslint-react/jsx`

## Milestone 3.0 (RC)

### System Requirements

Minimum supported versions:

- [x] Node.js: 22.0.0 (raised from 20.19.0)
- [x] ESLint: 10.0.0
- [x] TypeScript: 5

### New Rules

- [x] `react-x/component-hook-factories` - Validates against higher order functions defining nested components or hooks
- [x] `react-x/error-boundaries` - Validates usage of Error Boundaries instead of try/catch for errors in child components
- [x] `react-x/exhaustive-deps` - Enforces that React hook dependency arrays contain all reactive values used in the callback
- [x] `react-x/immutability` (Experimental) - Validates against mutating props, state, and other values that are immutable
- [x] `react-x/no-mixing-controlled-and-uncontrolled` - Validates against mixing controlled and uncontrolled prop patterns
- [x] `react-x/prefer-set-state-callback` - Enforces using callback form of `setState` when the new state is computed from the previous state
- [x] `react-x/purity` (Experimental) - Validates that components and hooks are pure
- [x] `react-x/refs` (Experimental) - Validates correct usage of refs by checking that `ref.current` is not read or written during render
- [x] `react-x/rules-of-hooks` - Enforces the Rules of Hooks
- [x] `react-x/set-state-in-effect` - Validates against calling `setState` synchronously in an effect
- [x] `react-x/set-state-in-render` - Validates against unconditionally setting state during render
- [x] `react-x/static-components` - Validates that components are static, not recreated every render
- [x] `react-x/unstable-rules-of-props` (Experimental) - Consolidates state-related validations including `prefer-set-state-callback`
- [x] `react-x/unstable-rules-of-state` (Experimental) - Consolidates state-related validations
- [x] `react-x/unsupported-syntax` - Validates against syntax that React Compiler does not support (eval, with, IIFE in JSX)
- [x] `react-x/use-memo` - Validates that `useMemo` is called with a callback that returns a value
- [x] `react-x/use-state` - Enforces correct usage of the `useState` hook (moved from `eslint-plugin-react-naming-convention`)

### Removed Rules

- [x] `react-x/jsx-no-duplicate-props` - Removed (LSP and Language Features natively report duplicate JSX props)
- [x] `react-x/jsx-no-iife` - Consolidated into `unsupported-syntax`
- [x] `react-x/jsx-no-undef` - Removed (ESLint v10.0.0 now tracks JSX references natively)
- [x] `react-x/jsx-uses-react` - Removed (ESLint v10.0.0 now handles JSX variable tracking natively)
- [x] `react-x/jsx-uses-vars` - Removed (ESLint v10.0.0 now handles JSX variable tracking natively)
- [x] `react-x/no-default-props` - Removed
- [x] `react-x/no-forbidden-props` - Removed
- [x] `react-x/no-prop-types` - Removed
- [x] `react-x/no-string-refs` - Removed
- [x] `react-x/no-unnecessary-key` - Removed
- [x] `react-x/no-unnecessary-use-ref` - Removed
- [x] `react-x/no-useless-forward-ref` - Consolidated into `no-forward-ref`
- [x] `react-x/prefer-read-only-props` - Consolidated into `immutability`
- [x] `react-x/prefer-use-state-lazy-initialization` - Consolidated into `use-state`
- [x] `react-naming-convention/component-name` - Removed
- [x] `react-naming-convention/filename-extension` - Removed
- [x] `react-naming-convention/filename` - Removed
- [x] `react-naming-convention/use-state` - Moved to `react-x/use-state`

### Removed Plugins

- [x] `eslint-plugin-react-hooks-extra` - Migrated to `eslint-plugin-react-x`

## Milestone 2.0 (2025-09-26)

### System Requirements

Minimum supported versions:

- [x] Node.js: 22.0.0
- [x] ESLint: 10.0.0
- [x] TypeScript: 5

### Package Distribution

- [x] Publish ESM-Only packages

### Plugins (with ecological niche explanation)

- [x] `eslint-plugin-react-x` - X Rules (renderer-agnostic, compatible with x-platform)
- [x] `eslint-plugin-react-jsx` - React Flavored JSX rules
- [x] `eslint-plugin-react-rsc` - Rules for React Server Components
- [x] `eslint-plugin-react-dom` - DOM Specific rules for React DOM
- [x] `eslint-plugin-react-web-api` - Rules for interacting with Web APIs
- [x] `eslint-plugin-react-naming-convention` - Naming convention rules designed for React projects
- [x] ~~`eslint-plugin-react-hooks-extra`~~ - Extra Hooks rules for React (removed in 2.14.0, rules migrated to `eslint-plugin-react-x`)
- ... (Free to combine with other plugins from the community)

### Add codemod feature to rules that can be transformed (using auto-fix) safely

- [x] `react-x/no-component-did-update`
- [x] `react-x/no-component-will-receive-props`
- [x] `react-x/no-component-will-update`
- [x] `react-x/no-context-provider`
- [x] `react-x/no-forward-ref`
- [x] `react-x/no-string-refs`

### Add auto-fix feature to rules that can be auto-fixed safely

- [x] `react-x/prefer-namespace-import`
- [x] `react-dom/prefer-namespace-import`

### Add suggestion-fix feature to rules that can be fixed interactively

- [x] `react-dom/no-missing-button-type`
- [x] `react-dom/no-missing-iframe-sandbox`
- [x] `react-dom/no-unsafe-target-blank`

### New Rules

- [x] `react-jsx/no-comment-textnodes` - Disallow text nodes with comments in JSX (Replaces `no-comment-textnodes`)
- [x] `react-x/no-context-provider` - Replaces usage of `<Context.Provider>` with `<Context>` (React 19)
- [x] `react-x/no-forward-ref` - Replaces usage of `forwardRef` with passing `ref` as a prop (React 19)
- [x] `react-x/no-use-context` - Replaces usage of `useContext` with `use` (React 19)
- [x] `react-x/prefer-namespace-import` - Enforces the use of namespace imports for React (Replaces `prefer-react-namespace-import`)
- [x] `react-dom/no-hydrate` - Replaces usage of `ReactDOM.hydrate()` with `hydrateRoot()` (React 19)
- [x] `react-dom/no-render` - Replaces usage of `ReactDOM.render()` with `createRoot(node).render()` (React 19)
- [x] `react-dom/no-use-form-state` - Replaces the usages of `useFormState()` to use `useActionState()` (React 19)
- [x] `react-dom/prefer-namespace-import` - Enforces the use of namespace imports for ReactDOM
- [x] `naming-convention/context-name` - Enforces the context name to be a valid component name with the suffix `Context` (React 19)

### Removed Rules

- [x] `react-x/avoid-shorthand-boolean` - Removed
- [x] `react-x/avoid-shorthand-fragment` - Removed
- [x] `react-x/no-comment-textnodes` - Replaced by `react-jsx/no-comment-textnodes`
- [x] `react-x/prefer-react-namespace-import` - Replaced by `prefer-namespace-import`
- [x] `react-x/prefer-shorthand-boolean` - Removed
- [x] `react-x/prefer-shorthand-fragment` - Removed
- [x] `react-hooks-extra/no-direct-set-state-in-use-layout-effect` - Merged into `hooks-extra/no-direct-set-state-in-use-effect`
