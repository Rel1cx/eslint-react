# eslint-plugin-react-ts

ESLint plugin to lint TypeScript React function components using the @typescript-eslint ecosystem.

> **Warning**
> This plugin is still in early development, and will likely change significantly before reaching a stable version.

## Supported Engines

### Node.js

- 18.x LTS Hydrogen
- 20.x Current

### Bun (planned)

- 1.x

## Installation

```bash
# pnpm
pnpm add --save-dev eslint-plugin-react-ts

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
        "react-ts/enforce-filename-naming-convention": "error"
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
            "react-ts/enforce-filename-naming-convention": "error",
            // ...
        },
    },
];
```

## Todo

- [x] react-ts/enforce-event-handler-naming-convention
- [x] react-ts/enforce-filename-naming-convention
- [x] react-ts/no-constructed-context-value
- [x] react-ts/no-danger-with-children
- [x] react-ts/no-deprecated-string-refs
- [ ] react-ts/no-leaked-jsx-conditional-rendering
- [ ] react-ts/no-misused-comment-in-textnode
- [x] react-ts/no-misused-jsx-extension
- [ ] react-ts/no-unescaped-entities
- [x] react-ts/no-unstable-default-props
- [ ] react-ts/no-unstable-nested-components
- [ ] react-ts/prefer-destructuring-assignment
- [x] react-ts/prefer-shorthand-jsx-boolean
- [ ] react-ts/require-jsx-key
- [ ] ...

## Implemented Rules

<!-- begin auto-generated rules list -->

| Name                                                                                                                                                        | Description                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| [debug-function-component](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules/debug-function-component.md)                               | debug report all function components                                                |
| [enforce-event-handler-naming-convention](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules/enforce-event-handler-naming-convention.md) | enforce event handler naming conventions in JSX                                     |
| [enforce-filename-naming-convention](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules/enforce-filename-naming-convention.md)           | enforce naming convention for jsx files                                             |
| [no-constructed-context-value](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules/no-constructed-context-value.md)                       | disallows passing constructed values to context providers                           |
| [no-danger-with-children](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules/no-danger-with-children.md)                                 | disallow when a DOM element is using both children and dangerouslySetInnerHTML'     |
| [no-deprecated-string-refs](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules/no-deprecated-string-refs.md)                             | disallow using deprecated string refs                                               |
| [no-misused-jsx-extension](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules/no-misused-jsx-extension.md)                               | enforce using `.ts` instead of `.tsx` extension when there is no JSX in the file    |
| [no-unstable-default-props](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules/no-unstable-default-props.md)                             | disallow usage of referential-type variables as default param in function component |
| [prefer-shorthand-jsx-boolean](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules/prefer-shorthand-jsx-boolean.md)                       | enforce boolean attributes notation in JSX                                          |

<!-- end auto-generated rules list -->

## Philosophy

- **Linting errors are better than runtime crashes.**
- **Focus on code rather than style.**
- **Types are the fundamental unit of correctness.**

## Rule introduction or modification guidelines

- **TypeScript first** - If a behavior can already be enforced by TypeScript built-in checker, it should not be implemented in the plugin.
- **Formatting independent** - Rules should not be concerned with code style or formatting; leave that to the formatter.
- **One rule, one purpose** - Each rule should have a single, well-defined purpose that can be described in one sentence, ideally serving as its name, and it's options should be as minimal as possible, preferably none.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## THIRD-PARTY-LICENSE

This project uses code from following third-party projects:

- eslint-plugin-perfectionist (MIT)
- eslint-plugin-react (MIT)
- eslint-plugin-solid (MIT)
- @tanstack/eslint-plugin-query (MIT)
- eslint-plugin-filenames-simple (MIT)

Licenses are list in [THIRD-PARTY-LICENSE](THIRD-PARTY-LICENSE)
