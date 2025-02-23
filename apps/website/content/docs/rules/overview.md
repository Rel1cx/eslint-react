---
title: Overview
full: true
---

- ⚙️ - Configurable
- 🔍 - Linting
- 🔧 - Fixable
- 🔄 - Codemod
- 💭 - Type Chcking
- 🐞 - Debug
- 0️⃣ - Severity 0
- 1️⃣ - Severity 1
- 2️⃣ - Severity 2
- ✅ - Severity in recommended presets

## Core Rules

| Rule                                                                                 | ✅ | Features      | Description                                                                                           |  React   |
| :----------------------------------------------------------------------------------- | :- | :------------ | :---------------------------------------------------------------------------------------------------- | :------: |
| [`avoid-shorthand-boolean`](./avoid-shorthand-boolean)                               | 0️⃣  | `🔍` `🔧`     | Enforces the use of explicit boolean values for boolean attributes.                                   |          |
| [`avoid-shorthand-fragment`](./avoid-shorthand-fragment)                             | 0️⃣  | `🔍`          | Enforces the use of explicit `<Fragment>` components instead of the shorthand `<>` or `</>` syntax.   |          |
| [`ensure-forward-ref-using-ref`](./ensure-forward-ref-using-ref)                     | 1️⃣  | `🔍`          | Requires that components wrapped with `forwardRef` must have a `ref` parameter.                       |          |
| [`no-access-state-in-setstate`](./no-access-state-in-setstate)                       | 2️⃣  | `🔍`          | Prevents accessing `this.state` inside `setState` calls.                                              |          |
| [`no-array-index-key`](./no-array-index-key)                                         | 1️⃣  | `🔍`          | Prevents using array `index` as `key`.                                                                |          |
| [`no-children-count`](./no-children-count)                                           | 1️⃣  | `🔍`          | Prevents using `Children.count`.                                                                      |          |
| [`no-children-for-each`](./no-children-for-each)                                     | 1️⃣  | `🔍`          | Prevents using `Children.forEach`.                                                                    |          |
| [`no-children-map`](./no-children-map)                                               | 1️⃣  | `🔍`          | Prevents using `Children.map`.                                                                        |          |
| [`no-children-only`](./no-children-only)                                             | 1️⃣  | `🔍`          | Prevents using `Children.only`.                                                                       |          |
| [`no-children-prop`](./no-children-prop)                                             | 0️⃣  | `🔍`          | Prevents using `children` as a prop.                                                                  |          |
| [`no-children-to-array`](./no-children-to-array)                                     | 1️⃣  | `🔍`          | Prevents using `Children.toArray`.                                                                    |          |
| [`no-class-component`](./no-class-component)                                         | 0️⃣  | `🔍`          | Prevents using class component.                                                                       |          |
| [`no-clone-element`](./no-clone-element)                                             | 1️⃣  | `🔍`          | Prevents using `cloneElement`.                                                                        |          |
| [`no-comment-textnodes`](./no-comment-textnodes)                                     | 1️⃣  | `🔍`          | Prevents comments from being inserted as text nodes.                                                  |          |
| [`no-complex-conditional-rendering`](./no-complex-conditional-rendering)             | 0️⃣  | `🔍`          | Prevents complex conditional rendering in JSX.                                                        |          |
| [`no-component-will-mount`](./no-component-will-mount)                               | 2️⃣  | `🔍` `🔄`     | Prevents using `componentWillMount`.                                                                  | >=16.3.0 |
| [`no-component-will-receive-props`](./no-component-will-receive-props)               | 2️⃣  | `🔍` `🔄`     | Prevents using `componentWillReceiveProps`.                                                           | >=16.3.0 |
| [`no-component-will-update`](./no-component-will-update)                             | 2️⃣  | `🔍` `🔄`     | Prevents using `componentWillUpdate`.                                                                 | >=16.3.0 |
| [`no-context-provider`](./no-context-provider)                                       | 1️⃣  | `🔍` `🔄`     | Prevents using `<Context.Provider>`.                                                                  | >=19.0.0 |
| [`no-create-ref`](./no-create-ref)                                                   | 2️⃣  | `🔍`          | Prevents using `createRef`.                                                                           |          |
| [`no-default-props`](./no-default-props)                                             | 2️⃣  | `🔍`          | Prevents using `defaultProps` property in favor of ES6 default parameters.                            |          |
| [`no-direct-mutation-state`](./no-direct-mutation-state)                             | 2️⃣  | `🔍`          | Prevents direct mutation of `this.state`.                                                             |          |
| [`no-duplicate-jsx-props`](./no-duplicate-jsx-props)                                 | 1️⃣  | `🔍`          | Prevents duplicate props in JSX.                                                                      |          |
| [`no-duplicate-key`](./no-duplicate-key)                                             | 2️⃣  | `🔍`          | Prevents duplicate `key` on elements in the same array or a list of `children`.                       |          |
| [`no-forward-ref`](./no-forward-ref)                                                 | 1️⃣  | `🔍` `🔄`     | Prevents using `React.forwardRef`.                                                                    | >=19.0.0 |
| [`no-implicit-key`](./no-implicit-key)                                               | 1️⃣  | `🔍`          | Prevents `key` from not being explicitly specified (e.g. spreading `key` from objects).               |          |
| [`no-leaked-conditional-rendering`](./no-leaked-conditional-rendering)               | 1️⃣  | `🔍` `💭`     | Prevents problematic leaked values from being rendered.                                               |          |
| [`no-missing-component-display-name`](./no-missing-component-display-name)           | 0️⃣  | `🔍`          | Enforces that all components have a `displayName` which can be used in devtools.                      |          |
| [`no-missing-context-display-name`](./no-missing-context-display-name)               | 0️⃣  | `🔍`          | Enforces that all contexts have a `displayName` which React can use as its `displayName` in devtools. |          |
| [`no-missing-key`](./no-missing-key)                                                 | 2️⃣  | `🔍`          | Prevents missing `key` on items in list rendering.                                                    |          |
| [`no-nested-components`](./no-nested-components)                                     | 2️⃣  | `🔍`          | Prevents nesting component definitions inside other components.                                       |          |
| [`no-prop-types`](./no-prop-types)                                                   | 2️⃣  | `🔍`          | Prevents using `propTypes` in favor of TypeScript or another type-checking solution.                  |          |
| [`no-redundant-should-component-update`](./no-redundant-should-component-update)     | 2️⃣  | `🔍`          | Prevents using `shouldComponentUpdate` when extending `React.PureComponent`.                          |          |
| [`no-set-state-in-component-did-mount`](./no-set-state-in-component-did-mount)       | 1️⃣  | `🔍`          | Prevents calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.      |          |
| [`no-set-state-in-component-did-update`](./no-set-state-in-component-did-update)     | 1️⃣  | `🔍`          | Prevents calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.     |          |
| [`no-set-state-in-component-will-update`](./no-set-state-in-component-will-update)   | 1️⃣  | `🔍`          | Prevents calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.    |          |
| [`no-string-refs`](./no-string-refs)                                                 | 2️⃣  | `🔍`          | Prevents using deprecated string `refs`.                                                              |          |
| [`no-unsafe-component-will-mount`](./no-unsafe-component-will-mount)                 | 1️⃣  | `🔍`          | Warns the usage of `UNSAFE_componentWillMount` in class components.                                   |          |
| [`no-unsafe-component-will-receive-props`](./no-unsafe-component-will-receive-props) | 1️⃣  | `🔍`          | Warns the usage of `UNSAFE_componentWillReceiveProps` in class components.                            |          |
| [`no-unsafe-component-will-update`](./no-unsafe-component-will-update)               | 1️⃣  | `🔍`          | Warns the usage of `UNSAFE_componentWillUpdate` in class components.                                  |          |
| [`no-unstable-context-value`](./no-unstable-context-value)                           | 1️⃣  | `🔍`          | Prevents non-stable values (i.e. object literals) from being used as a value for `Context.Provider`.  |          |
| [`no-unstable-default-props`](./no-unstable-default-props)                           | 1️⃣  | `🔍`          | Prevents using referential-type values as default props in object destructuring.                      |          |
| [`no-unused-class-component-members`](./no-unused-class-component-members)           | 0️⃣  | `🔍`          | Warns unused class component methods and properties.                                                  |          |
| [`no-unused-state`](./no-unused-state)                                               | 1️⃣  | `🔍`          | Warns unused class component state.                                                                   |          |
| [`no-use-context`](./no-use-context)                                                 | 1️⃣  | `🔍` `🔄`     | Prevents using `useContext` in favor of `use`.                                                        | >=19.0.0 |
| [`no-useless-fragment`](./no-useless-fragment)                                       | 1️⃣  | `🔍` `🔧` `⚙️` | Prevents using useless `fragment` components or `<>` syntax.                                          |          |
| [`prefer-destructuring-assignment`](./prefer-destructuring-assignment)               | 0️⃣  | `🔍`          | Enforces using destructuring assignment over property assignment.                                     |          |
| [`prefer-react-namespace-import`](./prefer-react-namespace-import)                   | 0️⃣  | `🔍` `🔧`     | Enforces React is imported via a namespace import                                                     |          |
| [`prefer-read-only-props`](./prefer-read-only-props)                                 | 0️⃣  | `🔍` `💭`     | Enforces read-only props in components.                                                               |          |
| [`prefer-shorthand-boolean`](./prefer-shorthand-boolean)                             | 0️⃣  | `🔍` `🔧`     | Enforces using shorthand syntax for boolean attributes.                                               |          |
| [`prefer-shorthand-fragment`](./prefer-shorthand-fragment)                           | 0️⃣  | `🔍` `🔧`     | Enforces using shorthand syntax for fragments.                                                        |          |
| [`use-jsx-vars`](./use-jsx-vars)                                                     | 1️⃣  |               | Marks variables used in JSX as used.                                                                  |          |

