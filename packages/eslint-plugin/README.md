<p align="center"><img src="https://eslint-react.rel1cx.io/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint x React</h1>

A set of ESLint rules to catch common mistakes and improve your React code.

## Supported engines

### Node.js

- 18.x LTS Hydrogen
- 20.x Current

### Bun

- 1.0.15 or later

## Installation

This plugin requires typescript and @typescript-eslint/parser as peer dependencies. Install them if you haven't already.

```sh
# npm
npm install --save-dev typescript @typescript-eslint/parser

# yarn
yarn add --dev typescript @typescript-eslint/parser

# pnpm
pnpm add --save-dev typescript @typescript-eslint/parser

# bun
bun add --dev typescript @typescript-eslint/parser
```

Then install the plugin.

```sh
# npm
npm install --save-dev @eslint-react/eslint-plugin

# yarn
yarn add --dev @eslint-react/eslint-plugin

# pnpm
pnpm add --save-dev @eslint-react/eslint-plugin

# bun
bun add --dev @eslint-react/eslint-plugin
```

## Usage

Add `@eslint-react` to the plugins section of your `.eslintrc.js` configuration file.

```js
module.exports = {
  // ...
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@eslint-react/recommended"],
  plugins: ["@eslint-react"],
  // ...
};
```

## Presets

[Presets ↗](https://eslint-react.rel1cx.io/docs/presets)

## Rules

[Rules ↗](https://eslint-react.rel1cx.io/rules/overview)

## Philosophy

- **Do what a linter should do**
- **Focus on code rather than style**
- **Rules are better than options**

## Rule introduction or modification principles

1. **No Auto-fix**. Auto-fix is a great feature, but it's not always safe and reliable. We prefer to not to do auto-fix at all than to implement it in a way that can cause more problems than it solves.
2. **Formatting independent**. Rules should check for correctness, not style. We recommend using style focused tools for formatting (e.g. [dprint](https://dprint.dev/)).
3. **Rules over options [[1]](https://eslint-react.rel1cx.io/docs/rules-over-options)**. Each rule should have a single purpose. Make multiple rules work together to achieve more complex behaviors instead of adding options to a single rule.
4. **Sensible defaults**. Rules should be easy to setup and use with minimal configuration and sensible defaults.

## Contributing

Before you start working on something, it's best to check if there is an existing issue first. It's also a good idea to reach the maintainer and confirm if it makes sense or if someone else is already working on it.

Please make sure to read the [Contributing Guide](./.github/CONTRIBUTING.md) before making a pull request.

Pull requests submitted without prior discussion can also be rejected without prior discussion.

Thank you to everyone contributing to ESLint x React!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid)
- [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple)
- [@tanstack/eslint-plugin-query](https://github.com/TanStack/query/tree/main/packages/eslint-plugin-query)
- [rome/tools](https://github.com/rome/tools)
- [rust-clippy](https://github.com/rust-lang/rust-clippy)

## Prior art

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
