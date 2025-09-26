import type { SemanticEntry } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";

import type { TimerKind } from "./TimerKind";

export interface TimerEntry extends SemanticEntry {
  kind: TimerKind;
  node: TSESTree.CallExpression;
  callee: TSESTree.Node;
  timerId: TSESTree.Node;
}
