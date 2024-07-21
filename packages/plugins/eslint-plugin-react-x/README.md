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
import reactx from "eslint-plugin-react-x";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: [
      "react-x": reactx,
      rules: {
        // react-x recommended rules
        "react-x/ensure-forward-ref-using-ref": "warn",
        "react-x/no-access-state-in-setstate": "error",
        "react-x/no-array-index-key": "warn",
        "react-x/no-children-count": "warn",
        "react-x/no-children-for-each": "warn",
        "react-x/no-children-map": "warn",
        "react-x/no-children-only": "warn",
        "react-x/no-children-to-array": "warn",
        "react-x/no-clone-element": "warn",
        "react-x/no-comment-textnodes": "warn",
        "react-x/no-component-will-mount": "error",
        "react-x/no-component-will-receive-props": "error",
        "react-x/no-component-will-update": "error",
        "react-x/no-create-ref": "error",
        "react-x/no-default-props": "error",
        "react-x/no-direct-mutation-state": "error",
        "react-x/no-duplicate-key": "error",
        "react-x/no-missing-key": "error",
        "react-x/no-nested-components": "warn",
        "react-x/no-prop-types": "error",
        "react-x/no-redundant-should-component-update": "error",
        "react-x/no-set-state-in-component-did-mount": "warn",
        "react-x/no-set-state-in-component-did-update": "warn",
        "react-x/no-set-state-in-component-will-update": "warn",
        "react-x/no-string-refs": "error",
        "react-x/no-unsafe-component-will-mount": "warn",
        "react-x/no-unsafe-component-will-receive-props": "warn",
        "react-x/no-unsafe-component-will-update": "warn",
        "react-x/no-unstable-context-value": "error",
        "react-x/no-unstable-default-props": "error",
        "react-x/no-unused-class-component-members": "warn",
        "react-x/no-unused-state": "warn",
      }
    ],
  },
];
```

## Rules

| Rule                                     | Description                                                                                          | 💼  | 💭  | ❌  |
| :--------------------------------------- | :--------------------------------------------------------------------------------------------------- | :-: | :-: | :-: |
| `avoid-shorthand-boolean`                | Enforces the use of shorthand syntax for boolean attributes.                                         | 🎨  |     |     |
| `avoid-shorthand-fragment`               | Enforces the use of shorthand syntax for fragments.                                                  | 🎨  |     |     |
| `ensure-forward-ref-using-ref`           | Requires that components wrapped with `forwardRef` must have a `ref` parameter.                      |  ✔️  |     |     |
| `no-access-state-in-setstate`            | Prevents accessing `this.state` inside `setState` calls.                                             |  ✔️  |     |     |
| `no-array-index-key`                     | Warns when an array `index` is used as a `key` prop.                                                 | 🧐  |     |     |
| `no-children-count`                      | Prevents usage of `Children.count`.                                                                  | ⛔  |     |     |
| `no-children-for-each`                   | Prevents usage of `Children.forEach`.                                                                | ⛔  |     |     |
| `no-children-map`                        | Prevents usage of `Children.map`.                                                                    | ⛔  |     |     |
| `no-children-only`                       | Prevents usage of `Children.only`.                                                                   | ⛔  |     |     |
| `no-children-prop`                       | Prevents usage of `children` as a prop.                                                              | ⛔  |     |     |
| `no-children-to-array`                   | Prevents usage of `Children.toArray`.                                                                | ⛔  |     |     |
| `no-class-component`                     | Prevents usage of class component.                                                                   | ⛔  |     |     |
| `no-clone-element`                       | Prevents usage of `cloneElement`.                                                                    | ⛔  |     |     |
| `no-comment-textnodes`                   | Prevents comments from being inserted as text nodes.                                                 | 🧐  |     |     |
| `no-component-will-mount`                | Prevents usage of `componentWillMount`.                                                              | ⛔  |     |     |
| `no-component-will-receive-props`        | Prevents usage of `componentWillReceiveProps`.                                                       | ⛔  |     |     |
| `no-component-will-update`               | Prevents usage of `componentWillUpdate`.                                                             | ⛔  |     |     |
| `no-create-ref`                          | Prevents usage of `createRef`.                                                                       | ⛔  |     |     |
| `no-default-props`                       | Prevents usage of `defaultProps`.                                                                    | ⛔  |     |     |
| `no-direct-mutation-state`               | Prevents direct mutation of `this.state`.                                                            |  ✔️  |     |     |
| `no-duplicate-key`                       | Prevents duplicate `key` props on elements in the same array or a list of `children`.                |  ✔️  |     |     |
| `no-leaked-conditional-rendering`        | Prevents problematic leaked values from being rendered.                                              | 🧐  | 💭  |     |
| `no-missing-component-display-name`      | Enforces that all components have a `displayName` which can be used in devtools.                     | 🐞  |     |     |
| `no-missing-key`                         | Prevents missing `key` prop on items in list rendering.                                              |  ✔️  |     |     |
| `no-nested-components`                   | Prevents nesting component definitions inside other components.                                      |  ✔️  |     |     |
| `no-prop-types`                          | Prevents usage of `propTypes`.                                                                       | ⛔  |     |     |
| `no-redundant-should-component-update`   | Prevents usage of `shouldComponentUpdate` when extending `React.PureComponent`.                      |  ✔️  |     |     |
| `no-set-state-in-component-did-mount`    | Disallows calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.    | 🧐  |     |     |
| `no-set-state-in-component-did-update`   | Disallows calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.   | 🧐  |     |     |
| `no-set-state-in-component-will-update`  | Disallows calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.  | 🧐  |     |     |
| `no-string-refs`                         | Disallows using deprecated string `refs`.                                                            | ⛔  |     |     |
| `no-unsafe-component-will-mount`         | Warns usage of `UNSAFE_componentWillMount` in class components.                                      | 🧐  |     |     |
| `no-unsafe-component-will-receive-props` | Warns usage of `UNSAFE_componentWillReceiveProps` in class components.                               | 🧐  |     |     |
| `no-unsafe-component-will-update`        | Warns usage of `UNSAFE_componentWillUpdate` in class components.                                     | 🧐  |     |     |
| `no-unstable-context-value`              | Prevents non-stable values (i.e. object literals) from being used as a value for `Context.Provider`. | 🚀  |     |     |
| `no-unstable-default-props`              | Prevents usage of referential-type values as default props in object destructuring.                  | 🚀  |     |     |
| `no-unused-class-component-members`      | Warns unused class component methods and properties.                                                 |  ✔️  |     |     |
| `no-unused-state`                        | Warns unused class component state.                                                                  |  ✔️  |     |     |
| `no-useless-fragment`                    | Prevents the use of useless `fragment` components or `<>` syntax.                                    |  ✔️  |     |     |
| `prefer-read-only-props`                 | Enforces that function components props are readonly.                                                |  ✔️  | 💭  |     |
| `prefer-destructuring-assignment`        | Enforces the use of destructuring assignment over property assignment.                               | 🎨  |     |     |
| `prefer-shorthand-boolean`               | Enforces the use of shorthand syntax for boolean attributes.                                         | 🎨  |     |     |
| `prefer-shorthand-fragment`              | Enforces the use of shorthand syntax for fragments.                                                  | 🎨  |     |     |
