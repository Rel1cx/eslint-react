import type * as tseslint from "@typescript-eslint/utils/ts-eslint";

/**
 * Rule severity.
 * @since 0.0.1
 */
export type SeverityName = "off" | "warn" | "error";

/**
 * The numeric severity level for a rule.
 *
 * - `0` means off.
 * - `1` means warn.
 * - `2` means error.
 */
export type SeverityLevel = 0 | 1 | 2;

/**
 * The severity of a rule in a configuration.
 */
export type Severity = SeverityName | SeverityLevel;

/**
 * Rule declaration.
 * @internal
 * @since 0.0.1
 */
export type RuleConfig<RuleOptions extends unknown[] = unknown[]> = Severity | [Severity, ...Partial<RuleOptions>];

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

export type { ReportFixFunction, RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

/**
 * A suggestion for fixing a reported issue.
 */
export type RuleSuggest<MessageIds extends string = string> = {
  /** The message ID for the suggestion. */
  messageId: MessageIds;
  /** Optional data to pass to the message formatter. */
  data?: Record<string, unknown>;
  /** The fix function to apply the suggestion. */
  fix: tseslint.ReportFixFunction;
};

/**
 * A collection of settings.
 */
export interface SettingsConfig {
  [key: string]: unknown;
}
