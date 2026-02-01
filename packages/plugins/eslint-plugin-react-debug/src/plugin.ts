import type { CompatiblePlugin } from "@eslint-react/shared";

import { name, version } from "../package.json";

import classComponent from "./rules/class-component";
import functionComponent from "./rules/function-component";
import hook from "./rules/hook";
import isFromReact from "./rules/is-from-react";
import isFromRef from "./rules/is-from-ref";
import jsx from "./rules/jsx";

export const plugin: CompatiblePlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    ["class-component"]: classComponent,
    ["function-component"]: functionComponent,
    ["hook"]: hook,
    ["is-from-react"]: isFromReact,
    ["is-from-ref"]: isFromRef,
    ["jsx"]: jsx,
  },
};
