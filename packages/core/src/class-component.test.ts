/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../test";
import {
  isAssignmentToThisState,
  isClassComponentLoose,
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

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

describe("isClassComponentLoose", () => {
  it.each([
    ["class A extends Component {}", true],
    ["class A extends PureComponent {}", true],
    ["class A extends React.Component {}", true],
    ["class A extends React.PureComponent {}", true],
    ["class A {}", false],
    ["class A extends SomethingElse {}", false],
  ])("isClassComponentLoose(%s) === %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ClassDeclaration) {
          expect(isClassComponentLoose(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
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
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ClassDeclaration) {
          expect(isPureComponent(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
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
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.MethodDefinition) {
          expect(checker(node)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["getDefaultProps", isGetDefaultProps, true],
    ["getDerivedStateFromProps", isGetDerivedStateFromProps, true],
    ["getDerivedStateFromError", isGetDerivedStateFromError, true],
  ])("should detect static %s method", (methodName, checker, _expected) => {
    const code = `class A { static ${methodName}() {} }`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.MethodDefinition) {
          expect(checker(node)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should not match non-lifecycle methods", () => {
    const code = "class A { customMethod() {} }";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.MethodDefinition) {
          expect(isRender(node)).toBe(false);
          expect(isComponentDidMount(node)).toBe(false);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isRenderMethodLike", () => {
  it.each([
    ["class A { render() {} }", true],
    ["class A { renderHeader() {} }", true],
    ["class A { custom() {} }", false],
  ])("isRenderMethodLike(%s) === %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.MethodDefinition) {
          expect(isRenderMethodLike(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isThisSetStateCall", () => {
  it("should return true for this.setState()", () => {
    const code = "this.setState({})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          result = isThisSetStateCall(node);
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should return true when callee is wrapped in TSAsExpression", () => {
    const code = "(this.setState as any)({})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          result = isThisSetStateCall(node);
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should return true when callee is wrapped in TSSatisfiesExpression", () => {
    const code = "(this.setState satisfies typeof this.setState)({})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          result = isThisSetStateCall(node);
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should return false for unrelated calls", () => {
    const code = "this.forceUpdate()";
    let result = true;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          result = isThisSetStateCall(node);
        }
      },
    }, true);
    expect(result).toBe(false);
  });
});

describe("isAssignmentToThisState", () => {
  it("should return true for this.state = {}", () => {
    const code = "this.state = {}";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.AssignmentExpression) {
          result = isAssignmentToThisState(node);
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should return false for unrelated assignments", () => {
    const code = "this.props = {}";
    let result = true;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.AssignmentExpression) {
          result = isAssignmentToThisState(node);
        }
      },
    }, true);
    expect(result).toBe(false);
  });
});
