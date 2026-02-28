import type { TSESTree } from "@typescript-eslint/types";

import type { ComponentPhaseKind } from "./component-phase";

export type EventListenerEntry =
  | {
    type: TSESTree.Node;
    callee: TSESTree.Node;
    capture: boolean | null;
    listener: TSESTree.Node;
    method: "addEventListener";
    node: TSESTree.CallExpression | TSESTree.Identifier;
    phase: ComponentPhaseKind;
    signal: TSESTree.Node | null;
  }
  | {
    type: TSESTree.Node;
    callee: TSESTree.Node;
    capture: boolean | null;
    listener: TSESTree.Node;
    method: "removeEventListener";
    node: TSESTree.CallExpression | TSESTree.Identifier;
    phase: ComponentPhaseKind;
  };
