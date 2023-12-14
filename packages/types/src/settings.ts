import type { ReadonlyDeep } from "type-fest";
import { array, object, optional, type Output, parse, safeParse, string } from "valibot";

export const ERSettingsSchema = object({
  extensions: optional(array(string())),
  fragment: optional(string()),
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

export type ERSettings = Output<typeof ERSettingsSchema>;

export const parseERSettings = (data: unknown) => parse(ERSettingsSchema, data);

export const safeParseERSettings = (data: unknown) => safeParse(ERSettingsSchema, data);

export const ESLintPluginSettingsSchema = object({
  eslintReact: optional(ERSettingsSchema),
});

export const parseESLintPluginSettings = (data: unknown) => parse(ESLintPluginSettingsSchema, data);

export const safeParseESLintPluginSettings = (data: unknown) => safeParse(ESLintPluginSettingsSchema, data);

// The `settings` object in eslint config for all plugins.
// We only care about the `eslintReact` field at the moment.
export type ESLintPluginSettings = ReadonlyDeep<{
  [key: string]: unknown;
  eslintReact: ERSettings;
}>;
