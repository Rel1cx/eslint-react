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
- [x] react-ts/no-unstable-default-props
- [ ] react-ts/no-unstable-nested-components
- [ ] react-ts/no-direct-mutation-state
- [ ] react-ts/prefer-destructuring-assignment
- [x] react-ts/prefer-shorthand-jsx-boolean
- [ ] react-ts/require-jsx-key
- [ ] react-ts/no-array-index-jsx-key
- [ ] ...

## Planned (will be added in the future)

- [ ] react-ts/no-access-ref-current-during-rendering
- [ ] react-ts/no-calling-memoized-function-outside-component
- [ ] react-ts/no-suppressing-exhaustive-deps
- [ ] react-ts/no-complicated-jsx-key
- [ ] react-ts/no-complicated-jsx-expression
- [ ] react-ts/no-complicated-conditional-rendering
- [ ] react-ts/no-legacy-children-method
- [ ] react-ts/no-legacy-class-component
- [ ] react-ts/no-legacy-clone-element
- [ ] react-ts/no-legacy-createRef
- [ ] ...

## Philosophy

- **Focus on code rather than style.**
- **Linting errors are better than runtime crashes.**
- **Types are the fundamental unit of correctness.**

## Rule introduction or modification guidelines

1. If a behavior can already be enforced by TypeScript built-in checker, it should not be implemented in the plugin.
2. Rules should not be concerned with style or formatting; leave that to the formatter.
3. Each rule should have a single, well-defined purpose that can be described in one sentence, ideally serving as its name.
4. Rules should be easy to set up and use, with minimal configuration.

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
