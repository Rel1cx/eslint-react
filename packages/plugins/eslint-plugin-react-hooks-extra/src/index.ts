/* eslint-disable perfectionist/sort-objects */
import { name, version } from "../package.json";
import noDirectSetStateInUseEffect from "./rules/no-direct-set-state-in-use-effect";
import noRedundantCustomHook from "./rules/no-redundant-custom-hook";
import ensureUseCallbackHasNonEmptyDeps from "./rules/no-unnecessary-use-callback";
import noUnnecessaryUseMemo from "./rules/no-unnecessary-use-memo";
import preferUseStateLazyInitialization from "./rules/prefer-use-state-lazy-initialization";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "no-direct-set-state-in-use-effect": noDirectSetStateInUseEffect,
  "no-redundant-custom-hook": noRedundantCustomHook,
  "no-unnecessary-use-callback": ensureUseCallbackHasNonEmptyDeps,
  "no-unnecessary-use-memo": noUnnecessaryUseMemo,
  "prefer-use-state-lazy-initialization": preferUseStateLazyInitialization,
  // Deprecated Rules
  /** @deprecated Use `no-redundant-custom-hook` instead */
  "ensure-custom-hooks-using-other-hooks": noRedundantCustomHook,
  /** @deprecated Use `no-unnecessary-use-memo` instead */
  "ensure-use-memo-has-non-empty-deps": noUnnecessaryUseMemo,
  /** @deprecated Use `no-direct-set-state-in-use-effect` instead */
  "no-direct-set-state-in-use-layout-effect": noDirectSetStateInUseEffect,
} as const;
