# eslint-plugin-react-ts

ESLint plugin to lint React TypeScript apps using the @typescript-eslint ecosystem.

> Note: This plugin is still in early development and is not ready for use.

## Supported Engines

### Node.js

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
    "react-ts/prefer-shorthand-attribute": "error"
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
      "react-ts/prefer-shorthand-attribute": "error",
    },
  },
];
```

## Todo

- [x] react-ts/consistent-jsx-filenames
- [x] react-ts/consistent-jsx-handler-names
- [ ] react-ts/no-constructed-context-value
- [ ] react-ts/no-danger-with-children
- [ ] react-ts/no-deprecated
- [ ] react-ts/no-leaked-jsx-conditional-rendering
- [ ] react-ts/no-misused-comment-in-textnode
- [x] react-ts/no-misused-jsx-extension
- [ ] react-ts/no-string-refs
- [ ] react-ts/no-unescaped-entities
- [ ] react-ts/no-unstable-default-props
- [ ] react-ts/no-unstable-nested-components
- [x] react-ts/prefer-shorthand-jsx-boolean
- [ ] react-ts/require-jsx-key
- [ ] ...

## Implemented Rules

<!-- begin auto-generated rules list -->

| Name                                                                        | Description                                                                      |
| :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| [consistent-jsx-filenames](/docs/rules/consistent-jsx-filenames.md)         | enforce naming convention for jsx files                                          |
| [consistent-jsx-handler-names](/docs/rules/consistent-jsx-handler-names.md) | enforce event handler naming conventions in JSX                                  |
| [no-misused-jsx-extension](/docs/rules/no-misused-jsx-extension.md)         | enforce using `.ts` instead of `.tsx` extension when there is no JSX in the file |
| [prefer-shorthand-jsx-boolean](/docs/rules/prefer-shorthand-jsx-boolean.md) | enforce boolean attributes notation in JSX                                       |

<!-- end auto-generated rules list -->

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
