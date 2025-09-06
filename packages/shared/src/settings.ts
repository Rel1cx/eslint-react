/* eslint-disable jsdoc/require-param */
/* eslint-disable perfectionist/sort-objects */
import type { unit } from "@eslint-react/eff";
import { getOrElseUpdate, identity } from "@eslint-react/eff";
import { type RuleContext } from "@eslint-react/kit";
import type { ESLint, SharedConfigurationSettings } from "@typescript-eslint/utils/ts-eslint"; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { PartialDeep } from "type-fest";

import { match, P } from "ts-pattern";
import { z } from "zod/v4";

import { getReactVersion } from "./get-react-version";

// ===== Schema Definitions =====

/**
 * Schema for custom hooks aliases that should be treated as React Hooks
 */
export const CustomHooksSchema = z.object({
  use: z.optional(z.array(z.string())),
  useActionState: z.optional(z.array(z.string())),
  useCallback: z.optional(z.array(z.string())),
  useContext: z.optional(z.array(z.string())),
  useDebugValue: z.optional(z.array(z.string())),
  useDeferredValue: z.optional(z.array(z.string())),
  useEffect: z.optional(z.array(z.string())),
  useFormStatus: z.optional(z.array(z.string())),
  useId: z.optional(z.array(z.string())),
  useImperativeHandle: z.optional(z.array(z.string())),
  useInsertionEffect: z.optional(z.array(z.string())),
  useLayoutEffect: z.optional(z.array(z.string())),
  useMemo: z.optional(z.array(z.string())),
  useOptimistic: z.optional(z.array(z.string())),
  useReducer: z.optional(z.array(z.string())),
  useRef: z.optional(z.array(z.string())),
  useState: z.optional(z.array(z.string())),
  useSyncExternalStore: z.optional(z.array(z.string())),
  useTransition: z.optional(z.array(z.string())),
});

/**
 * Schema for ESLint React settings configuration
 * @internal
 */
export const ESLintReactSettingsSchema = z.object({
  /**
   * The source where React is imported from
   * Allows specifying a custom import location for React
   * @default "react"
   * @example "@pika/react"
   */
  importSource: z.optional(z.string()),

  /**
   * The prop name used for polymorphic components
   * Used to determine the component's type
   * @example "as"
   */
  polymorphicPropName: z.optional(z.string()),

  /**
   * Whether to use strict mode
   * @default true
   * @internal
   */
  strict: z.optional(z.boolean()),

  /**
   * Whether to skip import checks when determining if an API is from React
   * @default true
   * @internal
   */
  skipImportCheck: z.optional(z.boolean()),

  /**
   * React version to use
   * "detect" means auto-detect React version from project dependencies
   * @example "18.3.1"
   * @default "detect"
   */
  version: z.optional(z.string()),

  /**
   * Custom hooks that should be treated as equivalent to built-in React Hooks
   * @example { useEffect: ["useIsomorphicLayoutEffect"] }
   */
  additionalHooks: z.optional(CustomHooksSchema),
});

/**
 * Schema for ESLint settings
 * @internal
 */
export const ESLintSettingsSchema = z.optional(
  z.object({
    "react-x": z.optional(z.unknown()),
  }),
);

// ===== Type Definitions =====
export type CustomHooks = z.infer<typeof CustomHooksSchema>;
export type ESLintSettings = z.infer<typeof ESLintSettingsSchema>;
export type ESLintReactSettings = z.infer<typeof ESLintReactSettingsSchema>;

/**
 * Normalized ESLint React settings with processed values
 */
export interface ESLintReactSettingsNormalized {
  additionalHooks: CustomHooks;
  importSource: string;
  polymorphicPropName: string | unit;
  skipImportCheck: boolean;
  strict: boolean;
  version: string;
}

// ===== Default Values =====

/**
 * Default ESLint React settings
 */
export const DEFAULT_ESLINT_REACT_SETTINGS = {
  version: "detect",
  importSource: "react",
  strict: true,
  skipImportCheck: true,
  polymorphicPropName: "as",
  additionalHooks: {
    useEffect: ["useIsomorphicLayoutEffect"],
    useLayoutEffect: ["useIsomorphicLayoutEffect"],
  },
} as const satisfies ESLintReactSettings;

/**
 * Default ESLint settings with React settings included
 */
export const DEFAULT_ESLINT_SETTINGS = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
} as const satisfies ESLintSettings;

// ===== Utility Functions =====

/**
 * Checks if the provided settings conform to ESLintSettings schema
 * @param settings The settings object to validate
 */
export function isESLintSettings(settings: unknown): settings is ESLintSettings {
  return ESLintSettingsSchema.safeParse(settings).success;
}

/**
 * Checks if the provided settings conform to ESLintReactSettings schema
 * @param settings The settings object to validate
 */
export function isESLintReactSettings(settings: unknown): settings is ESLintReactSettings {
  return ESLintReactSettingsSchema.safeParse(settings).success;
}

/**
 * Coerces unknown input to ESLintSettings type
 * @param settings The settings object to coerce
 */
export const coerceESLintSettings = (settings: unknown): PartialDeep<ESLintSettings> => {
  return settings as PartialDeep<ESLintSettings>;
};

/**
 * Decodes and validates ESLint settings, using defaults if invalid
 * @param settings The settings object to decode
 */
export const decodeESLintSettings = (settings: unknown): ESLintSettings => {
  if (isESLintSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_SETTINGS;
};

/**
 * Coerces unknown input to ESLintReactSettings type
 * @param settings The settings object to coerce
 */
export const coerceSettings = (settings: unknown): PartialDeep<ESLintReactSettings> => {
  return settings as PartialDeep<ESLintReactSettings>;
};

/**
 * Decodes and validates ESLint React settings, using defaults if invalid
 * @param settings The settings object to decode
 */
export const decodeSettings = (settings: unknown): ESLintReactSettings => {
  if (isESLintReactSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_REACT_SETTINGS;
};

/**
 * Normalizes ESLint React settings to a consistent internal format
 * Transforms component definitions and resolves version information
 */
export const normalizeSettings = ({
  additionalHooks = {},
  importSource = "react",
  polymorphicPropName = "as",
  skipImportCheck = true,
  strict = true,
  version,
  ...rest
}: ESLintReactSettings) => {
  return {
    ...rest,
    additionalHooks,
    importSource,
    polymorphicPropName,
    skipImportCheck,
    strict,
    version: match(version)
      .with(P.union(P.nullish, "", "detect"), () => getReactVersion("19.1.0"))
      .otherwise(identity),
  } as const satisfies ESLintReactSettingsNormalized;
};

// Cache for storing normalized settings to avoid repeated processing
const cache = new Map<unknown, ESLintReactSettingsNormalized>();

/**
 * Retrieves normalized ESLint React settings from the rule context
 * Uses caching for performance optimization
 * @param context The ESLint rule context
 */
export function getSettingsFromContext(context: RuleContext): ESLintReactSettingsNormalized {
  const settings = context.settings;
  return getOrElseUpdate(
    cache,
    settings["react-x"],
    () => normalizeSettings(decodeSettings(settings["react-x"])),
  );
}

/**
 * Helper function for defining typed settings for "react-x" in JavaScript files
 * Provides type checking without runtime transformation
 */
export const defineSettings: (settings: ESLintReactSettings) => ESLintReactSettings = identity;

// Type declaration augmentation for TypeScript ESLint
declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    ["react-x"]?: Partial<ESLintReactSettings>;
  }
}
