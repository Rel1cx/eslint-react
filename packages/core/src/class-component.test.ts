import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import {
  isClassComponent,
  isComponentDidCatch,
  isComponentDidMount,
  isComponentDidUpdate,
  isComponentWillMount,
  isComponentWillReceiveProps,
  isComponentWillUnmount,
  isComponentWillUpdate,
  isGetChildContext,
  isGetDefaultProps,
  isGetDerivedStateFromError,
  isGetDerivedStateFromProps,
  isGetInitialState,
  isGetSnapshotBeforeUpdate,
  isPureComponent,
  isRender,
  isRenderMethodCallback,
  isRenderMethodLike,
  isShouldComponentUpdate,
  isThisSetStateCall,
  isUnsafeComponentWillMount,
  isUnsafeComponentWillReceiveProps,
  isUnsafeComponentWillUpdate,
} from "./class-component";

describe("isClassComponent", () => {
  it.each([
    ["class A extends Component {}", true],
    ["class A extends PureComponent {}", true],
    ["class A extends React.Component {}", true],
    ["class A extends React.PureComponent {}", true],
    ["class A {}", false],
    ["class A extends SomethingElse {}", false],
  ])("isClassComponent(%s) === %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>(code, AST.ClassDeclaration);
    expect(isClassComponent(node)).toBe(expected);
  });
  it("should return false for a computed member superClass with an identifier property", () => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>("class A extends React[Component] {}", AST.ClassDeclaration);
    expect(isClassComponent(node)).toBe(false);
  });

  it("should return true for a computed member superClass with a string literal property", () => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>(`class A extends React["Component"] {}`, AST.ClassDeclaration);
    expect(isClassComponent(node)).toBe(true);
  });

  it("should return true when the heritage clause has type arguments", () => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>("class A extends Component<Props> {}", AST.ClassDeclaration);
    expect(node.superClass?.type).toBe(AST.Identifier);
    expect(isClassComponent(node)).toBe(true);
  });

  it("should return false when the superClass is a call expression (mixin)", () => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>("class A extends mixin(Component) {}", AST.ClassDeclaration);
    expect(isClassComponent(node)).toBe(false);
  });
});

describe("isPureComponent", () => {
  it.each([
    ["class A extends PureComponent {}", true],
    ["class A extends React.PureComponent {}", true],
    ["class A extends Component {}", false],
    ["class A extends React.Component {}", false],
    ["class A {}", false],
  ])("isPureComponent(%s) === %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>(code, AST.ClassDeclaration);
    expect(isPureComponent(node)).toBe(expected);
  });

  it("should return false for a computed member superClass with an identifier property", () => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>("class A extends React[PureComponent] {}", AST.ClassDeclaration);
    expect(isPureComponent(node)).toBe(false);
  });

  it("should return true for a computed member superClass with a string literal property", () => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>(`class A extends React["PureComponent"] {}`, AST.ClassDeclaration);
    expect(isPureComponent(node)).toBe(true);
  });
});

describe("lifecycle method checkers", () => {
  it.each([
    ["render", isRender],
    ["componentDidCatch", isComponentDidCatch],
    ["componentDidMount", isComponentDidMount],
    ["componentDidUpdate", isComponentDidUpdate],
    ["componentWillMount", isComponentWillMount],
    ["componentWillReceiveProps", isComponentWillReceiveProps],
    ["componentWillUnmount", isComponentWillUnmount],
    ["componentWillUpdate", isComponentWillUpdate],
    ["getChildContext", isGetChildContext],
    ["getInitialState", isGetInitialState],
    ["getSnapshotBeforeUpdate", isGetSnapshotBeforeUpdate],
    ["shouldComponentUpdate", isShouldComponentUpdate],
    ["UNSAFE_componentWillMount", isUnsafeComponentWillMount],
    ["UNSAFE_componentWillReceiveProps", isUnsafeComponentWillReceiveProps],
    ["UNSAFE_componentWillUpdate", isUnsafeComponentWillUpdate],
  ])("should detect %s method", (methodName, checker) => {
    const code = `class A { ${methodName}() {} }`;
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>(code, AST.MethodDefinition);
    expect(checker(node)).toBe(true);
  });

  // NOTE: the `getDefaultProps` entry pins the current static-side behavior of the published API;
  // it does not endorse it as React semantics (`getDefaultProps` is a createReactClass spec method,
  // not a static class member). See the @deprecated JSDoc on `isGetDefaultProps`.
  it.each([
    ["getDefaultProps", isGetDefaultProps, true],
    ["getDerivedStateFromProps", isGetDerivedStateFromProps, true],
    ["getDerivedStateFromError", isGetDerivedStateFromError, true],
  ])("should detect static %s method", (methodName, checker, _expected) => {
    const code = `class A { static ${methodName}() {} }`;
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>(code, AST.MethodDefinition);
    expect(checker(node)).toBe(true);
  });

  it("should not match non-lifecycle methods", () => {
    const code = "class A { customMethod() {} }";
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>(code, AST.MethodDefinition);
    expect(isRender(node)).toBe(false);
    expect(isComponentDidMount(node)).toBe(false);
  });

  it("should not match a computed key whose identifier has the lifecycle name", () => {
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>("class A { [render]() {} }", AST.MethodDefinition);
    expect(isRender(node)).toBe(false);
  });

  it("should not match a computed key even when it is a string literal with the lifecycle name", () => {
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>(`class A { ["render"]() {} }`, AST.MethodDefinition);
    expect(isRender(node)).toBe(false);
  });

  it("should match a non-computed string literal key with the lifecycle name", () => {
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>(`class A { "render"() {} }`, AST.MethodDefinition);
    expect(isRender(node)).toBe(true);
  });

  it("should respect the static modifier of each lifecycle method", () => {
    const staticRender = getFirstNodeOfType<TSESTree.MethodDefinition>("class A { static render() {} }", AST.MethodDefinition);
    expect(isRender(staticRender)).toBe(false);
    const instanceGetDerivedStateFromProps = getFirstNodeOfType<TSESTree.MethodDefinition>(
      "class A { getDerivedStateFromProps() {} }",
      AST.MethodDefinition,
    );
    expect(isGetDerivedStateFromProps(instanceGetDerivedStateFromProps)).toBe(false);
  });

  it("should match a lifecycle property definition", () => {
    const node = getFirstNodeOfType<TSESTree.PropertyDefinition>("class A { render = () => {} }", AST.PropertyDefinition);
    expect(isRender(node)).toBe(true);
  });
});

