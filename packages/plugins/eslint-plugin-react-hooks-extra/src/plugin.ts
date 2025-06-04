import { name, version } from "../package.json";

import noUnnecessaryUseCallback from "./rules-removed/no-unnecessary-use-callback";
import noUnnecessaryUseMemo from "./rules-removed/no-unnecessary-use-memo";
import noUnnecessaryUsePrefix from "./rules-removed/no-unnecessary-use-prefix";
import preferUseStateLazyInitialization from "./rules-removed/prefer-use-state-lazy-initialization";

import noDirectSetStateInUseEffect from "./rules/no-direct-set-state-in-use-effect";
import noDirectSetStateInUseLayoutEffect from "./rules/no-direct-set-state-in-use-layout-effect";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "no-direct-set-state-in-use-effect": noDirectSetStateInUseEffect,
    "no-direct-set-state-in-use-layout-effect": noDirectSetStateInUseLayoutEffect,

    /**
     * @deprecated Use the same rule from `eslint-plugin-react-x` or `@eslint-react/eslint-plugin` instead.
     * @see https://next.eslint-react.xyz/docs/rules/no-unnecessary-use-callback
     */
    "no-unnecessary-use-callback": noUnnecessaryUseCallback,
    /**
     * @deprecated Use the same rule from `eslint-plugin-react-x` or `@eslint-react/eslint-plugin` instead.
     * @see https://next.eslint-react.xyz/docs/rules/no-unnecessary-use-memo
     */
    "no-unnecessary-use-memo": noUnnecessaryUseMemo,
    /**
     * @deprecated Use the same rule from `eslint-plugin-react-x` or `@eslint-react/eslint-plugin` instead.
     * @see https://next.eslint-react.xyz/docs/rules/no-unnecessary-use-prefix
     */
    "no-unnecessary-use-prefix": noUnnecessaryUsePrefix,
    /**
     * @deprecated Use the same rule from `eslint-plugin-react-x` or `@eslint-react/eslint-plugin` instead.
     * @see https://next.eslint-react.xyz/docs/rules/prefer-use-state-lazy-initialization
     */
    "prefer-use-state-lazy-initialization": preferUseStateLazyInitialization,
  },
} as const;
