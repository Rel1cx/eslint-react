import type { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

export interface ERSemanticNode {
  _: string;
  id: O.Option<TSESTree.Identifier | TSESTree.Identifier[]>;
  kind: string;
  name: O.Option<string>;
  node: TSESTree.Node;
  flag: bigint;
  hint: bigint;
}
