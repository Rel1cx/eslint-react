import { Check, Extract, Traverse } from "@eslint-react/ast";
import { type RuleContext, getText } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

/**
 * A parsed `createElement` call.
 *
 * The raw positional argument fields (`typeArgument`, `propsArgument`, and
 * `childrenArguments`) may contain `SpreadElement` nodes. `propsObject` is the
 * only derived field: it is the second argument after unwrapping type/chain
 * expressions, and is non-null only when that argument is syntactically an
 * object literal.
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
 * @param node The node to inspect; nullish or non-call nodes return `false`.
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
 * A nullish or non-`createElement` node yields `null`; a matched call always
 * yields a descriptor, even when it has no arguments. This removes the ambiguity
 * between "not a `createElement` call" and "a call with no props/children".
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
 * Statically resolve a property key to a string.
 *
 * Computed keys are evaluated with `getStaticValue`; only string results match.
 * Non-computed identifier keys return their name, non-computed string literal
 * keys return their value, and all other keys yield `null`.
 * @param context The ESLint rule context (needed for computed-key evaluation).
 * @param property The property to read the key from.
 * @returns The statically resolved key, or `null` when it cannot be determined as a string.
 */
function getStaticPropertyName(context: RuleContext, property: TSESTree.Property): string | null {
  const key = Extract.unwrap(property.key);
  if (property.computed) {
    const staticValue = getStaticValue(key, context.sourceCode.getScope(key));
    return typeof staticValue?.value === "string" ? staticValue.value : null;
  }
  if (Check.isIdentifier(key)) return key.name;
  if (key.type === AST.Literal && typeof key.value === "string") return key.value;
  return null;
}

/**
 * Find a statically named direct property in the props object of a `createElement` call.
 *
 * Properties are scanned in reverse so that the last direct property takes precedence.
 * Spread properties are ignored rather than statically resolved; a spread after
 * the returned property may still override it at runtime. Statically evaluable
 * computed keys are matched.
 *
 * Returns `null` when the call is `null` or has no statically identifiable props
 * object, that is, when the second argument is absent or is not an object
 * literal after unwrapping type/chain expressions.
 * @param context The ESLint rule context.
 * @param call The parsed call, or `null`.
 * @param name The property name to look for (ex: `"children"`, `"key"`).
 * @returns The last matching `Property` node, or `null` when not found.
 */
export function findCreateElementProp(context: RuleContext, call: CreateElementCall | null, name: string): TSESTree.Property | null {
  if (call?.propsObject == null) return null;
  const { properties } = call.propsObject;
  for (let i = properties.length - 1; i >= 0; i--) {
    const property = properties[i];
    if (property?.type === AST.Property && getStaticPropertyName(context, property) === name) return property;
  }
  return null;
}

// #region Contextual Predicates

/**
 * Check if the node itself is passed as a children argument (the third argument
 * or later) of a `createElement` call. Contiguous TypeScript type-expression
 * ancestors are skipped, and the node is unwrapped before the comparison;
 * expressions nested inside an argument are not considered.
 * @param context The ESLint rule context.
 * @param node The node to check; nullish values return `false`.
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
 * Check if the node's closest `ObjectExpression` ancestor is the props object
 * (the second argument) of its nearest enclosing `createElement` call. The
 * second argument is unwrapped when it is a type or chain expression. Nodes that
 * cross another object literal (ex: a value inside an object nested in the props
 * object) are not considered inside.
 * @param context The ESLint rule context.
 * @param node The node to check; nullish values return `false`.
 * @returns `true` if the node's closest object literal is `createElement`'s props object.
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
