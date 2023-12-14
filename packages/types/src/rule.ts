import type { ESLintUtils } from "@typescript-eslint/utils";

/**
 * Rule severity.
 * @since 0.0.1
 */
export type Severity = "error" | "off" | "warn";

/**
 * Rule declaration.
 * @since 0.0.1
 * @internal
 */
export type RuleDeclaration = [Severity, Record<string, unknown>?] | Severity;

/**
 * Rule config preset.
 * @since 0.0.1
 */
export type RulePreset = Record<string, RuleDeclaration>;

/**
 * Rule creator function.
 * @since 0.0.1
 */
export type CreateRule = Parameters<
  ReturnType<typeof ESLintUtils.RuleCreator>
>[0]["create"];

/**
 * Rule context.
 * @since 0.0.1
 */
export type RuleContext = Parameters<CreateRule>[0];

/**
 * Rule options.
 * @since 0.0.1
 */
export type RuleOptions = Parameters<CreateRule>[1];
