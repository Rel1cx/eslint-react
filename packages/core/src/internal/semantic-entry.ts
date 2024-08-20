import type { TSESTree } from "@typescript-eslint/types";

import type { PhaseKind } from "./phase";

export interface ERSemanticEntry {
  kind: string;
  node: TSESTree.Node;
  phase: PhaseKind;
}
