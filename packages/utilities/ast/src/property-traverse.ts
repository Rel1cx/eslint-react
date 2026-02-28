import { AST_NODE_TYPES as AST, TSESTree } from "@typescript-eslint/types";

import { getPropertyName } from "./property-name";

/**
 * Recursively traverses an object expression's properties to find a property with the specified name
 * @param properties The properties of the object expression to traverse
 * @param name The name of the property to find
 * @returns The matching property node, or null if not found
 */
export function findProperty(properties: TSESTree.ObjectLiteralElement[], name: string): TSESTree.Property | null {
  for (const prop of properties) {
    // Direct property match
    if (prop.type === AST.Property && getPropertyName(prop.key) === name) return prop;
    // Handle spread element: {...{...{...{ foo: "bar" }}}}
    if (prop.type === AST.SpreadElement && prop.argument.type === AST.ObjectExpression) {
      const found = findProperty(prop.argument.properties, name);
      if (found != null) return found;
    }
  }
  return null;
}
