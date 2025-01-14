import type { _ } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { findVariable } from "./find-variable";
import { getVariableNode } from "./get-variable-node";

export function findPropertyInProperties(
  name: string,
  properties: (TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement)[],
  initialScope: Scope,
  seen = new Set<string>(),
): (typeof properties)[number] | _ {
  return properties.findLast((prop) => {
    if (prop.type === T.Property) {
      return "name" in prop.key
        && prop.key.name === name;
    }
    if (prop.type === T.SpreadElement) {
      switch (prop.argument.type) {
        case T.Identifier: {
          if (seen.has(prop.argument.name)) return false;
          const variable = findVariable(prop.argument.name, initialScope);
          const variableNode = getVariableNode(variable, 0);
          if (variableNode?.type === T.ObjectExpression) {
            seen.add(prop.argument.name);
            return findPropertyInProperties(
              name,
              variableNode.properties,
              initialScope,
              seen,
            ) != null;
          }
          return false;
        }
        case T.ObjectExpression: {
          return findPropertyInProperties(
            name,
            prop.argument.properties,
            initialScope,
            seen,
          ) != null;
        }
        default:
          return false;
      }
    }
    return false;
  });
}
