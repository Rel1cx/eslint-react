import type { SharedConfigurationSettings } from "@typescript-eslint/utils/ts-eslint"; // eslint-disable-line @typescript-eslint/no-unused-vars
import type * as z from "zod";
import type { LanguagePreferenceSchema } from "./LanguagePreferenceSchema";

/**
 * @internal
 */
export type LanguagePreference = z.infer<typeof LanguagePreferenceSchema>;

/**
 * Get a copy of the default LanguagePreference.
 */
export function make(): LanguagePreference {
  return {
    indentStyle: "space",
    indentWidth: 2,
    jsxQuoteStyle: "double",
    quoteStyle: "single",
    semicolons: "always",
    trailingCommas: "all",
  };
}

export function getFromContext() {
  throw new Error("getFromContext is not implemented");
}

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    // TODO: Add the language preference to the shared configuration settings when it is ready.
    // languagePreference?: Partial<LanguagePreference>;
  }
}
