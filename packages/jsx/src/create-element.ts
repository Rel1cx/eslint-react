import { Check, Extract, Traverse } from "@eslint-react/ast";
import { type RuleContext, getText } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findObjectProperty } from "./property";

/**
 * A parsed `createElement` call.
 *
 * All argument fields expose raw positional arguments, which may be
 * `SpreadElement` nodes. `propsObject` is the only derived field: it is the
 * second argument after unwrapping type/chain expressions, and is non-null only
 * when that argument is statically an object literal.
 */
export interface CreateElementCall {
  /** The raw arguments after the props argument. */
  readonly childrenArguments: readonly TSESTree.CallExpressionArgument[];
  /** The call expression node. */
  readonly node: TSESTree.CallExpression;
  /** The raw second positional argument (the props argument), if present. */
  readonly propsArgument: TSESTree.CallExpressionArgument | null;
  /** The second argument unwrapped, when it is an object literal. */
  readonly propsObject: TSESTree.ObjectExpression | null;
  /** The raw first positional argument (the element type), if present. */
  readonly typeArgument: TSESTree.CallExpressionArgument | null;
}

/**
 * Check if the node is a call to a `createElement` API.
 *
 * Matching is name-based and namespace-agnostic: the fully qualified callee name
 * must be `createElement` or end with `.createElement`. No import provenance
 * check is performed, matching `isAPICall("createElement")` in `@eslint-react/core`.
 * @param context The ESLint rule context.
 * @param node The node to inspect.
 * @returns `true` if the node is a `createElement` call.
 */
export function isCreateElementCall(context: RuleContext, node: TSESTree.Node | null | undefined): node is TSESTree.CallExpression {
  if (node?.type !== AST.CallExpression) return false;
  const name = Extract.getFullyQualifiedName(Extract.unwrap(node.callee), getText(context));
  return name === "createElement" || name.endsWith(".createElement");
}

/**
 * Parse a `createElement` call into its positional arguments.
 *
 * A non-`createElement` node yields `null`; a matched call always yields a
 * descriptor, even when it has no arguments. This removes the ambiguity between
 * "not a `createElement` call" and "a call with no props/children".
 * @param context The ESLint rule context.
 * @param node The node to inspect.
 * @returns The parsed call, or `null` when the node is not a `createElement` call.
 */
export function parseCreateElementCall(context: RuleContext, node: TSESTree.Node | null | undefined): CreateElementCall | null {
  if (!isCreateElementCall(context, node)) return null;
  const propsArgument = node.arguments[1] ?? null;
  const propsExpression = propsArgument == null ? null : Extract.unwrap(propsArgument);
  return {
    childrenArguments: node.arguments.slice(2),
    node,
    propsArgument,
    propsObject: propsExpression?.type === AST.ObjectExpression ? propsExpression : null,
    typeArgument: node.arguments[0] ?? null,
  };
}

/**
 * Find a statically named property in the props object of a `createElement` call.
 *
 * Matching follows JavaScript object semantics: properties are scanned in
 * reverse (later entries win), nested spreads are resolved recursively, and
 * statically evaluable computed keys are matched. The property matcher is shared
 * with `findSpreadProperty`, so JSX spread attributes and `createElement` props
 * have identical name-resolution behavior.
 * @param context The ESLint rule context.
 * @param call The parsed call, or `null`.
 * @param name The property name to look for (ex: `"children"`, `"key"`).
 * @returns The matching `Property` node, or `null` when not found.
 */
export function findCreateElementProp(context: RuleContext, call: CreateElementCall | null, name: string): TSESTree.Property | null {
  if (call?.propsObject == null) return null;
  return findObjectProperty(context, call.propsObject, name);
}

// #region Contextual Predicates

/**
 * Check if the node is passed as a children argument (the third argument or
 * later) of a `createElement` call.
 * @param context The ESLint rule context.
 * @param node The node to check.
 * @returns `true` if the node is a direct children argument of a `createElement` call.
 */
export function isCreateElementChildrenArgument(context: RuleContext, node: TSESTree.Node | null | undefined): boolean {
  if (node == null) return false;
  let parent = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;
  const target = Extract.unwrap(node);
  return parent?.type === AST.CallExpression
    && isCreateElementCall(context, parent)
    && parent.arguments.slice(2).some((arg) => Extract.unwrap(arg) === target);
}

/**
 * Check if the node is directly inside the props object (the second argument) of a `createElement` call,
 * that is, its closest `ObjectExpression` ancestor is the props object itself. Nodes nested deeper
 * (ex: inside an object nested in the props object) are not considered inside.
 * @param context The ESLint rule context.
 * @param node The node to check.
 * @returns `true` if the node is directly inside `createElement`'s props object.
 */
export function isInsideCreateElementProps(context: RuleContext, node: TSESTree.Node | null | undefined): boolean {
  if (node == null) return false;
  const call = Traverse.findParent(node, (parent): parent is TSESTree.CallExpression => isCreateElementCall(context, parent));
  if (call == null) return false;
  // The props object is the second argument of createElement
  const prop = Traverse.findParent(node, Check.isObjectExpression);
  if (prop == null) return false;
  const propsArg = call.arguments[1];
  if (propsArg == null) return false;
  return prop === Extract.unwrap(propsArg);
}

// #endregion
