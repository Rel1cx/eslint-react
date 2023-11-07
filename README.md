<p align="center"><img src="./assets/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

ESLint plugin for React function components with TypeScript, built (mostly) from scratch.

## Public packages

- [`@eslint-react/eslint-plugin`](./packages/eslint-plugin) - The main ESLint plugin package including all rules and configs in this repository.
- [`@eslint-react/jsx`](./packages/jsx) - AST Utility Module for Static Analysis of JSX in ESLint.

## Supported engines

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

### [`.eslintrc.js`](https://eslint.org/docs/latest/use/configure/configuration-files)

```js
module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@eslint-react/recommended-legacy",
  ],
  plugins: ["@typescript-eslint", "react-hooks"],
  ignorePatterns: ["dist", ".eslintrc.js"],
};
```

### [`eslint.config.js`](https://eslint.org/docs/latest/use/configure/configuration-files-new) (requires eslint >= v8.23.0)

```js
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": ts,
      "react-hooks": reactHooks,
    },
    rules: {
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
      ...reactHooks.configs.recommended.rules,
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

| Name                                                                                                           | Description                                                |
| :------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| [jsx/no-array-index-key](packages/eslint-plugin-jsx/src/rules/no-array-index-key.md)                           | disallow using Array index as key                          |
| [jsx/no-comment-textnodes](packages/eslint-plugin-jsx/src/rules/no-comment-textnodes.md)                       | disallow comments from being inserted as text nodes        |
| [jsx/no-duplicate-key](packages/eslint-plugin-jsx/src/rules/no-duplicate-key.md)                               | disallow duplicate keys in `key` prop when rendering list  |
| [jsx/no-leaked-conditional-rendering](packages/eslint-plugin-jsx/src/rules/no-leaked-conditional-rendering.md) | disallow problematic leaked values from being rendered     |
| [jsx/no-missing-key](packages/eslint-plugin-jsx/src/rules/no-missing-key.md)                                   | require `key` prop when rendering list                     |
| [jsx/no-spreading-key](packages/eslint-plugin-jsx/src/rules/no-spreading-key.md)                               | disallow spreading key from objects.                       |
| [jsx/no-useless-fragment](packages/eslint-plugin-jsx/src/rules/no-useless-fragment.md)                         | disallow unnecessary fragments                             |
| [jsx/prefer-shorthand-boolean](packages/eslint-plugin-jsx/src/rules/prefer-shorthand-boolean.md)               | enforce boolean attributes notation in JSX                 |
| [jsx/prefer-shorthand-fragment](packages/eslint-plugin-jsx/src/rules/prefer-shorthand-fragment.md)             | enforce using fragment syntax instead of `Pragma.Fragment` |

### naming-convention

| Name                                                                                                             | Description                                                        |
| :--------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| [naming-convention/component-name](packages/eslint-plugin-naming-convention/src/rules/component-name.md)         | enforce component naming convention to PascalCase or CONSTANT_CASE |
| [naming-convention/filename](packages/eslint-plugin-naming-convention/src/rules/filename.md)                     | enforce naming convention for JSX file names                       |
| [naming-convention/filename-extension](packages/eslint-plugin-naming-convention/src/rules/filename-extension.md) | enforce naming convention for JSX file extensions                  |

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
| [react/no-missing-button-type](packages/eslint-plugin-react/src/rules/no-missing-button-type.md)                                         | enforce that button elements have an explicit type attribute                    |
| [react/no-missing-iframe-sandbox](packages/eslint-plugin-react/src/rules/no-missing-iframe-sandbox.md)                                   | enforce that iframe elements explicitly specify a sandbox attribute             |
| [react/no-namespace](packages/eslint-plugin-react/src/rules/no-namespace.md)                                                             | enforce that namespaces are not used in React elements                          |
| [react/no-script-url](packages/eslint-plugin-react/src/rules/no-script-url.md)                                                           | disallow `javascript:` URLs as JSX event handler prop's value                   |
| [react/no-string-refs](packages/eslint-plugin-react/src/rules/no-string-refs.md)                                                         | disallow using deprecated string refs                                           |
| [react/no-unsafe-iframe-sandbox](packages/eslint-plugin-react/src/rules/no-unsafe-iframe-sandbox.md)                                     | disallow unsafe iframe sandbox attribute combinations                           |
| [react/no-unsafe-target-blank](packages/eslint-plugin-react/src/rules/no-unsafe-target-blank.md)                                         | disallow `target="_blank"` without `rel="noreferrer noopener"`                  |
| [react/no-unstable-default-props](packages/eslint-plugin-react/src/rules/no-unstable-default-props.md)                                   | disallow usage of unstable value as default param in function component         |
| [react/no-unstable-nested-components](packages/eslint-plugin-react/src/rules/no-unstable-nested-components.md)                           | disallow usage of unstable nested components                                    |
| [react/prefer-destructuring-assignment](packages/eslint-plugin-react/src/rules/prefer-destructuring-assignment.md)                       | enforce using destructuring assignment in component props and context           |

<!-- end auto-generated rules list -->

## Rules status

### Work in progress

#### JSX rules

- [x] `jsx/no-missing-key`
- [x] `jsx/no-duplicate-key`
- [x] `jsx/no-spreading-key`
- [x] `jsx/no-array-index-key`
- [x] `jsx/no-useless-fragment`
- [x] `jsx/no-comment-textnodes`
- [x] `jsx/no-leaked-conditional-rendering`
- [x] `jsx/prefer-shorthand-boolean`
- [x] `jsx/prefer-shorthand-fragment`
- [ ] `jsx/no-bind`
- [ ] `jsx/max-depth`
- [ ] `jsx/no-complicated-conditional-rendering`

#### Naming convention rules

- [x] `naming-convention/component-name`
- [x] `naming-convention/filename`
- [x] `naming-convention/filename-extension`
- [ ] `naming-convention/boolean-prop`
- [ ] `naming-convention/handler-prop`
- [ ] `naming-convention/use-state`

#### React rules

- [x] `react/no-children-in-void-dom-elements`
- [ ] `react/no-children-methods`
- [ ] `react/no-children-prop`
- [x] `react/no-class-component`
- [x] `react/no-clone-element`
- [x] `react/no-constructed-context-value`
- [ ] `react/no-create-class`
- [x] `react/no-createRef`
- [x] `react/no-dangerously-set-innerhtml-with-children`
- [x] `react/no-dangerously-set-innerhtml`
- [ ] `react/no-direct-mutation-state`
- [ ] `react/no-find-dom-node`
- [ ] `react/no-is-mounted`
- [x] `react/no-missing-button-type`
- [x] `react/no-missing-display-name`
- [x] `react/no-missing-iframe-sandbox`
- [x] `react/no-namespace`
- [ ] `react/no-redundant-should-component-update`
- [ ] `react/no-render-return-value`
- [x] `react/no-script-url`
- [ ] `react/no-set-state-in-component-did-mount`
- [ ] `react/no-set-state-in-component-did-update`
- [ ] `react/no-set-state-in-component-will-update`
- [x] `react/no-string-refs`
- [ ] `react/no-unsafe-component-did-mount`
- [ ] `react/no-unsafe-component-did-update`
- [ ] `react/no-unsafe-component-will-receive-props`
- [ ] `react/no-unsafe-component-will-update`
- [x] `react/no-unsafe-iframe-sandbox`
- [x] `react/no-unsafe-target-blank`
- [ ] `react/no-unsorted-class-component-methods`
- [x] `react/no-unstable-default-props`
- [x] `react/no-unstable-nested-components`
- [ ] `react/no-unused-class-component-methods`
- [ ] `react/no-unused-state`
- [ ] `react/no-access-ref-current-during-rendering`
- [x] `react/prefer-destructuring-assignment`
- [ ] `react/prefer-readonly-props`
- [ ] `react/ban-component-props`
- [ ] `react/ban-components`
- [ ] `react/ban-html-props`
- [ ] `react/ban-svg-props`

#### Hooks rules

- [ ] `hooks/no-access-state-in-setstate`
- [ ] `hooks/no-suppressing-exhaustive-deps`
- [x] `hooks/ensure-custom-hooks-using-other-hooks`

#### Debug rules

- [x] `debug/class-component`
- [x] `debug/function-component`
- [x] `debug/hooks`
- [ ] `debug/render-prop`
- [ ] `debug/context`

## Philosophy

- **Focus on code rather than style**.
- **Linting errors are better than runtime crashes**.
- **Types are the fundamental unit of correctness**.

## Rule introduction or modification principles

1. **TypeScript first**. If a behavior can already be enforced by TypeScript built-in checker, don't reimplement it.
2. **Formatting independent**. Rules should check for correctness, not style. We recommend using style focused tools for formatting (e.g. [dprint](https://dprint.dev/) or [eslint-stylistic](https://github.com/eslint-stylistic/eslint-stylistic)).
3. **No Auto-fix**. Auto-fix is a great feature, but it's not always safe and reliable. We prefer to not to do auto-fix at all than to implement it in a way that can cause more problems than it solves.
4. **Sensible defaults**. Rules should be easy to setup and use with minimal configuration and sensible defaults.
5. **Rules over Options [[1]](./docs/rules-over-options.md)**. Each rule should have a single purpose. Make multiple rules work together to achieve more complex behaviors instead of adding options to a single rule.

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
