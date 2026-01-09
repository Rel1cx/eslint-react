---
title: Roadmap
---

## Milestone 4.0 (TBD)

### System Requirements

Minimum supported versions:

- [ ] Node.js: 28.x.x
- [ ] ESLint: 10.x.x
- [x] TypeScript: 5

### Removed Rules

- [ ] `react-hooks-extra/no-direct-set-state-in-use-effect` - Replaced by `react-x/set-state-in-effect` (TBD)

### Removed Plugins

- [ ] `eslint-plugin-react-hooks-extra` - No longer needed as all relevant rules have been migrated to `eslint-plugin-react-x` or replaced by [new introduced rules from `eslint-plugin-react-hooks`](https://react.dev/reference/eslint-plugin-react-hooks) (TBD)

## Milestone 3.0 (TBD)

### System Requirements

Minimum supported versions:

- [ ] Node.js: 24.8.0
- [x] ESLint: 9.36.0
- [x] TypeScript: 5

### New Rules

- [ ] `react-x/set-state-in-effect` - Validates against calling `setState` synchronously in an effect, which can lead to re-renders that degrade performance\
      _A fast implementation of [set-state-in-effect](https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect) that doesn't require React Compiler integration_
- [ ] `react-x/set-state-in-render` - Validates against setting state during render, which can trigger additional renders and potential infinite render loops\
      _A fast implementation of [set-state-in-render](https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-render) that doesn't require React Compiler integration_
- [ ] `react-x/static-components` - Validates that components are static, not recreated every render\
      _A fast implementation of [static-components](https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components) that doesn't require React Compiler integration_
- [ ] `react-x/component-hook-factories` - Validates against higher order functions defining nested components or hooks\
      _A fast implementation of [component-hook-factories](https://react.dev/reference/eslint-plugin-react-hooks/lints/component-hook-factories) that doesn't require React Compiler integration_
- [ ] `react-x/function-component-definition` - Enforces the definition of function components ([Rel1cx/eslint-react#739](https://github.com/Rel1cx/eslint-react/issues/739))

### Deprecated Rules

- [ ] `react-hooks-extra/no-direct-set-state-in-use-effect` - Replaced by `react-x/set-state-in-effect` (TBD)

## Milestone 2.0 (2025-09-26)

### System Requirements

Minimum supported versions:

- [x] Node.js: 20.19.0
- [x] ESLint: 9.36.0
- [x] TypeScript: 5

### Package Distribution

- [x] Publish ESM-Only packages

### Plugins (with ecological niche explanation)

- [x] `eslint-plugin-react-x` - X Rules (renderer-agnostic, compatible with x-platform)
- [x] `eslint-plugin-react-dom` - DOM Specific rules for React DOM
- [x] `eslint-plugin-react-web-api` - Rules for interacting with Web APIs
- [x] `eslint-plugin-react-hooks-extra` - Extra Hooks rules for React
- [x] `eslint-plugin-react-naming-convention` - Naming convention rules designed for React projects
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

- [x] `react-x/jsx-no-comment-textnodes` - Disallow text nodes with comments in JSX (Replaces `no-comment-textnodes`)
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

- [x] `react-x/avoid-shorthand-boolean` - Replaced by `jsx-shorthand-boolean`
- [x] `react-x/avoid-shorthand-fragment` - Replaced by `jsx-shorthand-fragment`
- [x] `react-x/no-comment-textnodes` - Replaced by `jsx-no-comment-textnodes`
- [x] `react-x/prefer-react-namespace-import` - Replaced by `prefer-namespace-import`
- [x] `react-x/prefer-shorthand-boolean` - Replaced by `jsx-shorthand-boolean`
- [x] `react-x/prefer-shorthand-fragment` - Replaced by `jsx-shorthand-fragment`
- [x] `react-hooks-extra/no-direct-set-state-in-use-layout-effect` - Merged into `hooks-extra/no-direct-set-state-in-use-effect`
