import * as ast from "@eslint-react/ast";
import { JsxDetectionHint } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isCreateElementCall } from "../api";
import { isRenderMethodCallback } from "./component-detection-legacy";
import { isFunctionWithLooseComponentName } from "./component-name";
import { isComponentWrapperCallLoose } from "./component-wrapper";

export type ComponentDetectionHint = bigint;

/**
 * Hints for component collector
 */
export const ComponentDetectionHint = {
  ...JsxDetectionHint,

  DoNotIncludeFunctionDefinedAsClassMethod: 1n << 11n,
  DoNotIncludeFunctionDefinedAsClassProperty: 1n << 12n,
  DoNotIncludeFunctionDefinedAsObjectMethod: 1n << 13n,

  DoNotIncludeFunctionDefinedAsArrayExpressionElement: 1n << 14n,
  DoNotIncludeFunctionDefinedAsArrayPatternElement: 1n << 15n,

  DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback: 1n << 18n,
  DoNotIncludeFunctionDefinedAsArrayFlatMapCallback: 1n << 16n,
  DoNotIncludeFunctionDefinedAsArrayMapCallback: 1n << 17n,
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
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement
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

  // 3. Traverse up to find the non-type expression parent
  let parent = node.parent;
  while (ast.isTypeExpression(parent)) parent = parent.parent;

  // 4. Apply contextual exclusions via hints
  switch (true) {
    case ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && parent.type === AST.Property
      && parent.parent.type === AST.ObjectExpression:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsObjectMethod) return false;
      break;
    case ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && parent.type === AST.MethodDefinition:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsClassMethod) return false;
      break;
    case ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && parent.type === AST.Property:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsClassProperty) return false;
      break;
    case parent.type === AST.ArrayPattern:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement) return false;
      break;
    case parent.type === AST.ArrayExpression:
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement) return false;
      break;
    case parent.type === AST.CallExpression
      && parent.callee.type === AST.MemberExpression
      && parent.callee.property.type === AST.Identifier
      && parent.callee.property.name === "map":
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback) return false;
      break;
    case parent.type === AST.CallExpression
      && parent.callee.type === AST.MemberExpression
      && parent.callee.property.type === AST.Identifier
      && parent.callee.property.name === "flatMap":
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback) return false;
      break;
    case parent.type === AST.CallExpression
      && ast.getFunctionId(node) == null
      && !isComponentWrapperCallLoose(context, parent)
      && !isCreateElementCall(context, parent):
      if (hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback) return false;
      break;
  }

  // 5. Exclude inline JSX callbacks (event handlers, render props)
  const significantParent = ast.findParent(
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
