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
 * @internal
 */
const HookSchema = z.object({
  /*
   * The effect of arguments to this hook. Describes whether the hook may or may
   * not mutate arguments, etc.
   */
  effectKind: z.union([
    z.literal("<unknown>"),
    z.literal("capture"),
    z.literal("freeze"),
    z.literal("mutate"),
    z.literal("mutate-iterator?"),
    z.literal("mutate?"),
    z.literal("read"),
    z.literal("store"),
  ]),

  /*
   * The kind of value returned by the hook. Allows indicating that a hook returns
   * a primitive or already-frozen value, which can allow more precise memoization
   * of callers.
   */
  valueKind: z.union([
    z.literal("maybefrozen"),
    z.literal("frozen"),
    z.literal("primitive"),
    z.literal("global"),
    z.literal("mutable"),
    z.literal("context"),
  ]),

  /*
   * Specifies whether hook arguments may be aliased by other arguments or by the
   * return value of the function. Defaults to false. When enabled, this allows the
   * compiler to avoid memoizing arguments.
   */
  noAlias: z.boolean().default(false),

  /*
   * Specifies whether the hook returns data that is composed of:
   * - undefined
   * - null
   * - boolean
   * - number
   * - string
   * - arrays whose items are also transitiveMixed
   * - objects whose values are also transitiveMixed
   *
   * Many state management and data-fetching APIs return data that meets
   * this criteria since this is JSON + undefined. Forget can compile
   * hooks that return transitively mixed data more optimally because it
   * can make inferences about some method calls (especially array methods
   * like `data.items.map(...)` since these builtin types have few built-in
   * methods.
   */
  transitiveMixedData: z.boolean().default(false),
});

/**
 * @internal
 */
const EnvironmentConfigSchema = z.object({
  customHooks: z.map(z.string(), HookSchema).default(new Map()),
});

/**
 * @internal
 */
export const ESLintReactSettingsSchema = z.object({
  /**
   * The source where React is imported from
   * Allows specifying a custom import location for React.
   * @default "react"
   * @example "@pika/react"
   */
  importSource: z.optional(z.string()),

  /**
   * The prop name used for polymorphic components
   * Used to determine the component's type.
   * @example "as"
   */
  polymorphicPropName: z.optional(z.string()),

  /**
   * React version to use
   * "detect" means auto-detect React version from project dependencies.
   * @example "18.3.1"
   * @default "detect"
   */
  version: z.optional(z.string()),
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

  /**
   * The React Compiler environment configuration that the project is using.
   * @example
   * ```
   * { customHooks: new Map([["useRouter", { effectKind: "freeze", valueKind: "mutable" }]]) }
   * ```
   */
  environment: z.optional(EnvironmentConfigSchema),

  /**
   * The React Compiler compilationMode that the project is using
   * @example "infer"
   */
  compilationMode: z.optional(z.enum(["infer", "annotation", "syntax", "all"])),
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
      .with(P.union(P.nullish, "", "detect"), () => getReactVersion("19.2.7"))
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
