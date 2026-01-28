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
  node: TSESTree.CallExpression;
  callee: TSESTree.Node;
  phase: ComponentPhaseKind;
  timerId: TSESTree.Node;
}
