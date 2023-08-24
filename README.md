# eslint-plugin-react-ts

ESLint plugin to lint React TypeScript apps using the @typescript-eslint ecosystem.

> Note: This plugin is still in early development and is not ready for use.

## Supported Engines

### Node.js

- 16.x Maintenance
- 18.x LTS Hydrogen
- 20.x Current

### Bun (planned)

- 1.x

## Installation

```bash
# npm
npm install --save-dev eslint-plugin-react-ts

# or yarn
yarn add --dev eslint-plugin-react-ts

# or pnpm
pnpm add --save-dev eslint-plugin-react-ts
```

## Usage

### Legacy Config (.eslintrc, .eslintrc.json, etc.)

```json
{
  "plugins": ["react-ts"],
  "rules": {
    "react-ts/jsx-boolean-value": "error"
  }
}
```

### Flat Config (eslint.config.js) (requires eslint >= v8.23.0)

```js
import reactTs from "eslint-plugin-react-ts";

export default [
  {
    plugins: {
      reactTs,
    },
    rules: {
      "react-ts/jsx-boolean-value": "error",
    },
  },
];
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                                            | Description                                                                      |
| :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------- |
| [jsx-boolean-value](/docs/rules/jsx-boolean-value.md)                           | enforce boolean attributes notation in JSX                                       |
| [jsx-filename-naming-convention](/docs/rules/jsx-filename-naming-convention.md) | enforce naming convention for jsx files                                          |
| [jsx-filename-no-misuse-jsx](/docs/rules/jsx-filename-no-misuse-jsx.md)         | enforce using `.ts` instead of `.tsx` extension when there is no JSX in the file |
| [jsx-handler-names](/docs/rules/jsx-handler-names.md)                           | enforce event handler naming conventions in JSX                                  |

<!-- end auto-generated rules list -->

## Todo

- [x] react-ts/jsx-boolean-value
- [x] react-ts/jsx-handler-names
- [x] react-ts/jsx-filename-naming-convention
- [x] react-ts/jsx-filename-no-misuse-jsx
- [ ] react-ts/jsx-key
- [ ] react-ts/jsx-no-comment-textnodes
- [ ] react-ts/jsx-no-constructed-context-values
- [ ] react-ts/jsx-no-leaked-render
- [ ] react-ts/no-children-prop
- [ ] react-ts/no-danger-with-children
- [ ] react-ts/no-deprecated
- [ ] react-ts/no-direct-mutation-state
- [ ] react-ts/no-find-dom-node
- [ ] react-ts/no-is-mounted
- [ ] react-ts/no-object-type-as-default-prop
- [ ] react-ts/no-render-return-value
- [ ] react-ts/no-string-refs
- [ ] react-ts/no-unescaped-entities
- [ ] react-ts/no-unsafe
- [ ] react-ts/no-unstable-nested-components
- [ ] react-ts/react-in-jsx-scope
- [ ] react-ts/require-render-return
- [ ] ...

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
