// Ported from https://github.com/eps1lon/react/blob/8b8d265bd9a4cab7bbd04a9a13950fdc946ea51c/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js#L642
/**
 * Gets the static name of a function AST node. For function declarations it is
 * easy. For anonymous function expressions it is much harder. If you search for
 * `IsAnonymousFunctionDefinition()` in the ECMAScript spec you'll find places
 * where JS gives anonymous function expressions names. We roughly detect the
 * same AST nodes with some exceptions to better fit our use case.
 */

import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { isOneOf, NodeType, type TSESTreeFunction } from "../node";

export function getFunctionIdentifier(node: TSESTreeFunction): O.Option<TSESTree.Identifier> {
  if (node.id) {
    // function useHook() {}
    // const whatever = function useHook() {};
    return O.some(node.id);
  }

  if (
    node.parent.type === NodeType.VariableDeclarator
    && node.parent.init === node
    && node.parent.id.type === NodeType.Identifier
  ) {
    // const useHook = () => {};
    return O.some(node.parent.id);
  }

  if (
    node.parent.type === NodeType.AssignmentExpression
    && node.parent.right === node
    && node.parent.operator === "="
    && node.parent.left.type === NodeType.Identifier
  ) {
    // useHook = () => {};
    return O.some(node.parent.left);
  }

  if (
    node.parent.type === NodeType.Property
    && node.parent.value === node
    && !node.parent.computed
    && node.parent.key.type === NodeType.Identifier
  ) {
    // {useHook: () => {}}
    // {useHook() {}}
    return O.some(node.parent.key);
  }

  if (
    isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node.parent)
    && node.parent.value === node
    && node.parent.key.type === NodeType.Identifier
  ) {
    // class {useHook = () => {}}
    // class {useHook() {}}
    return O.some(node.parent.key);
  }

  if (
    node.parent.type === NodeType.AssignmentPattern
    && node.parent.right === node
    && node.parent.left.type === NodeType.Identifier
  ) {
    // Follow spec convention for `IsAnonymousFunctionDefinition()` usage.
    //
    // const {useHook = () => {}} = {};
    // ({useHook = () => {}} = {});
    return O.some(node.parent.left);
  }

  return O.none();
}
