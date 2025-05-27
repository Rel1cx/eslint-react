import { name, version } from "../package.json";
import noDirectSetStateInUseEffect from "./rules/no-direct-set-state-in-use-effect";
import noDirectSetStateInUseLayoutEffect from "./rules/no-direct-set-state-in-use-layout-effect";
import noUnnecessaryUseCallback from "./rules/no-unnecessary-use-callback";
import noUnnecessaryUseMemo from "./rules/no-unnecessary-use-memo";
import noUnnecessaryUsePrefix from "./rules/no-unnecessary-use-prefix";
import preferUseStateLazyInitialization from "./rules/prefer-use-state-lazy-initialization";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    /** @deprecated Use `react-x/no-direct-set-state-in-use-effect` instead */
    "no-direct-set-state-in-use-effect": noDirectSetStateInUseEffect,
    /** @deprecated Use `react-x/no-direct-set-state-in-use-layout-effect` instead */
    "no-direct-set-state-in-use-layout-effect": noDirectSetStateInUseLayoutEffect,
    /** @deprecated Use `react-x/no-unnecessary-use-callback` instead */
    "no-unnecessary-use-callback": noUnnecessaryUseCallback,
    /** @deprecated Use `react-x/no-unnecessary-use-memo` instead */
    "no-unnecessary-use-memo": noUnnecessaryUseMemo,
    /** @deprecated Use `react-x/no-unnecessary-use-prefix` instead */
    "no-unnecessary-use-prefix": noUnnecessaryUsePrefix,
    /** @deprecated Use `react-x/prefer-use-state-lazy-initialization` instead */
    "prefer-use-state-lazy-initialization": preferUseStateLazyInitialization,
  },
} as const;
