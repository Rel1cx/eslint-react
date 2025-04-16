/* eslint-disable jsdoc/require-param */
import type { _ } from "@eslint-react/eff";
import type { SharedConfigurationSettings } from "@typescript-eslint/utils/ts-eslint"; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { PartialDeep } from "type-fest";
import type { CustomHooks, ESLintReactSettings } from "./schemas";
import { getOrElseUpdate, identity } from "@eslint-react/eff";
import { RegExp as RE } from "@eslint-react/kit";
import * as z from "@zod/mini";

import { match, P } from "ts-pattern";
import { getReactVersion } from "./get-react-version";
import { DEFAULT_ESLINT_REACT_SETTINGS, ESLintSettingsSchema } from "./schemas";

export interface CustomComponentNormalized {
  name: string;
  as: string;
  attributes: CustomComponentPropNormalized[];
  re: { test(s: string): boolean };
  // selector?: string | _;
}

export interface CustomComponentPropNormalized {
  name: string;
  as: string;
  // controlled?: boolean | _;
  defaultValue?: string | _;
}

/**
 * The normalized version of the `ESLintReactSettings`.
 * @internal
 */
export interface ESLintReactSettingsNormalized {
  additionalComponents: CustomComponentNormalized[];
  additionalHooks: CustomHooks;
  importSource: string;
  polymorphicPropName: string | _;
  skipImportCheck: boolean;
  // strict: boolean;
  version: string;
}

/**
 * A helper function to coerce settings from a data object.
 * @param data The data object.
 * @returns settings The settings.
 */
export const coerceSettings = (data: unknown): PartialDeep<ESLintReactSettings> => {
  // @ts-expect-error - skip type checking for unsafe cast
  return (data?.["react-x"] ?? {}) as PartialDeep<ESLintReactSettings>;
};

const decodeCache = new Map<unknown, ESLintReactSettings>();

/**
 * Decodes settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export const decodeSettings = (data: unknown): ESLintReactSettings => {
  return getOrElseUpdate(decodeCache, data, () => ({
    ...DEFAULT_ESLINT_REACT_SETTINGS,
    ...z.parse(ESLintSettingsSchema, data)?.["react-x"] ?? {},
  }));
};

const normalizeCache = new Map<ESLintReactSettings, ESLintReactSettingsNormalized>();

/**
 * @internal
 */
export const normalizeSettings = (settings: ESLintReactSettings): ESLintReactSettingsNormalized => {
  return getOrElseUpdate(normalizeCache, settings, () => {
    const {
      additionalComponents = [],
      additionalHooks = {},
      importSource = "react",
      polymorphicPropName = "as",
      skipImportCheck = true,
      // strict = false,
      version,
      ...rest
    } = settings;
    return {
      ...rest,
      additionalComponents: additionalComponents.map(({
        name,
        as = name,
        attributes = [],
        ...rest
      }) => ({
        ...rest,
        name,
        as,
        attributes: attributes
          .map(({ name, as = name, ...rest }) => ({
            ...rest,
            name,
            as,
          })),
        re: RE.toRegExp(name),
      })),
      additionalHooks,
      importSource,
      polymorphicPropName,
      skipImportCheck,
      version: match(version)
        .with(P.union(P.nullish, "", "detect"), () => getReactVersion("19.1.0"))
        .otherwise(identity),
    };
  });
};

const settingsCache = new Map<unknown, ESLintReactSettingsNormalized>();

export function getSettingsFromContext(context: { settings: unknown }): ESLintReactSettingsNormalized {
  return getOrElseUpdate(
    settingsCache,
    context.settings,
    () => normalizeSettings(decodeSettings(context.settings)),
  );
}

/**
 * A helper function to define settings for "react-x" with type checking in JavaScript files.
 * @param settings The settings.
 * @returns The settings.
 */
export const defineSettings: (settings: ESLintReactSettings) => ESLintReactSettings = identity;

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    ["react-x"]?: Partial<ESLintReactSettings>;
  }
}
