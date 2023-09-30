import type { ESLintUtils } from "@typescript-eslint/utils";

export type Cond = "always" | "never";

export type Severity = "error" | "off" | "warn";

export type RuleDeclaration = [Severity, Record<string, unknown>?] | Severity;

export type RulePreset = Record<string, RuleDeclaration>;

export type CreateRule = Parameters<
    ReturnType<typeof ESLintUtils.RuleCreator>
>[0]["create"];

export type RuleContext = Parameters<CreateRule>[0];
export type RuleOptions = Parameters<CreateRule>[1];
