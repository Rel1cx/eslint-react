import { Extract } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function findProperty(of: TSESTree.ObjectLiteralElement[], named: string): TSESTree.Property | null {
  for (const property of of) {
    if (property.type === AST.Property && Extract.propertyName(property.key) === named) {
      return property;
    }
    if (property.type === AST.SpreadElement && property.argument.type === AST.ObjectExpression) {
      const found = findProperty(property.argument.properties, named);
      if (found != null) return found;
    }
  }
  return null;
}
