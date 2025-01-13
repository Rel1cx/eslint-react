import type { ESLintUtils } from "@typescript-eslint/utils";

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
 * Rule creator function.
 * @since 0.0.1
 * @internal
 */
type RuleCreator = Parameters<ReturnType<typeof ESLintUtils.RuleCreator>>[0]["create"];

/**
 * Rule context.
 * @since 0.0.1
 */
export type RuleContext = Parameters<RuleCreator>[0];

/**
 * Rule options.
 * @since 0.0.1
 */
export type RuleOptions = Parameters<RuleCreator>[1];

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
  | "CHK" // Checking
  | "DBG" // Debugging
  | "FIX" // Fixable
  | "MOD" // Codemod
  | "TSC"; // TypeScript Type Checking
