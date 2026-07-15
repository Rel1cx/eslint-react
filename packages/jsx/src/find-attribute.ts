import { type TSESTreeJSXAttributeLike } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getAttributeName } from "./get-attribute-name";

/**
 * Find a JSX attribute (or spread attribute containing the property) by name on a given element
 *
 * Returns the last matching attribute to mirror React's behavior where later props win,
 * or `undefined` when the attribute is not present.
 *
 * Spread attributes are resolved when possible: if the spread argument is an identifier
 * that resolves to an object expression, the object's properties are searched for a matching key.
 * Nested object expressions and nested spread identifiers are also resolved.
 * @param context The ESLint rule context (needed for variable resolution in spread attributes)
 * @param element The `JSXElement` node to search
 * @param name The attribute name to look for (ex: "className")
 * @returns The matching `JSXAttribute` or `JSXSpreadAttribute`, or `undefined` when not found
 */
export function findAttribute(
  context: RuleContext,
  element: TSESTree.JSXElement,
  name: string,
): TSESTreeJSXAttributeLike | undefined {
  function findProperty(
    properties: TSESTree.ObjectLiteralElement[],
    name: string,
    seen: Set<TSESTree.Node> = new Set(),
  ): TSESTree.Property | null {
    for (const property of properties) {
      if (property.type === AST.Property && !property.computed && property.key.type === AST.Identifier && property.key.name === name) {
        return property;
      }
      if (property.type !== AST.SpreadElement) continue;
      const argument = property.argument;
      if (argument.type === AST.Identifier) {
        const initNode = resolve(context, argument);
        if (initNode?.type === AST.ObjectExpression) {
          if (seen.has(initNode)) continue;
          seen.add(initNode);
          const found = findProperty(initNode.properties, name, seen);
          if (found != null) return found;
        }
        continue;
      }
      if (argument.type === AST.ObjectExpression) {
        if (seen.has(argument)) continue;
        seen.add(argument);
        const found = findProperty(argument.properties, name, seen);
        if (found != null) return found;
      }
    }
    return null;
  }
  return element.openingElement.attributes.findLast((attr) => {
    if (attr.type === AST.JSXAttribute) {
      return getAttributeName(attr) === name;
    }
    switch (attr.argument.type) {
      case AST.Identifier: {
        const initNode = resolve(context, attr.argument);
        if (initNode?.type === AST.ObjectExpression) {
          return findProperty(initNode.properties, name) != null;
        }
        return false;
      }
      case AST.ObjectExpression:
        return findProperty(attr.argument.properties, name) != null;
    }
    return false;
  });
}
