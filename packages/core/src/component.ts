/* eslint-disable perfectionist/sort-objects */
import * as ast from "@eslint-react/ast";
import { JsxDetectionHint } from "@eslint-react/jsx";
import { RE_COMPONENT_NAME, RE_COMPONENT_NAME_LOOSE, type RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isCreateElementCall, isForwardRefCall, isMemoCall } from "./react-api";
import type { SemanticNode } from "./semantic";

// #region Types

/**
 * Represents a React Function Component
 */
export interface FunctionComponentSemanticNode extends SemanticNode {
  /**
   * The identifier or identifier sequence of the component
   */
  id: ast.FunctionID;

  /**
   * The kind of component
   */
  kind: "component";

  /**
   * The AST node of the function
   */
  node: ast.TSESTreeFunction;

  /**
   * Flags describing the component's characteristics
   */
  flag: bigint;

  /**
   * Hint for how the component was detected
   */
  hint: bigint;

  /**
   * List of expressions returned by the component
   */
  rets: TSESTree.ReturnStatement["argument"][];

  /**
   * The initialization path of the function
   */
  initPath:
    | null
    | ast.FunctionInitPath;

  /**
   * Indicates if the component is inside an export default declaration
   */
  isExportDefault: boolean;

  /**
   * Indicates if the component is itself an export default declaration
   */
  isExportDefaultDeclaration: boolean;

  /**
   * List of hook calls within the component
   */
  hookCalls: TSESTree.CallExpression[];

  /**
   * The display name of the component
   */
  displayName:
    | null
    | TSESTree.Expression;

  /**
   * The directives used in the function (ex: "use strict", "use client", etc.)
   */
  directives: ast.TSESTreeDirective[];
}

// #endregion

// #region Component Flags

/**
 * Component flag constants
 */
export const ComponentFlag = {
  /** No flags set */
  None: 0n,
  /** Indicates the component is a pure component (ex: extends PureComponent) */
  PureComponent: 1n << 0n,
  /** Indicates the component creates elements using `createElement` instead of JSX */
  CreateElement: 1n << 1n,
  /** Indicates the component is memoized (ex: React.memo) */
  Memo: 1n << 2n,
  /** Indicates the component forwards a ref (ex: React.forwardRef) */
  ForwardRef: 1n << 3n,
};

/**
 * Get component flag from init path
 * @param initPath The init path of the function component
 * @returns The component flag
 * @internal
 */
export function getComponentFlagFromInitPath(initPath: FunctionComponentSemanticNode["initPath"]) {
  let flag = ComponentFlag.None;
  if (initPath != null && ast.hasCallInFunctionInitPath("memo", initPath)) {
    flag |= ComponentFlag.Memo;
  }
  if (initPath != null && ast.hasCallInFunctionInitPath("forwardRef", initPath)) {
    flag |= ComponentFlag.ForwardRef;
  }
  return flag;
}

// #endregion

// #region Component Wrapper Detection

/**
 * Check if the node is a call expression for a component wrapper
 * @param context The ESLint rule context
 * @param node The node to check
 * @returns `true` if the node is a call expression for a component wrapper
 */
export function isComponentWrapperCall(context: RuleContext, node: TSESTree.Node) {
  if (node.type !== AST.CallExpression) return false;
  return isMemoCall(context, node) || isForwardRefCall(context, node);
}

/**
 * Check if the node is a callback function passed to a component wrapper
 * @param context The ESLint rule context
 * @param node The node to check
 * @returns `true` if the node is a callback function passed to a component wrapper
 */
export function isComponentWrapperCallback(context: RuleContext, node: TSESTree.Node) {
  if (!ast.isFunction(node)) return false;
  let parent = node.parent;
  while (ast.isTypeExpression(parent)) parent = parent.parent;
  if (parent.type !== AST.CallExpression) return false;
  return isComponentWrapperCall(context, parent);
}

// #endregion

// #region Component ID (internal)

/**
 * Get function component identifier from `const Component = memo(() => {});`
 * @internal
 */
export function getFunctionComponentId(
  context: RuleContext,
  node: ast.TSESTreeFunction,
): ast.FunctionID {
  const functionId = ast.getFunctionId(node);
  if (functionId != null) {
    return functionId;
  }
  let parent = node.parent;
  while (ast.isTypeExpression(parent)) parent = parent.parent;
  if (
    parent.type === AST.CallExpression
    && isComponentWrapperCall(context, parent)
    && parent.parent.type === AST.VariableDeclarator
  ) {
    return parent.parent.id;
  }
  if (
    parent.type === AST.CallExpression
    && isComponentWrapperCall(context, parent)
    && parent.parent.type === AST.CallExpression
    && isComponentWrapperCall(context, parent.parent)
    && parent.parent.parent.type === AST.VariableDeclarator
  ) {
    return parent.parent.parent.id;
  }
  return null;
}

// #endregion

// #region Component Name

/**
 * Check if a string matches the strict component name pattern
 * @param name The name to check
 */
export function isComponentName(name: string) {
  return RE_COMPONENT_NAME.test(name);
}

/**
 * Check if a string matches the loose component name pattern
 * @param name The name to check
 */
export function isComponentNameLoose(name: string) {
  return RE_COMPONENT_NAME_LOOSE.test(name);
}

/**
 * Check if a function has a loose component name
 * @param context The rule context
 * @param fn The function to check
 * @param allowNone Whether to allow no name
 * @returns Whether the function has a loose component name
 */
export function isFunctionWithLooseComponentName(context: RuleContext, fn: ast.TSESTreeFunction, allowNone = false) {
  const id = getFunctionComponentId(context, fn);
  if (id == null) return allowNone;
  if (id.type === AST.Identifier) {
    return isComponentNameLoose(id.name);
  }
  if (id.type === AST.MemberExpression && id.property.type === AST.Identifier) {
    return isComponentNameLoose(id.property.name);
  }
  return false;
}

// #endregion

// #region Component Detection

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

// Private helpers for class component exclusion in isComponentDefinition
function _isRenderMethodLike(node: TSESTree.Node): node is ast.TSESTreeMethodOrProperty {
  return ast.isMethodOrProperty(node)
    && node.key.type === AST.Identifier
    && node.key.name.startsWith("render")
    && ast.isOneOf([AST.ClassDeclaration, AST.ClassExpression])(node.parent.parent);
}

function _isClassComponentLoose(node: TSESTree.Node): node is ast.TSESTreeClass {
  if ("superClass" in node && node.superClass != null) {
    const re = /^(?:Pure)?Component$/u;
    switch (true) {
      case node.superClass.type === AST.Identifier:
        return re.test(node.superClass.name);
      case node.superClass.type === AST.MemberExpression
        && node.superClass.property.type === AST.Identifier:
        return re.test(node.superClass.property.name);
    }
  }
  return false;
}

function _isRenderMethodCallback(node: ast.TSESTreeFunction) {
  const parent = node.parent;
  const grandparent = parent.parent;
  const greatGrandparent = grandparent?.parent;
  return greatGrandparent != null
    && _isRenderMethodLike(parent)
    && _isClassComponentLoose(greatGrandparent);
}

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
    case _isRenderMethodCallback(node):
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
      && !isComponentWrapperCall(context, parent)
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
  if (significantParent.type === AST.JSXExpressionContainer) return false;
  return true;
}

// #endregion
