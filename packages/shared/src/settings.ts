import type { ReadonlyDeep } from "type-fest";
import { array, object, optional, type Output, string } from "valibot";

/**
 * @internal
 */
export const ESLintReactSettingsSchema = object({
  jsx: optional(object({
    extensions: optional(array(string())),
    fragment: optional(string()),
    pragma: optional(string()),
  })),
  namingConvention: optional(object({})),
  react: optional(object({
    version: optional(string()),
  })),
  reactHooks: optional(object({
    alias: optional(object({
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
    debug: optional(object({})),
  })),
});

export type ESLintReactSettings = ReadonlyDeep<Output<typeof ESLintReactSettingsSchema>>;

/**
 * @internal
 */
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

export { parse as parseSchema, safeParse as safeParseSchema } from "valibot";
