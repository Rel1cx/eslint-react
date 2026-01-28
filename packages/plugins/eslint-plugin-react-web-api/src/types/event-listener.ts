import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { ComponentPhaseKind } from "./component-phase";

export type EventListenerEntry =
  | {
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: boolean | unit;
    listener: TSESTree.Node;
    method: "addEventListener";
    phase: ComponentPhaseKind;
    signal: TSESTree.Node | unit;
  }
  | {
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: boolean | unit;
    listener: TSESTree.Node;
    method: "removeEventListener";
    phase: ComponentPhaseKind;
  };
