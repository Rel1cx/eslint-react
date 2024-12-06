# Rules Overview

## Emoji Legend

- 💼 - Rule Category
- ⛔ - Restriction
- ✔️ - Correctness
- 🎨 - Style
- 🐞 - Debug
- 📖 - Convention
- 🔒 - Security
- 🚀 - Performance
- 🤔 - Pedantic
- 🤯 - Complexity
- 🧐 - Suspicious
- 💭 - Requires Type Information
- 🔧 - Fixable
- 🗑️ - Deprecated
- 🚧 - WIP

## Core Rules

| Rule                                                                               | Description                                                                                          | 💼  | 💭  |     |
| :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :-: | :-: | :-: |
| [`avoid-shorthand-boolean`](avoid-shorthand-boolean)                               | Prevents using shorthand syntax for boolean attributes.                                              | 🎨  |     | 🔧  |
| [`avoid-shorthand-fragment`](avoid-shorthand-fragment)                             | Prevents using shorthand syntax for fragments.                                                       | 🎨  |     |     |
| [`ensure-forward-ref-using-ref`](ensure-forward-ref-using-ref)                     | Requires that components wrapped with `forwardRef` must have a `ref` parameter.                      |  ✔️  |     |     |
| [`jsx-no-duplicate-props`](jsx-no-duplicate-props)                                 | Prevents duplicate props in JSX.                                                                     |  ✔️  |     |     |
| [`jsx-uses-vars`](jsx-uses-vars)                                                   | Prevents variables used in JSX to be marked as unused.                                               |  ✔️  |     |     |
| [`no-access-state-in-setstate`](no-access-state-in-setstate)                       | Prevents accessing `this.state` inside `setState` calls.                                             |  ✔️  |     |     |
| [`no-array-index-key`](no-array-index-key)                                         | Prevents using array `index` as `key`.                                                               | 🧐  |     |     |
| [`no-children-count`](no-children-count)                                           | Prevents using `Children.count`.                                                                     | ⛔  |     |     |
| [`no-children-for-each`](no-children-for-each)                                     | Prevents using `Children.forEach`.                                                                   | ⛔  |     |     |
| [`no-children-map`](no-children-map)                                               | Prevents using `Children.map`.                                                                       | ⛔  |     |     |
| [`no-children-only`](no-children-only)                                             | Prevents using `Children.only`.                                                                      | ⛔  |     |     |
| [`no-children-prop`](no-children-prop)                                             | Prevents using `children` as a prop.                                                                 | ⛔  |     |     |
| [`no-children-to-array`](no-children-to-array)                                     | Prevents using `Children.toArray`.                                                                   | ⛔  |     |     |
| [`no-class-component`](no-class-component)                                         | Prevents using class component.                                                                      | ⛔  |     |     |
| [`no-clone-element`](no-clone-element)                                             | Prevents using `cloneElement`.                                                                       | ⛔  |     |     |
| [`no-comment-textnodes`](no-comment-textnodes)                                     | Prevents comments from being inserted as text nodes.                                                 | 🧐  |     |     |
| [`no-complex-conditional-rendering`](no-complex-conditional-rendering)             | Prevents complex conditional rendering in JSX.                                                       | 🤯  |     |     |
| [`no-component-will-mount`](no-component-will-mount)                               | Prevents using `componentWillMount`.                                                                 | ⛔  |     |     |
| [`no-component-will-receive-props`](no-component-will-receive-props)               | Prevents using `componentWillReceiveProps`.                                                          | ⛔  |     |     |
| [`no-component-will-update`](no-component-will-update)                             | Prevents using `componentWillUpdate`.                                                                | ⛔  |     |     |
| [`no-create-ref`](no-create-ref)                                                   | Prevents using `createRef`.                                                                          | ⛔  |     |     |
| [`no-default-props`](no-default-props)                                             | Prevents using `defaultProps` property in favor of ES6 default parameters.                           |  ✔️  |     |     |
| [`no-direct-mutation-state`](no-direct-mutation-state)                             | Prevents direct mutation of `this.state`.                                                            |  ✔️  |     |     |
| [`no-duplicate-key`](no-duplicate-key)                                             | Prevents duplicate `key` on elements in the same array or a list of `children`.                      |  ✔️  |     |     |
| [`no-forward-ref`](no-forward-ref)                                                 | Prevents using `React.forwardRef`.                                                                   | ⛔  |     |     |
| [`no-implicit-key`](no-implicit-key)                                               | Prevents `key` from not being explicitly specified (e.g. spreading `key` from objects).              | 🧐  |     |     |
| [`no-leaked-conditional-rendering`](no-leaked-conditional-rendering)               | Prevents problematic leaked values from being rendered.                                              | 🧐  | 💭  |     |
| [`no-missing-component-display-name`](no-missing-component-display-name)           | Enforces that all components have a `displayName` which can be used in devtools.                     | 🐞  |     |     |
| [`no-missing-key`](no-missing-key)                                                 | Prevents missing `key` on items in list rendering.                                                   |  ✔️  |     |     |
| [`no-nested-components`](no-nested-components)                                     | Prevents nesting component definitions inside other components.                                      |  ✔️  |     |     |
| [`no-prop-types`](no-prop-types)                                                   | Prevents using `propTypes` in favor of TypeScript or another type-checking solution.                 | ⛔  |     |     |
| [`no-redundant-should-component-update`](no-redundant-should-component-update)     | Prevents using `shouldComponentUpdate` when extending `React.PureComponent`.                         |  ✔️  |     |     |
| [`no-set-state-in-component-did-mount`](no-set-state-in-component-did-mount)       | Prevents calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.     | 🧐  |     |     |
| [`no-set-state-in-component-did-update`](no-set-state-in-component-did-update)     | Prevents calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.    | 🧐  |     |     |
| [`no-set-state-in-component-will-update`](no-set-state-in-component-will-update)   | Prevents calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.   | 🧐  |     |     |
| [`no-string-refs`](no-string-refs)                                                 | Prevents using deprecated string `refs`.                                                             | ⛔  |     |     |
| [`no-unsafe-component-will-mount`](no-unsafe-component-will-mount)                 | Warns the usage of `UNSAFE_componentWillMount` in class components.                                  | 🧐  |     |     |
| [`no-unsafe-component-will-receive-props`](no-unsafe-component-will-receive-props) | Warns the usage of `UNSAFE_componentWillReceiveProps` in class components.                           | 🧐  |     |     |
| [`no-unsafe-component-will-update`](no-unsafe-component-will-update)               | Warns the usage of `UNSAFE_componentWillUpdate` in class components.                                 | 🧐  |     |     |
| [`no-unstable-context-value`](no-unstable-context-value)                           | Prevents non-stable values (i.e. object literals) from being used as a value for `Context.Provider`. | 🚀  |     |     |
| [`no-unstable-default-props`](no-unstable-default-props)                           | Prevents using referential-type values as default props in object destructuring.                     | 🚀  |     |     |
| [`no-unused-class-component-members`](no-unused-class-component-members)           | Warns unused class component methods and properties.                                                 |  ✔️  |     |     |
| [`no-unused-state`](no-unused-state)                                               | Warns unused class component state.                                                                  |  ✔️  |     |     |
| [`no-useless-fragment`](no-useless-fragment)                                       | Prevents using useless `fragment` components or `<>` syntax.                                         |  ✔️  |     |     |
| [`prefer-destructuring-assignment`](prefer-destructuring-assignment)               | Enforces using destructuring assignment over property assignment.                                    | 🎨  |     |     |
| [`prefer-react-namespace-import`](prefer-react-namespace-import)                   | Enforce React is imported via a namespace import                                                     | 🎨  |     | 🔧  |
| [`prefer-read-only-props`](prefer-read-only-props)                                 | Enforces read-only props in components.                                                              |  ✔️  | 💭  |     |
| [`prefer-shorthand-boolean`](prefer-shorthand-boolean)                             | Enforces using shorthand syntax for boolean attributes.                                              | 🎨  |     | 🔧  |
| [`prefer-shorthand-fragment`](prefer-shorthand-fragment)                           | Enforces using shorthand syntax for fragments.                                                       | 🎨  |     |     |

