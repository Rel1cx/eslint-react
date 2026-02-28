import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { getUnderlyingExpression } from "./node-unwrap";

/**
 * Get the root identifier of a (possibly nested) member expression.
 * For `a.b.c`, returns the `a` Identifier node.
 * @param node The expression to analyze
 * @returns The root Identifier node, or null if it cannot be determined (e.g. non-identifier root)
 */
export function getRootIdentifier(node: TSESTree.Expression | TSESTree.PrivateIdentifier): TSESTree.Identifier | null {
  const expr = getUnderlyingExpression(node);
  switch (expr.type) {
    case AST.Identifier:
      return expr;
    case AST.MemberExpression:
      return getRootIdentifier(expr.object);
    default:
      return null;
  }
}
