# eslint-plugin-react-ts

Note: This plugin is still in development. It is not recommended to use it on a large scale for the time being.

## Todo

### Rules

- [ ] react-ts/jsx-key
- [ ] react-ts/jsx-uses-react
- [x] react-ts/jsx-boolean-value
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
