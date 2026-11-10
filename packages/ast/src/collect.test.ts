import { getFirstExpression, getFirstNodeOfType, getTextOf } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getCallExpressions, getIdentifiers, getNewExpressions, getReturnExpressions, getReturnStatements } from "./collect";
import { simpleTraverse } from "./traverse";

function identifiersOf(code: string): string[] {
  return getIdentifiers(getFirstExpression(code)).map((id) => id.name);
}

function callsOf(code: string): string[] {
  return getCallExpressions(getFirstExpression(code)).map((node) => getTextOf(code, node));
}

function newExpressionsOf(code: string): string[] {
  return getNewExpressions(getFirstExpression(code)).map((node) => getTextOf(code, node));
}

function returnTextsOf(node: TSESTree.Node, code: string): string[] {
  return getReturnStatements(node).map((stmt) => getTextOf(code, stmt));
}

function countReturns(node: TSESTree.Node): number {
  return getReturnStatements(node).length;
}

function stripParentPointers(node: TSESTree.Node): void {
  simpleTraverse(node, {
    enter(child) {
      Reflect.deleteProperty(child, "parent");
    },
  });
}

describe("getIdentifiers", () => {
  it("should collect the root identifier", () => {
    expect(identifiersOf("foo;")).toEqual(["foo"]);
  });

  it("should collect identifiers in source order", () => {
    expect(identifiersOf("foo(a, b);")).toEqual(["foo", "a", "b"]);
  });

  it("should visit a callee before descending into its arguments", () => {
    expect(identifiersOf("foo(bar(x), y);")).toEqual(["foo", "bar", "x", "y"]);
  });

  it("should skip the property of a non-computed member access", () => {
    expect(identifiersOf("obj.prop;")).toEqual(["obj"]);
  });

  it("should visit the property of a computed member access", () => {
    expect(identifiersOf("obj[prop];")).toEqual(["obj", "prop"]);
  });

  it("should visit computed object property keys but not non-computed ones", () => {
    expect(identifiersOf("({ [key]: value });")).toEqual(["key", "value"]);
    expect(identifiersOf("({ key: value });")).toEqual(["value"]);
  });

  it("should skip holes in array expressions", () => {
    expect(identifiersOf("[a, , b];")).toEqual(["a", "b"]);
  });

  it("should not descend into function bodies", () => {
    expect(identifiersOf("foo(() => bar);")).toEqual(["foo"]);
  });

  it("should collect pattern defaults through object patterns", () => {
    const pattern = getFirstNodeOfType<TSESTree.ObjectPattern>("const { a = b } = c;", AST.ObjectPattern);
    expect(getIdentifiers(pattern).map((id) => id.name)).toEqual(["a", "b"]);
  });

  it("should visit rest element identifiers in patterns", () => {
    const pattern = getFirstNodeOfType<TSESTree.ArrayPattern>("const [first, ...rest] = x;", AST.ArrayPattern);
    expect(getIdentifiers(pattern).map((id) => id.name)).toEqual(["first", "rest"]);
  });

  it("should visit import expression sources and options", () => {
    const node = getFirstExpression("import(source, options);", { sourceType: "module" });
    expect(getIdentifiers(node).map((id) => id.name)).toEqual(["source", "options"]);
  });

  it("should visit identifiers inside JSX expression containers", () => {
    expect(identifiersOf("<div title={a}>{b}</div>;")).toEqual(["a", "b"]);
  });

  it("should not collect a non-computed member property passed as the root", () => {
    const member = getFirstExpression("obj.prop;");
    if (member.type !== AST.MemberExpression) throw new Error("Expected a member expression");
    expect(getIdentifiers(member.property)).toEqual([]);
  });

  it("should visit conditional branches in test, consequent, alternate order", () => {
    expect(identifiersOf("a ? b : c;")).toEqual(["a", "b", "c"]);
  });
});

