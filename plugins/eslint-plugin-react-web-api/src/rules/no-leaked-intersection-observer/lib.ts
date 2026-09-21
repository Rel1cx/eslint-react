import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function isNewObserver(node: TSESTree.Node | null, name: string) {
  if (node?.type !== AST.NewExpression) return false;
  const callee = Extract.unwrap(node.callee);
  return Check.isIdentifier(callee, name);
}

export function isFromObserver(context: RuleContext, node: TSESTree.Expression, name: string): boolean {
  switch (true) {
    case Check.isIdentifier(node): {
      const initNode = resolve(context, node);
      const unwrapped = initNode == null ? null : Extract.unwrap(initNode);
      return isNewObserver(unwrapped, name);
    }
    case node.type === AST.MemberExpression:
      return isFromObserver(context, node.object, name);
    default:
      return false;
  }
}
