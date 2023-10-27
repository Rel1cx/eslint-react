// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import debugClassComponent from "./rules/class-component";
import debugFunctionComponent from "./rules/function-component";
import hooks from "./rules/hooks";

export { name } from "../package.json";

export const rules = {
  "class-component": debugClassComponent,
  "function-component": debugFunctionComponent,
  hooks,
} as const;
