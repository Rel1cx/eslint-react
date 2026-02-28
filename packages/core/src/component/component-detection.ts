import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isCreateElementCall } from "../api";
import { JsxDetectionHint } from "../jsx";
import { isRenderMethodCallback } from "./component-detection-legacy";
import { isFunctionWithLooseComponentName } from "./component-name";

export type ComponentDetectionHint = bigint;

/**
 * Hints for component collector
 */
export const ComponentDetectionHint = {
  ...JsxDetectionHint,
  DoNotIncludeFunctionDefinedAsArrayFlatMapCallback: 1n << 17n,
  DoNotIncludeFunctionDefinedAsArrayMapCallback: 1n << 16n,
  DoNotIncludeFunctionDefinedInArrayExpression: 1n << 15n,
  DoNotIncludeFunctionDefinedInArrayPattern: 1n << 14n,
  DoNotIncludeFunctionDefinedOnClassMethod: 1n << 12n,
  DoNotIncludeFunctionDefinedOnClassProperty: 1n << 13n,
  DoNotIncludeFunctionDefinedOnObjectMethod: 1n << 11n,
} as const;

/**
 * Default component detection hint
 */
export const DEFAULT_COMPONENT_DETECTION_HINT = 0n
  | ComponentDetectionHint.DoNotIncludeJsxWithBigIntValue
  | ComponentDetectionHint.DoNotIncludeJsxWithBooleanValue
  | ComponentDetectionHint.DoNotIncludeJsxWithNumberValue
  | ComponentDetectionHint.DoNotIncludeJsxWithStringValue
  | ComponentDetectionHint.DoNotIncludeJsxWithUndefinedValue
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayExpression
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayPattern
  | ComponentDetectionHint.RequireAllArrayElementsToBeJsx
  | ComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx
  | ComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx;

/**
 * Determine if a function node represents a valid React component definition
 *
 * @param context The rule context
 * @param node The function node to analyze
 * @param hint Component detection hints (bit flags) to customize detection logic
 * @returns `true` if the node is considered a component definition
 */
export function isComponentDefinition(context: RuleContext, node: ast.TSESTreeFunction, hint: bigint) {
  // 1. Check for basic naming conventions
  if (!isFunctionWithLooseComponentName(context, node, true)) {
    return false;
  }

  // 2. Check immediate contextual exclusions
  switch (true) {
    case node.parent.type === AST.CallExpression
      && isCreateElementCall(context, node.parent)
      && node.parent.arguments.slice(2).some((arg) => arg === node):
      return false;
    case isRenderMethodCallback(node):
      return false;
  }

  // 3. Apply contextual exclusions via hints
  switch (true) {
    case ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && node.parent.type === AST.Property
      && node.parent.parent.type === AST.ObjectExpression:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedOnObjectMethod) return false;
      break;
    case ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && node.parent.type === AST.MethodDefinition:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedOnClassMethod) return false;
      break;
    case ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && node.parent.type === AST.Property:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedOnClassProperty) return false;
      break;
    case node.parent.type === AST.ArrayPattern:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayPattern) return false;
      break;
    case node.parent.type === AST.ArrayExpression:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayExpression) return false;
      break;
    case node.parent.type === AST.CallExpression
      && node.parent.callee.type === AST.MemberExpression
      && node.parent.callee.property.type === AST.Identifier
      && node.parent.callee.property.name === "map":
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback) return false;
      break;
    case node.parent.type === AST.CallExpression
      && node.parent.callee.type === AST.MemberExpression
      && node.parent.callee.property.type === AST.Identifier
      && node.parent.callee.property.name === "flatMap":
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback) return false;
      break;
  }

  // 4. Exclude inline JSX callbacks (event handlers, render props)
  const significantParent = ast.findParentNode(
    node,
    ast.isOneOf([
      AST.JSXExpressionContainer,
      AST.ArrowFunctionExpression,
      AST.FunctionExpression,
      AST.Property,
      AST.ClassBody,
    ]),
  );

  if (significantParent == null) return true;
  // If the immediate significant parent is a JSX expression, this is likely an event handler or a render prop, not a component definition itself
  if (significantParent.type === AST.JSXExpressionContainer) return false;
  return true;
}
