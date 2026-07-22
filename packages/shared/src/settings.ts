/* eslint-disable perfectionist/sort-interfaces */
/* eslint-disable perfectionist/sort-objects */
/// <reference types="node" />
import type { RuleContext } from "@eslint-react/eslint";
import { getOrInsertComputed, identity } from "@local/eff";
import module from "node:module";
import path from "node:path";
import { P, match } from "ts-pattern";
import { z } from "zod/v4";
import { type RegExpLike, toRegExp } from "./regexp";

/**
 * The zod schema for the ESLint React settings.
 * @internal
 */
export const ESLintReactSettingsSchema = z.object({
  /**
   * The source where React is imported from.
   * Allows specifying a custom import location for React.
   * @default "react"
   * @example "@pika/react"
   */
  importSource: z.optional(z.string()),

  /**
   * The React Compiler compilationMode that the project is using.
   * Used to inform the rule about how components and hooks will be picked up by the compiler.
   * @example "infer"
   */
  compilationMode: z.optional(z.enum(["infer", "annotation", "syntax", "all"])),

  /**
   * The prop name used for polymorphic components.
   * Used to determine the component's type.
   * @example "as"
   */
  polymorphicPropName: z.optional(z.string()),

  /**
   * React version to use.
   * "detect" means auto-detect React version from project dependencies.
   * @example "18.3.1"
   * @default "detect"
   */
  version: z.optional(z.string()),
  /**
   * Regex pattern matching custom hooks that should be treated as ref hooks.
   * @example "useMyRef|useCustomRef"
   */
  additionalRefHooks: z.optional(z.string()),
  /**
   * Regex pattern matching custom hooks that should be treated as state hooks.
   * @example "useMyState|useCustomState"
   */
  additionalStateHooks: z.optional(z.string()),
  /**
   * Regex pattern matching custom hooks that should be treated as effect hooks.
   * @example "useMyEffect|useCustomEffect"
   */
  additionalEffectHooks: z.optional(z.string()),
});

/**
 * The zod schema for the ESLint settings.
 * @internal
 */
export const ESLintSettingsSchema = z.optional(
  z.object({
    "react-x": z.optional(z.unknown()),
  }),
);

/** The ESLint settings inferred from `ESLintSettingsSchema`. */
export type ESLintSettings = z.infer<typeof ESLintSettingsSchema>;

/** The ESLint React settings inferred from `ESLintReactSettingsSchema`. */
export type ESLintReactSettings = z.infer<typeof ESLintReactSettingsSchema>;

/** Represents the normalized ESLint React settings used by rules. */
export interface ESLintReactSettingsNormalized {
  /** The React version. */
  version: string;
  /** The source where React is imported from. */
  importSource: string;
  /** The React Compiler compilation mode, or "off" when not used. */
  compilationMode: ESLintReactSettings["compilationMode"] | "off";
  /** The prop name used for polymorphic components. */
  polymorphicPropName: string | null;
  /** Regex pattern matching custom hooks that should be treated as ref hooks. */
  additionalRefHooks: RegExpLike;
  /** Regex pattern matching custom hooks that should be treated as state hooks. */
  additionalStateHooks: RegExpLike;
  /** Regex pattern matching custom hooks that should be treated as effect hooks. */
  additionalEffectHooks: RegExpLike;
}

/** The default ESLint React settings. */
export const DEFAULT_ESLINT_REACT_SETTINGS = {
  version: "detect",
  importSource: "react",
  polymorphicPropName: "as",
} as const satisfies ESLintReactSettings;

/** The default ESLint settings. */
export const DEFAULT_ESLINT_SETTINGS = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
} as const satisfies ESLintSettings;

/**
 * Check if the value is valid ESLint settings.
 * @param settings The value to check.
 * @returns `true` if the value is valid ESLint settings.
 */
export function isESLintSettings(settings: unknown): settings is ESLintSettings {
  return ESLintSettingsSchema.safeParse(settings).success;
}

/**
 * Check if the value is valid ESLint React settings.
 * @param settings The value to check.
 * @returns `true` if the value is valid ESLint React settings.
 */
export function isESLintReactSettings(settings: unknown): settings is ESLintReactSettings {
  return ESLintReactSettingsSchema.safeParse(settings).success;
}

/**
 * Decode the ESLint settings, falling back to the defaults when invalid.
 * @param settings The value to decode.
 * @returns The decoded ESLint settings.
 */
export const decodeESLintSettings = (settings: unknown): ESLintSettings => {
  if (isESLintSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_SETTINGS;
};

/**
 * Decode the ESLint React settings, falling back to the defaults when invalid.
 * @param settings The value to decode.
 * @returns The decoded ESLint React settings.
 */
export const decodeSettings = (settings: unknown): ESLintReactSettings => {
  if (isESLintReactSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_REACT_SETTINGS;
};

/**
 * Normalize the ESLint React settings to the form used by rules.
 * @param settings The ESLint React settings to normalize.
 * @returns The normalized ESLint React settings.
 */
export const normalizeSettings = ({
  importSource = "react",
  compilationMode,
  polymorphicPropName = "as",
  version,
  additionalRefHooks,
  additionalStateHooks,
  additionalEffectHooks,
  ...rest
}: ESLintReactSettings) => {
  return {
    ...rest,
    importSource,
    compilationMode: compilationMode ?? "off",
    polymorphicPropName,
    version: match(version)
      .with(P.union(P.nullish, "", "detect"), () => getReactVersion("19.2.7"))
      .otherwise(identity),
    additionalRefHooks: toRegExp(additionalRefHooks),
    additionalStateHooks: toRegExp(additionalStateHooks),
    additionalEffectHooks: toRegExp(additionalEffectHooks),
  } as const satisfies ESLintReactSettingsNormalized;
};

const cache = new Map<unknown, ESLintReactSettingsNormalized>();

/**
 * Get the React version from the project's dependencies.
 * @param fallback The fallback version to return if React is not found.
 * @returns The detected React version or the fallback version.
 */
export function getReactVersion(fallback: string): string {
  try {
    return match(module.createRequire(process.cwd() + path.sep)("react"))
      .with({ version: P.select(P.string) }, identity)
      .otherwise(() => fallback);
  } catch {
    return fallback;
  }
}

/**
 * Get the normalized ESLint React settings from the rule context.
 * @param context The rule context.
 * @returns The normalized ESLint React settings.
 */
export function getSettingsFromContext(context: RuleContext): ESLintReactSettingsNormalized {
  const settings = context.settings["react-x"];
  return getOrInsertComputed(
    cache,
    settings,
    () => normalizeSettings(decodeSettings(settings)),
  );
}

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    ["react-x"]?: Partial<ESLintReactSettings>;
  }
}
