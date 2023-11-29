import { NodeType } from "@eslint-react/ast";
import { F, Pred } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

/**
 * Determines whether `createContext` is used
 * @param node The AST node to check
 * @returns `true` if the node is a call expression to `createContext`
 */
export function isCreateContext(node: TSESTree.Node) {
  if ("init" in node) {
    return match(node.init)
      .with({ type: NodeType.CallExpression, callee: { name: "createContext" } }, F.constTrue)
      .with(
        { callee: { type: NodeType.MemberExpression, property: { name: "createContext" } } },
        F.constTrue,
      )
      .otherwise(F.constFalse);
  }

  if (
    "expression" in node
    && Pred.isObject(node.expression)
    && node.expression.type === NodeType.AssignmentExpression
    && node.expression.operator === "="
  ) {
    return match(node.expression.right)
      .with({ type: NodeType.CallExpression, callee: { name: "createContext" } }, F.constTrue)
      .with(
        { callee: { type: NodeType.MemberExpression, property: { name: "createContext" } } },
        F.constTrue,
      )
      .otherwise(F.constFalse);
  }

  return false;
}
