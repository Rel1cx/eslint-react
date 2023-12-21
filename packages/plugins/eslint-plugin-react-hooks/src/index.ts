// Workaround for @typescript-eslint/utils's TS2742 error.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import ensureCustomHooksUsingOtherHooks from "./rules/ensure-custom-hooks-using-other-hooks";
import ensureUseCallbackHasNonEmptyDeps from "./rules/ensure-use-callback-has-non-empty-deps";
import ensureUseMemoHasNonEmptyDeps from "./rules/ensure-use-memo-has-non-empty-deps";
import preferUseStateLazyInitialization from "./rules/prefer-use-state-lazy-initialization";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "ensure-custom-hooks-using-other-hooks": ensureCustomHooksUsingOtherHooks,
  "ensure-use-callback-has-non-empty-deps": ensureUseCallbackHasNonEmptyDeps,
  "ensure-use-memo-has-non-empty-deps": ensureUseMemoHasNonEmptyDeps,
  "prefer-use-state-lazy-initialization": preferUseStateLazyInitialization,
} as const;
