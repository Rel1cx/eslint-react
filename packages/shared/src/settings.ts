import { Data, F, O } from "@eslint-react/tools";
import { shallowEqual } from "fast-equals";
import memoize from "micro-memoize";
import pm from "picomatch";
import type { PartialDeep } from "type-fest";
import { parse } from "valibot";

import type { CustomAttribute, ESLintReactSettings, ESLintReactSettingsNormalized } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

// #region Constants

/**
 * The initial settings for "react-x".
 */
export const INITIAL_ESLINT_REACT_SETTINGS = {
  skipImportCheck: false,
} as const satisfies ESLintReactSettings;

// #endregion

// #region Decoding Functions

/**
 * Unsafely casts settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export function unsafeReadSettings(data: unknown): PartialDeep<ESLintReactSettings> {
  // @ts-expect-error - skip type checking for unsafe cast
  // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
  return Data.struct(data?.["react-x"] ?? {}) as PartialDeep<ESLintReactSettings>;
}

/**
 * Decodes settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export const decodeSettings = memoize((data: unknown) => {
  return Data.struct<ESLintReactSettings>({
    ...INITIAL_ESLINT_REACT_SETTINGS,
    ...parse(ESLintSettingsSchema, data)["react-x"] ?? {},
  });
}, { isEqual: (a, b) => a === b });

// #endregion

// #region Normalization Functions

/**
 * Normalizes the settings by converting all shorthand properties to their full form.
 * @param settings The settings.
 * @returns The normalized settings.
 * @internal
 */
export const normalizeSettings = memoize((settings: ESLintReactSettings) => {
  const additionalComponents = settings.additionalComponents ?? [];
  return Data.struct<ESLintReactSettingsNormalized>({
    ...settings,
    additionalComponents: additionalComponents.map((component) => ({
      ...component,
      attributes: component.attributes.map((attr) => ({
        ...attr,
        as: attr.as ?? attr.name,
      })),
      re: pm.makeRe(component.name, { fastpaths: true }),
    })),
    components: additionalComponents.reduce((acc, component) => {
      const { name, as, attributes, selector } = component;
      if (!name || !as || selector || attributes.length > 0) return acc;
      if (!/^[\w-]+$/u.test(name)) return acc;
      return acc.set(name, as);
    }, new Map<string, string>()),
  });
}, { isEqual: shallowEqual });

// #endregion

// #region Helper Functions

export function findAttrInCustomAttributes(name: string, attributes: CustomAttribute[]) {
  return F.pipe(
    O.fromNullable(attributes.findLast(a => a.as === name)),
    O.map(a => [a.name, a.defaultValue] as const),
    O.getOrElse(() => [name] as const),
  );
}

/**
 * A helper function to define settings for "react-x" with type checking in JavaScript files.
 * @param settings The settings.
 * @returns The settings.
 */
export const defineSettings: (settings: ESLintReactSettings) => ESLintReactSettings = F.identity;

// #endregion
