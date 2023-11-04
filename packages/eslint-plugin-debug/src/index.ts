// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import debugClassComponent from "./rules/class-component";
import debugFunctionComponent from "./rules/function-component";
import hooks from "./rules/hooks";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "class-component": debugClassComponent,
  "function-component": debugFunctionComponent,
  hooks,
} as const;
