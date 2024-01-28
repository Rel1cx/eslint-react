# Roadmap

## Milestone 1.5

### `@eslint-react/eslint-plugin`

| Rules                                                  | Description                                                                                            |
| :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `jsx/no-array-index-key`                               | Warns when an array `index` is used as a `key` prop.                                                   |
| `jsx/no-comment-textnodes`                             | Prevents comments from being inserted as text nodes.                                                   |
| `jsx/no-complicated-conditional-rendering`             | Prevents complicated conditional rendering in JSX.                                                     |
| `jsx/no-duplicate-key`                                 | Prevents duplicate `key` props on elements in the same array or a list of `children`.                  |
| `jsx/no-implicit-key`                                  | Prevents spreading `key` prop from objects.                                                            |
| `jsx/no-leaked-conditional-rendering`                  | Prevents problematic leaked values from being rendered.                                                |
| `jsx/no-missing-key`                                   | Prevents missing `key` prop on items in list rendering.                                                |
| `jsx/no-useless-fragment`                              | Prevents the use of useless `fragment` components or `<>` syntax.                                      |
| `jsx/prefer-shorthand-boolean`                         | Enforces the use of shorthand syntax for boolean attributes.                                           |
| `jsx/prefer-shorthand-fragment`                        | Enforces the use of shorthand syntax for fragments.                                                    |
| `react/ensure-forward-ref-using-ref`                   | Requires that components wrapped with `forwardRef` must have a `ref` parameter.                        |
| `react/no-access-state-in-setstate`                    | Prevents accessing `this.state` inside `setState` calls.                                               |
| `react/no-children-count`                              | Prevents usage of `Children.count`.                                                                    |
| `react/no-children-for-each`                           | Prevents usage of `Children.forEach`.                                                                  |
| `react/no-children-map`                                | Prevents usage of `Children.map`.                                                                      |
| `react/no-children-only`                               | Prevents usage of `Children.only`.                                                                     |
| `react/no-children-prop`                               | Prevents usage of `children` as a prop.                                                                |
| `react/no-children-to-array`                           | Prevents usage of `Children.toArray`.                                                                  |
| `react/no-class-component`                             | Prevents usage of class component.                                                                     |
| `react/no-clone-element`                               | Prevents usage of `cloneElement`.                                                                      |
| `react/no-component-will-mount`                        | Prevents usage of `componentWillMount`.                                                                |
| `react/no-component-will-receive-props`                | Prevents usage of `componentWillReceiveProps`.                                                         |
| `react/no-component-will-update`                       | Prevents usage of `componentWillUpdate`.                                                               |
| `react/no-create-ref`                                  | Prevents usage of `createRef`.                                                                         |
| `react/no-direct-mutation-state`                       | Prevents direct mutation of `this.state`.                                                              |
| `react/no-missing-component-display-name`              | Enforces that all components have a `displayName` which can be used in devtools.                       |
| `react/no-nested-components`                           | Prevents nesting component definitions inside other components.                                        |
| `react/no-redundant-should-component-update`           | Prevents usage of `shouldComponentUpdate` when extending `React.PureComponent`.                        |
| `react/no-render-return-value`                         | Prevents usage of the return value of `ReactDOM.render`.                                               |
| `react/no-set-state-in-component-did-mount`            | Disallows calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.      |
| `react/no-set-state-in-component-did-update`           | Disallows calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.     |
| `react/no-set-state-in-component-will-update`          | Disallows calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.    |
| `react/no-string-refs`                                 | Disallows using deprecated string `refs`.                                                              |
| `react/no-unsafe-component-will-mount`                 | Warns usage of `UNSAFE_componentWillMount` in class components.                                        |
| `react/no-unsafe-component-will-receive-props`         | Warns usage of `UNSAFE_componentWillReceiveProps` in class components.                                 |
| `react/no-unsafe-component-will-update`                | Warns usage of `UNSAFE_componentWillUpdate` in class components.                                       |
| `react/no-unstable-context-value`                      | Prevents non-stable values (i.e. object identities) from being used as a value for `Context.Provider`. |
| `react/no-unstable-default-props`                      | Prevents usage of referential-type values as default props in object destructuring.                    |
| `react/no-unused-class-component-members`              | Warns unused class component methods and properties.                                                   |
| `react/no-unused-state`                                | Warns unused class component state.                                                                    |
| `react/prefer-destructuring-assignment`                | Enforces the use of destructuring assignment over property assignment.                                 |
| `react-dom/no-children-in-void-dom-elements`           | Prevents the use of `children` in void `DOM elements`.                                                 |
| `react-dom/no-dangerously-set-innerhtml`               | Prevents `DOM element` using `dangerouslySetInnerHTML`.                                                |
| `react-dom/no-dangerously-set-innerhtml-with-children` | Prevents `DOM element` using `dangerouslySetInnerHTML` and `children` at the same time.                |
| `react-dom/no-find-dom-node`                           | Prevents usage of `findDOMNode`.                                                                       |
| `react-dom/no-missing-button-type`                     | Enforces explicit `button` type `attribute` for `<button>` elements.                                   |
| `react-dom/no-missing-iframe-sandbox`                  | Enforces explicit `sandbox` attribute for `iframe` elements.                                           |
| `react-dom/no-namespace`                               | Enforces the absence of a `namespace` in React elements.                                               |
| `react-dom/no-script-url`                              | Prevents usage of `javascript:` URLs as the value of component props.                                  |
| `react-dom/no-unsafe-iframe-sandbox`                   | Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.                  |
| `react-dom/no-unsafe-target-blank`                     | Prevents the use of `target="_blank"` without `rel="noreferrer noopener"`.                             |
| `react-hooks/no-needless-use-callback`                 | Warns when `useCallback` is called with empty dependencies array.                                      |
| `react-hooks/no-needless-use-memo`                     | Warns when `useMemo` is called with empty dependencies array.                                          |
| `react-hooks/no-redundant-custom-hooks`                | Warns when custom Hooks that don't use other Hooks.                                                    |
| `react-hooks/use-state-lazy-initialization`            | Warns function calls made inside `useState` calls.                                                     |
| `naming-convention/component-name`                     | Enforces naming conventions for components.                                                            |
| `naming-convention/filename`                           | Enforces naming convention for JSX files.                                                              |
| `naming-convention/filename-extension`                 | Enforces consistent use of the JSX file extension.                                                     |
| `naming-convention/use-state`                          | Enforces destructuring and symmetric naming of `useState` hook value and setter variables.             |
| `debug/class-component`                                | Reports all class components. Useful for debugging.                                                    |
| `debug/function-component`                             | Reports all function components. Useful for debugging.                                                 |
| `debug/react-hooks`                                    | Reports all React Hooks. Useful for debugging.                                                         |

