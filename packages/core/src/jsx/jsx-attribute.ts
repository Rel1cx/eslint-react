import type * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/kit";
import { findProperty, findVariable, getVariableDefinitionNode } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { getAttributeName } from "./jsx-attribute-name";

export function getAttribute(context: RuleContext, attributes: AST.TSESTreeJSXAttributeLike[], initialScope?: Scope) {
  return (name: string) => {
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
          const variable = findVariable(attr.argument.name, initialScope);
          const variableNode = getVariableDefinitionNode(variable, 0);
          if (variableNode?.type === T.ObjectExpression) {
            return findProperty(name, variableNode.properties, initialScope) != null;
          }
          return false;
        }
        // Case 3: Spread from object literal (e.g., {{...{prop: value}}})
        case T.ObjectExpression:
          return findProperty(name, attr.argument.properties, initialScope) != null;
      }
      return false;
    });
  };
}
