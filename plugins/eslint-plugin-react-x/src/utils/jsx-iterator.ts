import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Iterator-like methods whose callback's return value becomes an item in a rendered list,
 * mapped to the position of the callback in the call's argument list.
 * `from` covers `Array.from(iterable, mapFn)`.
 */
export const KNOWN_CALLBACK_POSITIONS = new Map<string, number>([
  ["flatMap", 0],
  ["from", 1],
  ["map", 0],
]);

/**
 * Gets the mapping callback of an iterator-like call expression (e.g. `.map(cb)`, `.flatMap(cb)`, `Array.from(it, cb)`).
 * @param node The call expression to inspect.
 * @returns The callback function node, or `null` if the call is not an iterator-like call with a function callback.
 */
export function getIteratorCallback(node: TSESTree.CallExpression): TSESTreeFunction | null {
  const callee = Extract.unwrap(node.callee);
  if (callee.type !== AST.MemberExpression) return null;
  if (!Check.isIdentifier(callee.property)) return null;
  const position = KNOWN_CALLBACK_POSITIONS.get(callee.property.name);
  if (position == null) return null;
  const argument = node.arguments[position];
  if (argument == null) return null;
  const callback = Extract.unwrap(argument);
  if (!Check.isFunction(callback)) return null;
  return callback;
}
