import type { TSESTree } from "@typescript-eslint/types";

import type { ERPhaseKind } from "./component/component-phase";

export interface ERSemanticEntry {
  // kind: string;
  node: TSESTree.Node;
  phase: ERPhaseKind;
}