## DOM Rules

| Rule                                                                                             | ✅ | Features      | Description                                                                            |
| :----------------------------------------------------------------------------------------------- | :- | :------------ | :------------------------------------------------------------------------------------- |
| [`no-void-elements-with-children`](./dom-no-void-elements-with-children)                         | 2️⃣  | `🔍`          | Prevents using `children` in void DOM elements.                                        |
| [`no-dangerously-set-innerhtml-with-children`](./dom-no-dangerously-set-innerhtml-with-children) | 2️⃣  | `🔍`          | Prevents DOM elements using `dangerouslySetInnerHTML` and `children` at the same time. |
| [`no-dangerously-set-innerhtml`](./dom-no-dangerously-set-innerhtml)                             | 1️⃣  | `🔍`          | Prevents DOM elements using `dangerouslySetInnerHTML`.                                 |
| [`no-find-dom-node`](./dom-no-find-dom-node)                                                     | 2️⃣  | `🔍`          | Prevents using `findDOMNode`.                                                          |
| [`no-flush-sync`](./dom-no-flush-sync)                                                           | 1️⃣  | `🔍`          | Prevents using `flushSync`.                                                            |
| [`no-missing-button-type`](./dom-no-missing-button-type)                                         | 1️⃣  | `🔍`          | Enforces explicit `type` attribute for `button` elements.                              |
| [`no-missing-iframe-sandbox`](./dom-no-missing-iframe-sandbox)                                   | 1️⃣  | `🔍`          | Enforces explicit `sandbox` attribute for `iframe` elements.                           |
| [`no-namespace`](./dom-no-namespace)                                                             | 2️⃣  | `🔍`          | Enforces the absence of a `namespace` in React elements.                               |
| [`no-render-return-value`](./dom-no-render-return-value)                                         | 2️⃣  | `🔍`          | Prevents using the return value of `ReactDOM.render`.                                  |
| [`no-script-url`](./dom-no-script-url)                                                           | 1️⃣  | `🔍`          | Prevents using `javascript:` URLs as the value of attributes.                          |
| [`no-unknown-property`](./dom-no-unknown-property)                                               | 0️⃣  | `🔍` `🔧` `⚙️` | Prevents using unknown `DOM` property                                                  |
| [`no-unsafe-iframe-sandbox`](./dom-no-unsafe-iframe-sandbox)                                     | 1️⃣  | `🔍`          | Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.  |
| [`no-unsafe-target-blank`](./dom-no-unsafe-target-blank)                                         | 1️⃣  | `🔍`          | Prevents using `target="_blank"` without `rel="noreferrer noopener"`.                  |

