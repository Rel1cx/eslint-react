import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { findVariable, getVariableInitializer } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

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
      if (attr.type === AST.JSXAttribute) {
        return getJsxAttributeName(context, attr) === name;
      }

      switch (attr.argument.type) {
        // 2. Spread variable: {...props}
        case AST.Identifier: {
          const variable = findVariable(attr.argument.name, scope);
          const initNode = getVariableInitializer(variable, 0);

          // Check if the variable resolves to an object with the target property
          if (initNode?.type === AST.ObjectExpression) {
            return ast.findProperty(initNode.properties, name) != null;
          }
          return false;
        }

        // 3. Spread literal: {{...{prop: value}}}
        case AST.ObjectExpression:
          return ast.findProperty(attr.argument.properties, name) != null;
      }
      return false;
    });
  };
}
