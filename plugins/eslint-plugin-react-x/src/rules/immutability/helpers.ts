import { Check, Extract } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

// #region Constants

/**
 * Methods that mutate their receiver in place.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
export const KNOWN_MUTATING_METHODS = new Set([
  "add",
  "clear",
  "copyWithin",
  "delete",
  "fill",
  "pop",
  "push",
  "reverse",
  "set",
  "shift",
  "sort",
  "splice",
  "unshift",
]);

/**
 * Known hooks whose return values have method names that collide with mutating
 * method names (e.g. `router.push`). Calls on their return values are exempted
 * as non-mutating.
 */
export const KNOWN_MUTATING_HOOKS = new Set([
  "useHistory",
  "useNavigate",
  "useNavigation",
  "useRouter",
]);

// #endregion

// #region Node Ancestry

export function isNodeWithin(node: TSESTree.Node, ancestor: TSESTree.Node) {
  let current: TSESTree.Node | undefined = node;
  while (current != null) {
    if (current === ancestor) return true;
    current = current.parent;
  }
  return false;
}

// #endregion

// #region Ref Detection

export function isRefLikeName(name: string) {
  return name === "ref" || name.endsWith("Ref");
}

export function hasRefLikeNameInChain(node: TSESTree.Node): boolean {
  let current: TSESTree.Node = Extract.unwrap(node);
  while (current.type === AST.MemberExpression) {
    const property = Extract.unwrap(current.property);
    if (Check.isIdentifier(property) && isRefLikeName(property.name)) return true;
    current = Extract.unwrap(current.object);
  }
  return Check.isIdentifier(current) && isRefLikeName(current.name);
}

// #endregion
