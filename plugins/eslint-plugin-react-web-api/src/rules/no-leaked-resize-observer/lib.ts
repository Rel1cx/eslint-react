import { Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function isNewResizeObserver(node: TSESTree.Node | null) {
  if (node?.type !== AST.NewExpression) return false;
  const callee = Extract.unwrap(node.callee);
  return callee.type === AST.Identifier
    && callee.name === "ResizeObserver";
}

export function isFromObserver(context: RuleContext, node: TSESTree.Expression): boolean {
  switch (true) {
    case node.type === AST.Identifier: {
      const initNode = resolve(context, node);
      const unwrapped = initNode == null ? null : Extract.unwrap(initNode);
      return isNewResizeObserver(unwrapped);
    }
    case node.type === AST.MemberExpression:
      return isFromObserver(context, node.object);
    default:
      return false;
  }
}
