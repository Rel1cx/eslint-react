import type * as tseslint from "@typescript-eslint/utils/ts-eslint";

/**
 * Rule severity.
 * @since 0.0.1
 */
export type RuleSeverity = "error" | "off" | "warn";

/**
 * Rule declaration.
 * @internal
 * @since 0.0.1
 */
export type RuleDeclaration = [RuleSeverity, Record<string, unknown>?] | RuleSeverity;

/**
 * Rule config preset.
 * @since 0.0.1
 */
export type RulePreset = Record<string, RuleDeclaration>;

/**
 * Rule context.
 * @since 0.0.1
 */
export type RuleContext<
  MessageIds extends string = string,
  Options extends readonly unknown[] = readonly unknown[],
> = tseslint.RuleContext<
  MessageIds,
  Options
>;

/**
 * Rule feature.
 * @since 1.20.0
 */
export type RuleFeature =
  | "CFG" // Configurable
  | "DBG" // Debugging
  | "FIX" // Fixable
  | "MOD" // Codemod
  | "TSC" // TypeScript Type Checking
  | "EXP"; // Experimental

export type RulePolicy = "prefer" | "avoid";
