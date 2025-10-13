import type { CompatiblePlugin } from "@eslint-react/shared";

import { name, version } from "../package.json";

import noDirectSetStateInUseEffect from "./rules/no-direct-set-state-in-use-effect";

export const plugin: CompatiblePlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "no-direct-set-state-in-use-effect": noDirectSetStateInUseEffect,
  },
};
