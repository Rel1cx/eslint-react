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
});
