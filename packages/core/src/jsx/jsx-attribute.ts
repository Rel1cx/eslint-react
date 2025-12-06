import type { RuleContext } from "@eslint-react/shared";
import { findProperty, findVariable, getVariableDefinitionNode } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import type { Scope } from "@typescript-eslint/scope-manager";
import { getJsxAttributeName } from "./jsx-attribute-name";

/**
 * Creates a helper function to find a specific JSX attribute by name
 * Handles direct attributes and spread attributes (variables or object literals)
 * @param context The ESLint rule context
 * @param node The JSX element node
 * @param initialScope (Optional) The initial scope to use for variable resolution
 */
export function getJsxAttribute(context: RuleContext, node: TSESTree.JSXElement, initialScope?: Scope) {
  const scope = initialScope ?? context.sourceCode.getScope(node);
  const attributes = node.openingElement.attributes;

  /**
   * Finds the last occurrence of a specific attribute
   * @param name The attribute name to search for
   */
  return (name: string) => {
    return attributes.findLast((attr) => {
      // 1. Direct attribute: className="value"
      if (attr.type === T.JSXAttribute) {
        return getJsxAttributeName(context, attr) === name;
      }

      switch (attr.argument.type) {
        // 2. Spread variable: {...props}
        case T.Identifier: {
          const variable = findVariable(attr.argument.name, scope);
          const variableNode = getVariableDefinitionNode(variable, 0);

          // Check if the variable resolves to an object with the target property
          if (variableNode?.type === T.ObjectExpression) {
            return findProperty(name, variableNode.properties, scope) != null;
          }
          return false;
        }

        // 3. Spread literal: {{...{prop: value}}}
        case T.ObjectExpression:
          return findProperty(name, attr.argument.properties, scope) != null;
      }
      return false;
    });
  };
}
