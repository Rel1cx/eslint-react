import * as AST from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching } from "ts-pattern";

import { isCreateElementCall } from "../utils";
import { ComponentDetectionHint } from "./component-detection-hint";
import { isClassComponent } from "./component-is";
import { isRenderMethodLike } from "./component-render-method";

/**
 * Function patterns for matching specific AST structures
 * Used to identify where a function is defined (e.g., method, property)
 */
const FUNCTION_PATTERNS = {
  CLASS_METHOD: {
    type: P.union(T.ArrowFunctionExpression, T.FunctionExpression),
    parent: T.MethodDefinition,
  },
  CLASS_PROPERTY: {
    type: P.union(T.ArrowFunctionExpression, T.FunctionExpression),
    parent: T.Property,
  },
  OBJECT_METHOD: {
    type: P.union(T.ArrowFunctionExpression, T.FunctionExpression),
    parent: {
      type: T.Property,
      parent: {
        type: T.ObjectExpression,
      },
    },
  },
} as const;

/**
 * Checks if the given node is a function within a render method of a class component.
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
function isFunctionOfRenderMethod(node: AST.TSESTreeFunction) {
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
 * Checks if a function node should be excluded based on provided detection hints
 *
 * @param node The function node to check
 * @param hint Component detection hints as bit flags
 * @returns `true` if the function matches an exclusion hint
 */
function shouldExcludeBasedOnHint(node: AST.TSESTreeFunction, hint: bigint): boolean {
  if ((hint & ComponentDetectionHint.SkipObjectMethod) && isMatching(FUNCTION_PATTERNS.OBJECT_METHOD)(node)) {
    return true;
  }

  if ((hint & ComponentDetectionHint.SkipClassMethod) && isMatching(FUNCTION_PATTERNS.CLASS_METHOD)(node)) {
    return true;
  }

  if ((hint & ComponentDetectionHint.SkipClassProperty) && isMatching(FUNCTION_PATTERNS.CLASS_PROPERTY)(node)) {
    return true;
  }

  if ((hint & ComponentDetectionHint.SkipArrayMapArgument) && AST.isArrayMapCallLoose(node.parent)) {
    return true;
  }

  return false;
}

/**
 * Determines if the node is an argument within `createElement`'s children list (3rd argument onwards)
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
 * Determines if a function node represents a valid React component definition
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
  // 1. Check immediate contextual exclusions
  if (isChildrenOfCreateElement(context, node) || isFunctionOfRenderMethod(node)) {
    return false;
  }

  // 2. Check explicit hints provided by the caller
  if (shouldExcludeBasedOnHint(node, hint)) {
    return false;
  }

  // 3. Check if the function is embedded directly inside JSX (e.g., inline callbacks)
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

  // If the immediate significant parent is a JSX expression, this is likely an event handler or a render prop, not a component definition itself
  return significantParent == null || significantParent.type !== T.JSXExpressionContainer;
}