## Milestone 2.0

### Plugins (with ecological niche explanation)

- `eslint-plugin-react-core` (DOM Irrelevant, Render Target Agnostic, Formatting Independent)
- `eslint-plugin-react-dom` (DOM Specific rules for ReactDOM).
- `eslint-plugin-react-hooks` (The official one from React)
- `eslint-plugin-react-hooks-extra` (Extra rules for `eslint-plugin-react-hooks`)
- `eslint-plugin-react-naming-convention` (Optional, only naming convention rules, can be replaced with other plugins depending on the project)
- ... (Free to combine with other plugins from the community)

### Rules in `eslint-plugin-react-core`

| Rules                                      | Description                                                                                            |
| :----------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `jsx/no-array-index-key`                   | Warns when an array `index` is used as a `key` prop.                                                   |
| `jsx/no-comment-textnodes`                 | Prevents comments from being inserted as text nodes.                                                   |
| `jsx/no-complicated-conditional-rendering` | Prevents complicated conditional rendering in JSX.                                                     |
| `jsx/no-duplicate-key`                     | Prevents duplicate `key` props on elements in the same array or a list of `children`.                  |
| `jsx/no-implicit-key`                      | Prevents spreading `key` prop from objects.                                                            |
| `jsx/no-leaked-conditional-rendering`      | Prevents problematic leaked values from being rendered.                                                |
| `jsx/no-missing-key`                       | Prevents missing `key` prop on items in list rendering.                                                |
| `jsx/no-useless-fragment`                  | Prevents the use of useless `fragment` components or `<>` syntax.                                      |
| `jsx/prefer-shorthand-boolean`             | Enforces the use of shorthand syntax for boolean attributes.                                           |
| `jsx/prefer-shorthand-fragment`            | Enforces the use of shorthand syntax for fragments.                                                    |
| `ensure-forward-ref-using-ref`             | Requires that components wrapped with `forwardRef` must have a `ref` parameter.                        |
| `no-access-state-in-setstate`              | Prevents accessing `this.state` inside `setState` calls.                                               |
| `no-children-count`                        | Prevents usage of `Children.count`.                                                                    |
| `no-children-for-each`                     | Prevents usage of `Children.forEach`.                                                                  |
| `no-children-map`                          | Prevents usage of `Children.map`.                                                                      |
| `no-children-only`                         | Prevents usage of `Children.only`.                                                                     |
| `no-children-prop`                         | Prevents usage of `children` as a prop.                                                                |
| `no-children-to-array`                     | Prevents usage of `Children.toArray`.                                                                  |
| `no-class-component`                       | Prevents usage of class component.                                                                     |
| `no-clone-element`                         | Prevents usage of `cloneElement`.                                                                      |
| `no-component-will-mount`                  | Prevents usage of `componentWillMount`.                                                                |
| `no-component-will-receive-props`          | Prevents usage of `componentWillReceiveProps`.                                                         |
| `no-component-will-update`                 | Prevents usage of `componentWillUpdate`.                                                               |
| `no-create-ref`                            | Prevents usage of `createRef`.                                                                         |
| `no-direct-mutation-state`                 | Prevents direct mutation of `this.state`.                                                              |
| `no-missing-component-display-name`        | Enforces that all components have a `displayName` which can be used in devtools.                       |
| `no-nested-components`                     | Prevents nesting component definitions inside other components.                                        |
| `no-redundant-should-component-update`     | Prevents usage of `shouldComponentUpdate` when extending `React.PureComponent`.                        |
| `no-render-return-value`                   | Prevents usage of the return value of `ReactDOM.render`.                                               |
| `no-set-state-in-component-did-mount`      | Disallows calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.      |
| `no-set-state-in-component-did-update`     | Disallows calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.     |
| `no-set-state-in-component-will-update`    | Disallows calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.    |
| `no-string-refs`                           | Disallows using deprecated string `refs`.                                                              |
| `no-unsafe-component-will-mount`           | Warns usage of `UNSAFE_componentWillMount` in class components.                                        |
| `no-unsafe-component-will-receive-props`   | Warns usage of `UNSAFE_componentWillReceiveProps` in class components.                                 |
| `no-unsafe-component-will-update`          | Warns usage of `UNSAFE_componentWillUpdate` in class components.                                       |
| `no-unstable-context-value`                | Prevents non-stable values (i.e. object identities) from being used as a value for `Context.Provider`. |
| `no-unstable-default-props`                | Prevents usage of referential-type values as default props in object destructuring.                    |
| `no-unused-class-component-members`        | Warns unused class component methods and properties.                                                   |
| `no-unused-state`                          | Warns unused class component state.                                                                    |
| `prefer-destructuring-assignment`          | Enforces the use of destructuring assignment over property assignment.                                 |

