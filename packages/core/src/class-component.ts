import { Check, Extract, isOneOf } from "@eslint-react/ast";
import type { TSESTreeClass, TSESTreeFunction, TSESTreeMethodOrPropertyDefinition } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { isAPIFromReact } from "./api";
import type { SemanticNode } from "./semantic";

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
  methods: TSESTreeMethodOrPropertyDefinition[];
  node: TSESTreeClass;
}

// #endregion

// #region Class Component Detection

/**
 * @param node The AST node to check.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isClassComponent(node: TSESTree.Node): node is TSESTreeClass;
/**
 * @param node The AST node to check.
 * @param context The rule context.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isClassComponent(node: TSESTree.Node, context: RuleContext): node is TSESTreeClass;
export function isClassComponent(node: TSESTree.Node, context?: RuleContext): node is TSESTreeClass {
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

export function isClassComponentLoose(node: TSESTree.Node): node is TSESTreeClass {
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
  return (node: TSESTree.Node): node is TSESTreeMethodOrPropertyDefinition => (
    Check.isMethodOrProperty(node)
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
export function isRenderMethodLike(node: TSESTree.Node): node is TSESTreeMethodOrPropertyDefinition {
  return Check.isMethodOrProperty(node)
    && node.key.type === AST.Identifier
    && node.key.name.startsWith("render")
    && isOneOf([AST.ClassDeclaration, AST.ClassExpression])(node.parent.parent);
}

export function isRenderMethodCallback(node: TSESTreeFunction) {
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
    && Check.thisExpression(callee.object)
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
    && Check.thisExpression(left.object)
    && Extract.propertyName(left.property) === "state";
}

// #endregion
