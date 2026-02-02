import type { CompatiblePlugin } from "@eslint-react/shared";

import { name, version } from "../package.json";

import functionDefinition from "./rules/function-definition";

export const plugin: CompatiblePlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "function-definition": functionDefinition,
  },
};
