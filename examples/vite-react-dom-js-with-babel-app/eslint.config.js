import js from "@eslint/js";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import parser from "@babel/eslint-parser";
import globals from "globals";

import JSCONFIG from "./jsconfig.json" with { type: "json" };
import JSCONFIG_NODE from "./jsconfig.node.json" with { type: "json" };

export default [
  {
    files: JSCONFIG.include,
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
    files: JSCONFIG.include,
    ...react.configs.recommended,
  },
  {
    files: JSCONFIG.include,
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: JSCONFIG.include,
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: JSCONFIG_NODE.include,
    ignores: JSCONFIG_NODE.exclude,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": "off",
    },
  },
];
