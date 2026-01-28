import * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

import { isCreateElementCall } from "../api";
import { ComponentDetectionHint } from "./component-detection-hint";
import { isClassComponent } from "./component-is";
import { hasNoneOrLooseComponentName } from "./component-name";
import { isRenderMethodLike } from "./component-render-method";

/**
 * Check if the given node is a function within a render method of a class component.
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
function isRenderMethodCallback(node: AST.TSESTreeFunction) {
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
function shouldExcludeBasedOnHint(node: AST.TSESTreeFunction, hint: bigint): boolean {
  switch (true) {
    case (hint & ComponentDetectionHint.SkipObjectMethod)
      && AST.isOneOf([T.ArrowFunctionExpression, T.FunctionExpression])(node)
      && node.parent.type === T.Property
      && node.parent.parent.type === T.ObjectExpression:
      return true;
    case (hint & ComponentDetectionHint.SkipClassMethod)
      && AST.isOneOf([T.ArrowFunctionExpression, T.FunctionExpression])(node)
      && node.parent.type === T.MethodDefinition:
      return true;
    case (hint & ComponentDetectionHint.SkipClassProperty)
      && AST.isOneOf([T.ArrowFunctionExpression, T.FunctionExpression])(node)
      && node.parent.type === T.Property:
      return true;
    case (hint & ComponentDetectionHint.SkipArrayPattern)
      && node.parent.type === T.ArrayPattern:
      return true;
    case (hint & ComponentDetectionHint.SkipArrayExpression)
      && node.parent.type === T.ArrayExpression:
      return true;
    case (hint & ComponentDetectionHint.SkipArrayMapCallback)
      && node.parent.type === T.CallExpression
      && node.parent.callee.type === T.MemberExpression
      && node.parent.callee.property.type === T.Identifier
      && node.parent.callee.property.name === "map":
      return true;
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

  if (parent?.type !== T.CallExpression) {
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
  node: AST.TSESTreeFunction,
  hint: bigint,
) {
  // 1. Check for basic naming conventions
  if (!hasNoneOrLooseComponentName(context, node)) {
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
  const significantParent = AST.findParentNode(
    node,
    AST.isOneOf([
      T.JSXExpressionContainer,
      T.ArrowFunctionExpression,
      T.FunctionExpression,
      T.Property,
      T.ClassBody,
    ]),
  );

  if (significantParent == null) return true;
  // If the immediate significant parent is a JSX expression, this is likely an event handler or a render prop, not a component definition itself
  if (significantParent.type === T.JSXExpressionContainer) return false;
  return true;
}
