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

## Todo

### Rules

- [ ] react-ts/jsx-key
- [ ] react-ts/jsx-uses-react
- [x] react-ts/jsx-boolean-value
- [x] react-ts/jsx-handler-names
- [ ] react-ts/jsx-no-comment-textnodes
- [ ] react-ts/jsx-no-leaked-render
- [ ] react-ts/no-children-prop
- [ ] react-ts/no-danger-with-children
- [ ] react-ts/no-direct-mutation-state
- [ ] react-ts/no-is-mounted
- [ ] react-ts/no-render-return-value
- [ ] react-ts/no-string-refs
- [ ] react-ts/no-unescaped-entities
- [ ] react-ts/no-unknown-property
- [ ] react-ts/no-unsafe
- [ ] react-ts/require-render-return
- [ ] ...

### Fixers

- [ ] react-ts/jsx-key
- [ ] react-ts/jsx-uses-react
- [ ] react-ts/jsx-boolean-value
- [ ] react-ts/jsx-handler-names
- [ ] react-ts/jsx-no-comment-textnodes
- [ ] react-ts/jsx-no-leaked-render
- [ ] react-ts/no-children-prop
- [ ] react-ts/no-danger-with-children
- [ ] react-ts/no-direct-mutation-state
- [ ] react-ts/no-is-mounted
- [ ] react-ts/no-render-return-value
- [ ] react-ts/no-string-refs
- [ ] react-ts/no-unescaped-entities
- [ ] react-ts/no-unknown-property
- [ ] react-ts/no-unsafe
- [ ] react-ts/require-render-return
- [ ] ...

### Tests

- [ ] react-ts/jsx-key
- [ ] react-ts/jsx-uses-react
- [x] react-ts/jsx-boolean-value
- [x] react-ts/jsx-handler-names
- [ ] react-ts/jsx-no-comment-textnodes
- [ ] react-ts/jsx-no-leaked-render
- [ ] react-ts/no-children-prop
- [ ] react-ts/no-danger-with-children
- [ ] react-ts/no-direct-mutation-state
- [ ] react-ts/no-is-mounted
- [ ] react-ts/no-render-return-value
- [ ] react-ts/no-string-refs
- [ ] react-ts/no-unescaped-entities
- [ ] react-ts/no-unknown-property
- [ ] react-ts/no-unsafe
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

Licenses are list in [THIRD-PARTY-LICENSE](THIRD-PARTY-LICENSE)