describe("getCallExpressions", () => {
  it("should collect call expressions in source order", () => {
    expect(callsOf("foo(bar(x), y);")).toEqual(["foo(bar(x), y)", "bar(x)"]);
  });

  it("should not descend into function bodies", () => {
    expect(callsOf("useState(() => foo());")).toEqual(["useState(() => foo())"]);
  });

  it("should visit computed member properties", () => {
    expect(callsOf("obj[foo()];")).toEqual(["foo()"]);
  });

  it("should visit logical operands", () => {
    expect(callsOf("a && foo();")).toEqual(["foo()"]);
  });

  it("should traverse JSX attribute values and children", () => {
    const code = "<div title={foo()}>{new Bar()}</div>;";
    const jsx = getFirstNodeOfType<TSESTree.JSXElement>(code, AST.JSXElement);
    expect(getCallExpressions(jsx).map((node) => getTextOf(code, node))).toEqual(["foo()"]);
  });

  it("should only traverse the expression parts of statement roots", () => {
    const bracedCode = "if (cond()) { use(); }";
    const unbracedCode = "if (cond()) use(); else ref();";
    const braced = getFirstNodeOfType<TSESTree.IfStatement>(bracedCode, AST.IfStatement);
    const unbraced = getFirstNodeOfType<TSESTree.IfStatement>(unbracedCode, AST.IfStatement);
    expect(getCallExpressions(braced).map((node) => getTextOf(bracedCode, node))).toEqual(["cond()"]);
    expect(getCallExpressions(unbraced).map((node) => getTextOf(unbracedCode, node))).toEqual(["cond()"]);
  });

  it("should traverse a for statement's initializer, test, and update", () => {
    const code = "for (let i = init(); i < limit; i = next()) {}";
    const stmt = getFirstNodeOfType<TSESTree.ForStatement>(code, AST.ForStatement);
    expect(getCallExpressions(stmt).map((node) => getTextOf(code, node))).toEqual(["init()", "next()"]);
    expect(getIdentifiers(stmt).map((id) => id.name)).toEqual(["init", "i", "limit", "i", "next"]);
  });

  it("should visit initializer expressions of a variable declaration root", () => {
    const code = "const value = init();";
    const stmt = getFirstNodeOfType<TSESTree.VariableDeclaration>(code, AST.VariableDeclaration);
    expect(getCallExpressions(stmt).map((node) => getTextOf(code, node))).toEqual(["init()"]);
    expect(getIdentifiers(stmt).map((id) => id.name)).toEqual(["init"]);
  });

  it("should not traverse a function root", () => {
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>("function f() { return foo(); }", AST.FunctionDeclaration);
    expect(getCallExpressions(fn)).toEqual([]);
  });
});

describe("getNewExpressions", () => {
  it("should collect new expressions in source order", () => {
    expect(newExpressionsOf("[new A(), new B()];")).toEqual(["new A()", "new B()"]);
  });

  it("should collect constructor arguments", () => {
    expect(newExpressionsOf("new Foo(new Bar());")).toEqual(["new Foo(new Bar())", "new Bar()"]);
  });

  it("should not descend into function bodies", () => {
    expect(newExpressionsOf("new Promise(() => new Foo());")).toEqual(["new Promise(() => new Foo())"]);
  });

  it("should traverse JSX attribute values and children", () => {
    const code = "<div title={new Foo()}>{new Bar()}</div>;";
    const jsx = getFirstNodeOfType<TSESTree.JSXElement>(code, AST.JSXElement);
    expect(getNewExpressions(jsx).map((node) => getTextOf(code, node))).toEqual(["new Foo()", "new Bar()"]);
  });
});

