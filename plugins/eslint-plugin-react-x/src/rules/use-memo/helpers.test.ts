import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getNestedReturnStatements } from "./helpers";

function countReturns(node: TSESTree.Node): number {
  return getNestedReturnStatements(node).length;
}

describe("getNestedReturnStatements", () => {
  it("should collect returns in the body of a function root", () => {
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>("function f() { return 1; }", AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect returns nested in blocks of the same function", () => {
    const code = "function f() { if (a) { return 1; } return 2; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(2);
  });

  it("should exclude returns of nested function declarations", () => {
    const code = "function f() { return 1; function g() { return 2; } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of nested arrow functions", () => {
    const code = "const f = () => { return 1; const g = () => { return 2; } };";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of nested function expressions", () => {
    const code = "function f() { foo(function () { return 2; }); return 1; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of class methods nested in the function", () => {
    const code = "function f() { return 0; class A { m() { return 1; } } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect returns of a class method used as root", () => {
    const code = "class A { m() { return 1; } }";
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect nothing from an arrow function with an expression body", () => {
    const code = "const f = () => 1;";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(countReturns(node)).toBe(0);
  });

  it("should collect nothing when the node is not inside a function", () => {
    const node = getFirstNodeOfType<TSESTree.Program>("function f() { return 1; }", AST.Program);
    expect(countReturns(node)).toBe(0);
  });

  it("should treat the enclosing function of a non-function root as the boundary", () => {
    const code = "function f() { if (a) { return 1; } return 2; }";
    const node = getFirstNodeOfType<TSESTree.IfStatement>(code, AST.IfStatement);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of nested functions inside a non-function root", () => {
    const code = "function f() { if (a) { const g = () => { return 3; }; return 1; } }";
    const node = getFirstNodeOfType<TSESTree.IfStatement>(code, AST.IfStatement);
    expect(countReturns(node)).toBe(1);
  });
});
