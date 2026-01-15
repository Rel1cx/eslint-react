import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

export interface SemanticNode {
  id:
    | unit
    | TSESTree.Node;
  key: string;
  kind: string;
  name:
    | unit
    | string;
  node: TSESTree.Node;
  flag: bigint;
  hint: bigint;
}
