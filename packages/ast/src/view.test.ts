import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { inspect } from "node:util";
import { describe, expect, it } from "vitest";

import * as Extract from "./extract";
import { NodeInspectSymbol } from "./inspect";
import {
  AssignmentExpressionView,
  AwaitExpressionView,
  BinaryExpressionView,
  CallExpressionView,
  Class,
  ConditionalExpressionView,
  ExpressionStatementView,
  JSXExpressionContainerView,
  LogicalExpressionView,
  MemberExpressionView,
  NewExpressionView,
  PropertyView,
  ReturnStatementView,
  ThrowStatementView,
  UnaryExpressionView,
  VariableDeclaratorView,
  of,
} from "./view";

describe("View", () => {
  it("should expose the original node unchanged", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("foo;", AST.Identifier);
    const view = new Class(node);
    expect(view.node).toBe(node);
  });

  it("should return the parent without unwrapping", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("(foo as string);", AST.Identifier);
    const view = new Class(node);
    expect(view.getParent()).toBe(node.parent);
    expect(view.getParent()?.type).toBe(AST.TSAsExpression);
  });
});

describe("View inspection", () => {
  it("should produce a structured, non-circular JSON representation", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("foo(bar);", AST.CallExpression);
    const view = new CallExpressionView(node);
    expect(view.toJSON()).toEqual({
      _tag: "CallExpressionView",
      type: AST.CallExpression,
      range: node.range,
    });
    expect(() => JSON.stringify(view)).not.toThrow();
  });

  it("should include source text when a context is provided", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("foo(bar);", AST.CallExpression);
    const context = { sourceCode: { getText: () => "foo(bar)" } };
    expect(new CallExpressionView(node, context).toJSON().text).toBe("foo(bar)");
  });

  it("should format toString as JSON", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("foo;", AST.Identifier);
    expect(JSON.parse(new Class(node).toString())).toMatchObject({ _tag: "Class", type: AST.Identifier });
  });

  it("should support Node.js custom inspection", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("foo();", AST.CallExpression);
    const view = new CallExpressionView(node);
    expect(view[NodeInspectSymbol]()).toEqual(view.toJSON());
    expect(inspect(view)).toContain("CallExpressionView");
  });
});

describe("CallExpressionView", () => {
  it("should return the callee by reference, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("(foo as any)(bar!);", AST.CallExpression);
    const view = new CallExpressionView(node);
    const callee = view.getCallee();
    expect(callee).toBe(Extract.unwrap(node.callee));
    expect(callee).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should return the arguments unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("foo(bar as string, baz!, ...qux);", AST.CallExpression);
    const view = new CallExpressionView(node);
    const args = view.getArguments();
    expect(args).toHaveLength(3);
    expect(args[0]).toMatchObject({ name: "bar", type: AST.Identifier });
    expect(args[1]).toMatchObject({ name: "baz", type: AST.Identifier });
    expect(args[2]).toMatchObject({ type: AST.SpreadElement });
    expect(args[2]).toBe(node.arguments[2]);
  });

  it("should delegate to getCalleeName", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("(React.useState as any)();", AST.CallExpression);
    expect(new CallExpressionView(node).getCalleeName()).toBe("useState");
  });
});

describe("MemberExpressionView", () => {
  it("should unwrap the object and property", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("(foo as any).bar;", AST.MemberExpression);
    const view = new MemberExpressionView(node);
    expect(view.getObject()).toMatchObject({ name: "foo", type: AST.Identifier });
    expect(view.getProperty()).toMatchObject({ name: "bar", type: AST.Identifier });
    expect(view.getProperty()).toBe(node.property);
  });

  it("should delegate to getMemberChain", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("(a as any).b.c;", AST.MemberExpression);
    const chain = new MemberExpressionView(node).getMemberChain();
    expect(chain.map((member) => member.type === AST.Identifier ? member.name : member.type)).toEqual(["a", "b", "c"]);
  });
});

describe("AssignmentExpressionView", () => {
  it("should unwrap both sides", () => {
    const node = getFirstNodeOfType<TSESTree.AssignmentExpression>("(foo as any) = (bar as any)!;", AST.AssignmentExpression);
    const view = new AssignmentExpressionView(node);
    expect(view.getLeft()).toMatchObject({ name: "foo", type: AST.Identifier });
    expect(view.getRight()).toMatchObject({ name: "bar", type: AST.Identifier });
  });
});

