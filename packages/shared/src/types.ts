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
 * Rule namespace.
 * @since 0.0.1
 */
export type RuleNamespace = "x" | "dom" | "web-api" | "hooks-extra" | "naming-convention" | "debug";

/**
 * Rule feature.
 * @since 1.20.0
 */
export type RuleFeature =
  | "CFG" // Configurable
  | "DBG" // Debugging
  | "FIX" // Fixable
  | "MOD" // Codemod
  | "TSC"; // TypeScript Type Checking

/**
 * Rule status.
 * @since 1.36.0
 */
export type RuleStatus =
  | "stable" // Stable
  | "experimental" // Experimental
  | "deprecated" // Deprecated
  | "removed"; // Removed
