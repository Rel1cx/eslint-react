import { NodeType } from "@eslint-react/ast";
import { F, M, P } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Determines whether `createContext` is used
 * @param node The AST node to check
 * @returns `true` if the node is a call expression to `createContext`
 */
export function isCreateContext(node: TSESTree.Node) {
  if ("init" in node) {
    return M.match(node.init)
      .with({ type: NodeType.CallExpression, callee: { name: "createContext" } }, F.constTrue)
      .with(
        { callee: { type: NodeType.MemberExpression, property: { name: "createContext" } } },
        F.constTrue,
      )
      .otherwise(F.constFalse);
  }

  if (
    "expression" in node
    && P.isObject(node.expression)
    && node.expression.type === NodeType.AssignmentExpression
    && node.expression.operator === "="
  ) {
    return M.match(node.expression.right)
      .with({ type: NodeType.CallExpression, callee: { name: "createContext" } }, F.constTrue)
      .with(
        { callee: { type: NodeType.MemberExpression, property: { name: "createContext" } } },
        F.constTrue,
      )
      .otherwise(F.constFalse);
  }

  return false;
}
