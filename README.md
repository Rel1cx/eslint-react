# eslint-plugin-react-ts

ESLint plugin to lint TypeScript React function components using the @typescript-eslint ecosystem.

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
- [x] react-ts/no-leaked-jsx-conditional-rendering
- [x] react-ts/no-misused-comment-in-textnode
- [x] react-ts/no-misused-jsx-extension
- [ ] react-ts/no-unescaped-entities
- [x] react-ts/no-unstable-default-props
- [ ] react-ts/no-unstable-nested-components
- [ ] react-ts/prefer-destructuring-assignment
- [x] react-ts/prefer-shorthand-jsx-boolean
- [ ] react-ts/require-jsx-key
- [ ] ...

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
