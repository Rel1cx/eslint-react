import { Check, Traverse } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export type IsInsideRender = (node: TSESTree.Node) => boolean;

/**
 * Expression kinds that always produce a brand-new value on every evaluation, and are
 * therefore considered "dynamically created" when used as a component's value.
 */
export const KNOWN_DYNAMIC_EXPRESSION_TYPES: ReadonlySet<TSESTree.Node["type"]> = new Set([
  AST.ArrowFunctionExpression,
  AST.CallExpression,
  AST.ClassExpression,
  AST.FunctionExpression,
  AST.NewExpression,
]);

/**
 * Builds a predicate that tells whether a given node lies within the body of one of the
 * collected function or class components, i.e. whether it is "created during render".
 */
export function createRenderBoundaryChecker(componentNodes: readonly TSESTree.Node[]): IsInsideRender {
  const components = new Set(componentNodes);
  return (node) => Traverse.findParent(node, (n) => (Check.isFunction(n) || Check.isClass(n)) && components.has(n)) != null;
}
