---
title: Roadmap
---

## Milestone 2.0

### System Requirements

Minimum supported versions:

- [ ] `node@20.19.0`
- [ ] `eslint@8.57.0`
- [ ] `typescript@5.3.3`

### Package Distribution

- [ ] Publish ESM-Only packages
- [ ] Deprecate CommonJS distribution (will only provide migration guide for legacy environments)
- [ ] Update all documentation examples to use ESM syntax (rules itself still support linting CommonJS code)

### Plugins (with ecological niche explanation)

- [x] `eslint-plugin-react-x` - Core rules (renderer-agnostic, compatible with x-platform)
- [x] `eslint-plugin-react-dom` - DOM Specific rules for React DOM
- [x] `eslint-plugin-react-web-api` - Rules for interacting with Web APIs
- [x] `eslint-plugin-react-hooks-extra` - Extra rules for `eslint-plugin-react-hooks`
- [x] `eslint-plugin-react-naming-convention` - Naming convention rules designed for React projects
- ... (Free to combine with other plugins from the community)

### Add codemod feature to rules that can be transformed (using auto-fix) safely

- [x] `no-component-did-update`
- [x] `no-component-will-receive-props`
- [x] `no-component-will-update`
- [x] `no-context-provider`
- [x] `no-forward-ref`
- [ ] `no-string-refs`

### Add auto-fix feature to rules that can be auto-fixed safely

- [ ] `function-component-definition`
- [x] `no-useless-fragment`
- [x] `prefer-shorthand-fragment`
- [x] `prefer-react-namespace-import`
- [x] `prefer-shorthand-boolean`

### Add suggestion-fix feature to rules that can be fixed interactively

- [ ] `no-prop-types`
- [ ] `no-leaked-conditional-rendering`
- [ ] `no-redundant-should-component-update`
- [ ] `no-unused-class-component-members`
- [ ] `no-unused-state`
- [ ] `prefer-destructuring-assignment`
- [ ] `dom/no-missing-button-type`
- [ ] `dom/no-missing-iframe-sandbox`
- [ ] `dom/no-unsafe-iframe-sandbox`
- [ ] `dom/no-unsafe-target-blank`
- [ ] `web-api/no-leaked-timeout`
- [ ] `web-api/no-leaked-interval`
- [ ] `web-api/no-leaked-event-listener`
- [ ] `web-api/no-leaked-resize-observer`

### New Rules

- [x] `no-context-provider` - Replaces usages of `<Context.Provider>` with `<Context>` (React 19)
- [x] `no-forward-ref` - Replaces usages of `forwardRef` with passing `ref` as a prop (React 19)
- [x] `no-use-context` - Replaces usages of `useContext` with `use` (React 19)
- [x] `react-dom/no-render` - Replaces usages of `ReactDom.render()` with `createRoot(node).render()` (React 19)
- [x] `react-dom/no-hydrate` - Replaces usages of `ReactDom.hydrate()` with `hydrateRoot()` (React 19)
- [ ] `react-dom/no-unmount-component-at-node` - Replaces usages of `ReactDom.unmountComponentAtNode()` with `root.unmount()` (React 19)
- [x] `react-dom/no-use-form-state` - Replaces the usages of `useFormState()` to use `useActionState()` (React 19)
- [ ] `react-dom/no-test-utils-act` - Replaces the usages of `TestUtils.act()` to use `React.act()` (React 19)
- [x] `naming-convention/context-name` - Enforces context name to be a valid component name with the suffix `Context` (React 19)
- [ ] `function-component-definition` - Enforce the definition of function components ([Rel1cx/eslint-react#739](https://github.com/Rel1cx/eslint-react/issues/739))
- [ ] `hooks-extra/no-circular-effect` - Detect circular `set` (and `dispatch`) functions and deps patterns in `useEffect` like Hooks ([Rel1cx/eslint-react#755](https://github.com/Rel1cx/eslint-react/issues/755))

### Advanced Configuration features

- [ ] Additional components ([`settings["react-x"].additionalComponents`](https://eslint-react.xyz/docs/configurations#additionalcomponents)) transitions from experimental to stable

### Versioning Policy

- [ ] The versioning policy will be updated to follow the [Semantic Versioning 2.0.0](https://semver.org) and [ESLint's Semantic Versioning Policy](https://github.com/eslint/eslint#semantic-versioning-policy)
