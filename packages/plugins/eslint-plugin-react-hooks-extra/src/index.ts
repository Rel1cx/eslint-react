import { name, version } from "../package.json";
import ensureCustomHooksUsingOtherHooks from "./rules/ensure-custom-hooks-using-other-hooks";
import ensureUseCallbackHasNonEmptyDeps from "./rules/ensure-use-callback-has-non-empty-deps";
import ensureUseMemoHasNonEmptyDeps from "./rules/ensure-use-memo-has-non-empty-deps";
import noDirectSetStateInUseEffect from "./rules/no-direct-set-state-in-use-effect";
import preferUseStateLazyInitialization from "./rules/prefer-use-state-lazy-initialization";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "ensure-custom-hooks-using-other-hooks": ensureCustomHooksUsingOtherHooks,
  "ensure-use-callback-has-non-empty-deps": ensureUseCallbackHasNonEmptyDeps,
  "ensure-use-memo-has-non-empty-deps": ensureUseMemoHasNonEmptyDeps,
  "no-direct-set-state-in-use-effect": noDirectSetStateInUseEffect,
  /** @deprecated Use `no-direct-set-state-in-use-effect` instead */
  "no-direct-set-state-in-use-layout-effect": noDirectSetStateInUseEffect,
  "prefer-use-state-lazy-initialization": preferUseStateLazyInitialization,
} as const;
