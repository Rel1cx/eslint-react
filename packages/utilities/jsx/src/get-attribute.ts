import type { _ } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

import { getAttributeName } from "./get-attribute-name";

/**
 * Get the JSX attribute node with the given name
 * @param name The name of the attribute
 * @param attributes The attributes to search
 * @param initialScope The initial scope to use for variable resolution
 * @returns The JSX attribute node or undefined
 */
export function getAttribute(
  name: string,
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  initialScope?: Scope,
): TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute | _ {
  return attributes.findLast((attr) => {
    if (attr.type === T.JSXAttribute) {
      return getAttributeName(attr) === name;
    }
    if (initialScope == null) return false;
    switch (attr.argument.type) {
      case T.Identifier: {
        const variable = VAR.findVariable(attr.argument.name, initialScope);
        const variableNode = VAR.getVariableNode(variable, 0);
        if (variableNode?.type === T.ObjectExpression) {
          return VAR.findPropertyInProperties(name, variableNode.properties, initialScope) != null;
        }
        return false;
      }
      case T.ObjectExpression:
        return VAR.findPropertyInProperties(name, attr.argument.properties, initialScope) != null;
    }
    return false;
  });
}
