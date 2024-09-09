import { name, version } from "../package.json";
import classComponent from "./rules/class-component";
import functionComponent from "./rules/function-component";
import hook from "./rules/hook";
import isFromReact from "./rules/is-from-react";

export default {
  meta: {
    name,
    version,
  },
  rules: {
    "class-component": classComponent,
    "function-component": functionComponent,
    hook: hook,
    "is-from-react": isFromReact,
    // Deprecated rules
    /** @deprecated Use `hook` rule instead */
    "react-hooks": hook,
  },
} as const;
