<p align="center"><img src="https://eslint-react.rel1cx.io/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

More than 50 ESLint rules to catch common mistakes and improve your React code. Built (mostly) from scratch.

## Public packages

- [`@eslint-react/eslint-plugin`](https://npm.im/@eslint-react/eslint-plugin) - The main ESLint plugin package including all rules and config presets in this repository.

## Supported React versions

- 18.2.0 or later

## Supported engines

### Node.js

- 18.x LTS Hydrogen
- 20.x Current

### Bun

- 1.0.15 or later

### Install

```sh
# npm
npm install --save-dev @eslint-react/eslint-plugin
```

### Setup

Add `@eslint-react` to the plugins section of your `.eslintrc.js` configuration file.

```js
module.exports = {
  // ...
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@eslint-react/recommended-legacy"],
  plugins: ["@eslint-react"],
  // ...
};
```

### Linting with type information

> [!NOTE]\
> Rules that require type information are not enabled by default.
>
> To enable them, you need to set the `project` option in `parserOptions` to the path of your `tsconfig.json` file.
>
> Then replace `plugin:@eslint-react/recommended-legacy` with `plugin:@eslint-react/recommended-type-checked-legacy`.

```js
module.exports = {
  // ...
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // <-- Point to your project's "tsconfig.json" or create a new one.
  },
  extends: ["plugin:@eslint-react/recommended-type-checked-legacy"],
  plugins: ["@eslint-react"],
  // ...
};
```

[Full Installation Guide ↗](https://eslint-react.rel1cx.io/docs/installation)

## Presets

### LegacyConfig presets

> [!IMPORTANT]\
> These presets are for ESLint `LegacyConfig` (`.eslintrc.*`) only

- **recommended-legacy** (`plugin:@eslint-react/recommended-legacy`)\
  Enforce recommended rules designed to catch common mistakes and prevent potential bugs.
- **recommended-type-checked-legacy** (`plugin:@eslint-react/recommended-type-checked-legacy`)\
  Same as recommended-legacy but with additional rules that require type information.
- **debug-legacy** (`plugin:@eslint-react/debug-legacy`)\
  Enable a series of rules that are useful for debugging purposes only.\
  (Not recommended unless you know what you are doing)
- **all-legacy** (`plugin:@eslint-react/all-legacy`)\
  Enable all rules in this plugin except for debug rules.
- **off-legacy** (`plugin:@eslint-react/off-legacy`)\
  Disable all rules in this plugin except for debug rules.

### FlatConfig presets

> [!IMPORTANT]\
> These presets are for ESLint `FlatConfig` (`eslint.config.js`) only

- **recommended**\
  Enforce recommended rules designed to catch common mistakes and prevent potential bugs.
- **recommended-type-checked**\
  Same as recommended but with additional rules that require type information.
- **debug**\
  Enable a series of rules that are useful for debugging purposes only.\
  (Not recommended unless you know what you are doing)
- **all**\
  Enable all rules in this plugin except for debug rules.
- **off**\
  Disable all rules in this plugin except for debug rules.

[Full Presets List↗](https://eslint-react.rel1cx.io/docs/presets)

## Rules

### JSX

- [`jsx/no-array-index-key`](jsx-no-array-index-key) - disallow using Array index as `key`
- [`jsx/no-comment-textnodes`](jsx-no-comment-textnodes) - disallow comments from being inserted as text nodes
- [`jsx/no-complicated-conditional-rendering`](jsx-no-complicated-conditional-rendering) - disallow complicated conditional rendering
- [`jsx/no-duplicate-key`](jsx-no-duplicate-key) - disallow duplicate keys in `key` prop when rendering list
- [`jsx/no-leaked-conditional-rendering`](jsx-no-leaked-conditional-rendering) - disallow problematic leaked values from being rendered
- [`jsx/no-missing-key`](jsx-no-missing-key) - require `key` prop when rendering list
- [`jsx/no-spreading-key`](jsx-no-spreading-key) - disallow spreading `key` from objects.
- [`jsx/no-useless-fragment`](jsx-no-useless-fragment) - disallow unnecessary fragments
- [`jsx/prefer-shorthand-boolean`](jsx-prefer-shorthand-boolean) - enforce `boolean` attributes notation in JSX
- [`jsx/prefer-shorthand-fragment`](jsx-prefer-shorthand-fragment) - enforce using fragment syntax instead of `Fragment` component

### React Hooks

- [`react-hooks/ensure-custom-hooks-using-other-hooks`](react-hooks-ensure-custom-hooks-using-other-hooks) - enforce custom hooks using other hooks
- [`react-hooks/ensure-use-callback-has-non-empty-deps`](react-hooks-ensure-use-callback-has-non-empty-deps) - enforce `useCallback` has non-empty dependencies array
- [`react-hooks/ensure-use-memo-has-non-empty-deps`](react-hooks-ensure-use-memo-has-non-empty-deps) - enforce `useMemo` has non-empty dependencies array
- [`react-hooks/prefer-use-state-lazy-initialization`](react-hooks-prefer-use-state-lazy-initialization) - disallow function calls in `useState` that aren't wrapped in an initializer

### React

- [`react/ensure-forward-ref-using-ref`](react-ensure-forward-ref-using-ref) - requires that components wrapped with `forwardRef` must have a `ref` parameter
- [`react/no-children-count`](react-no-children-count) - disallow `Children.count`
- [`react/no-children-for-each`](react-no-children-for-each) - disallow `Children.forEach`
- [`react/no-children-in-void-dom-elements`](react-no-children-in-void-dom-elements) - disallow passing `children` to void DOM elements
- [`react/no-children-map`](react-no-children-map) - disallow `Children.map`
- [`react/no-children-only`](react-no-children-only) - disallow `Children.only`
- [`react/no-children-prop`](react-no-children-prop) - disallow passing of `children` as props
- [`react/no-children-to-array`](react-no-children-to-array) - disallow `Children.toArray`
- [`react/no-class-component`](react-no-class-component) - disallow `class component`
- [`react/no-clone-element`](react-no-clone-element) - disallow `cloneElement`
- [`react/no-component-will-mount`](react-no-component-will-mount) - disallow `componentWillMount`
- [`react/no-component-will-receive-props`](react-no-component-will-receive-props) - disallow `componentWillReceiveProps`
- [`react/no-component-will-update`](react-no-component-will-update) - disallow `componentWillUpdate`
- [`react/no-constructed-context-value`](react-no-constructed-context-value) - disallow passing constructed values to context providers
- [`react/no-create-ref`](react-no-create-ref) - disallow `createRef` in function components
- [`react/no-dangerously-set-innerhtml`](react-no-dangerously-set-innerhtml) - disallow when a DOM element is using `dangerouslySetInnerHTML`
- [`react/no-dangerously-set-innerhtml-with-children`](react-no-dangerously-set-innerhtml-with-children) - disallow when a DOM element is using both `children` and `dangerouslySetInnerHTML`
- [`react/no-direct-mutation-state`](react-no-direct-mutation-state) - disallow direct mutation of `this.state`
- [`react/no-find-dom-node`](react-no-find-dom-node) - disallow `findDOMNode`
- [`react/no-missing-button-type`](react-no-missing-button-type) - enforce that `button` elements have an explicit `type` attribute
- [`react/no-missing-component-display-name`](react-no-missing-component-display-name) - enforce `displayName` for `memo` and `forwardRef` components
- [`react/no-missing-iframe-sandbox`](react-no-missing-iframe-sandbox) - enforce that `iframe` elements explicitly specify a `sandbox` attribute
- [`react/no-namespace`](react-no-namespace) - enforce that namespaces are not used in React elements
- [`react/no-redundant-should-component-update`](react-no-redundant-should-component-update) - disallow usage of `shouldComponentUpdate` in class component extends `React.PureComponent`
- [`react/no-render-return-value`](react-no-render-return-value) - disallow usage of the return value of `ReactDOM.render`
- [`react/no-script-url`](react-no-script-url) - disallow `javascript:` URLs as JSX event handler prop's value
- [`react/no-set-state-in-component-did-mount`](react-no-set-state-in-component-did-mount) - disallow usage of `this.setState` in `componentDidMount`
- [`react/no-set-state-in-component-did-update`](react-no-set-state-in-component-did-update) - disallow usage of `this.setState` in `componentDidUpdate`
- [`react/no-set-state-in-component-will-update`](react-no-set-state-in-component-will-update) - disallow usage of `this.setState` in `componentWillUpdate`
- [`react/no-string-refs`](react-no-string-refs) - disallow using deprecated string refs
- [`react/no-unsafe-component-will-mount`](react-no-unsafe-component-will-mount) - disallow usage of `UNSAFE_componentWillMount` in class components
- [`react/no-unsafe-component-will-receive-props`](react-no-unsafe-component-will-receive-props) - disallow usage of `UNSAFE_componentWillReceiveProps` in class components
- [`react/no-unsafe-component-will-update`](react-no-unsafe-component-will-update) - disallow usage of `UNSAFE_componentWillUpdate` in class components
- [`react/no-unsafe-iframe-sandbox`](react-no-unsafe-iframe-sandbox) - disallow unsafe `iframe` `sandbox` attribute combinations
- [`react/no-unsafe-target-blank`](react-no-unsafe-target-blank) - disallow `target="_blank"` without `rel="noreferrer noopener"`
- [`react/no-unstable-default-props`](react-no-unstable-default-props) - disallow usage of unstable value as default param in function component
- [`react/no-unstable-nested-components`](react-no-unstable-nested-components) - disallow usage of unstable nested components
- [`react/prefer-destructuring-assignment`](react-prefer-destructuring-assignment) - enforce using destructuring assignment in component props and context

### Naming Convention

- [`naming-convention/component-name`](naming-convention-component-name) - enforce component naming convention to `PascalCase` or `CONSTANT_CASE`
- [`naming-convention/filename`](naming-convention-filename) - enforce naming convention for JSX file names
- [`naming-convention/filename-extension`](naming-convention-filename-extension) - enforce naming convention for JSX file extensions
- [`naming-convention/use-state`](naming-convention-use-state) - enforce destructuring and symmetric naming of `useState` hook value and setter variables

### Debug

- [`debug/class-component`](debug-class-component) - report all class components, including anonymous ones
- [`debug/function-component`](debug-function-component) - report all function components, including anonymous ones
- [`debug/react-hooks`](debug-react-hooks) - report all react hooks

[Rules Documentation ↗](https://eslint-react.rel1cx.io/rules/overview)

## Work in progress rules

### JSX rules

- [ ] `jsx/max-depth`

### Naming convention rules

- [ ] `naming-convention/boolean-prop`
- [ ] `naming-convention/handler-prop`

### React rules

- [ ] `react/prefer-readonly-props`
- [ ] `react/ban-component-props`
- [ ] `react/ban-components`
- [ ] `react/ban-html-props`
- [ ] `react/ban-svg-props`
- [ ] `react/no-unused-state`
- [ ] `react/no-unused-class-component-methods`
- [ ] `react/no-unsorted-class-component-methods`

### React hooks rules

- [ ] `react-hooks/no-access-state-in-set-state`

### Debug rules

- [ ] `debug/context`
- [ ] `debug/render-prop`

## Philosophy

- **Do what a linter should do**
- **Focus on code rather than style**
- **Rules are better than options**

## Rule introduction or modification principles

1. **No Auto-fix**. Auto-fix is a great feature, but it's not always safe and reliable. We prefer to not to do auto-fix at all than to implement it in a way that can cause more problems than it solves.
2. **Formatting independent**. Rules should check for correctness, not style. We recommend using style focused tools for formatting (e.g. [dprint](https://dprint.dev/)).
3. **Rules over options [[1]](https://eslint-react.rel1cx.io/docs/rules-over-options)**. Each rule should have a single purpose. Make multiple rules work together to achieve more complex behaviors instead of adding options to a single rule.
4. **Sensible defaults**. Rules should be easy to setup and use with minimal configuration and sensible defaults.

## Contributing

Before you start working on something, it's best to check if there is an existing issue first. It's also a good idea to reach the maintainer and confirm if it makes sense or if someone else is already working on it.

Please make sure to read the [Contributing Guide](./.github/CONTRIBUTING.md) before making a pull request.

Thank you to everyone contributing to ESLint React!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid)
- [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple)
- [@tanstack/eslint-plugin-query](https://github.com/TanStack/query/tree/main/packages/eslint-plugin-query)
- [rome/tools](https://github.com/rome/tools)
- [rust-clippy](https://github.com/rust-lang/rust-clippy)

## Prior art

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
