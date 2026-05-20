import { Extract } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Array methods that mutate the array in place.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
export const MUTATING_ARRAY_METHODS = new Set([
  "copyWithin",
  "fill",
  "pop",
  "push",
  "reverse",
  "shift",
  "sort",
  "splice",
  "unshift",
]);

/**
 * Check if a name is ref-like ("ref" or ends with "Ref").
 * Refs are mutable by design and exempted from immutability checks.
 * @param name
 */
export function isRefLikeName(name: string): boolean {
  return name === "ref" || name.endsWith("Ref");
}

/**
 * Check if any identifier or property name in a member-expression chain
 * is ref-like.
 * @param node
 */
export function hasRefLikeNameInChain(node: TSESTree.Node): boolean {
  if (node.type === AST.Identifier) {
    return isRefLikeName(node.name);
  }
  if (node.type === AST.MemberExpression) {
    const propName = Extract.getPropertyName(node.property);
    if (propName != null && isRefLikeName(propName)) return true;
    return hasRefLikeNameInChain(node.object);
  }
  return false;
}

/**
 * Check if `name` appears anywhere inside a parameter pattern.
 * @param pattern - The parameter pattern to search in.
 * @param name - The identifier name to look for.
 */
export function identifierExistsInPattern(pattern: TSESTree.Node, name: string): boolean {
  switch (pattern.type) {
    case AST.Identifier:
      return pattern.name === name;
    case AST.ObjectPattern:
      return pattern.properties.some((p) => {
        if (p.type === AST.Property) return identifierExistsInPattern(p.value, name);
        return identifierExistsInPattern(p.argument, name);
      });
    case AST.ArrayPattern:
      return pattern.elements.some((el) => el != null && identifierExistsInPattern(el, name));
    case AST.RestElement:
      return identifierExistsInPattern(pattern.argument, name);
    case AST.AssignmentPattern:
      return identifierExistsInPattern(pattern.left, name);
    case AST.MemberExpression: {
      const root = Extract.getRootIdentifier(pattern);
      return root?.name === name;
    }
    default:
      return false;
  }
}