describe("isRenderMethodLike", () => {
  it.each([
    ["class A { render() {} }", true],
    ["class A { renderHeader() {} }", true],
    ["class A { custom() {} }", false],
  ])("isRenderMethodLike(%s) === %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>(code, AST.MethodDefinition);
    expect(isRenderMethodLike(node)).toBe(expected);
  });

  it("should match a render-like property definition", () => {
    const node = getFirstNodeOfType<TSESTree.PropertyDefinition>("class A { render = () => {} }", AST.PropertyDefinition);
    expect(isRenderMethodLike(node)).toBe(true);
  });

  it("should match a static render-like method", () => {
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>("class A { static renderFooter() {} }", AST.MethodDefinition);
    expect(isRenderMethodLike(node)).toBe(true);
  });
});

describe("isRenderMethodCallback", () => {
  it("should return true for the function of a render method in a class component", () => {
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(
      "class A extends Component { render() { return null; } }",
      AST.FunctionExpression,
    );
    expect(isRenderMethodCallback(node)).toBe(true);
  });

  it("should return true for the arrow function of a render property in a class component", () => {
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(
      "class A extends Component { render = () => null; }",
      AST.ArrowFunctionExpression,
    );
    expect(isRenderMethodCallback(node)).toBe(true);
  });

  it("should return false for the function of a render method in a non-component class", () => {
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(
      "class A { render() { return null; } }",
      AST.FunctionExpression,
    );
    expect(isRenderMethodCallback(node)).toBe(false);
  });

  it("should return true for the arrow function of a type-wrapped render property in a class component", () => {
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(
      "class A extends Component { render = (() => null) as any; }",
      AST.ArrowFunctionExpression,
    );
    expect(isRenderMethodCallback(node)).toBe(true);
  });

  it("should return false for a function nested inside a render method", () => {
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(
      "class A extends Component { render() { return () => null; } }",
      AST.ArrowFunctionExpression,
    );
    expect(isRenderMethodCallback(node)).toBe(false);
  });

  it("should return false for a function inside a conditional render property value", () => {
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(
      "class A extends Component { render = cond ? () => null : null; }",
      AST.ArrowFunctionExpression,
    );
    expect(isRenderMethodCallback(node)).toBe(false);
  });
});

describe("isThisSetStateCall", () => {
  it("should return true for this.setState()", () => {
    const code = "this.setState({})";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    const result = isThisSetStateCall(node);
    expect(result).toBe(true);
  });

  it("should return true when callee is wrapped in TSAsExpression", () => {
    const code = "(this.setState as any)({})";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    const result = isThisSetStateCall(node);
    expect(result).toBe(true);
  });

  it("should return true when callee is wrapped in TSSatisfiesExpression", () => {
    const code = "(this.setState satisfies typeof this.setState)({})";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    const result = isThisSetStateCall(node);
    expect(result).toBe(true);
  });

  it("should return false for unrelated calls", () => {
    const code = "this.forceUpdate()";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    const result = isThisSetStateCall(node);
    expect(result).toBe(false);
  });

  it("should return true when this is wrapped in TSAsExpression", () => {
    const code = "(this as any).setState({})";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    const result = isThisSetStateCall(node);
    expect(result).toBe(true);
  });

  it("should return false for a computed setState key", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>(`this["setState"]({})`, AST.CallExpression);
    expect(isThisSetStateCall(node)).toBe(false);
  });

  it("should return false for super.setState()", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>(
      "class A extends Component { f() { super.setState({}); } }",
      AST.CallExpression,
    );
    expect(isThisSetStateCall(node)).toBe(false);
  });

  it("should return true for an optional this?.setState() call", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("this?.setState({})", AST.CallExpression);
    expect(isThisSetStateCall(node)).toBe(true);
  });
});
