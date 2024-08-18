# eslint-plugin-react-web-api

ESLint React's ESLint plugin for React to interact with Web APIs.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-web-api
```

## Setup

Add the plugin to your `eslint.config.js`:

```js
// @ts-check

import js from "@eslint/js";
import reactWebAPI from "eslint-plugin-react-web-api";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: [
      "react-web-api": reactWebAPI,
      rules: {
        // react-web-api recommended rules
        "react-web-api/no-leaked-event-listener": "error",
      }
    ],
  },
];
```

## Rules

| Rule                       | Description                                                                                                        | 💼  | 💭  |     |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :-: | :-: | :-: |
| `no-leaked-event-listener` | Ensure that every 'addEventListener' in a React component or custom hook has a corresponding 'removeEventListener' |  ✔️  |     |     |
