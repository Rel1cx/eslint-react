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

### [`.eslintrc`](https://eslint.org/docs/latest/use/configure/configuration-files)

```json
{
    "extends": [
        "plugin:@eslint-react/recommended"
    ],
    "rules": {
        "@eslint-react/<rule-name>": "error"
    }
}
```

### [`eslint.config.js`](https://eslint.org/docs/latest/use/configure/configuration-files-new) (requires eslint >= v8.23.0)

```js
import reactTsRecommended from "@eslint-react/eslint-plugin/configs/recommended";

export default [
    reactTsRecommended,
    {
        rules: {
            "@eslint-react/<rule-name>": "error",
            // ...
        },
    },
];
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
🎨 Set in the `jsx` configuration.\
👍 Set in the `recommended` configuration.

### debug

| Name                                                                                      | Description                                               | 💼 | ⚠️  |
| :---------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :- | :- |
| [debug/class-component](packages/eslint-plugin/docs/rules/debug/class-component.md)       | reports all class components, including anonymous ones    |    |    |
| [debug/function-component](packages/eslint-plugin/docs/rules/debug/function-component.md) | reports all function components, including anonymous ones |    |    |

### jsx

| Name                                                                                                            | Description                                               | 💼    | ⚠️     |
| :-------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :---- | :---- |
| [jsx/no-array-index-key](packages/eslint-plugin/docs/rules/jsx/no-array-index-key.md)                           | disallow using Array index as key                         | 🎨 👍 |       |
| [jsx/no-duplicate-key](packages/eslint-plugin/docs/rules/jsx/no-duplicate-key.md)                               | disallow duplicate keys in `key` prop when rendering list | 🎨 👍 |       |
| [jsx/no-leaked-conditional-rendering](packages/eslint-plugin/docs/rules/jsx/no-leaked-conditional-rendering.md) | disallow problematic leaked values from being rendered    | 🎨 👍 |       |
| [jsx/no-missing-key](packages/eslint-plugin/docs/rules/jsx/no-missing-key.md)                                   | require `key` prop when rendering list                    | 🎨 👍 |       |
| [jsx/no-misused-comment-in-textnode](packages/eslint-plugin/docs/rules/jsx/no-misused-comment-in-textnode.md)   | disallow comments from being inserted as text nodes       |       | 🎨 👍 |
| [jsx/prefer-shorthand-boolean](packages/eslint-plugin/docs/rules/jsx/prefer-shorthand-boolean.md)               | enforce boolean attributes notation in JSX                |       | 🎨 👍 |

### naming-convention

| Name                                                                                                              | Description                                   | 💼 | ⚠️  |
| :---------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- | :- | :- |
| [naming-convention/filename](packages/eslint-plugin/docs/rules/naming-convention/filename.md)                     | enforce naming convention for jsx files       |    |    |
| [naming-convention/filename-extension](packages/eslint-plugin/docs/rules/naming-convention/filename-extension.md) | enforces consistent file naming for JSX files |    |    |

### react

| Name                                                                                                                          | Description                                                                     | 💼 | ⚠️  |
| :---------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :- | :- |
| [no-constructed-context-value](packages/eslint-plugin/docs/rules/no-constructed-context-value.md)                             | disallows passing constructed values to context providers                       | 👍 |    |
| [no-dangerously-set-innerhtml](packages/eslint-plugin/docs/rules/no-dangerously-set-innerhtml.md)                             | disallow when a DOM element is using both children and dangerouslySetInnerHTML' | 👍 |    |
| [no-dangerously-set-innerhtml-with-children](packages/eslint-plugin/docs/rules/no-dangerously-set-innerhtml-with-children.md) | disallow when a DOM element is using both children and dangerouslySetInnerHTML' | 👍 |    |
| [no-deprecated-string-refs](packages/eslint-plugin/docs/rules/no-deprecated-string-refs.md)                                   | disallow using deprecated string refs                                           | 👍 |    |
| [no-unstable-default-props](packages/eslint-plugin/docs/rules/no-unstable-default-props.md)                                   | disallow usage of unstable value as default param in function component         | 👍 |    |
| [no-unstable-nested-components](packages/eslint-plugin/docs/rules/no-unstable-nested-components.md)                           | disallow usage of unstable nested components                                    | 👍 |    |

<!-- end auto-generated rules list -->

## Rules status

### Work in progress

- [x] `@eslint-react/jsx/prefer-shorthand-boolean`
- [x] `@eslint-react/jsx/no-leaked-conditional-rendering`
- [x] `@eslint-react/jsx/no-misused-comment-in-textnode`
- [ ] `@eslint-react/jsx/no-useless-fragment`
- [x] `@eslint-react/jsx/no-missing-key`
- [x] `@eslint-react/jsx/no-duplicate-key`
- [x] `@eslint-react/jsx/no-array-index-key`
- [x] `@eslint-react/naming-convention/filename`
- [x] `@eslint-react/naming-convention/filename-extension`
- [x] `@eslint-react/no-constructed-context-value`
- [x] `@eslint-react/no-dangerously-set-innerhtml`
- [x] `@eslint-react/no-dangerously-set-innerhtml-with-children`
- [x] `@eslint-react/no-deprecated-string-refs`
- [x] `@eslint-react/no-unstable-default-props`
- [x] `@eslint-react/no-unstable-nested-components`
- [ ] `@eslint-react/no-missing-display-name`
- [ ] `@eslint-react/no-direct-mutation-state`
- [x] `@eslint-react/debug/class-component`
- [x] `@eslint-react/debug/function-component`
- [ ] `@eslint-react/debug/render-prop`
- [ ] `@eslint-react/debug/context`
- [ ] ...

### Planned (will be added in the future)

- [ ] `@eslint-react/jsx/no-complicated-conditional-rendering`
- [ ] `@eslint-react/hooks/no-suppressing-exhaustive-deps`
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
