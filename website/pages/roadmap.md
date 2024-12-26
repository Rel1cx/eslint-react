# Roadmap

## Milestone 2.0

### Plugins (with ecological niche explanation)

- [x] `eslint-plugin-react-x` - Core rules (renderer-agnostic, compatible with x-platform).
- [x] `eslint-plugin-react-dom` - DOM Specific rules for React DOM.
- [x] `eslint-plugin-react-web-api` - Rules for interacting with Web APIs.
- [x] `eslint-plugin-react-hooks-extra` - Extra rules for `eslint-plugin-react-hooks`.
- [x] `eslint-plugin-react-naming-convention` - Naming convention rules designed for React projects.
- [x] `@eslint-react/eslint-plugin` - The main ESLint plugin of ESLint React. Contains all the rules from the above plugins with recommended presets.

### Add codemod feature to rules that can be transformed safely

- [x] `no-component-did-update`
- [x] `no-component-will-receive-props`
- [x] `no-component-will-update`
- [x] `no-context-provider`
- [x] `no-forward-ref`

### Add auto-fix feature to rules that can be auto-fixed safely

- [ ] `prefer-destructuring-assignment`
- [ ] `prefer-shorthand-fragment`
- [x] `prefer-react-namespace-import`
- [x] `prefer-shorthand-boolean`
- [ ] `function-component-definition`

### Add suggestion-fix feature to rules that can be fixed interactively

- [ ] `ensure-forward-ref-using-ref`
- [ ] `no-leaked-conditional-rendering`
- [ ] `no-redundant-should-component-update`
- [ ] `no-unused-class-component-members`
- [ ] `no-unused-state`
- [ ] `no-useless-fragment`
- [ ] `dom/no-namespace`
- [ ] `dom/no-missing-button-type.md`
- [ ] `dom/no-missing-iframe-sandbox`
- [ ] `dom/no-unsafe-iframe-sandbox`
- [ ] `dom/no-unsafe-target-blank`
- [ ] `web-api/no-leaked-timeout`
- [ ] `web-api/no-leaked-interval`
- [ ] `web-api/no-leaked-event-listener`
- [ ] `web-api/no-leaked-resize-observer`

### New Rules

- [ ] `function-component-definition` - Enforce the definition of function components ([rEl1cx/eslint-react#739](https://github.com/rEl1cx/eslint-react/issues/739)).
- [ ] `hooks-extra/no-circular-effect` - Detect circular `set` (and `dispatch`) functions and deps patterns in `useEffect` like Hooks ([rEl1cx/eslint-react#755](https://github.com/rEl1cx/eslint-react/issues/755))

### Advanced Configuration features

- [ ] Additional components (`settings["react-x"].additionalComponents`) transitions from experimental to stable.
