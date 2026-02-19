import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isCreateElementCall } from "../api";
import { JsxDetectionHint } from "../jsx";
import { isClassComponent } from "./component-kind";
import { isFunctionWithLooseComponentName } from "./component-name";
import { isRenderMethodLike } from "./component-render-method";

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
 * Check if the given node is a function within a render method of a class component
 *
 * @param node The AST node to check
 * @returns `true` if the node is a render function inside a class component
 *
 * @example
 * ```tsx
 * class Component extends React.Component {
 *   renderHeader = () => <div />; // Returns true
 * }
 * ```
 */
function isRenderMethodCallback(node: ast.TSESTreeFunction) {
  const parent = node.parent;
  const grandparent = parent.parent;
  const greatGrandparent = grandparent?.parent;

  return (
    greatGrandparent != null
    && isRenderMethodLike(parent)
    && isClassComponent(greatGrandparent)
  );
}

/**
 * Check if a function node should be excluded based on provided detection hints
 *
 * @param node The function node to check
 * @param hint Component detection hints as bit flags
 * @returns `true` if the function matches an exclusion hint
 */
function shouldExcludeBasedOnHint(node: ast.TSESTreeFunction, hint: bigint) {
  switch (true) {
    case ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && node.parent.type === AST.Property
      && node.parent.parent.type === AST.ObjectExpression:
      return !!(hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedOnObjectMethod);
    case ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && node.parent.type === AST.MethodDefinition:
      return !!(hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedOnClassMethod);
    case ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && node.parent.type === AST.Property:
      return !!(hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedOnClassProperty);
    case node.parent.type === AST.ArrayPattern:
      return !!(hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayPattern);
    case node.parent.type === AST.ArrayExpression:
      return !!(hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayExpression);
    case node.parent.type === AST.CallExpression
      && node.parent.callee.type === AST.MemberExpression
      && node.parent.callee.property.type === AST.Identifier
      && node.parent.callee.property.name === "map":
      return !!(hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback);
    case node.parent.type === AST.CallExpression
      && node.parent.callee.type === AST.MemberExpression
      && node.parent.callee.property.type === AST.Identifier
      && node.parent.callee.property.name === "flatMap":
      return !!(hint & ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback);
  }
  return false;
}

/**
 * Determine if the node is an argument within `createElement`'s children list (3rd argument onwards)
 *
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if the node is passed as a child to `createElement`
 */
function isChildrenOfCreateElement(context: RuleContext, node: TSESTree.Node): boolean {
  const parent = node.parent;

  if (parent?.type !== AST.CallExpression) {
    return false;
  }

  if (!isCreateElementCall(context, parent)) {
    return false;
  }

  // The first two arguments are 'type' and 'props', children start at index 2
  return parent.arguments
    .slice(2)
    .some((arg) => arg === node);
}

/**
 * Determine if a function node represents a valid React component definition
 *
 * @param context The rule context
 * @param node The function node to analyze
 * @param hint Component detection hints (bit flags) to customize detection logic
 * @returns `true` if the node is considered a component definition
 */
export function isComponentDefinition(
  context: RuleContext,
  node: ast.TSESTreeFunction,
  hint: bigint,
) {
  // 1. Check for basic naming conventions
  if (!isFunctionWithLooseComponentName(context, node, true)) {
    return false;
  }

  // 2. Check immediate contextual exclusions
  if (isChildrenOfCreateElement(context, node) || isRenderMethodCallback(node)) {
    return false;
  }

  // 3. Check explicit hints provided by the caller
  if (shouldExcludeBasedOnHint(node, hint)) {
    return false;
  }

  // 4. Check if the function is embedded directly inside JSX (e.g., inline callbacks)
  // We look for the closest parent that is significant (Function, Class, or JSXContainer)
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
