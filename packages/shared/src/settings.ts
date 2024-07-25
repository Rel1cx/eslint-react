import memoize from "micro-memoize";
import { parse } from "valibot";

import type { ESLintReactSettings } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

export function decodeSettings(data: unknown): ESLintReactSettings {
  return parse(ESLintSettingsSchema, data)["react-x"] ?? {};
}

export const expandSettings = memoize((settings: ESLintReactSettings): ESLintReactSettings => {
  if (Object.keys(settings).length === 0) return {};
  return {
    ...settings,
    additionalComponents: settings.additionalComponents?.map((component) => ({
      ...component,
      attributes: component.attributes?.map((attr) => ({
        ...attr,
        as: attr.as ?? attr.name,
      })) ?? [],
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
