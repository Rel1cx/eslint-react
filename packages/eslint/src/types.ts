import type * as tseslint from "@typescript-eslint/utils/ts-eslint";

/**
 * Represents the ESLint rule context.
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
 * Represents the feature of a rule.
 * @since 1.20.0
 */
export type RuleFeature =
  | "CFG" // Configurable
  | "DBG" // Debugging
  | "FIX" // Fixable
  | "MOD" // Codemod
  | "TSC" // TypeScript Type Checking
  | "EXP"; // Experimental

export type { ReportFixFunction, RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
