<p align="center"><img src="./assets/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

ESLint plugin for React function components with TypeScript, built (mostly) from scratch.

## Public packages

- [`@eslint-react/eslint-plugin`](./packages/eslint-plugin) - The main ESLint plugin package including all rules and configs in this repository.
- [`@eslint-react/jsx`](./packages/jsx) - AST Utility Module for Static Analysis of JSX in ESLint.

## Supported Engines

### Node.js

- 18.x LTS Hydrogen
- 20.x Current

### Bun

- 1.0.7 or later

## Installation

```bash
# npm
npm install --save-dev @eslint-react/eslint-plugin

# pnpm
pnpm add --save-dev @eslint-react/eslint-plugin

# yarn
yarn add --dev @eslint-react/eslint-plugin

# bun
bun add --dev @eslint-react/eslint-plugin
```

## Usage

### [`.eslintrc.cjs`](https://eslint.org/docs/latest/use/configure/configuration-files)

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@eslint-react/recommended-legacy",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
};
```

### [`eslint.config.js`](https://eslint.org/docs/latest/use/configure/configuration-files-new) (requires eslint >= v8.23.0)

```js
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "@eslint-react/eslint-plugin";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
    },
  },
  react.configs.recommended,
];
```

## Rules

<!-- begin auto-generated rules list -->

### debug

| Name                                                                                     | Description                                               |
| :--------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| [debug/class-component](packages/eslint-plugin-debug/src/rules/class-component.md)       | reports all class components, including anonymous ones    |
| [debug/function-component](packages/eslint-plugin-debug/src/rules/function-component.md) | reports all function components, including anonymous ones |
| [debug/hooks](packages/eslint-plugin-debug/src/rules/hooks.md)                           | reports all react hooks                                   |

### hooks

| Name                                                                                                                           | Description                            |
| :----------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| [hooks/ensure-custom-hooks-using-other-hooks](packages/eslint-plugin-hooks/src/rules/ensure-custom-hooks-using-other-hooks.md) | enforce custom hooks using other hooks |

### jsx

| Name                                                                                                           | Description                                                   |
| :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| [jsx/no-array-index-key](packages/eslint-plugin-jsx/src/rules/no-array-index-key.md)                           | disallow using Array index as key                             |
| [jsx/no-duplicate-key](packages/eslint-plugin-jsx/src/rules/no-duplicate-key.md)                               | disallow duplicate keys in `key` prop when rendering list     |
| [jsx/no-leaked-conditional-rendering](packages/eslint-plugin-jsx/src/rules/no-leaked-conditional-rendering.md) | disallow problematic leaked values from being rendered        |
| [jsx/no-missing-key](packages/eslint-plugin-jsx/src/rules/no-missing-key.md)                                   | require `key` prop when rendering list                        |
| [jsx/no-misused-comment-in-textnode](packages/eslint-plugin-jsx/src/rules/no-misused-comment-in-textnode.md)   | disallow comments from being inserted as text nodes           |
| [jsx/no-script-url](packages/eslint-plugin-jsx/src/rules/no-script-url.md)                                     | disallow `javascript:` URLs as JSX event handler prop's value |
| [jsx/prefer-shorthand-boolean](packages/eslint-plugin-jsx/src/rules/prefer-shorthand-boolean.md)               | enforce boolean attributes notation in JSX                    |

### naming-convention

| Name                                                                                                             | Description                                       |
| :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| [naming-convention/filename](packages/eslint-plugin-naming-convention/src/rules/filename.md)                     | enforce naming convention for JSX file names      |
| [naming-convention/filename-extension](packages/eslint-plugin-naming-convention/src/rules/filename-extension.md) | enforce naming convention for JSX file extensions |

### react

| Name                                                                                                                                     | Description                                                                     |
| :--------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| [react/no-children-in-void-dom-elements](packages/eslint-plugin-react/src/rules/no-children-in-void-dom-elements.md)                     | disallow passing children to void DOM elements                                  |
| [react/no-class-component](packages/eslint-plugin-react/src/rules/no-class-component.md)                                                 | enforce that there are no class components                                      |
| [react/no-clone-element](packages/eslint-plugin-react/src/rules/no-clone-element.md)                                                     | disallow `cloneElement`                                                         |
| [react/no-constructed-context-value](packages/eslint-plugin-react/src/rules/no-constructed-context-value.md)                             | disallow passing constructed values to context providers                        |
| [react/no-create-ref](packages/eslint-plugin-react/src/rules/no-create-ref.md)                                                           | disallow `createRef` in function components                                     |
| [react/no-dangerously-set-innerhtml](packages/eslint-plugin-react/src/rules/no-dangerously-set-innerhtml.md)                             | disallow when a DOM element is using both children and dangerouslySetInnerHTML' |
| [react/no-dangerously-set-innerhtml-with-children](packages/eslint-plugin-react/src/rules/no-dangerously-set-innerhtml-with-children.md) | disallow when a DOM element is using both children and dangerouslySetInnerHTML' |
| [react/no-namespace](packages/eslint-plugin-react/src/rules/no-namespace.md)                                                             | enforce that namespaces are not used in React elements                          |
| [react/no-string-refs](packages/eslint-plugin-react/src/rules/no-string-refs.md)                                                         | disallow using deprecated string refs                                           |
| [react/no-unstable-default-props](packages/eslint-plugin-react/src/rules/no-unstable-default-props.md)                                   | disallow usage of unstable value as default param in function component         |
| [react/no-unstable-nested-components](packages/eslint-plugin-react/src/rules/no-unstable-nested-components.md)                           | disallow usage of unstable nested components                                    |
| [react/prefer-destructuring-assignment](packages/eslint-plugin-react/src/rules/prefer-destructuring-assignment.md)                       | enforce using destructuring assignment in component props and context           |

<!-- end auto-generated rules list -->

## Rules status

### Work in progress

- [ ] `@eslint-react/hooks/no-access-state-in-setstate`
- [ ] `@eslint-react/hooks/no-suppressing-exhaustive-deps`
- [x] `@eslint-react/hooks/ensure-custom-hooks-using-other-hooks`
- [ ] `@eslint-react/jsx/enforce-component-name-pascal-case`
- [x] `@eslint-react/jsx/no-array-index-key`
- [x] `@eslint-react/jsx/no-children-in-void-dom-elements`
- [x] `@eslint-react/jsx/no-duplicate-key`
- [x] `@eslint-react/jsx/no-leaked-conditional-rendering`
- [x] `@eslint-react/jsx/no-missing-key`
- [x] `@eslint-react/jsx/no-misused-comment-in-textnode`
- [x] `@eslint-react/jsx/no-namespace`
- [x] `@eslint-react/jsx/no-script-url`
- [ ] `@eslint-react/jsx/no-target-blank`
- [ ] `@eslint-react/jsx/no-unknown-property`
- [ ] `@eslint-react/jsx/no-useless-fragment`
- [ ] `@eslint-react/jsx/prefer-fragment-syntax`
- [x] `@eslint-react/jsx/prefer-shorthand-boolean`
- [x] `@eslint-react/naming-convention/filename-extension`
- [x] `@eslint-react/naming-convention/filename`
- [ ] `@eslint-react/ensure-class-component-method-order`
- [ ] `@eslint-react/ensure-style-prop-object`
- [x] `@eslint-react/no-constructed-context-value`
- [x] `@eslint-react/no-dangerously-set-innerhtml-with-children`
- [x] `@eslint-react/no-dangerously-set-innerhtml`
- [ ] `@eslint-react/no-direct-mutation-state`
- [ ] `@eslint-react/no-missing-display-name`
- [ ] `@eslint-react/no-missing-iframe-sandbox-attribute`
- [x] `@eslint-react/no-string-refs`
- [ ] `@eslint-react/no-children-methods`
- [x] `@eslint-react/no-class-component`
- [ ] `@eslint-react/no-clone-element`
- [x] `@eslint-react/no-createRef`
- [x] `@eslint-react/no-unstable-default-props`
- [x] `@eslint-react/no-unstable-nested-components`
- [ ] `@eslint-react/no-unused-class-component-methods`
- [ ] `@eslint-react/require-button-has-type-attribute`
- [ ] `@eslint-react/require-render-return`
- [x] `@eslint-react/debug/class-component`
- [x] `@eslint-react/debug/function-component`
- [x] `@eslint-react/debug/hooks`
- [ ] `@eslint-react/debug/render-prop`
- [ ] `@eslint-react/debug/context`

### Planned (will be added in the future)

- [ ] `@eslint-react/jsx/no-complicated-conditional-rendering`
- [ ] `@eslint-react/no-access-ref-current-during-rendering`

## Philosophy

- **Focus on code rather than style**.
- **Linting errors are better than runtime crashes**.
- **Types are the fundamental unit of correctness**.

## Rule introduction or modification principles

1. **TypeScript first**. If a behavior can already be enforced by TypeScript built-in checker, don't reimplement it.
2. **Formatting independent**. Rules should check for correctness, not style. We recommend using style focused tools for formatting (e.g. [dprint](https://dprint.dev/) or [eslint-stylistic](https://github.com/eslint-stylistic/eslint-stylistic)).
3. **Sensible defaults**. Rules should be easy to setup and use with minimal configuration and sensible defaults.
4. **[Rules over Options](./docs/rules-over-options.md)**. Each rule should have a single purpose. Make multiple rules work together to achieve more complex behaviors instead of adding options to a single rule.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid)
- [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple)
- [@tanstack/eslint-plugin-query](https://github.com/TanStack/query/tree/main/packages/eslint-plugin-query)
- [rome/tools](https://github.com/rome/tools)
