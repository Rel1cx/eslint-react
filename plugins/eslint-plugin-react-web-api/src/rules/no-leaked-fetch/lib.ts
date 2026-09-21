import { Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function resolveToObjectExpression(context: RuleContext, node: TSESTree.Node): TSESTree.ObjectExpression | null {
  node = Extract.unwrap(node);
  switch (node.type) {
    case AST.ObjectExpression:
      return node;
    case AST.Identifier: {
      let resolved = resolve(context, node);
      resolved = resolved == null ? null : Extract.unwrap(resolved);
      if (resolved?.type === AST.ObjectExpression) {
        return resolved;
      }
      return null;
    }
    default:
      return null;
  }
}