### Rules in `eslint-plugin-react-dom`

| Rules                                        | Description                                                                             |
| :------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `no-children-in-void-dom-elements`           | Prevents the use of `children` in void `DOM elements`.                                  |
| `no-dangerously-set-innerhtml`               | Prevents `DOM element` using `dangerouslySetInnerHTML`.                                 |
| `no-dangerously-set-innerhtml-with-children` | Prevents `DOM element` using `dangerouslySetInnerHTML` and `children` at the same time. |
| `no-find-dom-node`                           | Prevents usage of `findDOMNode`.                                                        |
| `no-missing-button-type`                     | Enforces explicit `button` type `attribute` for `<button>` elements.                    |
| `no-missing-iframe-sandbox`                  | Enforces explicit `sandbox` attribute for `iframe` elements.                            |
| `no-namespace`                               | Enforces the absence of a `namespace` in React elements.                                |
| `no-script-url`                              | Prevents usage of `javascript:` URLs as the value of component props.                   |
| `no-unsafe-iframe-sandbox`                   | Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.   |
| `no-unsafe-target-blank`                     | Prevents the use of `target="_blank"` without `rel="noreferrer noopener"`.              |

### Rules in `eslint-plugin-react-hooks-extra`

| Rules                           | Description                                                       |
| :------------------------------ | :---------------------------------------------------------------- |
| `no-needless-use-callback`      | Warns when `useCallback` is called with empty dependencies array. |
| `no-needless-use-memo`          | Warns when `useMemo` is called with empty dependencies array.     |
| `no-redundant-custom-hooks`     | Warns when custom Hooks that don't use other Hooks.               |
| `use-state-lazy-initialization` | Warns function calls made inside `useState` calls.                |

### Rules in `eslint-plugin-react-naming-convention`

| Rules                | Description                                                                                |
| :------------------- | :----------------------------------------------------------------------------------------- |
| `component-name`     | Enforces naming conventions for components.                                                |
| `filename`           | Enforces naming convention for JSX files.                                                  |
| `filename-extension` | Enforces consistent use of the JSX file extension.                                         |
| `use-state`          | Enforces destructuring and symmetric naming of `useState` hook value and setter variables. |
