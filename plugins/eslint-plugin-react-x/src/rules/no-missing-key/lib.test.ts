import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getNestedReturnStatements } from "./lib";

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

  it("should collect returns in switch statements of the same function", () => {
    const code = "function f() { switch (x) { case 1: return 1; default: return 2; } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(2);
  });

  it("should collect returns across try/catch/finally of the same function", () => {
    const code = "function f() { try { return 1; } catch (e) { return 2; } finally { } return 3; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(3);
  });

  it("should collect returns in loops, labeled statements, and deeply nested blocks", () => {
    const code = "function f() { for (let i = 0; i < 10; i++) { if (i > 5) return 1; } outer: while (true) { { { return 2; } } } return 3; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(3);
  });

  it("should exclude returns of double-nested functions", () => {
    const code = "function f() { return 1; function g() { return 2; const h = () => { return 3; }; } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of class methods and class property arrows nested in the function", () => {
    const code = "function f() { return 0; class A { m() { return 1; } p = () => { return 2; }; } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of object literal getters nested in the function", () => {
    const code = "function f() { return 0; const o = { get x() { return 1; } }; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect the root itself when the root is a return statement", () => {
    const code = "function f() { return 1; return 2; }";
    const node = getFirstNodeOfType<TSESTree.ReturnStatement>(code, AST.ReturnStatement);
    expect(countReturns(node)).toBe(1);
  });

  it("should treat the enclosing arrow as the boundary when the root is its body block", () => {
    const code = "const f = () => { if (a) { return 1; } const g = () => { return 2; }; return 3; };";
    const node = getFirstNodeOfType<TSESTree.BlockStatement>(code, AST.BlockStatement);
    expect(countReturns(node)).toBe(2);
  });

  it("should collect returns in async functions", () => {
    const code = "async function f() { return 1; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect returns in generator functions", () => {
    const code = "function* g() { yield 1; return 2; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of an IIFE nested in the root function", () => {
    const code = "(function () { return 1; (function () { return 2; })(); })";
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect only same-function returns in a deeply interleaved stress case", () => {
    const code = `
      function f() {
        if (a) {
          while (b) {
            if (c) {
              return 1;
            } else {
              return 2;
            }
          }
        } else if (d) {
          for (;;) {
            switch (e) {
              case 0:
                return 3;
              default:
                break;
            }
          }
          return 4;
        }
        const g = () => {
          return 5;
          function h() {
            return 6;
          }
        };
        label: {
          try {
            return 7;
          } finally {
          }
        }
      }
    `;
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(5);
  });
});
