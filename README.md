<p align="center"><img src="./assets/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

[![Version](https://img.shields.io/npm/v/@eslint-react/eslint-plugin?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)
[![Size](https://img.shields.io/bundlephobia/minzip/@eslint-react/eslint-plugin?label=gzip&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/@eslint-react/eslint-plugin)
[![Downloads](https://img.shields.io/npm/dt/@eslint-react/eslint-plugin.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)

A series of composable ESLint rules for libraries and frameworks that use React as a UI runtime.

## Roadmap

- [Milestone 1.5 ↗](https://eslint-react.xyz/roadmap#milestone-15)
- [Milestone 2.0 ↗](https://eslint-react.xyz/roadmap#milestone-20)
- [Milestone 2.5 ↗](https://eslint-react.xyz/roadmap#milestone-25-draft)

## Features

- **Universal** rules for libraries and frameworks that use React as a UI runtime.
- **Well designed** rule behaviors and sensible defaults.
- **Maximum flexibility** through minimum configuration options.

## Public packages

### All-in-one packages

- [`@eslint-react/eslint-plugin`](https://npm.im/@eslint-react/eslint-plugin) - The main ESLint plugin package including all rules and config presets in this repository.

### Individual packages (will be available in 2.0)

- `eslint-plugin-react-core` - Core rules (DOM Irrelevant, Render Target Agnostic, Formatting Independent).
- `eslint-plugin-react-dom` - DOM specific rules for React DOM.
- `eslint-plugin-react-hooks-extra` - Extra React Hooks rules.
- `eslint-plugin-react-naming-convention` - Naming convention rules.

## Supported React versions

- 18.2.0 or later

## Supported engines

### Node.js

- 18.18.0 or later

### Bun

- 1.0.15 or later

### Install

```sh
# npm
npm install --save-dev @eslint-react/eslint-plugin
```

### Setup

Add `@eslint-react` to the plugins section of your `.eslintrc.js` configuration file.

```js
module.exports = {
  // ...
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@eslint-react/recommended-legacy"],
  plugins: ["@eslint-react"],
  // ...
};
```

[Full Installation Guide ↗](https://eslint-react.xyz/docs/installation)

## Presets

### LegacyConfig presets

> [!IMPORTANT]\
> These presets are for ESLint `LegacyConfig` (`.eslintrc.*`) only

- **recommended-legacy** (`plugin:@eslint-react/recommended-legacy`)\
  Enable rules that are recommended by ESLint React.
- **recommended-type-checked-legacy** (`plugin:@eslint-react/recommended-type-checked-legacy`)\
  Enable rules that are recommended by ESLint React with additional rules that require type information.
- **all-legacy** (`plugin:@eslint-react/all-legacy`)\
  Enable all rules in this plugin except for debug rules.
- **off-legacy** (`plugin:@eslint-react/off-legacy`)\
  Disable all rules in this plugin except for debug rules.

### FlatConfig presets

> [!IMPORTANT]\
> These presets are for ESLint `FlatConfig` (`eslint.config.js`) only

- **recommended**\
  Enable rules that are recommended by ESLint React.
- **recommended-type-checked**\
  Enable rules that are recommended by ESLint React with additional rules that require type information.
- **all**\
  Enable all rules in this plugin except for debug rules.
- **off**\
  Disable all rules in this plugin except for debug rules.

[Full Presets List↗](https://eslint-react.xyz/presets/overview)

## Rules

[Rules Overview ↗](https://eslint-react.xyz/rules/overview)

## Contributing

Before you start working on something, it's best to check if there is an existing issue first. It's also a good idea to reach the maintainer and confirm if it makes sense or if someone else is already working on it.

Please make sure to read the [Contributing Guide](./.github/CONTRIBUTING.md) before making a pull request.

Thank you to everyone contributing to ESLint React!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid)
- [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
- [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple)
- [rome/tools](https://github.com/rome/tools)
- [rust-clippy](https://github.com/rust-lang/rust-clippy)

## Prior art

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
