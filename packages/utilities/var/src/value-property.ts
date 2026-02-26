import type { unit } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { getVariableInitializer } from "./binding-initializer";
import { findVariable } from "./helper";

/**
 * Find a property by name in an array of properties
 * Handles spread elements by recursively resolving the referenced object
 * @param name The property name to find
 * @param properties The array of properties to search
 * @param initialScope The scope to use for variable resolution
 * @param seen Set of already seen variable names to prevent circular references
 * @returns The found property or unit if not found
 */
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
          const initNode = getVariableInitializer(variable, 0);
          if (initNode?.type === AST.ObjectExpression) {
            seen.add(prop.argument.name);
            return findProperty(
              name,
              initNode.properties,
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
