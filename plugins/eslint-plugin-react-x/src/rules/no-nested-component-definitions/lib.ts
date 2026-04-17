import { type TSESTreeFunction, Traverse, is } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext } from "@eslint-react/eslint";
import { findParentAttribute } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Determine whether the node is inside JSX attribute value
 * @param node The AST node to check
 * @returns `true` if the node is inside JSX attribute value
 */
export function isInsideJSXAttributeValue(node: TSESTreeFunction) {
  return node.parent.type === AST.JSXAttribute
    || findParentAttribute(node, (n) => n.value?.type === AST.JSXExpressionContainer) != null;
}

/**
 * Check whether a given node is declared inside a class component's render block
 * Ex: class C extends React.Component { render() { const Nested = () => <div />; } }
 * @param node The AST node being checked
 * @returns `true` if the node is inside a class component's render block
 */
export function isInsideRenderMethod(node: TSESTree.Node) {
  return Traverse.findParent(node, (n) => core.isRenderMethodLike(n) && core.isClassComponent(n.parent.parent))
    != null;
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
  const prop = Traverse.findParent(node, is(AST.ObjectExpression));
  if (prop == null) return false;
  return prop === call.arguments[1];
}
