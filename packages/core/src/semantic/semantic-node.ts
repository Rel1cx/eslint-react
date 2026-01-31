import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Represents a semantic node in the AST
 * This is the base interface for all semantic nodes in the React semantic analysis
 */
export interface SemanticNode {
  /** The identifier of the node */
  id: unit | TSESTree.Node;
  /** The unique key of the node */
  key: string;
  /** The kind of the node */
  kind: string;
  /** The name of the node */
  name: unit | string;
  /** The AST node */
  node: TSESTree.Node;
  /** The flag of the node */
  flag: bigint;
  /** The hint of the node */
  hint: bigint;
}
