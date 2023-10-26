<p align="center"><img src="./assets/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

ESLint plugin for React and Preact function components with TypeScript, built from scratch (almost).

## Supported Engines

### Node.js

- 18.x LTS Hydrogen
- 20.x Current

### Bun

- 1.x

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

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
🚫 Configurations disabled in.\
🎨 Set in the `jsx` configuration.\
👍 Set in the `recommended` configuration.

### debug

| Name                                                                                     | Description                                               | 💼 | ⚠️                       | 🚫                    |
| :--------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :- | :---------------------- | :-------------------- |
| [debug/class-component](packages/eslint-plugin-debug/src/rules/class-component.md)       | reports all class components, including anonymous ones    |    | ![badge-debug-legacy][] | ![badge-off-legacy][] |
| [debug/function-component](packages/eslint-plugin-debug/src/rules/function-component.md) | reports all function components, including anonymous ones |    | ![badge-debug-legacy][] | ![badge-off-legacy][] |

### jsx

| Name                                                                                                           | Description                                                   | 💼                                                                                                                         | ⚠️                                                                                                                          | 🚫                    |
| :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :-------------------- |
| [jsx/no-array-index-key](packages/eslint-plugin-jsx/src/rules/no-array-index-key.md)                           | disallow using Array index as key                             | 🎨 👍 ![badge-all-legacy][] ![badge-jsx-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |                                                                                                                            | ![badge-off-legacy][] |
| [jsx/no-duplicate-key](packages/eslint-plugin-jsx/src/rules/no-duplicate-key.md)                               | disallow duplicate keys in `key` prop when rendering list     | 🎨 👍 ![badge-all-legacy][] ![badge-jsx-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |                                                                                                                            | ![badge-off-legacy][] |
| [jsx/no-leaked-conditional-rendering](packages/eslint-plugin-jsx/src/rules/no-leaked-conditional-rendering.md) | disallow problematic leaked values from being rendered        | 🎨 👍 ![badge-all-legacy][] ![badge-jsx-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |                                                                                                                            | ![badge-off-legacy][] |
| [jsx/no-missing-key](packages/eslint-plugin-jsx/src/rules/no-missing-key.md)                                   | require `key` prop when rendering list                        | 🎨 👍 ![badge-all-legacy][] ![badge-jsx-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |                                                                                                                            | ![badge-off-legacy][] |
| [jsx/no-misused-comment-in-textnode](packages/eslint-plugin-jsx/src/rules/no-misused-comment-in-textnode.md)   | disallow comments from being inserted as text nodes           |                                                                                                                            | 🎨 👍 ![badge-all-legacy][] ![badge-jsx-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] | ![badge-off-legacy][] |
| [jsx/no-script-url](packages/eslint-plugin-jsx/src/rules/no-script-url.md)                                     | disallow `javascript:` URLs as JSX event handler prop's value | 👍 ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][]                                                |                                                                                                                            |                       |
| [jsx/prefer-shorthand-boolean](packages/eslint-plugin-jsx/src/rules/prefer-shorthand-boolean.md)               | enforce boolean attributes notation in JSX                    |                                                                                                                            | 🎨 👍 ![badge-all-legacy][] ![badge-jsx-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] | ![badge-off-legacy][] |

### naming-convention

| Name                                                                                                             | Description                                        | 💼 | ⚠️                     | 🚫                    |
| :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- | :- | :-------------------- | :-------------------- |
| [naming-convention/filename](packages/eslint-plugin-naming-convention/src/rules/filename.md)                     | enforce naming convention for JSX file names       |    | ![badge-all-legacy][] | ![badge-off-legacy][] |
| [naming-convention/filename-extension](packages/eslint-plugin-naming-convention/src/rules/filename-extension.md) | enforces naming convention for JSX file extensions |    | ![badge-all-legacy][] | ![badge-off-legacy][] |

### react

| Name                                                                                                                                     | Description                                                                     | 💼                                                                                                | ⚠️  | 🚫                    |
| :--------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------ | :- | :-------------------- |
| [react/no-constructed-context-value](packages/eslint-plugin-react/src/rules/no-constructed-context-value.md)                             | disallows passing constructed values to context providers                       | 👍 ![badge-all-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |    | ![badge-off-legacy][] |
| [react/no-dangerously-set-innerhtml](packages/eslint-plugin-react/src/rules/no-dangerously-set-innerhtml.md)                             | disallow when a DOM element is using both children and dangerouslySetInnerHTML' | 👍 ![badge-all-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |    | ![badge-off-legacy][] |
| [react/no-dangerously-set-innerhtml-with-children](packages/eslint-plugin-react/src/rules/no-dangerously-set-innerhtml-with-children.md) | disallow when a DOM element is using both children and dangerouslySetInnerHTML' | 👍 ![badge-all-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |    | ![badge-off-legacy][] |
| [react/no-string-refs](packages/eslint-plugin-react/src/rules/no-string-refs.md)                                                         | disallow using deprecated string refs                                           | 👍 ![badge-all-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |    | ![badge-off-legacy][] |
| [react/no-unstable-default-props](packages/eslint-plugin-react/src/rules/no-unstable-default-props.md)                                   | disallow usage of unstable value as default param in function component         | 👍 ![badge-all-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |    | ![badge-off-legacy][] |
| [react/no-unstable-nested-components](packages/eslint-plugin-react/src/rules/no-unstable-nested-components.md)                           | disallow usage of unstable nested components                                    | 👍 ![badge-all-legacy][] ![badge-recommended-legacy][] ![badge-recommended-type-checked-legacy][] |    | ![badge-off-legacy][] |

<!-- end auto-generated rules list -->

## Rules status

### Work in progress

- [ ] `@eslint-react/hooks/no-access-state-in-setstate`
- [ ] `@eslint-react/hooks/no-suppressing-exhaustive-deps`
- [ ] `@eslint-react/jsx/enforce-component-name-pascal-case`
- [x] `@eslint-react/jsx/no-array-index-key`
- [ ] `@eslint-react/jsx/no-children-in-void-dom-elements`
- [x] `@eslint-react/jsx/no-duplicate-key`
- [x] `@eslint-react/jsx/no-leaked-conditional-rendering`
- [x] `@eslint-react/jsx/no-missing-key`
- [x] `@eslint-react/jsx/no-misused-comment-in-textnode`
- [ ] `@eslint-react/jsx/no-namespace`
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
- [ ] ...

### Planned (will be added in the future)

- [ ] `@eslint-react/jsx/no-complicated-conditional-rendering`
- [ ] `@eslint-react/hooks/ensure-custom-hooks-using-other-hooks`
- [ ] `@eslint-react/no-access-ref-current-during-rendering`
- [ ] `@eslint-react/no-legacy-children-methods`
- [ ] `@eslint-react/no-legacy-class-component`
- [ ] `@eslint-react/no-legacy-clone-element`
- [ ] `@eslint-react/no-legacy-createRef`
- [ ] `@eslint-react/rsc/...`
- [ ] ...

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
