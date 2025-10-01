import type { RuleContext } from "@eslint-react/kit";
import { findProperty, findVariable, getVariableDefinitionNode } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import type { Scope } from "@typescript-eslint/scope-manager";
import { getJsxAttributeName } from "./jsx-attribute-name";

/**
 * Get a function to find JSX attributes by name, considering direct attributes and spread attributes.
 * @param context The ESLint rule context
 * @param node The JSX element node
 * @param initialScope Optional initial scope for variable resolution
 * @returns A function that takes an attribute name and returns the corresponding JSX attribute node or undefined
 */
export function getJsxAttribute(context: RuleContext, node: TSESTree.JSXElement, initialScope?: Scope) {
  const scope = initialScope ?? context.sourceCode.getScope(node);
  const attributes = node.openingElement.attributes;
  /**
   * Find a JSX attribute by name, considering both direct attributes and spread attributes.
   * @param name The name of the attribute to find
   * @returns The JSX attribute node if found, otherwise undefined
   */
  return (name: string) => {
    return attributes.findLast((attr) => {
      // Case 1: Direct JSX attribute (e.g., className="value")
      if (attr.type === T.JSXAttribute) {
        return getJsxAttributeName(context, attr) === name;
      }
      switch (attr.argument.type) {
        // Case 2: Spread from variable (e.g., {...props})
        case T.Identifier: {
          const variable = findVariable(attr.argument.name, scope);
          const variableNode = getVariableDefinitionNode(variable, 0);
          if (variableNode?.type === T.ObjectExpression) {
            return findProperty(name, variableNode.properties, scope) != null;
          }
          return false;
        }
        // Case 3: Spread from object literal (e.g., {{...{prop: value}}})
        case T.ObjectExpression:
          return findProperty(name, attr.argument.properties, scope) != null;
      }
      return false;
    });
  };
}
