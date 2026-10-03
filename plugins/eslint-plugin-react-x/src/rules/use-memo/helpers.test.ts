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

  it("should collect returns in switch cases of the same function", () => {
    const code = "function f() { switch (x) { case 1: return 1; default: return 2; } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(2);
  });

  it("should collect returns across try, catch, and finally of the same function", () => {
    const code = "function f() { try { return 1; } catch { return 2; } finally { } return 3; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(3);
  });

  it("should collect returns inside loops of the same function", () => {
    const code = "function f() { for (;;) { return 1; } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect returns inside labeled blocks and loops of the same function", () => {
    const code = "function f() { label: { return 1; } while (x) { return 2; } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(2);
  });

  it("should exclude returns of doubly nested functions", () => {
    const code = "function f() { return 1; function g() { return 2; function h() { return 3; } } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of class property arrow functions nested in the function", () => {
    const code = "function f() { return 0; class A { p = () => { return 1; }; } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of functions nested in class static blocks", () => {
    const code = "function f() { return 0; class A { static { const g = () => { return 1; }; } } }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect the root return statement itself when the root is a ReturnStatement", () => {
    const code = "function f() { return 1; return 2; }";
    const node = getFirstNodeOfType<TSESTree.ReturnStatement>(code, AST.ReturnStatement);
    expect(countReturns(node)).toBe(1);
  });

  it("should use a nested function root as its own boundary", () => {
    const code = "function f() { return 1; function g() { return 2; function h() { return 3; } } }";
    const root = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    const g = getFirstNodeOfType<TSESTree.FunctionDeclaration>(root.body, AST.FunctionDeclaration);
    expect(countReturns(g)).toBe(1);
  });

  it("should treat the enclosing arrow of a block-statement root as the boundary", () => {
    const code = "const f = () => { if (a) return 1; const g = () => { return 2; }; return 3; };";
    const arrow = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(countReturns(arrow.body)).toBe(2);
  });

  it("should collect returns of async functions", () => {
    const code = "async function f() { return 1; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect returns of generator functions", () => {
    const code = "function* g() { yield 1; return 2; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should exclude returns of getters in object literals nested in the function", () => {
    const code = "function f() { return 0; const o = { get x() { return 1; } }; }";
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(1);
  });

  it("should collect only same-function returns scattered across deeply nested blocks, loops, and branches", () => {
    const code = `
      function f(x) {
        if (x > 0) {
          for (;;) {
            while (true) {
              try {
                if (x > 5) {
                  return 1;
                } else {
                  return 2;
                }
              } catch (e) {
                const h = () => { return 3; };
                return 4;
              }
            }
          }
        } else if (x < 0) {
          switch (x) {
            case -1: return 5;
            default: {
              function g() { return 6; }
              return 7;
            }
          }
        }
        return 8;
      }
    `;
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(node)).toBe(6);
  });
});
