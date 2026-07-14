import { Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function findProperty(node: TSESTree.ObjectLiteralElement[], name: string): TSESTree.Property | null {
  for (const property of node) {
    if (property.type === AST.Property && !property.computed && property.key.type === AST.Identifier && property.key.name === name) {
      return property;
    }
    if (property.type === AST.SpreadElement && property.argument.type === AST.ObjectExpression) {
      const found = findProperty(property.argument.properties, name);
      if (found != null) return found;
    }
  }
  return null;
}

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
