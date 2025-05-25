import * as z from "zod";

/**
 * @internal
 */
export const LanguagePreferenceSchema = z.object({
  indentStyle: z.optional(
    z.union([
      z.literal("tab"),
      z.literal("space"),
    ]),
  ),
  indentWidth: z.optional(z.number()),
  quoteStyle: z.optional(
    z.union([
      z.literal("single"),
      z.literal("double"),
    ]),
  ),
  semicolons: z.optional(
    z.union([
      z.literal("always"),
      z.literal("asNeeded"),
    ]),
  ),
  trailingCommas: z.optional(
    z.union([
      z.literal("all"),
      z.literal("es5"),
      z.literal("none"),
    ]),
  ),

  // JSX specific options
  jsxQuoteStyle: z.optional(
    z.union([
      z.literal("single"),
      z.literal("double"),
    ]),
  ),
}, {});
