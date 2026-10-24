import { Check, Traverse } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

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
 * Gets the nested return statements in the node that are within the same function
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const stmts: TSESTree.ReturnStatement[] = [];
  // If the node is not inside a function, boundary will be null
  // and no return statements will be collected (as expected)
  const boundary = Check.isFunction(node)
    ? node
    : Traverse.findParent(node, Check.isFunction);
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== AST.ReturnStatement) {
        return;
      }
      if (Traverse.hasParent(node, Check.isFunction, (n) => n === boundary)) {
        return;
      }
      stmts.push(node);
    },
  });
  return stmts;
}
