import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext } from "@eslint-react/eslint";
import { findParentAttribute } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

// Well-known component wrapper call checks; only wrappers whose argument is a render function are listed.
/** Check if the node is a call expression to react-redux's `connect`. */
const isConnectCall = core.isAPICall("connect");
/** Check if the node is a call expression to Relay's `createFragmentContainer`. */
const isCreateFragmentContainerCall = core.isAPICall("createFragmentContainer");
/** Check if the node is a call expression to Relay's `createPaginationContainer`. */
const isCreatePaginationContainerCall = core.isAPICall("createPaginationContainer");
/** Check if the node is a call expression to Relay's `createRefetchContainer`. */
const isCreateRefetchContainerCall = core.isAPICall("createRefetchContainer");
/** Check if the node is a call expression to React's `forwardRef`. */
const isForwardRefCall = core.isAPICall("forwardRef");
/** Check if the node is a call expression to a `graphql` tag function (e.g. from Relay or Apollo). */
const isGraphqlCall = core.isAPICall("graphql");
/** Check if the node is a call expression to React's `memo`. */
const isMemoCall = core.isAPICall("memo");
/** Check if the node is a call expression to MobX's `observer`. */
const isObserverCall = core.isAPICall("observer");
/** Check if the node is a call expression to React's `useCallback`. */
const isUseCallbackCall = core.isAPICall("useCallback");
/** Check if the node is a call expression to Formik's `withFormik`. */
const isWithFormikCall = core.isAPICall("withFormik");
/** Check if the node is a call expression to recompose's `withHandlers`. */
const isWithHandlersCall = core.isAPICall("withHandlers");
/** Check if the node is a call expression to recompose's `withLifecycle`. */
const isWithLifecycleCall = core.isAPICall("withLifecycle");
/** Check if the node is a call expression to recompose's `withProps`. */
const isWithPropsCall = core.isAPICall("withProps");
/** Check if the node is a call expression to react-router v5's `withRouter`. */
const isWithRouterCall = core.isAPICall("withRouter");
/** Check if the node is a call expression to recompose's `withState`. */
const isWithStateCall = core.isAPICall("withState");

/**
 * Check if a call is a well-known component wrapper call (e.g. `memo`, `connect`, `withFormik`).
 * Curried forms like `connect(...)(Component)` are matched via the innermost callee call.
 * @param context The rule context
 * @param call The call expression to check
 * @param arg The function node passed to the call
 * @returns `true` if the call is a component wrapper call
 */
function isComponentWrapperCall(context: RuleContext, call: TSESTree.CallExpression, arg: TSESTree.Node) {
  // The function is the callee (e.g. an IIFE), not an argument
  if (Extract.unwrap(call.callee) === arg) return false;
  // Unwrap curried wrappers like `connect(...)(Component)`
  call = Extract.getInnermostCall(call);
  if (isConnectCall(context, call)) return true;
  if (isCreateFragmentContainerCall(context, call)) return true;
  if (isCreatePaginationContainerCall(context, call)) return true;
  if (isCreateRefetchContainerCall(context, call)) return true;
  if (isForwardRefCall(context, call)) return true;
  if (isGraphqlCall(context, call)) return true;
  if (isMemoCall(context, call)) return true;
  if (isObserverCall(context, call)) return true;
  if (isUseCallbackCall(context, call)) return true;
  if (isWithFormikCall(context, call)) return true;
  if (isWithHandlersCall(context, call)) return true;
  if (isWithLifecycleCall(context, call)) return true;
  if (isWithPropsCall(context, call)) return true;
  if (isWithRouterCall(context, call)) return true;
  if (isWithStateCall(context, call)) return true;
  return false;
}

/**
 * Resolve the name a function is bound to through wrapping calls (e.g. `const C = useCallback(...)` → `C`).
 * @param context The rule context
 * @param node The function node to resolve the bound name for
 * @returns The bound name, or `null` if the call chain does not end at an identifier declarator
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
 * Check if the node is inside `createElement`'s props argument
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if the node is inside `createElement`'s props
 */
export function isInsideCreateElementProps(context: RuleContext, node: TSESTree.Node) {
  const call = Traverse.findParent(node, core.isCreateElementCall(context));
  if (call == null) return false;
  // The props object is the second argument of createElement
  const prop = Traverse.findParent(node, Check.is(AST.ObjectExpression));
  if (prop == null) return false;
  return prop === call.arguments[1];
}

/**
 * Check if the node is inside a JSX attribute value
 * @param node The AST node to check
 * @returns `true` if the node is inside a JSX attribute value
 */
export function isInsideJSXAttributeValue(node: TSESTreeFunction) {
  return node.parent.type === AST.JSXAttribute || findParentAttribute(node, (n) => n.value?.type === AST.JSXExpressionContainer) != null;
}

/**
 * Check if the node is declared inside a class component's render block
 * Ex: class C extends React.Component { render() { const Nested = () => <div />; } }
 * @param node The AST node to check
 * @returns `true` if the node is inside a class component's render block
 */
export function isInsideRenderMethod(node: TSESTree.Node) {
  return Traverse.findParent(node, (n) => core.isRenderMethodLike(n) && core.isClassComponent(n.parent.parent)) != null;
}
