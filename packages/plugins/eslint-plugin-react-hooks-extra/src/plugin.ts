import { name, version } from "../package.json";
import noDirectSetStateInUseEffect from "./rules/no-direct-set-state-in-use-effect";
import noDirectSetStateInUseLayoutEffect from "./rules/no-direct-set-state-in-use-layout-effect";
import noUnnecessaryUseCallback from "./rules/no-unnecessary-use-callback";
import noUnnecessaryUseMemo from "./rules/no-unnecessary-use-memo";
import noUseInTryCatch from "./rules/no-use-in-try-catch";
import noUselessCustomHooks from "./rules/no-useless-custom-hooks";
import preferUseStateLazyInitialization from "./rules/prefer-use-state-lazy-initialization";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "no-direct-set-state-in-use-effect": noDirectSetStateInUseEffect,
    "no-direct-set-state-in-use-layout-effect": noDirectSetStateInUseLayoutEffect,
    "no-unnecessary-use-callback": noUnnecessaryUseCallback,
    "no-unnecessary-use-memo": noUnnecessaryUseMemo,
    "no-use-in-try-catch": noUseInTryCatch,
    "no-useless-custom-hooks": noUselessCustomHooks,
    "prefer-use-state-lazy-initialization": preferUseStateLazyInitialization,

    // Part: deprecated rules
    /** @deprecated Use `no-useless-custom-hooks` instead */
    "ensure-custom-hooks-using-other-hooks": noUselessCustomHooks,
    /** @deprecated Use `no-unnecessary-use-callback` instead */
    "ensure-use-callback-has-non-empty-deps": noUnnecessaryUseCallback,
    /** @deprecated Use `no-unnecessary-use-memo` instead */
    "ensure-use-memo-has-non-empty-deps": noUnnecessaryUseMemo,
    /** @deprecated Use `no-useless-custom-hooks` instead */
    "no-redundant-custom-hook": noUselessCustomHooks,
  },
} as const;
