import type { ReadonlyDeep } from "type-fest";
import { array, object, optional, type Output, string } from "valibot";

export const ESLintReactSettingsSchema = object({
  fragment: optional(string()),
  jsxExtensions: optional(array(string())),
  pragma: optional(string()),
  reactHooksVariants: optional(object({
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
    useReducer: optional(array(string())),
    useRef: optional(array(string())),
    useState: optional(array(string())),
    useSyncExternalStore: optional(array(string())),
    useTransition: optional(array(string())),
  })),
  version: optional(string()),
});

export type ESLintReactSettings = Output<typeof ESLintReactSettingsSchema>;

export const ESLintSettingsSchema = object({
  eslintReact: optional(ESLintReactSettingsSchema),
});

// The `settings` object in eslint config for all plugins.
// We only care about the `eslintReact` field at the moment.
export type ESLintSettings = ReadonlyDeep<{
  [key: string]: unknown;
  // eslint-disable-next-line no-restricted-syntax
  eslintReact?: ESLintReactSettings;
}>;
