import type { SharedConfigurationSettings } from "@typescript-eslint/utils/ts-eslint"; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { LanguagePreferenceSchema } from "./LanguagePreferenceSchema";
import { type InferOutput } from "valibot";

/**
 * @internal
 */
export type LanguagePreference = InferOutput<typeof LanguagePreferenceSchema>;

/**
 * The default language preference.
 */
export const DEFAULT_LANGUAGE_PREFERENCE = {
  indentStyle: "space",
  indentWidth: 2,
  jsxQuoteStyle: "double",
  quoteStyle: "single",
  semicolons: "always",
  trailingCommas: "all",
} as const satisfies LanguagePreference;

/**
 * Get a copy of the default LanguagePreference.
 */
export function make(): LanguagePreference {
  return {
    ...DEFAULT_LANGUAGE_PREFERENCE,
  };
}

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    // TODO: Add the language preference to the shared configuration settings when it is ready.
    // languagePreference?: Partial<LanguagePreference>;
  }
}
