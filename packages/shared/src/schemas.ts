import type { ReadonlyDeep } from "type-fest";
import type { InferOutput } from "valibot";
import { array, boolean, object, optional, record, string, union } from "valibot";

/**
 * @internal
 * @description
 * This allows the rule to know some key information before checking for user-defined hooks.
 * For example, the position of the `deps` argument for the user-defined `useCustomEffect` hook that represents the built-in `useEffect` hook.
 */
export const CustomHookSchema = object({
  // TODO: Define the schema for custom hooks
});

/**
 * @internal
 * @description
 * This will provide some key information to the rule before checking for user-defined components.
 * For example:
 * Which attribute is used as the `href` prop for the user-defined `Link` component that represents the built-in `a` element.
 * Which attributes are used as `children` props for a user-defined `Button` component to receive children of that component.
 */
export const CustomComponentSchema = object({
  /**
   * Pre-defined attributes that are used in the user-defined component.
   * @example
   * `Link` component has a `to` attribute that represents the `href` attribute in the built-in `a` element with a default value of `"/"`.
   */
  additionalAttributes: optional(array(object({
    /**
     * The name of the attribute in the user-defined component.
     * @example
     * "to"
     */
    name: string(),
    /**
     * The name of the attribute in the built-in component.
     * @example
     * "href"
     */
    as: string(),
    /**
     * The default value of the attribute in the user-defined component.
     * @example
     * `"/"`
     */
    defaultValue: optional(string()),
  }))),
});

/**
 * @internal
 */
export const ESLintReactXSettingsSchema = object({
  additionalComponents: optional(record(string(), union([string(), CustomComponentSchema]))),
  additionalHooks: optional(object({
    use: optional(array(string())),
    useActionState: optional(array(string())),
    useCallback: optional(array(string())),
    useContext: optional(array(string())),
    useDebugValue: optional(array(string())),
    useDeferredValue: optional(array(string())),
    useEffect: optional(array(string())),
    useId: optional(array(string())),
    useImperativeHandle: optional(array(string())),
    useInsertionEffect: optional(array(string())),
    useLayoutEffect: optional(array(string())),
    useMemo: optional(array(string())),
    useOptimistic: optional(array(string())),
    useReducer: optional(array(string())),
    useRef: optional(array(string())),
    useState: optional(array(string())),
    useSyncExternalStore: optional(array(string())),
    useTransition: optional(array(string())),
  })),
  importSource: optional(string()),
  jsxPragma: optional(string()),
  jsxPragmaFrag: optional(string()),
  strict: optional(boolean()),
  version: optional(string()),
});

/**
 * @internal
 */
export const ESLintSettingsSchema = object({
  "react-x": optional(ESLintReactXSettingsSchema),
  /**
   * @deprecated
   */
  reactOptions: optional(ESLintReactXSettingsSchema),
});

export type ESLintReactXSettings = ReadonlyDeep<InferOutput<typeof ESLintReactXSettingsSchema>>;

export type ESLintSettings = ReadonlyDeep<InferOutput<typeof ESLintSettingsSchema>>;
