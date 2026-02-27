import type { ESLint } from "eslint";

import { name, version } from "../package.json";

import functionDefinition from "./rules/function-definition/function-definition";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "function-definition": functionDefinition,
  },
} as unknown as ESLint.Plugin;
