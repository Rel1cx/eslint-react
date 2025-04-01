import { boolean, literal, number, object, optional, union } from "valibot";

/**
 * @internal
 */
export const LanguagePreferenceSchema = object({
  bracketSameLine: optional(boolean(), false),
  bracketSpacing: optional(boolean(), true),
  endOfLine: optional(
    union([
      literal("lf"),
      literal("crlf"),
      literal("cr"),
      literal("auto"),
    ]),
    "lf",
  ),
  indentStyle: optional(
    union([
      literal("tab"),
      literal("space"),
    ]),
    "space",
  ),
  indentWidth: optional(number(), 2),
  insertFinalNewline: optional(boolean(), true),
  jsxQuoteStyle: optional(
    union([
      literal("preferDouble"),
      literal("preferSingle"),
    ]),
    "preferDouble",
  ),
  quoteStyle: optional(
    union([
      literal("alwaysDouble"),
      literal("alwaysSingle"),
      literal("preferDouble"),
      literal("preferSingle"),
    ]),
    "preferSingle",
  ),
  semicolon: optional(
    union([
      literal("always"),
      literal("prefer"),
      literal("asi"),
    ]),
    "always",
  ),
  trailingComma: optional(
    union([
      literal("all"),
      literal("es5"),
      literal("none"),
    ]),
    "all",
  ),
});
