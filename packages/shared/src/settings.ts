import memoize from "micro-memoize";
import pm from "picomatch";
import { parse } from "valibot";

import type { CustomComponent, ESLintReactSettings, ESLintSettings } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

/**
 * The initial settings for "react-x".
 */
export const INITIAL_ESLINT_REACT_SETTINGS = {
  skipImportCheck: true,
} as const satisfies ESLintReactSettings;

/**
 * The default ESLint settings for "react-x".
 */
export const DEFAULT_ESLINT_REACT_SETTINGS = {
  additionalHooks: {
    useLayoutEffect: ["useIsomorphicLayoutEffect"],
  },
  polymorphicPropName: "as",
  skipImportCheck: true,
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
 * Defines the "react-x" settings in a type-safe way.
 * @param settings The settings.
 * @returns The ESLint settings containing the "react-x" object.
 */
export function defineSettings(settings: ESLintReactSettings) {
  return parse(ESLintSettingsSchema, settings)["react-x"] ?? {};
}

/**
 * Decodes settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export function decodeSettings(data: unknown): ESLintReactSettings {
  return {
    ...INITIAL_ESLINT_REACT_SETTINGS,
    ...parse(ESLintSettingsSchema, data)["react-x"] ?? {},
  };
}

/**
 * Unsafely casts settings from a data object from `context.settings`.
 * @internal
 * @param data The data object.
 * @returns settings The settings.
 */
export function unsafeCastSettings(data: unknown): ESLintReactSettings {
  return {
    ...INITIAL_ESLINT_REACT_SETTINGS,
    // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
    ...(data as ESLintSettings)?.["react-x"] ?? {},
  };
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
    return {
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
    };
  },
  { isDeepEqual: false },
);
