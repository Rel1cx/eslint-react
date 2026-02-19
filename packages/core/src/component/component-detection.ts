import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isCreateElementCall } from "../api";
import { JsxDetectionHint } from "../jsx";
import { isClassComponent } from "./component-kind";
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
 * Check whether given node is a render method of a class component
 * @example
 * ```tsx
 * class Component extends React.Component {
 *   renderHeader = () => <div />;
 *   renderFooter = () => <div />;
 * }
 * ```
 * @param node The AST node to check
 * @returns `true` if node is a render function, `false` if not
 */
export function isRenderMethodLike(node: TSESTree.Node): node is ast.TSESTreeMethodOrProperty {
  return ast.isMethodOrProperty(node)
    && node.key.type === AST.Identifier
    && node.key.name.startsWith("render")
    && node.parent.parent.type === AST.ClassDeclaration;
}

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
 * Unsafe check whether given node is a render function
 * ```tsx
 * const renderRow = () => <div />
 * `                 ^^^^^^^^^^^^`
 * _ = <Component renderRow={() => <div />} />
 * `                         ^^^^^^^^^^^^^   `
 * ```
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if node is a render function, `false` if not
 */
export function isRenderFunctionLoose(context: RuleContext, node: TSESTree.Node): node is ast.TSESTreeFunction {
  if (!ast.isFunction(node)) return false;
  const id = ast.getFunctionId(node);
  switch (true) {
    case id?.type === AST.Identifier:
      return id.name.startsWith("render");
    case id?.type === AST.MemberExpression
      && id.property.type === AST.Identifier:
      return id.property.name.startsWith("render");
    case node.parent.type === AST.JSXExpressionContainer
      && node.parent.parent.type === AST.JSXAttribute
      && node.parent.parent.name.type === AST.JSXIdentifier:
      return node.parent.parent.name.name.startsWith("render");
  }
  return false;
}

/**
 * Unsafe check whether given JSXAttribute is a render prop
 * ```tsx
 * _ = <Component renderRow={() => <div />} />
 * `              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
 * ```
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if node is a render prop, `false` if not
 */
export function isRenderPropLoose(context: RuleContext, node: TSESTree.JSXAttribute) {
  if (node.name.type !== AST.JSXIdentifier) {
    return false;
  }
  return node.name.name.startsWith("render")
    && node.value?.type === AST.JSXExpressionContainer
    && isRenderFunctionLoose(context, node.value.expression);
}

/**
 * Unsafe check whether given node is declared directly inside a render property
 * ```tsx
 * const rows = { render: () => <div /> }
 * `                      ^^^^^^^^^^^^^ `
 * _ = <Component rows={ [{ render: () => <div /> }] } />
 * `                                ^^^^^^^^^^^^^       `
 *  ```
 * @internal
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render property, `false` if not
 */
export function isDirectValueOfRenderPropertyLoose(node: TSESTree.Node) {
  const matching = (node: TSESTree.Node) => {
    return node.type === AST.Property
      && node.key.type === AST.Identifier
      && node.key.name.startsWith("render");
  };
  return matching(node) || (node.parent != null && matching(node.parent));
}

/**
 * Unsafe check whether given node is declared inside a render prop
 * ```tsx
 * _ = <Component renderRow={"node"} />
 * `                         ^^^^^^   `
 * _ = <Component rows={ [{ render: "node" }] } />
 * `                                ^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render prop, `false` if not
 */
export function isDeclaredInRenderPropLoose(node: TSESTree.Node) {
  if (isDirectValueOfRenderPropertyLoose(node)) {
    return true;
  }
  const parent = ast.findParentNode(node, ast.is(AST.JSXExpressionContainer))?.parent;
  if (parent?.type !== AST.JSXAttribute) {
    return false;
  }
  return parent.name.type === AST.JSXIdentifier && parent.name.name.startsWith("render");
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
