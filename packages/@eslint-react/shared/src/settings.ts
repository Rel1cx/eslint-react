/* eslint-disable perfectionist/sort-interfaces */
/* eslint-disable perfectionist/sort-objects */
/// <reference types="node" />
import module from "node:module";
import path from "node:path";

import { getOrInsertComputed, identity } from "@local/eff";
import type { SharedConfigurationSettings } from "@typescript-eslint/utils/ts-eslint";
import { P, match } from "ts-pattern";
import { z } from "zod/v4";

import { type RegExpLike, toRegExp } from "./regexp";
import type { RuleContext } from "./types";

/**
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
   * The React Compiler compilationMode that the project is using
   * Used to inform the rule about how components and hooks will be picked up by the compiler
   * @example "infer"
   */
  compilationMode: z.optional(z.enum(["infer", "annotation", "syntax", "all"])),

  /**
   * The prop name used for polymorphic components
   * Used to determine the component's type
   * @example "as"
   */
  polymorphicPropName: z.optional(z.string()),

  /**
   * React version to use
   * "detect" means auto-detect React version from project dependencies
   * @example "18.3.1"
   * @default "detect"
   */
  version: z.optional(z.string()),
  /**
   * Regex pattern matching custom hooks that should be treated as state hooks
   * @example "useMyState|useCustomState"
   */
  additionalStateHooks: z.optional(z.string()),
  /**
   * Regex pattern matching custom hooks that should be treated as effect hooks
   * @example "useMyEffect|useCustomEffect"
   */
  additionalEffectHooks: z.optional(z.string()),
});

/**
 * @internal
 */
export const ESLintSettingsSchema = z.optional(
  z.object({
    "react-x": z.optional(z.unknown()),
  }),
);

export type ESLintSettings = z.infer<typeof ESLintSettingsSchema>;

export type ESLintReactSettings = z.infer<typeof ESLintReactSettingsSchema>;

export interface ESLintReactSettingsNormalized {
  version: string;
  importSource: string;
  compilationMode: ESLintReactSettings["compilationMode"] | "off";
  polymorphicPropName: string | null;
  additionalStateHooks: RegExpLike;
  additionalEffectHooks: RegExpLike;
}

export const DEFAULT_ESLINT_REACT_SETTINGS = {
  version: "detect",
  importSource: "react",
  polymorphicPropName: "as",
} as const satisfies ESLintReactSettings;

export const DEFAULT_ESLINT_SETTINGS = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
} as const satisfies ESLintSettings;

export function isESLintSettings(settings: unknown): settings is ESLintSettings {
  return ESLintSettingsSchema.safeParse(settings).success;
}

export function isESLintReactSettings(settings: unknown): settings is ESLintReactSettings {
  return ESLintReactSettingsSchema.safeParse(settings).success;
}

export const decodeESLintSettings = (settings: unknown): ESLintSettings => {
  if (isESLintSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_SETTINGS;
};

export const decodeSettings = (settings: unknown): ESLintReactSettings => {
  if (isESLintReactSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_REACT_SETTINGS;
};

export const normalizeSettings = ({
  importSource = "react",
  compilationMode,
  polymorphicPropName = "as",
  version,
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
      .with(P.union(P.nullish, "", "detect"), () => getReactVersion("19.2.4"))
      .otherwise(identity),
    additionalStateHooks: toRegExp(additionalStateHooks),
    additionalEffectHooks: toRegExp(additionalEffectHooks),
  } as const satisfies ESLintReactSettingsNormalized;
};

const cache = new Map<unknown, ESLintReactSettingsNormalized>();

/**
 * Gets the React version from the project's dependencies.
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
