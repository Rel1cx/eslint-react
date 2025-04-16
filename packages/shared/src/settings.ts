import type { _ } from "@eslint-react/eff";
import type { ESLint, SharedConfigurationSettings } from "@typescript-eslint/utils/ts-eslint"; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { PartialDeep } from "type-fest";
import type { CustomHooks, ESLintReactSettings, ESLintSettings } from "./schemas";
import { getOrElseUpdate, identity } from "@eslint-react/eff";
import { RegExp as RE, type RuleContext } from "@eslint-react/kit";

import { match, P } from "ts-pattern";
import { getReactVersion } from "./get-react-version";
import {
  DEFAULT_ESLINT_REACT_SETTINGS,
  DEFAULT_ESLINT_SETTINGS,
  isESLintReactSettings,
  isESLintSettings,
} from "./schemas";

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

export interface ESLintReactSettingsNormalized {
  additionalComponents: CustomComponentNormalized[];
  additionalHooks: CustomHooks;
  importSource: string;
  polymorphicPropName: string | _;
  skipImportCheck: boolean;
  strict: boolean;
  version: string;
}

export const coerceESLintSettings = (settings: unknown): PartialDeep<ESLintSettings> => {
  return settings as PartialDeep<ESLintSettings>;
};

export const decodeESLintSettings = (settings: unknown): ESLintSettings => {
  if (isESLintSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_SETTINGS;
};

export const coerceSettings = (settings: unknown): PartialDeep<ESLintReactSettings> => {
  return settings as PartialDeep<ESLintReactSettings>;
};

export const decodeSettings = (settings: unknown): ESLintReactSettings => {
  if (isESLintReactSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_REACT_SETTINGS;
};

export const normalizeSettings = ({
  additionalComponents = [],
  additionalHooks = {},
  importSource = "react",
  polymorphicPropName = "as",
  skipImportCheck = true,
  strict = true,
  version,
  ...rest
}: ESLintReactSettings) => {
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
    strict,
    version: match(version)
      .with(P.union(P.nullish, "", "detect"), () => getReactVersion("19.1.0"))
      .otherwise(identity),
  } as const satisfies ESLintReactSettingsNormalized;
};

const cache = new Map<unknown, ESLintReactSettingsNormalized>();

export function getSettingsFromContext(context: RuleContext): ESLintReactSettingsNormalized {
  const settings = context.settings;
  return getOrElseUpdate(
    cache,
    settings["react-x"],
    () => normalizeSettings(decodeSettings(settings["react-x"])),
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
