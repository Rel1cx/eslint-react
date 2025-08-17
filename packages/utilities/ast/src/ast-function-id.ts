/* eslint-disable jsdoc/require-param */
import { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import type { TSESTreeFunction } from "./ast-node-types";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isMethodOrProperty, isTypeAssertionExpression } from "./ast-node-is";

// Ported from https://github.com/eps1lon/react/blob/8b8d265bd9a4cab7bbd04a9a13950fdc946ea51c/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js#L642
/**
 * Gets the static name of a function AST node. For function declarations it is
 * easy. For anonymous function expressions it is much harder. If you search for
 * `IsAnonymousFunctionDefinition()` in the ECMAScript spec you'll find places
 * where JS gives anonymous function expressions names. We roughly detect the
 * same AST nodes with some exceptions to better fit our use case.
 */
export function getFunctionId(node: TSESTree.Expression | TSESTreeFunction): TSESTree.Identifier | unit {
  switch (true) {
    // function MaybeComponent() {}
    case "id" in node
      && node.id != null:
      return node.id;
    // const whatever = function MaybeComponent() {};
    case node.parent.type === T.VariableDeclarator
      && node.parent.init === node
      && node.parent.id.type === T.Identifier:
      return node.parent.id;
    // MaybeComponent = () => {};
    case node.parent.type === T.AssignmentExpression
      && node.parent.right === node
      && node.parent.operator === "="
      && node.parent.left.type === T.Identifier:
      return node.parent.left;
    // {MaybeComponent: () => {}}
    // {MaybeComponent() {}}
    case node.parent.type === T.Property
      && node.parent.value === node
      && !node.parent.computed
      && node.parent.key.type === T.Identifier:
      return node.parent.key;
    // class {MaybeComponent = () => {}}
    // class {MaybeComponent() {}}
    case isMethodOrProperty(node.parent)
      && node.parent.value === node
      && node.parent.key.type === T.Identifier:
      return node.parent.key;
      // Follow spec convention for `IsAnonymousFunctionDefinition()` usage.
      //
      // const {MaybeComponent = () => {}} = {};
      // ({MaybeComponent = () => {}} = {});
    case node.parent.type === T.AssignmentPattern
      && node.parent.right === node
      && node.parent.left.type === T.Identifier:
      return node.parent.left;
    // const MaybeComponent = (() => {})!;
    // const MaybeComponent = (() => {}) as FunctionComponent;
    // const MaybeComponent = (() => {}) satisfies FunctionComponent;
    case isTypeAssertionExpression(node.parent):
      return getFunctionId(node.parent);
  }
  return unit;
}
