import { literal, number, object, optional, union } from "valibot";

/**
 * @internal
 */
export const LanguagePreferenceSchema = object({
  indentStyle: optional(
    union([
      literal("tab"),
      literal("space"),
    ]),
    "space",
  ),
  indentWidth: optional(number(), 2),
  quoteStyle: optional(
    union([
      literal("single"),
      literal("double"),
    ]),
    "single",
  ),
  semicolons: optional(
    union([
      literal("always"),
      literal("asNeeded"),
    ]),
    "always",
  ),
  trailingCommas: optional(
    union([
      literal("all"),
      literal("es5"),
      literal("none"),
    ]),
    "all",
  ),

  // JSX specific options
  jsxQuoteStyle: optional(
    union([
      literal("single"),
      literal("double"),
    ]),
    "double",
  ),
});
