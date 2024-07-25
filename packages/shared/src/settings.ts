import memoize from "micro-memoize";
import picomatch from "picomatch";
import { parse } from "valibot";

import type { ESLintReactSettings } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

export function decodeSettings(data: unknown): ESLintReactSettings {
  return parse(ESLintSettingsSchema, data)["react-x"] ?? {};
}

export const expandSettings = memoize((settings: ESLintReactSettings): ESLintReactSettings => {
  return {
    ...settings,
    additionalComponents: settings.additionalComponents?.map((component) => ({
      ...component,
      attributes: component.attributes?.map((attr) => ({
        ...attr,
        as: attr.as ?? attr.name,
      })) ?? [],
      re: picomatch.parse(component.name).output,
    })) ?? [],
  };
}, { isDeepEqual: false });

export const DEFAULT_ESLINT_REACT_SETTINGS = {
  additionalComponents: [
    {
      name: "Link",
      as: "a",
      attributes: [
        {
          name: "to",
          as: "href",
        },
      ],
    },
  ],
  additionalHooks: {
    useLayoutEffect: [
      "useIsomorphicLayoutEffect",
    ],
  },
  version: "detect",
} as const as ESLintReactSettings;
