import { parse } from "valibot";

import type { ESLintReactSettings, ESLintSettings } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

export function parseESLintSettings(data: unknown): ESLintSettings {
  return parse(ESLintSettingsSchema, data);
}

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
