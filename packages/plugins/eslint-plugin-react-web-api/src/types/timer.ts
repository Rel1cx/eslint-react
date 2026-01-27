import type { ComponentPhaseKind } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";

export type TimerKind =
  | "timeout"
  | "interval"
  | "immediate"
  | "animationFrame"
  | "idleCallback";

export interface TimerEntry {
  kind: TimerKind;
  node: TSESTree.CallExpression;
  callee: TSESTree.Node;
  phase: ComponentPhaseKind;
  timerId: TSESTree.Node;
}
