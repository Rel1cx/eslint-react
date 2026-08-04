import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext } from "@eslint-react/eslint";
import { findParentAttribute } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Well-known component wrapper function names, matched by exact or `.`-suffixed fully
 * qualified name (e.g. `memo`, `React.memo`, `mobx.observer`, `connect` from react-redux,
 * or Relay's `create*Container` helpers). Only wrappers whose argument is a render function
 * are listed; wrappers taking a component identifier (`styled`, `motion`) or a loader
 * (`lazy`, `dynamic`) are irrelevant for name resolution.
 */
const WELL_KNOWN_COMPONENT_WRAPPERS = [
  "connect",
  "createFragmentContainer",
  "createPaginationContainer",
  "createRefetchContainer",
  "forwardRef",
  "graphql",
  "memo",
  "observer",
  "useCallback",
] as const;

/** Matches the HOC naming convention shared by recompose, react-router v5, Formik and custom HOCs (e.g. `withProps`, `withRouter`, `withFormik`, `withAuth`). */
const RE_HOC_WRAPPER_NAME = /^with[A-Z]/;

/**
 * Check if a call expression is a well-known component wrapper call.
 * Only calls whose callee's fully qualified name is (or ends with) a well-known wrapper
 * name (e.g. `memo`, `React.memo`, `React.useCallback`, `mobx.observer`) are treated as
 * wrappers; anything else, including member calls on data objects (e.g. `items.map`,
 * `Array.from`), is not, so array method callbacks are never mistaken for wrapped components.
 * Curried wrappers like `connect(...)(Component)` or `withFormik(...)(Component)` are
 * recognized by unwrapping nested callee call expressions.
 * @param context The rule context
 * @param node The call expression to check
 * @returns `true` if the call is a well-known component wrapper call
 */
export function isWellKnownComponentWrapperCall(context: RuleContext, node: TSESTree.CallExpression) {
  let callee = Extract.unwrap(node.callee);
  // Unwrap curried wrappers like `connect(...)(Component)`
  while (callee.type === AST.CallExpression) callee = Extract.unwrap(callee.callee);
  const name = Extract.getFullyQualifiedName(callee, (n) => context.sourceCode.getText(n));
  const baseName = name.slice(name.lastIndexOf(".") + 1);
  return RE_HOC_WRAPPER_NAME.test(baseName) || WELL_KNOWN_COMPONENT_WRAPPERS.some((wrapper) => name === wrapper || name.endsWith(`.${wrapper}`));
}

/**
 * Check if a call expression is a component wrapper call for name resolution purposes.
 * @param context The rule context
 * @param call The call expression to check
 * @param arg The function node passed to the call
 * @returns `true` if the call is a component wrapper call
 */
function isComponentWrapperCall(context: RuleContext, call: TSESTree.CallExpression, arg: TSESTree.Node) {
  // The function is the callee (e.g. an IIFE), not an argument
  if (Extract.unwrap(call.callee) === arg) return false;
  return isWellKnownComponentWrapperCall(context, call);
}

/**
 * Resolve the name a function is bound to through a chain of wrapping call expressions,
 * e.g. `const Component = useCallback(() => <div />, [])` resolves to `Component`.
 * @param context The rule context
 * @param node The function node to resolve the bound name for
 * @returns The bound name if the call chain ends at a variable declarator with an identifier, `null` otherwise
 */
export function getWrapperCallBoundName(context: RuleContext, node: TSESTreeFunction) {
  let current: TSESTree.Node = node;
  let parent = current.parent;
  while (Check.isTypeExpression(parent)) {
    current = parent;
    parent = parent.parent;
  }
  // Unwrap wrapping call expressions where the function is an argument of a component wrapper call
  while (parent.type === AST.CallExpression && isComponentWrapperCall(context, parent, current)) {
    current = parent;
    parent = parent.parent;
    while (Check.isTypeExpression(parent)) {
      current = parent;
      parent = parent.parent;
    }
  }
  if (parent.type !== AST.VariableDeclarator || parent.id.type !== AST.Identifier) {
    return null;
  }
  return parent.id.name;
}

/**
 * Determine whether the node is inside `createElement`'s props argument
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if the node is inside `createElement`'s props
 */
export function isInsideCreateElementProps(context: RuleContext, node: TSESTree.Node) {
  const call = Traverse.findParent(node, core.isCreateElementCall(context));
  if (call == null) return false;
  // Check if the node is within an object expression that is the second argument (props) of createElement
  const prop = Traverse.findParent(node, Check.is(AST.ObjectExpression));
  if (prop == null) return false;
  return prop === call.arguments[1];
}

/**
 * Determine whether the node is inside JSX attribute value
 * @param node The AST node to check
 * @returns `true` if the node is inside JSX attribute value
 */
export function isInsideJSXAttributeValue(node: TSESTreeFunction) {
  return node.parent.type === AST.JSXAttribute || findParentAttribute(node, (n) => n.value?.type === AST.JSXExpressionContainer) != null;
}

/**
 * Check whether a given node is declared inside a class component's render block
 * Ex: class C extends React.Component { render() { const Nested = () => <div />; } }
 * @param node The AST node being checked
 * @returns `true` if the node is inside a class component's render block
 */
export function isInsideRenderMethod(node: TSESTree.Node) {
  return Traverse.findParent(node, (n) => core.isRenderMethodLike(n) && core.isClassComponent(n.parent.parent)) != null;
}
