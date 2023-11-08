// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import classComponent from "./rules/class-component";
import functionComponent from "./rules/function-component";
import hooks from "./rules/hooks";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "class-component": classComponent,
  "function-component": functionComponent,
  hooks,
} as const;
