import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { dual, unit } from "@eslint-react/eff";
import { ScopeType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import * as ASTUtils from "@typescript-eslint/utils/ast-utils";
import { getVariableInitNode } from "./var-init-node";

/**
 * Get all variables from the given scope up to the global scope
 * @param initialScope The scope to start from
 * @returns All variables from the given scope up to the global scope
 */
export function getVariables(initialScope: Scope): Variable[] {
  let scope = initialScope;
  const variables = [...scope.variables];
  while (scope.type !== ScopeType.global) {
    scope = scope.upper;
    variables.push(...scope.variables);
  }
  return variables.reverse();
}

export const findVariable: {
  (initialScope: Scope): (nameOrNode: string | TSESTree.Identifier | unit) => Variable | unit;
  (nameOrNode: string | TSESTree.Identifier | unit, initialScope: Scope): Variable | unit;
} = dual(2, (nameOrNode: string | TSESTree.Identifier | unit, initialScope: Scope) => {
  if (nameOrNode == null) return unit;
  return ASTUtils.findVariable(initialScope, nameOrNode) ?? unit;
});

export function findPropertyInProperties(
  name: string,
  properties: (TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement)[],
  initialScope: Scope,
  seen = new Set<string>(),
): (typeof properties)[number] | unit {
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
          const variableNode = getVariableInitNode(variable, 0);
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
