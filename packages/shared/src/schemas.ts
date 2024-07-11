import type { ReadonlyDeep } from "type-fest";
import type { InferOutput } from "valibot";
import { array, boolean, object, optional, string } from "valibot";

/**
 * @internal
 */
export const ESLintReactSettingsSchema = object({
  additionalHooks: optional(object({
    use: optional(string()),
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

export type ESLintReactSettings = ReadonlyDeep<InferOutput<typeof ESLintReactSettingsSchema>>;

/**
 * @internal
 */
export const ESLintSettingsSchema = object({
  "react-x": optional(ESLintReactSettingsSchema),
  /**
   * @deprecated
   */
  reactOptions: optional(ESLintReactSettingsSchema),
});

export type ESLintSettings = ReadonlyDeep<InferOutput<typeof ESLintSettingsSchema>>;
