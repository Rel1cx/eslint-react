// Workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import classComponent from "./rules/class-component";
import functionComponent from "./rules/function-component";
import reactHooks from "./rules/react-hooks";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "class-component": classComponent,
  "function-component": functionComponent,
  "react-hooks": reactHooks,
} as const;
