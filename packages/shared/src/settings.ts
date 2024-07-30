import memoize from "micro-memoize";
import pm from "picomatch";
import { parse } from "valibot";

import type { CustomComponent, ESLintReactSettings } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

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
}

/**
 * Decodes settings from a data object from `context.settings`.
 * @param data The data object.
 * @returns settings The settings.
 * @internal
 */
export function decodeSettings(data: unknown): ESLintReactSettings {
  return parse(ESLintSettingsSchema, data)["react-x"] ?? {};
}

/**
 * Expands the settings by converting all shorthand properties to their full form.
 * @param settings The settings.
 * @returns The expanded settings.
 * @internal
 */
export const expandSettings = memoize((settings: ESLintReactSettings): ESLintReactSettingsExpanded => {
  return {
    ...settings,
    additionalComponents: settings.additionalComponents?.map((component) => ({
      ...component,
      attributes: component.attributes?.map((attr) => ({
        ...attr,
        as: attr.as ?? attr.name,
      })) ?? [],
      re: pm.makeRe(component.name, { fastpaths: true }),
    })) ?? [],
  };
}, { isDeepEqual: false });

/**
 * The default ESLint settings for "react-x".
 */
export const DEFAULT_ESLINT_REACT_SETTINGS = {
  additionalHooks: {
    useLayoutEffect: [
      "useIsomorphicLayoutEffect",
    ],
  },
  polymorphicPropName: "as",
  version: "detect",
} as const as ESLintReactSettings;
