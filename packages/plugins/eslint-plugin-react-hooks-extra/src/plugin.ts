import type { CompatiblePlugin } from "@eslint-react/shared";

import { name, version } from "../package.json";

import exhaustiveDeps from "./rules/exhaustive-deps";
import noDirectSetStateInUseEffect from "./rules/no-direct-set-state-in-use-effect";
import rulesOfHooks from "./rules/rules-of-hooks";

export const plugin: CompatiblePlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "exhaustive-deps": exhaustiveDeps,
    "no-direct-set-state-in-use-effect": noDirectSetStateInUseEffect,
    "rules-of-hooks": rulesOfHooks,
  },
};
