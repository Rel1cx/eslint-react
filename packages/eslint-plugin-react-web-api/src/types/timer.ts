import type { TSESTree } from "@typescript-eslint/types";

import type { ComponentPhaseKind } from "./component-phase";

export type TimerKind =
  | "timeout"
  | "interval"
  | "immediate"
  | "animationFrame"
  | "idleCallback";

export interface TimerEntry {
  kind: TimerKind;
  callee: TSESTree.Node;
  node: TSESTree.CallExpression;
  phase: ComponentPhaseKind;
  timerId: TSESTree.Node;
}
