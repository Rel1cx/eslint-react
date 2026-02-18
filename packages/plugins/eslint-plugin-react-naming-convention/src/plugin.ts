import type { CompatiblePlugin } from "@eslint-react/shared";

import { name, version } from "../package.json";

import componentName from "./rules/component-name";
import contextName from "./rules/context-name";
import idName from "./rules/id-name";
import refName from "./rules/ref-name";
import useState from "./rules/use-state";

export const plugin: CompatiblePlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    ["component-name"]: componentName,
    ["context-name"]: contextName,
    ["id-name"]: idName,
    ["ref-name"]: refName,
    ["use-state"]: useState,
  },
};
