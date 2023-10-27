// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import ensureCustomHooksUsingOtherHooks from "./rules/ensure-custom-hooks-using-other-hooks";

export { name } from "../package.json";

export const rules = {
    "ensure-custom-hooks-using-other-hooks": ensureCustomHooksUsingOtherHooks,
} as const;
