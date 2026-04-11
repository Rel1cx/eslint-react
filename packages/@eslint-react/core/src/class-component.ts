import * as ast from "@eslint-react/ast";
import { type SemanticNode, isAPIFromReact } from "@eslint-react/core";
import { type RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

// #region Types

/**
 * @deprecated Class components are legacy. This type exists only to support legacy rules.
 */
export interface ClassComponentSemanticNode extends SemanticNode {
  id: null | TSESTree.BindingName;
  kind: "class-component";
  displayName: null | TSESTree.Expression;
  flag: bigint;
  hint: bigint;
  methods: ast.TSESTreeMethodOrProperty[];
  node: ast.TSESTreeClass;
}

// #endregion/Users/Shared/eslint-react/packages/eslint-plugin-react-x/src/utils/class-component.ts

// #region Class Component Detection

/**
 * @param node The AST node to check.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isClassComponent(node: TSESTree.Node): node is ast.TSESTreeClass;
/**
 * @param node The AST node to check.
 * @param context The rule context.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isClassComponent(node: TSESTree.Node, context: RuleContext): node is ast.TSESTreeClass;
export function isClassComponent(node: TSESTree.Node, context?: RuleContext): node is ast.TSESTreeClass {
  if ("superClass" in node && node.superClass != null) {
    const re = /^(?:Pure)?Component$/u;
    switch (true) {
      case node.superClass.type === AST.Identifier:
        if (!re.test(node.superClass.name)) return false;
        if (context == null) return true;
        return isAPIFromReact(node.superClass.name, context.sourceCode.getScope(node), "react");
      case node.superClass.type === AST.MemberExpression
        && node.superClass.property.type === AST.Identifier:
        if (!re.test(node.superClass.property.name)) return false;
        if (context == null) return true;
        if (node.superClass.object.type === AST.Identifier) {
          return isAPIFromReact(node.superClass.object.name, context.sourceCode.getScope(node), "react");
        }
        return true;
    }
  }
  return false;
}

export function isClassComponentLoose(node: TSESTree.Node): node is ast.TSESTreeClass {
  if ("superClass" in node && node.superClass != null) {
    const re = /^(?:Pure)?Component$/u;
    switch (true) {
      case node.superClass.type === AST.Identifier:
        return re.test(node.superClass.name);
      case node.superClass.type === AST.MemberExpression
        && node.superClass.property.type === AST.Identifier:
        return re.test(node.superClass.property.name);
    }
  }
  return false;
}

/**
 * @param node The AST node to check.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isPureComponent(node: TSESTree.Node) {
  if ("superClass" in node && node.superClass != null) {
    const re = /^PureComponent$/u;
    switch (true) {
      case node.superClass.type === AST.Identifier:
        return re.test(node.superClass.name);
      case node.superClass.type === AST.MemberExpression
        && node.superClass.property.type === AST.Identifier:
        return re.test(node.superClass.property.name);
    }
  }
  return false;
}

// #endregion

// #region Lifecycle Method Checkers

function createLifecycleChecker(methodName: string, isStatic = false) {
  return (node: TSESTree.Node): node is ast.TSESTreeMethodOrProperty => (
    ast.isMethodOrProperty(node)
    && node.static === isStatic
    && node.key.type === AST.Identifier
    && node.key.name === methodName
  );
}

/** @deprecated Class components are legacy. */
export const isRender = createLifecycleChecker("render");
/** @deprecated Class components are legacy. */
export const isComponentDidCatch = createLifecycleChecker("componentDidCatch");
/** @deprecated Class components are legacy. */
export const isComponentDidMount = createLifecycleChecker("componentDidMount");
/** @deprecated Class components are legacy. */
export const isComponentDidUpdate = createLifecycleChecker("componentDidUpdate");
/** @deprecated Class components are legacy. */
export const isComponentWillMount = createLifecycleChecker("componentWillMount");
/** @deprecated Class components are legacy. */
export const isComponentWillReceiveProps = createLifecycleChecker("componentWillReceiveProps");
/** @deprecated Class components are legacy. */
export const isComponentWillUnmount = createLifecycleChecker("componentWillUnmount");
/** @deprecated Class components are legacy. */
export const isComponentWillUpdate = createLifecycleChecker("componentWillUpdate");
/** @deprecated Class components are legacy. */
export const isGetChildContext = createLifecycleChecker("getChildContext");
/** @deprecated Class components are legacy. */
export const isGetInitialState = createLifecycleChecker("getInitialState");
/** @deprecated Class components are legacy. */
export const isGetSnapshotBeforeUpdate = createLifecycleChecker("getSnapshotBeforeUpdate");
/** @deprecated Class components are legacy. */
export const isShouldComponentUpdate = createLifecycleChecker("shouldComponentUpdate");
/** @deprecated Class components are legacy. */
export const isUnsafeComponentWillMount = createLifecycleChecker("UNSAFE_componentWillMount");
/** @deprecated Class components are legacy. */
export const isUnsafeComponentWillReceiveProps = createLifecycleChecker("UNSAFE_componentWillReceiveProps");
/** @deprecated Class components are legacy. */
export const isUnsafeComponentWillUpdate = createLifecycleChecker("UNSAFE_componentWillUpdate");

/** @deprecated Class components are legacy. */
export const isGetDefaultProps = createLifecycleChecker("getDefaultProps", true);
/** @deprecated Class components are legacy. */
export const isGetDerivedStateFromProps = createLifecycleChecker("getDerivedStateFromProps", true);
/** @deprecated Class components are legacy. */
export const isGetDerivedStateFromError = createLifecycleChecker("getDerivedStateFromError", true);

// #endregion

// #region Render Method Detection

/**
 * @param node The AST node to check.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isRenderMethodLike(node: TSESTree.Node): node is ast.TSESTreeMethodOrProperty {
  return ast.isMethodOrProperty(node)
    && node.key.type === AST.Identifier
    && node.key.name.startsWith("render")
    && ast.isOneOf([AST.ClassDeclaration, AST.ClassExpression])(node.parent.parent);
}

export function isRenderMethodCallback(node: ast.TSESTreeFunction) {
  const parent = node.parent;
  const grandparent = parent.parent;
  const greatGrandparent = grandparent?.parent;
  return greatGrandparent != null
    && isRenderMethodLike(parent)
    && isClassComponentLoose(greatGrandparent);
}

// #endregion

// #region State Helpers

/**
 * @param node The call expression node to check.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isThisSetStateCall(node: TSESTree.CallExpression) {
  const { callee } = node;
  return (
    callee.type === AST.MemberExpression
    && ast.isThisExpressionLoose(callee.object)
    && callee.property.type === AST.Identifier
    && callee.property.name === "setState"
  );
}

/**
 * @param node The assignment expression node to check.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;
  return left.type === AST.MemberExpression
    && ast.isThisExpressionLoose(left.object)
    && ast.getPropertyName(left.property) === "state";
}

// #endregion
