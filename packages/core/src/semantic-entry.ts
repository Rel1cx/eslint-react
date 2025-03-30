import type { TSESTree } from "@typescript-eslint/types";

import type { ComponentPhaseKind } from "./component/component-phase";

export interface SemanticEntry {
  // kind: string;
  node: TSESTree.Node;
  phase: ComponentPhaseKind;
}
