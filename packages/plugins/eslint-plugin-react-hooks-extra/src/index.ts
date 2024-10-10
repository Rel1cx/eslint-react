/* eslint-disable perfectionist/sort-objects */
import { name, version } from "../package.json";
import noDirectSetStateInUseEffect from "./rules/no-direct-set-state-in-use-effect";
import noDirectSetStateInUseLayoutEffect from "./rules/no-direct-set-state-in-use-layout-effect";
import noRedundantCustomHook from "./rules/no-redundant-custom-hook";
import ensureUseCallbackHasNonEmptyDeps from "./rules/no-unnecessary-use-callback";
import noUnnecessaryUseMemo from "./rules/no-unnecessary-use-memo";
import preferUseStateLazyInitialization from "./rules/prefer-use-state-lazy-initialization";

export default {
  meta: {
    name,
    version,
  },
  rules: {
    "no-direct-set-state-in-use-effect": noDirectSetStateInUseEffect,
    "no-direct-set-state-in-use-layout-effect": noDirectSetStateInUseLayoutEffect,
    "no-redundant-custom-hook": noRedundantCustomHook,
    "no-unnecessary-use-callback": ensureUseCallbackHasNonEmptyDeps,
    "no-unnecessary-use-memo": noUnnecessaryUseMemo,
    "prefer-use-state-lazy-initialization": preferUseStateLazyInitialization,
    // Deprecated Rules
    /** @deprecated Use `no-redundant-custom-hook` instead */
    "ensure-custom-hooks-using-other-hooks": noRedundantCustomHook,
    /** @deprecated Use `no-unnecessary-use-memo` instead */
    "ensure-use-memo-has-non-empty-deps": noUnnecessaryUseMemo,
  },
} as const;
