/* eslint-disable jsdoc/require-param */
import * as AST from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isChildrenOfCreateElement } from "../element";
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
