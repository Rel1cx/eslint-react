import { Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function findProperty(of: TSESTree.ObjectLiteralElement[], named: string): TSESTree.Property | null {
  for (const property of of) {
    if (property.type === AST.Property && Extract.getPropertyName(property.key) === named) {
      return property;
    }
    if (property.type === AST.SpreadElement && property.argument.type === AST.ObjectExpression) {
      const found = findProperty(property.argument.properties, named);
      if (found != null) return found;
    }
  }
  return null;
}

export function resolveToObjectExpression(context: RuleContext, node: TSESTree.Node): TSESTree.ObjectExpression | null {
  switch (node.type) {
    case AST.ObjectExpression:
      return node;
    case AST.Identifier: {
      const resolved = resolve(context, node);
      if (resolved?.type === AST.ObjectExpression) {
        return resolved;
      }
      return null;
    }
    default:
      return null;
  }
}
