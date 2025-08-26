import type { unit } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/kit";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { getAttributeName } from "./jsx-attribute-name";

/**
 * Searches for a specific JSX attribute by name in a list of attributes
 * Returns the last matching attribute (rightmost in JSX)
 *
 * @param context - ESLint rule context
 * @param name - The name of the attribute to find
 * @param attributes - Array of JSX attributes to search through
 * @param initialScope - Optional scope for resolving variables
 * @returns The found attribute or undefined
 */
export function getAttribute(
  context: RuleContext,
  name: string,
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  initialScope?: Scope,
): TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute | unit {
  return attributes.findLast((attr) => {
    // Case 1: Direct JSX attribute (e.g., className="value")
    if (attr.type === T.JSXAttribute) {
      return getAttributeName(context, attr) === name;
    }

    // For spread attributes, we need a scope to resolve variables
    if (initialScope == null) return false;

    switch (attr.argument.type) {
      // Case 2: Spread from variable (e.g., {...props})
      case T.Identifier: {
        const variable = VAR.findVariable(attr.argument.name, initialScope);
        const variableNode = VAR.getVariableInitNode(variable, 0);
        if (variableNode?.type === T.ObjectExpression) {
          return VAR.findPropertyInProperties(name, variableNode.properties, initialScope) != null;
        }
        return false;
      }
      // Case 3: Spread from object literal (e.g., {{...{prop: value}}})
      case T.ObjectExpression:
        return VAR.findPropertyInProperties(name, attr.argument.properties, initialScope) != null;
    }
    return false;
  });
}
