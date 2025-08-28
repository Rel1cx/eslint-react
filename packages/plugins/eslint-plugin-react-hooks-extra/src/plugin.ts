import type { CompatiblePlugin } from "@eslint-react/shared";

import { name, version } from "../package.json";
import noDirectSetStateInUseEffect from "./rules/no-direct-set-state-in-use-effect";
import noDirectSetStateInUseLayoutEffect from "./rules/no-direct-set-state-in-use-layout-effect";
import noUnnecessaryUseCallback from "./rules/no-unnecessary-use-callback";
import noUnnecessaryUseMemo from "./rules/no-unnecessary-use-memo";
import noUnnecessaryUsePrefix from "./rules/no-unnecessary-use-prefix";
import preferUseStateLazyInitialization from "./rules/prefer-use-state-lazy-initialization";

export const plugin: CompatiblePlugin = {
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

    // Part: deprecated rules
    /** @deprecated Use `no-unnecessary-use-prefix` instead */
    "ensure-custom-hooks-using-other-hooks": noUnnecessaryUsePrefix,
    /** @deprecated Use `no-unnecessary-use-callback` instead */
    "ensure-use-callback-has-non-empty-deps": noUnnecessaryUseCallback,
    /** @deprecated Use `no-unnecessary-use-memo` instead */
    "ensure-use-memo-has-non-empty-deps": noUnnecessaryUseMemo,
    /** @deprecated Use `no-unnecessary-use-prefix` instead */
    "no-redundant-custom-hook": noUnnecessaryUsePrefix,
    /** @deprecated Use `no-unnecessary-use-prefix` instead */
    "no-useless-custom-hooks": noUnnecessaryUsePrefix,
  },
};
