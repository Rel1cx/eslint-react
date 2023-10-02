# eslint-plugin-react-ts

ESLint plugin to lint TypeScript React and Preact function components using the @typescript-eslint ecosystem.

> **Warning**
> This plugin is still in early development, and will likely change significantly before reaching a stable version.

## Supported Engines

### Node.js

- 18.x LTS Hydrogen
- 20.x Current

### Bun

- 1.x

## Installation

```bash
# npm
npm install --save-dev eslint-plugin-react-ts

# pnpm
pnpm add --save-dev eslint-plugin-react-ts

# yarn
yarn add --dev eslint-plugin-react-ts

# bun
bun add --dev eslint-plugin-react-ts
```

## Usage

### [`.eslintrc`](https://eslint.org/docs/latest/use/configure/configuration-files)

```json
{
    "extends": [
        "plugin:react-ts/recommended"
    ],
    "rules": {
        "react-ts/<rule-name>": "error"
    }
}
```

### [`eslint.config.js`](https://eslint.org/docs/latest/use/configure/configuration-files-new) (requires eslint >= v8.23.0)

```js
import reactTsRecommended from "eslint-plugin-react-ts/configs/recommended";

export default [
    reactTsRecommended,
    {
        rules: {
            "react-ts/<rule-name>": "error",
            // ...
        },
    },
];
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
☑️ Set in the `recommended` configuration.

| Name                                                                                                   | Description                                                                         | 💼                                    | ⚠️                                     |
| :----------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- | :------------------------------------ | :------------------------------------ |
| [debug/function-component](docs/rules/debug/function-component.md)                                     | reports all function components, including anonymous ones                           |                                       |                                       |
| [jsx/no-leaked-conditional-rendering](docs/rules/jsx/no-leaked-conditional-rendering.md)               | disallow problematic leaked values from being rendered                              | ☑️ ![badge-recommended-type-checked][] |                                       |
| [jsx/no-misused-comment-in-textnode](docs/rules/jsx/no-misused-comment-in-textnode.md)                 | disallow comments from being inserted as text nodes                                 |                                       | ☑️ ![badge-recommended-type-checked][] |
| [jsx/prefer-shorthand-boolean](docs/rules/jsx/prefer-shorthand-boolean.md)                             | enforce boolean attributes notation in JSX                                          |                                       | ☑️ ![badge-recommended-type-checked][] |
| [naming-convention/event-handler](docs/rules/naming-convention/event-handler.md)                       | enforce event handler naming conventions in JSX                                     |                                       |                                       |
| [naming-convention/filename](docs/rules/naming-convention/filename.md)                                 | enforce naming convention for jsx files                                             |                                       |                                       |
| [naming-convention/filename-extension](docs/rules/naming-convention/filename-extension.md)             | enforce using `.ts` instead of `.tsx` extension when there is no JSX in the file    |                                       |                                       |
| [no-constructed-context-value](docs/rules/no-constructed-context-value.md)                             | disallows passing constructed values to context providers                           | ☑️ ![badge-recommended-type-checked][] |                                       |
| [no-dangerously-set-innerhtml](docs/rules/no-dangerously-set-innerhtml.md)                             | disallow when a DOM element is using both children and dangerouslySetInnerHTML'     | ☑️ ![badge-recommended-type-checked][] |                                       |
| [no-dangerously-set-innerhtml-with-children](docs/rules/no-dangerously-set-innerhtml-with-children.md) | disallow when a DOM element is using both children and dangerouslySetInnerHTML'     | ☑️ ![badge-recommended-type-checked][] |                                       |
| [no-deprecated-string-refs](docs/rules/no-deprecated-string-refs.md)                                   | disallow using deprecated string refs                                               | ☑️ ![badge-recommended-type-checked][] |                                       |
| [no-unstable-default-props](docs/rules/no-unstable-default-props.md)                                   | disallow usage of referential-type variables as default param in function component | ☑️ ![badge-recommended-type-checked][] |                                       |

<!-- end auto-generated rules list -->

## Work in progress

- [x] `react-ts/jsx/prefer-shorthand-boolean`
- [x] `react-ts/jsx/no-leaked-conditional-rendering`
- [x] `react-ts/jsx/no-misused-comment-in-textnode`
- [ ] `react-ts/jsx/no-useless-fragment`
- [ ] `react-ts/jsx/no-missing-key-prop`
- [ ] `react-ts/jsx/no-array-index-key`
- [x] `react-ts/naming-convention/event-handler`
- [x] `react-ts/naming-convention/filename`
- [x] `react-ts/naming-convention/filename-extension`
- [x] `react-ts/no-constructed-context-value`
- [x] `react-ts/no-dangerously-set-innerhtml`
- [x] `react-ts/no-dangerously-set-innerhtml-with-children`
- [x] `react-ts/no-deprecated-string-refs`
- [x] `react-ts/no-unstable-default-props`
- [ ] `react-ts/no-unstable-nested-components`
- [ ] `react-ts/no-missing-display-name`
- [ ] `react-ts/no-direct-mutation-state`
- [ ] ...

## Planned (will be added in the future)

- [ ] `react-ts/jsx/no-complicated-conditional-rendering`
- [ ] `react-ts/hooks/no-suppressing-exhaustive-deps`
- [ ] `react-ts/no-access-ref-current-during-rendering`
- [ ] `react-ts/no-legacy-children-methods`
- [ ] `react-ts/no-legacy-class-components`
- [ ] `react-ts/no-legacy-clone-element`
- [ ] `react-ts/no-legacy-createRef`
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

## THIRD-PARTY-LICENSE

This project uses code from following third-party projects:

- eslint-plugin-perfectionist (MIT)
- eslint-plugin-react (MIT)
- eslint-plugin-solid (MIT)
- @tanstack/eslint-plugin-query (MIT)
- eslint-plugin-filenames-simple (MIT)
- eslint-plugin-functional (MIT)

Licenses are list in [THIRD-PARTY-LICENSE](THIRD-PARTY-LICENSE)
