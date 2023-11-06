export type RuleCategory =
  | "complexity" // Rules to indicate code that does something simple but in a complex way or help prevent complex code
  | "correctness" // Rules to indicate code that is outright wrong or useless
  | "deprecated" // Rules that already deprecated and should not be used
  | "nursery" // New rules that are still under development
  | "pedantic" // Rules which are rather strict or might have false positives
  | "perf" // Rules to indicate performance issues
  | "restriction" // Rules that apply additional restrictions on the code (e.g. ban-html-props, ban-svg-props)
  | "security" // Rules to indicate security issues (e.g. no-missing-iframe-sandbox)
  | "style" // Rules that enforce a specific style (e.g. prefer-shorthand-boolean, prefer-shorthand-fragment) (not code formatting like wrap or indent)
  | "suspicious" // Rules that help prevent suspicious code that is most likely wrong or useless (e.g. no-constructed-context-value)
  | "verbose"; // Rules to log verbose information (e.g. debug-function-component)
