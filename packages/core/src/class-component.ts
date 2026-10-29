import { Check, Extract, type TSESTreeClass, type TSESTreeFunction, type TSESTreeMethodOrPropertyDefinition } from "@eslint-react/ast";
import { hasProperty, isString } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { SemanticNode } from "./semantic";

// #region Types

/**
 * @deprecated Class components are legacy. This type exists only to support legacy rules.
 */
export interface ClassComponentSemanticNode extends SemanticNode {
  /** The identifier of the class component. */
  id: null | TSESTree.BindingName;
  /** The kind of component. */
  kind: "class-component";
  /** The display name of the component. */
  displayName: null | TSESTree.Expression;
  /** Flags describing the component's characteristics. */
  flag: bigint;
  /** Hint for how the component was detected. */
  hint: bigint;
  /** The methods of the class component. */
  methods: TSESTreeMethodOrPropertyDefinition[];
  /** The AST node of the class. */
  node: TSESTreeClass;
}

// #endregion

// #region Class Component Detection

/**
 * Get the statically known name of a property or class member key.
 * Matches non-computed identifier keys (`React.Component`, `render() {}`) and string literal keys
 * (`React["Component"]`, `["render"]() {}`); computed keys that require runtime evaluation
 * (e.g. `React[Component]`, `[render]() {}`) are not matched.
 * @param key The key node to inspect.
 * @param computed Whether the key is computed.
 * @returns The key name, or `null` when it cannot be statically determined.
 */
function getStaticKeyName(key: TSESTree.Node, computed: boolean): string | null {
  if (!computed && Check.isIdentifier(key)) return key.name;
  if (key.type === AST.Literal && isString(key.value)) return key.value;
  return null;
}

/**
 * Check if the node is a class component (extends `Component` or `PureComponent`).
 * @param node The node to check.
 * @returns `true` if the node is a class component.
 */
export function isClassComponent(node: TSESTree.Node): node is TSESTreeClass {
  if (hasProperty(node, "superClass") && node.superClass != null) {
    const re = /^(?:Pure)?Component$/u;
    switch (true) {
      case Check.isIdentifier(node.superClass):
        return re.test(node.superClass.name);
      case node.superClass.type === AST.MemberExpression: {
        const name = getStaticKeyName(node.superClass.property, node.superClass.computed);
        return name != null && re.test(name);
      }
    }
  }
  return false;
}

/**
 * Check if the node is a pure component (extends `PureComponent`).
 * @param node The AST node to check.
 * @returns `true` if the node is a pure component.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isPureComponent(node: TSESTreeClass) {
  if (node.superClass != null) {
    const re = /^PureComponent$/u;
    switch (true) {
      case Check.isIdentifier(node.superClass):
        return re.test(node.superClass.name);
      case node.superClass.type === AST.MemberExpression: {
        const name = getStaticKeyName(node.superClass.property, node.superClass.computed);
        return name != null && re.test(name);
      }
    }
  }
  return false;
}

// #endregion

// #region Lifecycle Method Checkers

function createLifecycleChecker(methodName: string, isStatic = false) {
  return (node: TSESTree.Node): node is TSESTreeMethodOrPropertyDefinition => (
    Check.isPropertyOrMethod(node)
    && node.static === isStatic
    // Computed keys never match: a computed lifecycle name (e.g. `["componentDidCatch"]`) does not
    // make the class an error boundary, matching the behavior pinned by downstream rule specs.
    && !node.computed
    && getStaticKeyName(node.key, node.computed) === methodName
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
/**
 * @deprecated Class components are legacy. Additionally, this predicate does not correspond to any
 * real React semantics: `getDefaultProps` is a `createReactClass` spec method (an instance-side
 * spec object member, not a static class member), while React class components use the static
 * `defaultProps` property — a `static getDefaultProps` class method is meaningless to React.
 * Retained only to preserve the published API; do not use.
 */
export const isGetDefaultProps = createLifecycleChecker("getDefaultProps", true);
/** @deprecated Class components are legacy. */
export const isGetDerivedStateFromProps = createLifecycleChecker("getDerivedStateFromProps", true);
/** @deprecated Class components are legacy. */
export const isGetDerivedStateFromError = createLifecycleChecker("getDerivedStateFromError", true);

// #endregion

// #region Render Method Detection

/**
 * Check if the node is a render-like method or property of a class.
 * Only requires the grandparent node to be a class; the class does not need to be a class component.
 * @param node The AST node to check.
 * @returns `true` if the node is a render-like method.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isRenderMethodLike(node: TSESTree.Node): node is TSESTreeMethodOrPropertyDefinition {
  return Check.isPropertyOrMethod(node)
    && !node.computed
    && getStaticKeyName(node.key, node.computed)?.startsWith("render") === true
    && Check.isClass(node.parent.parent);
}

/**
 * Check if the function is the implementation value of a class component's render method or property
 * (e.g. the function of `render() {}` or the arrow function of `render = () => {}` in a class component).
 * @param node The function node to check.
 * @returns `true` if the function implements a class component's render method.
 */
export function isRenderMethodCallback(node: TSESTreeFunction) {
  // Traverse up past type expressions (e.g. `as any` in `render = (() => null) as any`)
  // so the immediate syntactic parent is the method or property definition.
  let parent: TSESTree.Node = node.parent;
  while (Check.isTypeExpression(parent)) {
    parent = parent.parent;
  }
  const grandparent = parent.parent;
  const greatGrandparent = grandparent?.parent;
  if (greatGrandparent == null) return false;
  return isRenderMethodLike(parent) && isClassComponent(greatGrandparent);
}

// #endregion

// #region State Helpers

/**
 * Check if the call expression is a `this.setState(...)` call.
 * @param node The call expression node to check.
 * @returns `true` if the node is a `this.setState(...)` call.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function isThisSetStateCall(node: TSESTree.CallExpression) {
  const callee = Extract.unwrap(node.callee);
  return callee.type === AST.MemberExpression
    && Extract.unwrap(callee.object).type === AST.ThisExpression
    && Extract.getCalleeName(node) === "setState";
}
