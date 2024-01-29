// Ported from https://github.com/eps1lon/react/blob/8b8d265bd9a4cab7bbd04a9a13950fdc946ea51c/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js#L642
/**
 * Gets the static name of a function AST node. For function declarations it is
 * easy. For anonymous function expressions it is much harder. If you search for
 * `IsAnonymousFunctionDefinition()` in the ECMAScript spec you'll find places
 * where JS gives anonymous function expressions names. We roughly detect the
 * same AST nodes with some exceptions to better fit our use case.
 */

import type { TSESTree } from "@typescript-eslint/types";
import { Option as O } from "effect";

import { isOneOf, NodeType, type TSESTreeFunction } from "../node";

export function getFunctionIdentifier(node: TSESTreeFunction): O.Option<TSESTree.Identifier> {
  // function MaybeComponent() {}
  // const whatever = function MaybeComponent() {};
  if (node.id) return O.some(node.id);
  // const MaybeComponent = () => {};
  if (
    node.parent.type === NodeType.VariableDeclarator
    && node.parent.init === node
    && node.parent.id.type === NodeType.Identifier
  ) {
    return O.some(node.parent.id);
  }
  // MaybeComponent = () => {};
  if (
    node.parent.type === NodeType.AssignmentExpression
    && node.parent.right === node
    && node.parent.operator === "="
    && node.parent.left.type === NodeType.Identifier
  ) {
    return O.some(node.parent.left);
  }
  // {MaybeComponent: () => {}}
  // {MaybeComponent() {}}
  if (
    node.parent.type === NodeType.Property
    && node.parent.value === node
    && !node.parent.computed
    && node.parent.key.type === NodeType.Identifier
  ) {
    return O.some(node.parent.key);
  }

  // class {MaybeComponent = () => {}}
  // class {MaybeComponent() {}}
  if (
    isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node.parent)
    && node.parent.value === node
    && node.parent.key.type === NodeType.Identifier
  ) {
    return O.some(node.parent.key);
  }
  // Follow spec convention for `IsAnonymousFunctionDefinition()` usage.
  //
  // const {MaybeComponent = () => {}} = {};
  // ({MaybeComponent = () => {}} = {});
  if (
    node.parent.type === NodeType.AssignmentPattern
    && node.parent.right === node
    && node.parent.left.type === NodeType.Identifier
  ) {
    return O.some(node.parent.left);
  }

  return O.none();
}
