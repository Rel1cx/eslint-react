import { name, version } from "../package.json";
import classComponent from "./rules/class-component";
import functionComponent from "./rules/function-component";
import hook from "./rules/hook";
import isFromReact from "./rules/is-from-react";
import jsx from "./rules/jsx";

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
    ["jsx"]: jsx,

    // Part: deprecated rules
    /** @deprecated Use `hook` instead */
    "react-hooks": hook,
  },
} as const;
