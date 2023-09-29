import type { TSESLint } from "@typescript-eslint/utils";

export type RuleContext = Readonly<TSESLint.RuleContext<string, readonly unknown[]>>;
