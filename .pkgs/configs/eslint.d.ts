type Severity = 0 | 1 | 2;
type SeverityString = "error" | "off" | "warn";
type RuleLevel = Severity | SeverityString;
type RuleLevelAndOptions = [RuleLevel, ...unknown[]];
type RuleEntry = RuleLevel | RuleLevelAndOptions;
type RulesRecord = Partial<Record<string, RuleEntry>>;
declare const typescript: {
  rules: RulesRecord;
};

export { typescript };
