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

function unwrapTypeExpression(node: TSESTree.Node): TSESTree.Node {
  let current = node;
  while (true) {
    switch (current.type) {
      case AST.ParenthesizedExpression:
        current = current.expression;
        continue;
      case AST.TSAsExpression:
        current = current.expression;
        continue;
      case AST.TSSatisfiesExpression:
        current = current.expression;
        continue;
      case AST.TSTypeAssertion:
        current = current.expression;
        continue;
      default:
        return current;
    }
  }
}

export function resolveToObjectExpression(context: RuleContext, node: TSESTree.Node): TSESTree.ObjectExpression | null {
  const unwrappedNode = unwrapTypeExpression(node);
  switch (unwrappedNode.type) {
    case AST.ObjectExpression:
      return unwrappedNode;
    case AST.Identifier: {
      const resolved = resolve(context, unwrappedNode);
      const unwrappedResolved = resolved == null ? null : unwrapTypeExpression(resolved);
      if (unwrappedResolved?.type === AST.ObjectExpression) {
        return unwrappedResolved;
      }
      return null;
    }
    default:
      return null;
  }
}
