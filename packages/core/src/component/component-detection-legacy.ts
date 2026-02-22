import * as ast from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isClassComponent } from "./component-kind";

/**
 * Create a lifecycle method checker function
 * @param methodName The lifecycle method name
 * @param isStatic Whether the method is static
 */
function createLifecycleChecker(methodName: string, isStatic = false) {
  return (node: TSESTree.Node): node is ast.TSESTreeMethodOrProperty => (
    ast.isMethodOrProperty(node)
    && node.static === isStatic
    && node.key.type === AST.Identifier
    && node.key.name === methodName
  );
}

// Non-static lifecycle method checkers
export const isRender = createLifecycleChecker("render");
export const isComponentDidCatch = createLifecycleChecker("componentDidCatch");
export const isComponentDidMount = createLifecycleChecker("componentDidMount");
export const isComponentDidUpdate = createLifecycleChecker("componentDidUpdate");
export const isComponentWillMount = createLifecycleChecker("componentWillMount");
export const isComponentWillReceiveProps = createLifecycleChecker("componentWillReceiveProps");
export const isComponentWillUnmount = createLifecycleChecker("componentWillUnmount");
export const isComponentWillUpdate = createLifecycleChecker("componentWillUpdate");
export const isGetChildContext = createLifecycleChecker("getChildContext");
export const isGetInitialState = createLifecycleChecker("getInitialState");
export const isGetSnapshotBeforeUpdate = createLifecycleChecker("getSnapshotBeforeUpdate");
export const isShouldComponentUpdate = createLifecycleChecker("shouldComponentUpdate");
export const isUnsafeComponentWillMount = createLifecycleChecker("UNSAFE_componentWillMount");
export const isUnsafeComponentWillReceiveProps = createLifecycleChecker("UNSAFE_componentWillReceiveProps");
export const isUnsafeComponentWillUpdate = createLifecycleChecker("UNSAFE_componentWillUpdate");

// Static lifecycle method checkers
export const isGetDefaultProps = createLifecycleChecker("getDefaultProps", true);
export const isGetDerivedStateFromProps = createLifecycleChecker("getDerivedStateFromProps", true);
export const isGetDerivedStateFromError = createLifecycleChecker("getDerivedStateFromError", true);

/**
 * Check if the given node is a componentDidMount callback
 * @param node The node to check
 * @returns True if the node is a componentDidMount callback, false otherwise
 */
export function isComponentDidMountCallback(node: TSESTree.Node) {
  return ast.isFunction(node)
    && isComponentDidMount(node.parent)
    && node.parent.value === node;
}

/**
 * Check if the given node is a componentWillUnmount callback
 * @param node The node to check
 * @returns True if the node is a componentWillUnmount callback, false otherwise
 */
export function isComponentWillUnmountCallback(node: TSESTree.Node) {
  return ast.isFunction(node)
    && isComponentWillUnmount(node.parent)
    && node.parent.value === node;
}

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
export function isRenderMethodCallback(node: ast.TSESTreeFunction) {
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
 * Check whether the given node is a this.setState() call
 * @param node The node to check
 * @internal
 */
export function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;
  return (
    callee.type === AST.MemberExpression
    && ast.isThisExpressionLoose(callee.object)
    && callee.property.type === AST.Identifier
    && callee.property.name === "setState"
  );
}

/**
 * Check whether the given node is an assignment to this.state
 * @param node The node to check
 * @internal
 */
export function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;
  return left.type === AST.MemberExpression
    && ast.isThisExpressionLoose(left.object)
    && ast.getPropertyName(left.property) === "state";
}
