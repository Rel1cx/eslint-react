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

## Todo

- [x] `react-ts/jsx/prefer-shorthand-boolean`
- [x] `react-ts/jsx/no-leaked-conditional-rendering`
- [x] `react-ts/jsx/no-misused-comment-in-textnode`
- [ ] `react-ts/jsx/no-useless-fragment`
- [ ] `react-ts/jsx/no-missing-key-prop`
- [ ] `react-ts/jsx/no-array-index-key`
- [x] `react-ts/name-convention/event-handler`
- [x] `react-ts/name-convention/filename`
- [x] `react-ts/name-convention/filename-extension`
- [x] `react-ts/no-constructed-context-value`
- [x] `react-ts/no-danger-with-children`
- [x] `react-ts/no-deprecated-string-refs`
- [x] `react-ts/no-unstable-default-props`
- [ ] `react-ts/no-unstable-nested-components`
- [ ] `react-ts/no-direct-mutation-state`
- [ ] ...

## Planned (will be added in the future)

- [ ] `react-ts/jsx/no-complicated-conditional-rendering`
- [ ] `react-ts/no-access-ref-current-during-rendering`
- [ ] `react-ts/no-suppressing-exhaustive-deps`
- [ ] `react-ts/no-legacy-children-method`
- [ ] `react-ts/no-legacy-class-component`
- [ ] `react-ts/no-legacy-clone-element`
- [ ] `react-ts/no-legacy-createRef`
- [ ] ...

## Philosophy

- Focus on code rather than style.
- Linting errors are better than runtime crashes.
- Types are the fundamental unit of correctness.

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
