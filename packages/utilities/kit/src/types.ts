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

export type RulePolicy = number;

export type RuleSuggest<MessageIds extends string = string> = {
  messageId: MessageIds;
  data?: Record<string, unknown>;
  fix: tseslint.ReportFixFunction;
};

/**
 * A collection of settings.
 */
export interface SettingsConfig {
  [key: string]: unknown;
}

/*
 * The following types that are intentionally wide/inaccurate, that exist
 * for the purpose of satisfying both `defineConfig()` and `tseslint.config()`.
 * See https://github.com/typescript-eslint/typescript-eslint/issues/10899
 */

export interface CompatibleRule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (...args: any[]) => any;
}

export interface CompatiblePlugin {
  meta: {
    name: string;
    version: string;
  };
  rules: Record<string, CompatibleRule>;
}

export interface CompatibleConfig {
  name?: string;
  rules?: Record<string, RuleConfig>;
  settings?: SettingsConfig;
}
