# eslint-plugin-react-naming-convention

Naming convention rules.

> [!TIP]
> This plugin is already included in `@eslint-react/eslint-plugin`. You don't need to install it separately if you are using `@eslint-react/eslint-plugin`.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-naming-convention
```

## Setup

Add the plugin to your `eslint.config.js`:

```js
// @ts-check

import js from "@eslint/js";
import reactNamingConvention from "eslint-plugin-react-naming-convention";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: [
      "react-naming-convention": reactNamingConvention,
      rules: {
        // react-naming-convention recommended rules
        "naming-convention/filename-extension": ["warn", "as-needed"],
        "naming-convention/use-state": "warn",
      }
    ],
  },
];
```

## Rules

| Rule               | Description                                                                                | 💼  | 💭  | ❌  |
| :----------------- | :----------------------------------------------------------------------------------------- | :-: | :-: | :-: |
| component-name     | Enforces naming conventions for components.                                                | 📖  |     |     |
| filename           | Enforces naming convention for JSX files.                                                  | 📖  |     |     |
| filename-extension | Enforces consistent use of the JSX file extension.                                         | 📖  |     |     |
| use-state          | Enforces destructuring and symmetric naming of `useState` hook value and setter variables. | 📖  |     |     |
