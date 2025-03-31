import type { _ } from "@eslint-react/eff";
import type * as tseslint from "@typescript-eslint/utils/ts-eslint";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";

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

/**
 * Creates a report function that can conditionally report a descriptor.
 * @param context - The context of the rule
 * @returns A function that takes a descriptor and reports it if it's not null or undefined
 */
export function createReport<MessageID extends string>(context: RuleContext) {
  return (descriptor: _ | null | ReportDescriptor<MessageID>) => {
    if (descriptor != null) context.report(descriptor);
  };
}
