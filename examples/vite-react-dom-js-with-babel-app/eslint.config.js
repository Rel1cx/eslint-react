import js from "@eslint/js";
import parser from "@babel/eslint-parser";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const GLOB_JS = ["*.{js,jsx,cjs,mjs}", "**/*.{js,jsx,cjs,mjs}"];
const GLOB_SRC = GLOB_JS.map((pattern) => `src/${pattern}`);

export default [
  js.configs.recommended,
  {
    files: GLOB_JS,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    },
  },
  {
    files: GLOB_SRC,
    ...react.configs.recommended,
  },
  {
    files: GLOB_SRC,
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: GLOB_SRC,
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      "eslint.config.js",
      "eslint.config.d.ts",
    ],
  },
];
