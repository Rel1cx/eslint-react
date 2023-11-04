// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import ensureCustomHooksUsingOtherHooks from "./rules/ensure-custom-hooks-using-other-hooks";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "ensure-custom-hooks-using-other-hooks": ensureCustomHooksUsingOtherHooks,
} as const;
