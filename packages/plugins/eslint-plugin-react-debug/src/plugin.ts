import type { ESLint } from "eslint";

import { name, version } from "../package.json";

import classComponent from "./rules/class-component/class-component";
import functionComponent from "./rules/function-component/function-component";
import hook from "./rules/hook/hook";
import isFromReact from "./rules/is-from-react/is-from-react";
import isFromRef from "./rules/is-from-ref/is-from-ref";
import jsx from "./rules/jsx/jsx";

export const plugin = {
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
} as unknown as ESLint.Plugin;
