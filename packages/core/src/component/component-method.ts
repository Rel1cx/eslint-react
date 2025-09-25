import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Create a lifecycle method checker function
 * @param methodName The lifecycle method name
 * @param isStatic Whether the method is static
 */
function createLifecycleChecker(methodName: string, isStatic: boolean) {
  return function(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
    return (
      AST.isMethodOrProperty(node)
      && node.static === isStatic
      && node.key.type === T.Identifier
      && node.key.name === methodName
    );
  };
}

// Non-static lifecycle method checkers
export const isRender = createLifecycleChecker("render", false);
export const isComponentDidCatch = createLifecycleChecker("componentDidCatch", false);
export const isComponentDidMount = createLifecycleChecker("componentDidMount", false);
export const isComponentDidUpdate = createLifecycleChecker("componentDidUpdate", false);
export const isComponentWillMount = createLifecycleChecker("componentWillMount", false);
export const isComponentWillReceiveProps = createLifecycleChecker("componentWillReceiveProps", false);
export const isComponentWillUnmount = createLifecycleChecker("componentWillUnmount", false);
export const isComponentWillUpdate = createLifecycleChecker("componentWillUpdate", false);
export const isGetChildContext = createLifecycleChecker("getChildContext", false);
export const isGetInitialState = createLifecycleChecker("getInitialState", false);
export const isGetSnapshotBeforeUpdate = createLifecycleChecker("getSnapshotBeforeUpdate", false);
export const isShouldComponentUpdate = createLifecycleChecker("shouldComponentUpdate", false);
export const isUnsafeComponentWillMount = createLifecycleChecker("UNSAFE_componentWillMount", false);
export const isUnsafeComponentWillReceiveProps = createLifecycleChecker("UNSAFE_componentWillReceiveProps", false);
export const isUnsafeComponentWillUpdate = createLifecycleChecker("UNSAFE_componentWillUpdate", false);

// Static lifecycle method checkers
export const isGetDefaultProps = createLifecycleChecker("getDefaultProps", true);
export const isGetDerivedStateFromProps = createLifecycleChecker("getDerivedStateFromProps", true);
export const isGetDerivedStateFromError = createLifecycleChecker("getDerivedStateFromError", true);
