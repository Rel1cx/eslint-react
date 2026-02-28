import type { TSESTree } from "@typescript-eslint/types";

/**
 * Represents a semantic node in the AST
 * This is the base interface for all semantic nodes in the React semantic analysis
 */
export interface SemanticNode {
  /** The identifier of the node */
  id: null | TSESTree.Node;
  /** The unique key of the node */
  key: string;
  /** The kind of the node */
  kind: string;
  /** The name of the node */
  name: null | string;
  /** The flag of the node */
  flag: bigint;
  /** The hint of the node */
  hint: bigint;
  /** The AST node */
  node: TSESTree.Node;
}
