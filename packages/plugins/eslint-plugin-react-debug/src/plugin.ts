import type { ESLint } from "eslint";

import { name, version } from "../package.json";
import classComponent from "./rules/class-component";
import functionComponent from "./rules/function-component";
import hook from "./rules/hook";
import isFromReact from "./rules/is-from-react";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "class-component": classComponent,
    "function-component": functionComponent,
    hook: hook,
    "is-from-react": isFromReact,

    // Part: deprecated rules
    /** @deprecated Use `hook` instead */
    "react-hooks": hook,
  },
  // remove this type assertion when the typescript-eslint and eslint type incompatible issue is resolved
} as unknown as ESLint.Plugin;
