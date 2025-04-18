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
    "no-direct-set-state-in-use-effect": noDirectSetStateInUseEffect,
    "no-direct-set-state-in-use-layout-effect": noDirectSetStateInUseLayoutEffect,
    "no-unnecessary-use-callback": noUnnecessaryUseCallback,
    "no-unnecessary-use-memo": noUnnecessaryUseMemo,
    "no-unnecessary-use-prefix": noUnnecessaryUsePrefix,
    "prefer-use-state-lazy-initialization": preferUseStateLazyInitialization,
  },
} as const;