describe("getReturnStatements", () => {
  it("should collect return statements of a function in source order", () => {
    const code = [
      "function f() {",
      "  if (a) { return 1; }",
      "  for (const x of xs) { return 2; }",
      "  try { return 3; } catch { return 4; } finally { return 5; }",
      "  switch (x) { case 1: return 6; default: return 7; }",
      "  return;",
      "  return 8;",
      "}",
    ].join("\n");
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(returnTextsOf(fn, code)).toEqual([
      "return 1;",
      "return 2;",
      "return 3;",
      "return 4;",
      "return 5;",
      "return 6;",
      "return 7;",
      "return;",
      "return 8;",
    ]);
  });

  it("should exclude return statements of nested functions", () => {
    const code = [
      "function f() {",
      "  function g() { return 0; }",
      "  const h = () => { return 1; };",
      "  class C { m() { return 2; } }",
      "  return 3;",
      "}",
    ].join("\n");
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(returnTextsOf(fn, code)).toEqual(["return 3;"]);
  });

  it("should only search the subtree of the given node", () => {
    const code = "function f() { if (c) { return 1; } return 2; }";
    const ifStmt = getFirstNodeOfType<TSESTree.IfStatement>(code, AST.IfStatement);
    expect(returnTextsOf(ifStmt, code)).toEqual(["return 1;"]);
  });

  it("should collect the same returns from a function body block", () => {
    const code = "function f() { if (c) { return 1; } return 2; }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(returnTextsOf(fn.body, code)).toEqual(["return 1;", "return 2;"]);
  });

  it("should return no return statements for an expression-bodied arrow function", () => {
    const fn = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>("const f = () => value;", AST.ArrowFunctionExpression);
    expect(getReturnStatements(fn)).toEqual([]);
  });

  it("should exclude return statements of nested function expressions", () => {
    const code = "function f() { foo(function () { return 2; }); return 1; }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(1);
  });

  it("should exclude return statements of doubly nested functions", () => {
    const code = "function f() { return 1; function g() { return 2; function h() { return 3; } } }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(1);
  });

  it("should exclude returns of class property arrow functions", () => {
    const code = "function f() { return 0; class A { p = () => { return 1; }; } }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(1);
  });

  it("should exclude returns of functions nested in class static blocks", () => {
    const code = "function f() { return 0; class A { static { const g = () => { return 1; }; } } }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(1);
  });

  it("should exclude returns of getters in object literals", () => {
    const code = "function f() { return 0; const o = { get x() { return 1; } }; }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(1);
  });

  it("should exclude returns of setters in object literals", () => {
    const code = "function f() { return 0; const o = { set x(v) { return 1; } }; }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(1);
  });

  it("should exclude returns of a nested IIFE", () => {
    const code = "(function () { return 1; (function () { return 2; })(); })";
    const fn = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    expect(countReturns(fn)).toBe(1);
  });

  it("should exclude returns of functions nested inside a return argument", () => {
    const code = "function f() { return () => { return 2; }; }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(1);
  });

  it("should collect returns in an async arrow function root", () => {
    const code = "const f = async () => { if (a) { return 1; } return 2; };";
    const fn = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(countReturns(fn)).toBe(2);
  });

  it("should collect returns when a class method is the root", () => {
    const fn = getFirstNodeOfType<TSESTree.FunctionExpression>("class A { m() { return 1; } }", AST.FunctionExpression);
    expect(countReturns(fn)).toBe(1);
  });

  it("should collect nothing when the root is not inside a function", () => {
    const program = getFirstNodeOfType<TSESTree.Program>("function f() { return 1; }", AST.Program);
    expect(countReturns(program)).toBe(0);
  });

  it("should exclude nested function returns inside a non-function root", () => {
    const code = "function f() { if (a) { const g = () => { return 3; }; return 1; } }";
    const ifStmt = getFirstNodeOfType<TSESTree.IfStatement>(code, AST.IfStatement);
    expect(countReturns(ifStmt)).toBe(1);
  });

  it("should collect returns inside labeled blocks and loops", () => {
    const code = "function f() { label: { return 1; } while (x) { return 2; } }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(2);
  });

  it("should collect the root return statement itself", () => {
    const code = "function f() { return 1; return 2; }";
    const stmt = getFirstNodeOfType<TSESTree.ReturnStatement>(code, AST.ReturnStatement);
    expect(countReturns(stmt)).toBe(1);
  });

  it("should use a nested function root as its own boundary", () => {
    const code = "function f() { return 1; function g() { return 2; function h() { return 3; } } }";
    const root = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    const g = getFirstNodeOfType<TSESTree.FunctionDeclaration>(root.body, AST.FunctionDeclaration);
    expect(countReturns(g)).toBe(1);
  });

  it("should use the enclosing arrow function as the boundary for a block root", () => {
    const code = "const f = () => { if (a) return 1; const g = () => { return 2; }; return 3; };";
    const arrow = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(countReturns(arrow.body)).toBe(2);
  });

  it("should collect returns of async functions", () => {
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>("async function f() { return 1; }", AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(1);
  });

  it("should collect returns of generator functions", () => {
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>("function* f() { yield 1; return 2; }", AST.FunctionDeclaration);
    expect(countReturns(fn)).toBe(1);
  });

  it("should exclude nested function returns without parent pointers", () => {
    const code = "function f() { function g() { return 0; } return 1; }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    stripParentPointers(fn);
    expect(returnTextsOf(fn, code)).toEqual(["return 1;"]);
  });
});

describe("getReturnExpressions", () => {
  it("should collect returned expressions in source order and skip bare returns", () => {
    const code = "function f() { if (a) { return 1; } return; return 3; }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(getReturnExpressions(fn).map((node) => getTextOf(code, node))).toEqual(["1", "3"]);
  });

  it("should include the body of an expression-bodied arrow function", () => {
    const code = "const f = () => value;";
    const fn = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getReturnExpressions(fn).map((node) => getTextOf(code, node))).toEqual(["value"]);
  });

  it("should exclude returned expressions of nested functions", () => {
    const code = "function f() { const g = () => { return 0; }; class C { m() { return 1; } } return 2; }";
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(code, AST.FunctionDeclaration);
    expect(getReturnExpressions(fn).map((node) => getTextOf(code, node))).toEqual(["2"]);
  });

  it("should exclude returns inside class static blocks", () => {
    const code = "const get = () => { class C { static { return ref.current; } } return 0; };";
    const fn = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getReturnExpressions(fn).map((node) => getTextOf(code, node))).toEqual(["0"]);
  });

  it("should return an empty array for a function without returns", () => {
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>("function f() { const x = 1; }", AST.FunctionDeclaration);
    expect(getReturnExpressions(fn)).toEqual([]);
  });
});