describe("ConditionalExpressionView", () => {
  it("should unwrap the test", () => {
    const node = getFirstNodeOfType<TSESTree.ConditionalExpression>("(foo!) ? a : b;", AST.ConditionalExpression);
    expect(new ConditionalExpressionView(node).getTest()).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should unwrap the consequent and alternate", () => {
    const node = getFirstNodeOfType<TSESTree.ConditionalExpression>("t ? (a as any) : b!;", AST.ConditionalExpression);
    const view = new ConditionalExpressionView(node);
    expect(view.getConsequent()).toMatchObject({ name: "a", type: AST.Identifier });
    expect(view.getAlternate()).toMatchObject({ name: "b", type: AST.Identifier });
  });
});

describe("NewExpressionView", () => {
  it("should unwrap the callee and arguments", () => {
    const node = getFirstNodeOfType<TSESTree.NewExpression>("new (Foo as any)(bar!);", AST.NewExpression);
    const view = new NewExpressionView(node);
    expect(view.getCallee()).toMatchObject({ name: "Foo", type: AST.Identifier });
    const args = view.getArguments();
    expect(args).toHaveLength(1);
    expect(args[0]).toMatchObject({ name: "bar", type: AST.Identifier });
  });

  it("should return an empty argument list for a paren-less `new`", () => {
    const node = getFirstNodeOfType<TSESTree.NewExpression>("new Foo;", AST.NewExpression);
    expect(new NewExpressionView(node).getArguments()).toEqual([]);
  });
});

describe("BinaryLikeView", () => {
  it("should unwrap both operands of a binary expression", () => {
    const node = getFirstNodeOfType<TSESTree.BinaryExpression>("(a as any) + b!;", AST.BinaryExpression);
    const view = new BinaryExpressionView(node);
    expect(view.getLeft()).toMatchObject({ name: "a", type: AST.Identifier });
    expect(view.getRight()).toMatchObject({ name: "b", type: AST.Identifier });
  });

  it("should unwrap both operands of a logical expression", () => {
    const node = getFirstNodeOfType<TSESTree.LogicalExpression>("(a as any) && b!;", AST.LogicalExpression);
    const view = new LogicalExpressionView(node);
    expect(view.getLeft()).toMatchObject({ name: "a", type: AST.Identifier });
    expect(view.getRight()).toMatchObject({ name: "b", type: AST.Identifier });
  });
});

describe("ExpressionStatementView", () => {
  it("should unwrap the expression", () => {
    const node = getFirstNodeOfType<TSESTree.ExpressionStatement>("(foo as any);", AST.ExpressionStatement);
    expect(new ExpressionStatementView(node).getExpression()).toMatchObject({ name: "foo", type: AST.Identifier });
  });
});

describe("ReturnStatementView", () => {
  it("should return the unwrapped argument", () => {
    const node = getFirstNodeOfType<TSESTree.ReturnStatement>("function f() { return (x as any); }", AST.ReturnStatement);
    expect(new ReturnStatementView(node).getArgument()).toMatchObject({ name: "x", type: AST.Identifier });
  });

  it("should return null for a bare return", () => {
    const node = getFirstNodeOfType<TSESTree.ReturnStatement>("function f() { return; }", AST.ReturnStatement);
    expect(new ReturnStatementView(node).getArgument()).toBeNull();
  });
});

describe("ThrowStatementView", () => {
  it("should unwrap the argument", () => {
    const node = getFirstNodeOfType<TSESTree.ThrowStatement>("throw (err as any);", AST.ThrowStatement);
    expect(new ThrowStatementView(node).getArgument()).toMatchObject({ name: "err", type: AST.Identifier });
  });
});

describe("UnaryExpressionView", () => {
  it("should unwrap the argument", () => {
    const node = getFirstNodeOfType<TSESTree.UnaryExpression>("!(x as any);", AST.UnaryExpression);
    expect(new UnaryExpressionView(node).getArgument()).toMatchObject({ name: "x", type: AST.Identifier });
  });
});

