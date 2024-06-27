# eslint-plugin-react-x

Core rules (DOM Irrelevant, Render Target Agnostic, Formatting Independent).

> [!TIP]
> This plugin is already included in `@eslint-react/eslint-plugin`. You don't need to install it separately if you are using `@eslint-react/eslint-plugin`.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-x
```

## Setup

Add the plugin to your `eslint.config.js`:

```js
// @ts-check

import js from "@eslint/js";
import reactX from "eslint-plugin-react-x";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...reactX.configs.recommended,
  },
];
```

## Presets

- **recommended**\
  Enable rules that are recommended by ESLint React.
- **recommended-type-checked**\
  Enable rules that are recommended by ESLint React with additional rules that require type information.
- **off**\
  Disable all rules in this plugin.

## Rules

| Rule                                                                               | Description                                                                                          | 💼  | 💭  | ❌  |
| :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :-: | :-: | :-: |
| [`avoid-shorthand-boolean`](avoid-shorthand-boolean)                               | Enforces the use of shorthand syntax for boolean attributes.                                         | 🎨  |     |     |
| [`avoid-shorthand-fragment`](avoid-shorthand-fragment)                             | Enforces the use of shorthand syntax for fragments.                                                  | 🎨  |     |     |
| [`ensure-forward-ref-using-ref`](ensure-forward-ref-using-ref)                     | Requires that components wrapped with `forwardRef` must have a `ref` parameter.                      |  ✔️  |     |     |
| [`no-access-state-in-setstate`](no-access-state-in-setstate)                       | Prevents accessing `this.state` inside `setState` calls.                                             |  ✔️  |     |     |
| [`no-array-index-key`](no-array-index-key)                                         | Warns when an array `index` is used as a `key` prop.                                                 | 👀  |     |     |
| [`no-children-count`](no-children-count)                                           | Prevents usage of `Children.count`.                                                                  | ⛔  |     |     |
| [`no-children-for-each`](no-children-for-each)                                     | Prevents usage of `Children.forEach`.                                                                | ⛔  |     |     |
| [`no-children-map`](no-children-map)                                               | Prevents usage of `Children.map`.                                                                    | ⛔  |     |     |
| [`no-children-only`](no-children-only)                                             | Prevents usage of `Children.only`.                                                                   | ⛔  |     |     |
| [`no-children-prop`](no-children-prop)                                             | Prevents usage of `children` as a prop.                                                              | ⛔  |     |     |
| [`no-children-to-array`](no-children-to-array)                                     | Prevents usage of `Children.toArray`.                                                                | ⛔  |     |     |
| [`no-class-component`](no-class-component)                                         | Prevents usage of class component.                                                                   | ⛔  |     |     |
| [`no-clone-element`](no-clone-element)                                             | Prevents usage of `cloneElement`.                                                                    | ⛔  |     |     |
| [`no-comment-textnodes`](no-comment-textnodes)                                     | Prevents comments from being inserted as text nodes.                                                 | 👀  |     |     |
| [`no-complicated-conditional-rendering`](no-complicated-conditional-rendering)     | Prevents complicated conditional rendering in JSX.                                                   | 🤯  |     | ❌  |
| [`no-component-will-mount`](no-component-will-mount)                               | Prevents usage of `componentWillMount`.                                                              | ⛔  |     |     |
| [`no-component-will-receive-props`](no-component-will-receive-props)               | Prevents usage of `componentWillReceiveProps`.                                                       | ⛔  |     |     |
| [`no-component-will-update`](no-component-will-update)                             | Prevents usage of `componentWillUpdate`.                                                             | ⛔  |     |     |
| [`no-create-ref`](no-create-ref)                                                   | Prevents usage of `createRef`.                                                                       | ⛔  |     |     |
| [`no-direct-mutation-state`](no-direct-mutation-state)                             | Prevents direct mutation of `this.state`.                                                            |  ✔️  |     |     |
| [`no-duplicate-key`](no-duplicate-key)                                             | Prevents duplicate `key` props on elements in the same array or a list of `children`.                |  ✔️  |     |     |
| [`no-implicit-key`](no-implicit-key)                                               | Prevents `key` prop from not being explicitly specified (e.g. spreading `key` prop from objects).    | 👀  |     | ❌  |
| [`no-leaked-conditional-rendering`](no-leaked-conditional-rendering)               | Prevents problematic leaked values from being rendered.                                              | 👀  | 💭  |     |
| [`no-missing-component-display-name`](no-missing-component-display-name)           | Enforces that all components have a `displayName` which can be used in devtools.                     | 🐞  |     |     |
| [`no-missing-key`](no-missing-key)                                                 | Prevents missing `key` prop on items in list rendering.                                              |  ✔️  |     |     |
| [`no-nested-components`](no-nested-components)                                     | Prevents nesting component definitions inside other components.                                      |  ✔️  |     |     |
| [`no-redundant-should-component-update`](no-redundant-should-component-update)     | Prevents usage of `shouldComponentUpdate` when extending `React.PureComponent`.                      |  ✔️  |     |     |
| [`no-set-state-in-component-did-mount`](no-set-state-in-component-did-mount)       | Disallows calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.    | 👀  |     |     |
| [`no-set-state-in-component-did-update`](no-set-state-in-component-did-update)     | Disallows calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.   | 👀  |     |     |
| [`no-set-state-in-component-will-update`](no-set-state-in-component-will-update)   | Disallows calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.  | 👀  |     |     |
| [`no-string-refs`](no-string-refs)                                                 | Disallows using deprecated string `refs`.                                                            | ⛔  |     |     |
| [`no-unsafe-component-will-mount`](no-unsafe-component-will-mount)                 | Warns usage of `UNSAFE_componentWillMount` in class components.                                      | 👀  |     |     |
| [`no-unsafe-component-will-receive-props`](no-unsafe-component-will-receive-props) | Warns usage of `UNSAFE_componentWillReceiveProps` in class components.                               | 👀  |     |     |
| [`no-unsafe-component-will-update`](no-unsafe-component-will-update)               | Warns usage of `UNSAFE_componentWillUpdate` in class components.                                     | 👀  |     |     |
| [`no-unstable-context-value`](no-unstable-context-value)                           | Prevents non-stable values (i.e. object literals) from being used as a value for `Context.Provider`. | 🚀  |     |     |
| [`no-unstable-default-props`](no-unstable-default-props)                           | Prevents usage of referential-type values as default props in object destructuring.                  | 🚀  |     |     |
| [`no-unused-class-component-members`](no-unused-class-component-members)           | Warns unused class component methods and properties.                                                 |  ✔️  |     |     |
| [`no-unused-state`](no-unused-state)                                               | Warns unused class component state.                                                                  |  ✔️  |     |     |
| [`no-useless-fragment`](no-useless-fragment)                                       | Prevents the use of useless `fragment` components or `<>` syntax.                                    |  ✔️  |     |     |
| [`prefer-destructuring-assignment`](prefer-destructuring-assignment)               | Enforces the use of destructuring assignment over property assignment.                               | 🎨  |     |     |
| [`prefer-shorthand-boolean`](prefer-shorthand-boolean)                             | Enforces the use of shorthand syntax for boolean attributes.                                         | 🎨  |     |     |
| [`prefer-shorthand-fragment`](prefer-shorthand-fragment)                           | Enforces the use of shorthand syntax for fragments.                                                  | 🎨  |     |     |