## DOM Rules

| Rule                                                                                               | Description                                                                             | 💼  | 💭  |     |
| :------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :-: | :-: | :-: |
| [`dom/no-children-in-void-dom-elements`](dom-no-children-in-void-dom-elements)                     | Prevents using `children` in void `DOM elements`.                                       |  ✔️  |     |     |
| [`dom/no-dangerously-set-innerhtml-with-children`](dom-no-dangerously-set-innerhtml-with-children) | Prevents `DOM element` using `dangerouslySetInnerHTML` and `children` at the same time. |  ✔️  |     |     |
| [`dom/no-dangerously-set-innerhtml`](dom-no-dangerously-set-innerhtml)                             | Prevents `DOM element` using `dangerouslySetInnerHTML`.                                 | 🔒  |     |     |
| [`dom/no-find-dom-node`](dom-no-find-dom-node)                                                     | Prevents using `findDOMNode`.                                                           | ⛔  |     |     |
| [`dom/no-missing-button-type`](dom-no-missing-button-type)                                         | Enforces explicit `type` attribute for `<button>` elements.                             |  ✔️  |     |     |
| [`dom/no-missing-iframe-sandbox`](dom-no-missing-iframe-sandbox)                                   | Enforces explicit `sandbox` attribute for `iframe` elements.                            | 🔒  |     |     |
| [`dom/no-namespace`](dom-no-namespace)                                                             | Enforces the absence of a `namespace` in React elements.                                |  ✔️  |     |     |
| [`dom/no-render-return-value`](dom-no-render-return-value)                                         | Prevents using the return value of `ReactDOM.render`.                                   | ⛔  |     |     |
| [`dom/no-script-url`](dom-no-script-url)                                                           | Prevents using `javascript:` URLs as the value of certain attributes.                   | 🔒  |     |     |
| [`dom/no-unknown-property`](dom-no-unknown-property)                                               | Prevents using unknown `DOM` property                                                   | 🧐  |     | 🔧  |
| [`dom/no-unsafe-iframe-sandbox`](dom-no-unsafe-iframe-sandbox)                                     | Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.   | 🔒  |     |     |
| [`dom/no-unsafe-target-blank`](dom-no-unsafe-target-blank)                                         | Prevents using `target="_blank"` without `rel="noreferrer noopener"`.                   | 🔒  |     |     |

