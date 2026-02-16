/* eslint-disable jsdoc/require-param */
import { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isMethodOrProperty, isTypeAssertionExpression } from "./is";
import type { TSESTreeFunction } from "./types";

// Ported from https://github.com/facebook/react/blob/bb8a76c6cc77ea2976d690ea09f5a1b3d9b1792a/packages/eslint-plugin-react-hooks/src/rules/RulesOfHooks.ts#L860
/**
 * Gets the static name of a function AST node. For function declarations it is
 * easy. For anonymous function expressions it is much harder. If you search for
 * `IsAnonymousFunctionDefinition()` in the ECMAScript spec you'll find places
 * where JS gives anonymous function expressions names. We roughly detect the
 * same AST nodes with some exceptions to better fit our use case.
 */
export function getFunctionId(node: TSESTree.Expression | TSESTreeFunction) {
  switch (true) {
    // function MaybeComponent() {}
    case "id" in node
      && node.id != null:
      // const whatever = function MaybeComponent() {};
      return node.id;
    case node.parent.type === AST.VariableDeclarator
      && node.parent.init === node:
      return node.parent.id;
    // MaybeComponent = () => {};
    case node.parent.type === AST.AssignmentExpression
      && node.parent.right === node
      && node.parent.operator === "=":
      return node.parent.left;
    // {MaybeComponent: () => {}}
    // {MaybeComponent() {}}
    case node.parent.type === AST.Property
      && node.parent.value === node
      && !node.parent.computed:
      return node.parent.key;
    // class {MaybeComponent = () => {}}
    // class {MaybeComponent() {}}
    case isMethodOrProperty(node.parent)
      && node.parent.value === node:
      return node.parent.key;
      // Follow spec convention for `IsAnonymousFunctionDefinition()` usage.
      //
      // const {MaybeComponent = () => {}} = {};
      // ({MaybeComponent = () => {}} = {});
    case node.parent.type === AST.AssignmentPattern
      && node.parent.right === node:
      return node.parent.left;
    // const MaybeComponent = condition ? () => {} : () => {};
    case node.parent.type === AST.ConditionalExpression:
      return getFunctionId(node.parent);
    // const MaybeComponent = (() => {})!;
    // const MaybeComponent = (() => {}) as FunctionComponent;
    // const MaybeComponent = (() => {}) satisfies FunctionComponent;
    case isTypeAssertionExpression(node.parent):
      return getFunctionId(node.parent);
  }
  return unit;
}

/**
 * Type representing the return type of getFunctionId
 */
export type FunctionID = ReturnType<typeof getFunctionId>;
