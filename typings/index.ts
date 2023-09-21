export * from "./json-value";
export * from "./react-settings";
export * from "./rule-context";
export * from "./rule-name";

export type Cond = "always" | "never";

export type Severity = "error" | "off" | "warn";

export type RuleDeclaration = [Severity, Record<string, unknown>?] | Severity;

export type RulePreset = Record<string, RuleDeclaration>;
