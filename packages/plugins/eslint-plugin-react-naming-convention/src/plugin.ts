import type { ESLint } from "eslint";

import { name, version } from "../package.json";

import contextName from "./rules/context-name/context-name";
import idName from "./rules/id-name/id-name";
import refName from "./rules/ref-name/ref-name";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    ["context-name"]: contextName,
    ["id-name"]: idName,
    ["ref-name"]: refName,
  },
} as unknown as ESLint.Plugin;