## Web API Rules

| Rule                                                               | ✅ | Features | Description                                                       |
| :----------------------------------------------------------------- | :- | :------- | :---------------------------------------------------------------- |
| [`no-leaked-event-listener`](./web-api-no-leaked-event-listener)   | 1️⃣  | `🔍`     | Prevents leaked `addEventListener` in a component or custom Hook. |
| [`no-leaked-interval`](./web-api-no-leaked-interval)               | 1️⃣  | `🔍`     | Prevents leaked `setInterval` in a component or custom Hook.      |
| [`no-leaked-resize-observer`](./web-api-no-leaked-resize-observer) | 1️⃣  | `🔍`     | Prevents leaked `ResizeObserver` in a component or custom Hook.   |
| [`no-leaked-timeout`](./web-api-no-leaked-timeout)                 | 1️⃣  | `🔍`     | Prevents leaked `setTimeout` in a component or custom Hook.       |

## Hooks Extra Rules

| Rule                                                                                                 | ✅ | Features | Description                                                                                |
| :--------------------------------------------------------------------------------------------------- | :- | :------- | :----------------------------------------------------------------------------------------- |
| [`no-direct-set-state-in-use-effect`](./hooks-extra-no-direct-set-state-in-use-effect)               | 1️⃣  | `🔍`     | Disallow direct calls to the `set` function of `useState` in `useEffect`.                  |
| [`no-direct-set-state-in-use-layout-effect`](./hooks-extra-no-direct-set-state-in-use-layout-effect) | 0️⃣  | `🔍`     | Disallow direct calls to the `set` function of `useState` in `useLayoutEffect`.            |
| [`no-unnecessary-use-callback`](./hooks-extra-no-unnecessary-use-callback)                           | 0️⃣  | `🔍`     | Disallow unnecessary usage of `useCallback`.                                               |
| [`no-unnecessary-use-memo`](./hooks-extra-no-unnecessary-use-memo)                                   | 0️⃣  | `🔍`     | Disallow unnecessary usage of `useMemo`.                                                   |
| [`no-useless-custom-hooks`](./hooks-extra-no-useless-custom-hooks)                                   | 1️⃣  | `🔍`     | Enforces custom Hooks to use at least one other Hook inside.                               |
| [`prefer-use-state-lazy-initialization`](./hooks-extra-prefer-use-state-lazy-initialization)         | 1️⃣  | `🔍`     | Enforces function calls made inside `useState` to be wrapped in an `initializer function`. |

