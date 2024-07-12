import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export interface ERSemanticNode {
  _: string;
  flag: bigint;
  hint: bigint;
  id: O.Option<TSESTree.Identifier | TSESTree.Identifier[]>;
  kind: string;
  name: O.Option<string>;
  node: TSESTree.Node;
}
