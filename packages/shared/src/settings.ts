/* eslint-disable no-restricted-syntax */
import type { _ } from "@eslint-react/eff";
import { identity } from "@eslint-react/eff";
import type { SharedConfigurationSettings } from "@typescript-eslint/utils/ts-eslint"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { shallowEqual } from "fast-equals";
import memoize from "micro-memoize";
import pm from "picomatch";
import { match, P } from "ts-pattern";
import type { PartialDeep } from "type-fest";
import { parse } from "valibot";

import { getReactVersion } from "./get-react-version";
import type { CustomHooks, ESLintReactSettings } from "./schemas";
import { DEFAULT_ESLINT_REACT_SETTINGS, ESLintSettingsSchema } from "./schemas";

export interface CustomComponentNormalized {
  name: string;
  as: string;
  attributes: CustomComponentPropNormalized[];
  re: RegExp;
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
 * Unsafely casts settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export function unsafeDecodeSettings(data: unknown): PartialDeep<ESLintReactSettings> {
  // @ts-expect-error - skip type checking for unsafe cast
  return (data?.["react-x"] ?? {}) as PartialDeep<ESLintReactSettings>;
}

/**
 * Decodes settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export const decodeSettings = memoize((data: unknown): ESLintReactSettings => {
  return {
    ...DEFAULT_ESLINT_REACT_SETTINGS,
    ...parse(ESLintSettingsSchema, data)["react-x"] ?? {},
  };
}, { isEqual: (a, b) => a === b });

/**
 * The memoized version of `ESLintReactSettings`.
 * @param settings The settings.
 * @returns The normalized settings.
 * @internal
 */
export const toNormalizedSettings = memoize(
  ({
    additionalComponents = [],
    additionalHooks = {},
    importSource = "react",
    polymorphicPropName = "as",
    skipImportCheck = true,
    version,
    ...rest
  }: ESLintReactSettings): ESLintReactSettingsNormalized => {
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
        re: pm.makeRe(name, { fastpaths: true }),
      })),
      additionalHooks,
      importSource,
      polymorphicPropName,
      skipImportCheck,
      version: match(version)
        .with(P.union(P.nullish, "", "detect"), () => getReactVersion("19.0.0"))
        .otherwise(identity),
    };
  },
  { isEqual: shallowEqual },
);

export function getSettingsFromContext(context: { settings: unknown }): ESLintReactSettingsNormalized {
  return toNormalizedSettings(decodeSettings(context.settings));
}

/**
 * A helper function to define settings for "react-x" with type checking in JavaScript files.
 * @param settings The settings.
 * @returns The settings.
 */
export const defineSettings: (settings: ESLintReactSettings) => ESLintReactSettings = identity;

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    "react-x"?: Partial<ESLintReactSettings>;
  }
}
