import { Data, F } from "@eslint-react/tools";
import { shallowEqual } from "fast-equals";
import memoize from "micro-memoize";
import pm from "picomatch";
import type { PartialDeep } from "type-fest";
import { parse } from "valibot";

import type { CustomComponent, ESLintReactSettings } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

/**
 * The initial settings for "react-x".
 */
export const INITIAL_ESLINT_REACT_SETTINGS = {
  skipImportCheck: false,
} as const satisfies ESLintReactSettings;

/**
 * The default ESLint settings for "react-x".
 */
export const DEFAULT_ESLINT_REACT_SETTINGS = {
  additionalHooks: {
    useLayoutEffect: ["useIsomorphicLayoutEffect"],
  },
  polymorphicPropName: "as",
  skipImportCheck: false,
  version: "detect",
} as const satisfies ESLintReactSettings;

/**
 * This is an expanded version of `CustomComponent` with all shorthand properties expanded.
 * @internal
 */
export interface CustomComponentExpanded extends CustomComponent {
  attributes: {
    name: string;
    as: string;
  }[];
  re: RegExp;
}

/**
 * This is an expanded version of `ESLintReactSettings` with all shorthand properties expanded.
 * @internal
 */
export interface ESLintReactSettingsExpanded extends ESLintReactSettings {
  additionalComponents: CustomComponentExpanded[];
  components: Map<string, string>;
}

/**
 * A helper function to define settings for "react-x" with type checking in JavaScript files.
 * @param settings The settings.
 * @returns The settings.
 */
export const defineSettings: (settings: ESLintReactSettings) => ESLintReactSettings = F.identity;

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

/**
 * Unsafely casts settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export function unsafeCastSettings(data: unknown): PartialDeep<ESLintReactSettings> {
  // @ts-expect-error - skip type checking for unsafe cast
  // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
  return Data.struct(data?.["react-x"] ?? {}) as PartialDeep<ESLintReactSettings>;
}

/**
 * Expands the settings by converting all shorthand properties to their full form.
 * @param settings The settings.
 * @returns The expanded settings.
 * @internal
 */
export const expandSettings = memoize(
  (settings: ESLintReactSettings): ESLintReactSettingsExpanded => {
    const additionalComponents = settings.additionalComponents ?? [];
    return Data.struct<ESLintReactSettingsExpanded>({
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
  },
  { isEqual: shallowEqual },
);
