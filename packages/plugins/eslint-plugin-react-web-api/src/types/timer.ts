import type { SemanticEntry } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";

export type TimerKind =
  | "timeout"
  | "interval"
  | "immediate"
  | "animationFrame"
  | "idleCallback";

export interface TimerEntry extends SemanticEntry {
  kind: TimerKind;
  node: TSESTree.CallExpression;
  callee: TSESTree.Node;
  timerId: TSESTree.Node;
}
