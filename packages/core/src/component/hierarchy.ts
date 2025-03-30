import type { TSESTree } from "@typescript-eslint/types";
import * as AST from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/kit";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isCreateElementCall } from "../utils";
import { isRenderMethodLike } from "./component-lifecycle";
import { isClassComponent } from "./is";

/**
 * Determines whether inside `createElement`'s children.
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if the node is inside createElement's children
 */
export function isChildrenOfCreateElement(context: RuleContext, node: TSESTree.Node) {
  const parent = node.parent;
  if (parent == null || parent.type !== T.CallExpression) return false;
  if (!isCreateElementCall(context, parent)) return false;
  return parent.arguments
    .slice(2)
    .some((arg) => arg === node);
}

/**
 * Check whether given node is declared inside class component's render block
 * ```tsx
 * class Component extends React.Component {
 *   render() {
 *     class NestedClassComponent extends React.Component {
 *      render() { return <div />; }
 *     }
 *     const nestedFunctionComponent = () => <div />;
 *  }
 * }
 * ```
 * @param node The AST node being checked
 * @returns `true` if node is inside class component's render block, `false` if not
 */
export function isInsideRenderMethod(node: TSESTree.Node) {
  return AST.findParentNode(node, (n) => isRenderMethodLike(n) && isClassComponent(n.parent.parent)) != null;
}
