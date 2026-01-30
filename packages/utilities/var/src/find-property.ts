import type { unit } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { getVariableDefinitionNode } from "./get-variable-definition-node";

import { findVariable } from "./get-variables-from-scope";

export function findProperty(
  name: string,
  properties: (TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement)[],
  initialScope: Scope,
  seen = new Set<string>(),
): (typeof properties)[number] | unit {
  return properties.findLast((prop) => {
    if (prop.type === AST.Property) {
      return "name" in prop.key
        && prop.key.name === name;
    }
    if (prop.type === AST.SpreadElement) {
      switch (prop.argument.type) {
        case AST.Identifier: {
          if (seen.has(prop.argument.name)) return false;
          const variable = findVariable(prop.argument.name, initialScope);
          const variableNode = getVariableDefinitionNode(variable, 0);
          if (variableNode?.type === AST.ObjectExpression) {
            seen.add(prop.argument.name);
            return findProperty(
              name,
              variableNode.properties,
              initialScope,
              seen,
            ) != null;
          }
          return false;
        }
        case AST.ObjectExpression: {
          return findProperty(
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
