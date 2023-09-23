import type { TSESLint } from "@typescript-eslint/utils";

import type { Remap } from "../src/lib/primitives/mapping";

export type RuleContext = Remap<Readonly<TSESLint.RuleContext<string, readonly unknown[]>>>;
