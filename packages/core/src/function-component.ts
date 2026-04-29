import { Check, Extract, type TSESTreeDirective, type TSESTreeFunction, Traverse, isOneOf } from "@eslint-react/ast";
/* eslint-disable perfectionist/sort-objects */
import type { RuleContext } from "@eslint-react/eslint";
import { JsxDetectionHint } from "@eslint-react/jsx";
import { RE_COMPONENT_NAME, RE_COMPONENT_NAME_LOOSE } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { isCreateElementCall, isForwardRefCall, isMemoCall } from "./api";
import { isRenderMethodCallback } from "./class-component";
import { type FunctionID, type FunctionInitPath, getFunctionId, isFunctionHasCallInInitPath } from "./function";
import type { SemanticNode } from "./semantic";

// #region Types

/**
 * Represents a React Function Component
 */
export interface FunctionComponentSemanticNode extends SemanticNode {
  /**
   * The identifier or identifier sequence of the component
   */
  id: FunctionID;

  /**
   * The kind of component
   */
  kind: "component";

  /**
   * The AST node of the function
   */
  node: TSESTreeFunction;

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
    | FunctionInitPath;

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
  directives: TSESTreeDirective[];
}

// #endregion

// #region Component Flags

/**
 * Component flag constants
 */
export const FunctionComponentFlag = {
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
export function getFunctionComponentFlagFromInitPath(initPath: FunctionComponentSemanticNode["initPath"]) {
  let flag = FunctionComponentFlag.None;
  if (initPath != null && isFunctionHasCallInInitPath("memo", initPath)) {
    flag |= FunctionComponentFlag.Memo;
  }
  if (initPath != null && isFunctionHasCallInInitPath("forwardRef", initPath)) {
    flag |= FunctionComponentFlag.ForwardRef;
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
export function isFunctionComponentWrapperCall(context: RuleContext, node: TSESTree.Node) {
  if (node.type !== AST.CallExpression) return false;
  return isMemoCall(context, node) || isForwardRefCall(context, node);
}

/**
 * Check if the node is a callback function passed to a component wrapper
 * @param context The ESLint rule context
 * @param node The node to check
 * @returns `true` if the node is a callback function passed to a component wrapper
 */
export function isFunctionComponentWrapperCallback(context: RuleContext, node: TSESTree.Node) {
  if (!Check.isFunction(node)) return false;
  let parent = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;
  if (parent.type !== AST.CallExpression) return false;
  return isFunctionComponentWrapperCall(context, parent);
}

// #endregion

// #region Component ID (internal)

/**
 * Get function component identifier from `const Component = memo(() => {});`
 * @param context The rule context
 * @param node The AST node to get the function component identifier from
 * @internal
 */
export function getFunctionComponentId(context: RuleContext, node: TSESTreeFunction): FunctionID {
  const functionId = getFunctionId(node);
  if (functionId != null) {
    return functionId;
  }
  let parent = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;
  if (
    parent.type === AST.CallExpression
    && isFunctionComponentWrapperCall(context, parent)
    && parent.parent.type === AST.VariableDeclarator
  ) {
    return parent.parent.id;
  }
  if (
    parent.type === AST.CallExpression
    && isFunctionComponentWrapperCall(context, parent)
    && parent.parent.type === AST.CallExpression
    && isFunctionComponentWrapperCall(context, parent.parent)
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
export function isFunctionComponentName(name: string) {
  return RE_COMPONENT_NAME.test(name);
}

/**
 * Check if a string matches the loose component name pattern
 * @param name The name to check
 */
export function isFunctionComponentNameLoose(name: string) {
  return RE_COMPONENT_NAME_LOOSE.test(name);
}

/**
 * Check if a function has a loose component name
 * @param context The rule context
 * @param fn The function to check
 * @param allowNone Whether to allow no name
 * @returns Whether the function has a loose component name
 */
export function isFunctionWithLooseComponentName(context: RuleContext, fn: TSESTreeFunction, allowNone = false) {
  const id = getFunctionComponentId(context, fn);
  if (id == null) return allowNone;
  if (id.type === AST.Identifier) {
    return isFunctionComponentNameLoose(id.name);
  }
  if (id.type === AST.MemberExpression && id.property.type === AST.Identifier) {
    return isFunctionComponentNameLoose(id.property.name);
  }
  return false;
}

// #endregion

// #region Component Detection

export type FunctionComponentDetectionHint = bigint;

/**
 * Hints for component collector
 */
export const FunctionComponentDetectionHint = {
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
  | FunctionComponentDetectionHint.DoNotIncludeJsxWithBigIntValue
  | FunctionComponentDetectionHint.DoNotIncludeJsxWithBooleanValue
  | FunctionComponentDetectionHint.DoNotIncludeJsxWithNumberValue
  | FunctionComponentDetectionHint.DoNotIncludeJsxWithStringValue
  | FunctionComponentDetectionHint.DoNotIncludeJsxWithUndefinedValue
  | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback
  | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement
  | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback
  | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback
  | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement
  | FunctionComponentDetectionHint.RequireAllArrayElementsToBeJsx
  | FunctionComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx
  | FunctionComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx;

/**
 * Determine if a function node represents a valid React component definition
 *
 * @param context The rule context
 * @param node The function node to analyze
 * @param hint Component detection hints (bit flags) to customize detection logic
 * @returns `true` if the node is considered a component definition
 */
export function isFunctionComponentDefinition(context: RuleContext, node: TSESTreeFunction, hint: bigint) {
  // 1. Check for basic naming conventions
  if (!isFunctionWithLooseComponentName(context, node, true)) {
    return false;
  }

  // 2. Check immediate contextual exclusions
  const isCreateElementArg = ((): boolean => {
    let p = node.parent;
    while (Check.isTypeExpression(p)) p = p.parent;
    if (p.type !== AST.CallExpression || !isCreateElementCall(context, p)) return false;
    return p.arguments.slice(2).some((arg) => Extract.unwrap(arg) === node);
  })();
  switch (true) {
    case isCreateElementArg:
      return false;
    case isRenderMethodCallback(node):
      return false;
  }

  // 3. Traverse up to find the non-type expression parent
  let parent = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;

  // 4. Apply contextual exclusions via hints
  const parentCallee = parent.type === AST.CallExpression
    ? Extract.unwrap(parent.callee)
    : null;
  switch (true) {
    case isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && parent.type === AST.Property
      && parent.parent.type === AST.ObjectExpression:
      if (hint & FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsObjectMethod) return false;
      break;
    case isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && parent.type === AST.MethodDefinition:
      if (hint & FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsClassMethod) return false;
      break;
    case isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(node)
      && parent.type === AST.Property:
      if (hint & FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsClassProperty) return false;
      break;
    case parent.type === AST.ArrayPattern:
      if (hint & FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement) return false;
      break;
    case parent.type === AST.ArrayExpression:
      if (hint & FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement) return false;
      break;
    case parentCallee != null
      && parentCallee.type === AST.MemberExpression
      && parentCallee.property.type === AST.Identifier
      && parentCallee.property.name === "map":
      if (hint & FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback) return false;
      break;
    case parentCallee != null
      && parentCallee.type === AST.MemberExpression
      && parentCallee.property.type === AST.Identifier
      && parentCallee.property.name === "flatMap":
      if (hint & FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback) return false;
      break;
    case parent.type === AST.CallExpression
      && getFunctionId(node) == null
      && !isFunctionComponentWrapperCall(context, parent)
      && !isCreateElementCall(context, parent):
      if (hint & FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback) {
        return false;
      }
      break;
  }

  // 5. Exclude inline JSX callbacks (event handlers, render props)
  const significantParent = Traverse.findParent(
    node,
    isOneOf([
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
