import { Check, Extract, Traverse } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { isCreateElementCall } from "./api";

// #region Argument Extraction

/**
 * Get the type argument (the first argument) of a `createElement` call.
 * @param context The ESLint rule context.
 * @param node The node to inspect.
 * @returns The type argument, or `null` when the node is not a `createElement` call or has no arguments.
 */
export function getCreateElementTypeArgument(context: RuleContext, node: null | TSESTree.Node): TSESTree.CallExpressionArgument | null {
  if (!isCreateElementCall(context, node)) return null;
  return node.arguments[0] ?? null;
}

/**
 * Get the props object (the second argument) of a `createElement` call.
 *
 * Type expressions and chain expressions wrapping the argument are unwrapped
 * before the object check; `null`, spread, or otherwise non-object props
 * arguments yield `null`.
 *
 * @param context The ESLint rule context.
 * @param node The node to inspect.
 * @returns The props `ObjectExpression`, or `null` when absent or not statically an object literal.
 */
export function getCreateElementPropsObject(context: RuleContext, node: null | TSESTree.Node): TSESTree.ObjectExpression | null {
  if (!isCreateElementCall(context, node)) return null;
  const propsArg = node.arguments[1];
  if (propsArg == null) return null;
  const propsObject = Extract.unwrap(propsArg);
  return propsObject.type === AST.ObjectExpression ? propsObject : null;
}

/**
 * Get the children arguments (the arguments after the props object) of a `createElement` call.
 * @param context The ESLint rule context.
 * @param node The node to inspect.
 * @returns The children arguments, or an empty array when the node is not a `createElement` call.
 */
export function getCreateElementChildrenArguments(context: RuleContext, node: null | TSESTree.Node): TSESTree.CallExpressionArgument[] {
  if (!isCreateElementCall(context, node)) return [];
  return node.arguments.slice(2);
}

/**
 * Find a statically named property in the props object of a `createElement` call.
 *
 * Statically resolvable names include plain identifier keys as well as
 * string-literal and simple template-literal keys (computed or not).
 * @param context The ESLint rule context.
 * @param node The node to inspect.
 * @param name The property name to look for (ex: `"children"`, `"key"`).
 * @returns The matching `Property` node, or `null` when the call has no static property with that name.
 *
 * @example
 * ```ts
 * import { getCreateElementProp } from "@eslint-react/core";
 *
 * const childrenProp = getCreateElementProp(context, node, "children");
 * ```
 */
export function getCreateElementProp(context: RuleContext, node: null | TSESTree.Node, name: string): TSESTree.Property | null {
  const propsObject = getCreateElementPropsObject(context, node);
  if (propsObject == null) return null;
  for (const prop of propsObject.properties) {
    if (prop.type === AST.Property && Extract.getPropertyName(prop, "max") === name) {
      return prop;
    }
  }
  return null;
}

// #endregion

// #region Contextual Predicates

/**
 * Check if the node is passed as a children argument (the third argument or
 * later) of a `createElement` call.
 * @param context The ESLint rule context.
 * @param node The node to check.
 * @returns `true` if the node is a direct children argument of a `createElement` call.
 */
export function isCreateElementChildrenArgument(context: RuleContext, node: TSESTree.Node): boolean {
  let parent = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;
  return parent?.type === AST.CallExpression
    && isCreateElementCall(context, parent)
    && parent.arguments.slice(2).some((arg) => Extract.unwrap(arg) === node);
}

/**
 * Check if the node is inside the props object (the second argument) of a `createElement` call.
 * @param context The ESLint rule context.
 * @param node The node to check.
 * @returns `true` if the node is inside `createElement`'s props object.
 */
export function isInsideCreateElementProps(context: RuleContext, node: TSESTree.Node): boolean {
  const call = Traverse.findParent(node, isCreateElementCall(context));
  if (call == null) return false;
  // The props object is the second argument of createElement
  const prop = Traverse.findParent(node, Check.is(AST.ObjectExpression));
  if (prop == null) return false;
  return prop === call.arguments[1];
}

// #endregion
