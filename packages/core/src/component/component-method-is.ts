import * as ast from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

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
