/* eslint-disable jsdoc/require-param */
import * as AST from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isCreateElementCall } from "../utils";
import { ERComponentHint } from "./component-collector-hint";
import { isFunctionOfRenderMethod } from "./component-lifecycle";

/** internal */
export function hasValidHierarchy(context: RuleContext, node: AST.TSESTreeFunction, hint: bigint) {
  if (isChildrenOfCreateElement(context, node) || isFunctionOfRenderMethod(node)) {
    return false;
  }
  if (hint & ERComponentHint.SkipMapCallback && AST.isMapCallLoose(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipObjectMethod && isFunctionOfObjectMethod(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipClassMethod && isFunctionOfClassMethod(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipClassProperty && isFunctionOfClassProperty(node.parent)) {
    return false;
  }
  const boundaryNode = AST.findParentNode(
    node,
    AST.isOneOf([
      T.JSXExpressionContainer,
      T.ArrowFunctionExpression,
      T.FunctionExpression,
      T.Property,
      T.ClassBody,
    ]),
  );
  return boundaryNode == null || boundaryNode.type !== T.JSXExpressionContainer;
}

/**
 * Determines whether inside `createElement`'s children.
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if the node is inside createElement's children
 */
function isChildrenOfCreateElement(context: RuleContext, node: TSESTree.Node) {
  const parent = node.parent;
  if (parent == null || parent.type !== T.CallExpression) return false;
  if (!isCreateElementCall(context, parent)) return false;
  return parent.arguments
    .slice(2)
    .some((arg) => arg === node);
}

function isFunctionOfClassMethod(node: TSESTree.Node): node is
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionExpression
{
  return (node.type === T.FunctionExpression || node.type === T.ArrowFunctionExpression)
    && node.parent.type === T.MethodDefinition;
}

function isFunctionOfClassProperty(node: TSESTree.Node): node is
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionExpression
{
  return (node.type === T.FunctionExpression || node.type === T.ArrowFunctionExpression)
    && node.parent.type === T.Property;
}

function isFunctionOfObjectMethod(node: TSESTree.Node) {
  return (node.type === T.FunctionExpression || node.type === T.ArrowFunctionExpression)
    && node.parent.type === T.Property
    && node.parent.parent.type === T.ObjectExpression;
}
