import type { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

export interface ERSemanticNode {
  _: string;
  id:
    | _
    | TSESTree.Identifier
    | TSESTree.Identifier[];
  kind: string;
  name:
    | _
    | string;
  node: TSESTree.Node;
  flag: bigint;
  hint: bigint;
}