## Web API Rules

| Rule                                                                     | Description                                                       | 💼  | 💭  |     |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------- | :-: | :-: | :-: |
| [`web-api/no-leaked-event-listener`](web-api-no-leaked-event-listener)   | Prevents leaked `addEventListener` in a component or custom hook. |  ✔️  |     |     |
| [`web-api/no-leaked-interval`](web-api-no-leaked-interval)               | Prevents leaked `setInterval` in a component or custom hook.      |  ✔️  |     |     |
| [`web-api/no-leaked-resize-observer`](web-api-no-leaked-resize-observer) | Prevents leaked `ResizeObserver` in a component or custom hook.   |  ✔️  |     |     |
| [`web-api/no-leaked-timeout`](web-api-no-leaked-timeout)                 | Prevents leaked `setTimeout` in a component or custom hook.       |  ✔️  |     |     |

## Hooks Extra Rules

| Rule                                                                                                           | Description                                                                     | 💼  | 💭  |     |
| :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :-: | :-: | :-: |
| [`hooks-extra/no-direct-set-state-in-use-effect`](hooks-extra-no-direct-set-state-in-use-effect)               | Disallow direct calls to the `set` function of `useState` in `useEffect`.       |  ✔️  |     |     |
| [`hooks-extra/no-direct-set-state-in-use-layout-effect`](hooks-extra-no-direct-set-state-in-use-layout-effect) | Disallow direct calls to the `set` function of `useState` in `useLayoutEffect`. |  ✔️  |     |     |
| [`hooks-extra/no-redundant-custom-hook`](hooks-extra-no-redundant-custom-hook)                                 | Warns when custom Hooks that don't use other Hooks.                             |  ✔️  |     |     |
| [`hooks-extra/no-unnecessary-use-callback`](hooks-extra-no-unnecessary-use-callback)                           | Disallow unnecessary usage of `useCallback`.                                    |  ✔️  |     |     |
| [`hooks-extra/no-unnecessary-use-memo`](hooks-extra-no-unnecessary-use-memo)                                   | Disallow unnecessary usage of `useMemo`.                                        |  ✔️  |     |     |
| [`hooks-extra/prefer-use-state-lazy-initialization`](hooks-extra-prefer-use-state-lazy-initialization)         | Warns function calls made inside `useState` calls.                              | 🚀  |     |     |

## Naming Convention Rules

| Rule                                                                           | Description                                                                                | 💼  | 💭  |     |
| :----------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :-: | :-: | :-: |
| [`naming-convention/component-name`](naming-convention-component-name)         | Enforces naming conventions for components.                                                | 📖  |     |     |
| [`naming-convention/filename`](naming-convention-filename)                     | Enforces naming convention for JSX files.                                                  | 📖  |     |     |
| [`naming-convention/filename-extension`](naming-convention-filename-extension) | Enforces consistent use of the JSX file extension.                                         | 📖  |     |     |
| [`naming-convention/use-state`](naming-convention-use-state)                   | Enforces destructuring and symmetric naming of `useState` hook value and setter variables. | 📖  |     |     |

## Debug Rules

| Rule                                                   | Description                                              | 💼  | 💭  |     |
| :----------------------------------------------------- | :------------------------------------------------------- | :-: | :-: | :-: |
| [`debug/class-component`](debug-class-component)       | Reports all class components.                            | 🐞  |     |     |
| [`debug/function-component`](debug-function-component) | Reports all function components.                         | 🐞  |     |     |
| [`debug/hook`](debug-hook)                             | Reports all react hooks.                                 | 🐞  |     |     |
| [`debug/is-from-react`](debug-is-from-react)           | Reports all identifiers that are initialized from React. | 🐞  |     |     |