## Naming Convention Rules

| Rule                                                           | ✅ | Features | Description                                                                      |
| :------------------------------------------------------------- | :- | :------- | :------------------------------------------------------------------------------- |
| [`component-name`](./naming-convention-component-name)         | 0️⃣  | `🔍` `⚙️` | Enforces naming conventions for components.                                      |
| [`filename`](./naming-convention-filename)                     | 0️⃣  | `🔍` `⚙️` | Enforces naming convention for JSX files.                                        |
| [`filename-extension`](./naming-convention-filename-extension) | 0️⃣  | `🔍` `⚙️` | Enforces consistent use of the JSX file extension.                               |
| [`use-state`](./naming-convention-use-state)                   | 0️⃣  | `🔍`     | Enforces destructuring and symmetric naming of `useState` hook value and setter. |

## Debug Rules

| Rule                                               | ✅ | Features | Description                                              |
| :------------------------------------------------- | :- | :------- | :------------------------------------------------------- |
| [`class-component`](./debug-class-component)       | 0️⃣  | `🐞`     | Reports all class components.                            |
| [`function-component`](./debug-function-component) | 0️⃣  | `🐞`     | Reports all function components.                         |
| [`hook`](./debug-hook)                             | 0️⃣  | `🐞`     | Reports all react hooks.                                 |
| [`is-from-react`](./debug-is-from-react)           | 0️⃣  | `🐞`     | Reports all identifiers that are initialized from React. |

## Deprecated Rules

| Rule                                                                                                       | Replaced by                                                                            | Deprecated in |
| :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :------------ |
| [`jsx-uses-vars`](jsx-uses-vars)                                                                           | [`use-jsx-vars`](./use-jsx-vars)                                                       | 1.22.0        |
| [`jsx-no-duplicate-props`](jsx-no-duplicate-props)                                                         | [`no-duplicate-jsx-props`](./no-duplicate-jsx-props)                                   | 1.22.0        |
| [`no-complicated-conditional-rendering`](no-complicated-conditional-rendering)                             | [`no-complex-conditional-rendering`](./no-complex-conditional-rendering)               | 1.6.0         |
| [`dom/no-children-in-void-dom-elements`](dom-no-children-in-void-dom-elements)                             | [`dom/no-void-elements-with-children`](./dom-no-void-elements-with-children)           | 1.22.0        |
| [`hooks-extra/no-redundant-custom-hook`](hooks-extra-no-useless-custom-hooks)                              | [`hooks-extra/no-useless-custom-hooks`](./hooks-extra-no-useless-custom-hooks)         | 1.21.0        |
| [`hooks-extra/ensure-custom-hooks-using-other-hooks`](hooks-extra-no-useless-custom-hooks)                 | [`hooks-extra/no-useless-custom-hooks`](./hooks-extra-no-useless-custom-hooks)         | 1.13.0        |
| [`hooks-extra/ensure-use-memo-has-non-empty-deps`](hooks-extra-ensure-use-memo-has-non-empty-deps)         | [`hooks-extra/no-unnecessary-use-memo`](./hooks-extra-no-unnecessary-use-memo)         | 1.13.0        |
| [`hooks-extra/ensure-use-callback-has-non-empty-deps`](hooks-extra-ensure-use-callback-has-non-empty-deps) | [`hooks-extra/no-unnecessary-use-callback`](./hooks-extra-no-unnecessary-use-callback) | 1.13.0        |
