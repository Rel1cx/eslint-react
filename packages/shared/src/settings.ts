import { E, F } from "@eslint-react/eff";
import pm from "picomatch";
import { match, P } from "ts-pattern";
import { assert } from "valibot";

import { normalizedSettingsCache } from "./cache";
import { getReactVersion } from "./get-react-version";
import type { ESLintReactSettings, ESLintReactSettingsNormalized } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

/**
 * The default ESLint settings for "react-x".
 */
export const DEFAULT_ESLINT_REACT_SETTINGS = {
  additionalHooks: {
    useLayoutEffect: ["useIsomorphicLayoutEffect"],
  },
  polymorphicPropName: "as",
  strictImportCheck: false,
  version: "detect",
} as const satisfies ESLintReactSettings;

/**
 * Get the normalized ESLint settings for "react-x" from the given context.
 * @param context The context.
 * @param context.settings The ESLint settings.
 * @returns The normalized ESLint settings.
 */
export function getSettingsFromContext(context: { settings: unknown }): ESLintReactSettingsNormalized {
  assert(ESLintSettingsSchema, context.settings);
  const raw = context.settings?.["react-x"] ?? {};
  const memoized = normalizedSettingsCache.get(raw);
  if (memoized) {
    return memoized;
  }
  const rawWithDefaults = {
    ...DEFAULT_ESLINT_REACT_SETTINGS,
    ...raw,
  };
  const additionalComponents = rawWithDefaults.additionalComponents ?? [];
  const normalized = {
    ...rawWithDefaults,
    additionalComponents: additionalComponents.map((component) => ({
      ...component,
      attributes: component.attributes?.map((attr) => ({
        ...attr,
        as: attr.as ?? attr.name,
      })) ?? [],
      re: pm.makeRe(component.name, { fastpaths: true }),
    })),
    components: additionalComponents.reduce((acc, component) => {
      const { name, as, attributes = [], selector } = component;
      if (!name || !as || selector || attributes.length > 0) return acc;
      if (!/^[\w-]+$/u.test(name)) return acc;
      return acc.set(name, as);
    }, new Map<string, string>()),
    version: match(rawWithDefaults.version)
      .with(P.union(P.nullish, "", "detect"), () => E.getOrElse(getReactVersion(), F.constant("19.0.0")))
      .otherwise(F.identity),
  };
  normalizedSettingsCache.set(raw, normalized);
  return normalized;
}

/**
 * A helper function to define settings for "react-x" with type checking in JavaScript files.
 * @param settings The settings.
 * @returns The settings.
 */
export const defineSettings: (settings: ESLintReactSettings) => ESLintReactSettings = F.identity;

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    // eslint-disable-next-line no-restricted-syntax
    "react-x"?: Partial<ESLintReactSettings>;
  }
}
