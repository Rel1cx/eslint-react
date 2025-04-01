import type { SharedConfigurationSettings } from "@typescript-eslint/utils/ts-eslint"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { type InferOutput, parse } from "valibot";
import { LanguagePreferenceSchema } from "./LanguagePreferenceSchema";

/**
 * @internal
 */
export type LanguagePreference = InferOutput<typeof LanguagePreferenceSchema>;

/**
 * The default language preference.
 */
export const DEFAULT_LANGUAGE_PREFERENCE = parse(LanguagePreferenceSchema, {});

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    // TODO: Add the language preference to the shared configuration settings when it is ready.
    // languagePreference?: Partial<LanguagePreference>;
  }
}