describe("AwaitExpressionView", () => {
  it("should unwrap the argument", () => {
    const node = getFirstNodeOfType<TSESTree.AwaitExpression>("async function f() { await (p as any); }", AST.AwaitExpression);
    expect(new AwaitExpressionView(node).getArgument()).toMatchObject({ name: "p", type: AST.Identifier });
  });
});

describe("PropertyView", () => {
  it("should unwrap the key and value and expose the static name", () => {
    const node = getFirstNodeOfType<TSESTree.Property>("const o = { signal: (fn as any) };", AST.Property);
    const view = new PropertyView(node);
    expect(view.getKey()).toMatchObject({ name: "signal", type: AST.Identifier });
    expect(view.getKey()).toBe(node.key);
    expect(view.getValue()).toMatchObject({ name: "fn", type: AST.Identifier });
    expect(view.getName()).toBe("signal");
  });
});

describe("JSXExpressionContainerView", () => {
  it("should unwrap the expression", () => {
    const node = getFirstNodeOfType<TSESTree.JSXExpressionContainer>(
      "const el = <div>{(x as any)}</div>;",
      AST.JSXExpressionContainer,
    );
    expect(new JSXExpressionContainerView(node).getExpression()).toMatchObject({ name: "x", type: AST.Identifier });
  });
});

describe("VariableDeclaratorView", () => {
  it("should return the unwrapped initializer", () => {
    const node = getFirstNodeOfType<TSESTree.VariableDeclarator>("const x = foo as string;", AST.VariableDeclarator);
    expect(new VariableDeclaratorView(node).getInit()).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should return null when there is no initializer", () => {
    const node = getFirstNodeOfType<TSESTree.VariableDeclarator>("let x;", AST.VariableDeclarator);
    expect(new VariableDeclaratorView(node).getInit()).toBeNull();
  });
});

describe("of", () => {
  const dispatchCases = [
    ["foo = bar;", AST.AssignmentExpression, AssignmentExpressionView],
    ["async function f() { await p; }", AST.AwaitExpression, AwaitExpressionView],
    ["a + b;", AST.BinaryExpression, BinaryExpressionView],
    ["foo();", AST.CallExpression, CallExpressionView],
    ["t ? a : b;", AST.ConditionalExpression, ConditionalExpressionView],
    ["foo;", AST.ExpressionStatement, ExpressionStatementView],
    ["const el = <div>{x}</div>;", AST.JSXExpressionContainer, JSXExpressionContainerView],
    ["a && b;", AST.LogicalExpression, LogicalExpressionView],
    ["a.b;", AST.MemberExpression, MemberExpressionView],
    ["new Foo();", AST.NewExpression, NewExpressionView],
    ["({ a: 1 });", AST.Property, PropertyView],
    ["function f() { return 1; }", AST.ReturnStatement, ReturnStatementView],
    ["throw e;", AST.ThrowStatement, ThrowStatementView],
    ["!x;", AST.UnaryExpression, UnaryExpressionView],
    ["const x = 1;", AST.VariableDeclarator, VariableDeclaratorView],
  ] as const;

  it.each(dispatchCases)("should dispatch %s to the dedicated view", (code, type, ViewClass) => {
    const node = getFirstNodeOfType<TSESTree.Node>(code, type);
    const view = of(node);
    expect(view).toBeInstanceOf(ViewClass);
    expect(view.node).toBe(node);
  });

  it("should return the specialized view for known node types", () => {
    const call = getFirstNodeOfType<TSESTree.CallExpression>("foo();", AST.CallExpression);
    expect(of(call)).toBeInstanceOf(CallExpressionView);
    const member = getFirstNodeOfType<TSESTree.MemberExpression>("a.b;", AST.MemberExpression);
    expect(of(member)).toBeInstanceOf(MemberExpressionView);
  });

  it("should return the base view for node types without a dedicated view", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("foo;", AST.Identifier);
    const view = of(node);
    expect(view).toBeInstanceOf(Class);
    expect(view).not.toBeInstanceOf(CallExpressionView);
    expect(view.node).toBe(node);
  });

  it("should pass the context through to the view", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("foo();", AST.CallExpression);
    const context = { sourceCode: { getText: () => "foo()" } };
    expect(of(node, context).context).toBe(context);
  });
});
