import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, expectTypeOf, it } from "vitest";

import * as Extract from "./extract";
import {
  AbsentView,
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
  from,
  isAbsentView,
} from "./view";

describe("View", () => {
  it("should expose the original node unchanged", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("foo;", AST.Identifier);
    const view = new Class(node);
    expect(view.node).toBe(node);
  });

  it("should expose the node type on the view itself", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("foo;", AST.Identifier);
    const view = new Class(node);
    expect(view.type).toBe(AST.Identifier);
    expect(view.type).toBe(view.node.type);
  });

  it("should return a view of the parent without unwrapping", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("(foo as string);", AST.Identifier);
    const view = new Class(node);
    expect(view.parent).toBeInstanceOf(Class);
    expect(view.parent?.node).toBe(node.parent);
    expect(view.parent?.node.type).toBe(AST.TSAsExpression);
  });

  it("should return undefined as the parent of the root node", () => {
    const program = getFirstNodeOfType<TSESTree.Program>("foo;", AST.Program);
    expect(new Class(program).parent).toBeUndefined();
  });
});

describe("CallExpressionView", () => {
  it("should return a view of the callee, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("(foo as any)(bar!);", AST.CallExpression);
    const view = new CallExpressionView(node);
    const callee = view.callee;
    expect(callee).toBeInstanceOf(Class);
    expect(callee.node).toBe(Extract.unwrap(node.callee));
    expect(callee.node).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should return views of the arguments, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("foo(bar as string, baz!, ...qux);", AST.CallExpression);
    const view = new CallExpressionView(node);
    const args = view.arguments;
    expect(args).toHaveLength(3);
    expect(args[0]?.node).toMatchObject({ name: "bar", type: AST.Identifier });
    expect(args[1]?.node).toMatchObject({ name: "baz", type: AST.Identifier });
    expect(args[2]?.node).toMatchObject({ type: AST.SpreadElement });
    expect(args[2]?.node).toBe(node.arguments[2]);
  });

  it("should delegate to Extract.getCalleeName", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("(React.useState as any)();", AST.CallExpression);
    expect(new CallExpressionView(node).calleeName).toBe("useState");
  });
});

describe("MemberExpressionView", () => {
  it("should return views of the object and property, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("(foo as any).bar;", AST.MemberExpression);
    const view = new MemberExpressionView(node);
    expect(view.object.node).toMatchObject({ name: "foo", type: AST.Identifier });
    expect(view.property.node).toMatchObject({ name: "bar", type: AST.Identifier });
    expect(view.property.node).toBe(node.property);
  });

  it("should delegate to Extract.getMemberChain", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("(a as any).b.c;", AST.MemberExpression);
    const chain = new MemberExpressionView(node).memberChain;
    expect(chain.map((member) => member.type === AST.Identifier ? member.name : member.type)).toEqual(["a", "b", "c"]);
  });
});

describe("AssignmentExpressionView", () => {
  it("should return views of both sides, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.AssignmentExpression>("(foo as any) = (bar as any)!;", AST.AssignmentExpression);
    const view = new AssignmentExpressionView(node);
    expect(view.left.node).toMatchObject({ name: "foo", type: AST.Identifier });
    expect(view.right.node).toMatchObject({ name: "bar", type: AST.Identifier });
  });
});

describe("ConditionalExpressionView", () => {
  it("should return a view of the test, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.ConditionalExpression>("(foo!) ? a : b;", AST.ConditionalExpression);
    expect(new ConditionalExpressionView(node).test.node).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should return views of the consequent and alternate, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.ConditionalExpression>("t ? (a as any) : b!;", AST.ConditionalExpression);
    const view = new ConditionalExpressionView(node);
    expect(view.consequent.node).toMatchObject({ name: "a", type: AST.Identifier });
    expect(view.alternate.node).toMatchObject({ name: "b", type: AST.Identifier });
  });
});

describe("NewExpressionView", () => {
  it("should return views of the callee and arguments, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.NewExpression>("new (Foo as any)(bar!);", AST.NewExpression);
    const view = new NewExpressionView(node);
    expect(view.callee.node).toMatchObject({ name: "Foo", type: AST.Identifier });
    const args = view.arguments;
    expect(args).toHaveLength(1);
    expect(args[0]?.node).toMatchObject({ name: "bar", type: AST.Identifier });
  });

  it("should return an empty argument list for a paren-less `new`", () => {
    const node = getFirstNodeOfType<TSESTree.NewExpression>("new Foo;", AST.NewExpression);
    expect(new NewExpressionView(node).arguments).toEqual([]);
  });
});

describe("BinaryLikeView", () => {
  it("should return views of both operands of a binary expression, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.BinaryExpression>("(a as any) + b!;", AST.BinaryExpression);
    const view = new BinaryExpressionView(node);
    expect(view.left.node).toMatchObject({ name: "a", type: AST.Identifier });
    expect(view.right.node).toMatchObject({ name: "b", type: AST.Identifier });
  });

  it("should return views of both operands of a logical expression, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.LogicalExpression>("(a as any) && b!;", AST.LogicalExpression);
    const view = new LogicalExpressionView(node);
    expect(view.left.node).toMatchObject({ name: "a", type: AST.Identifier });
    expect(view.right.node).toMatchObject({ name: "b", type: AST.Identifier });
  });
});

describe("ExpressionStatementView", () => {
  it("should return a view of the expression, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.ExpressionStatement>("(foo as any);", AST.ExpressionStatement);
    expect(new ExpressionStatementView(node).expression.node).toMatchObject({ name: "foo", type: AST.Identifier });
  });
});

describe("ReturnStatementView", () => {
  it("should return a view of the argument, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.ReturnStatement>("function f() { return (x as any); }", AST.ReturnStatement);
    expect(new ReturnStatementView(node).argument.node).toMatchObject({ name: "x", type: AST.Identifier });
  });

  it("should return an absent view for a bare return", () => {
    const node = getFirstNodeOfType<TSESTree.ReturnStatement>("function f() { return; }", AST.ReturnStatement);
    const argument = new ReturnStatementView(node).argument;
    expect(argument).toBeInstanceOf(AbsentView);
    expect(isAbsentView(argument)).toBe(true);
    expect(argument.node).toBeUndefined();
  });
});

describe("ThrowStatementView", () => {
  it("should return a view of the argument, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.ThrowStatement>("throw (err as any);", AST.ThrowStatement);
    expect(new ThrowStatementView(node).argument.node).toMatchObject({ name: "err", type: AST.Identifier });
  });
});

describe("UnaryExpressionView", () => {
  it("should return a view of the argument, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.UnaryExpression>("!(x as any);", AST.UnaryExpression);
    expect(new UnaryExpressionView(node).argument.node).toMatchObject({ name: "x", type: AST.Identifier });
  });
});

describe("AwaitExpressionView", () => {
  it("should return a view of the argument, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.AwaitExpression>("async function f() { await (p as any); }", AST.AwaitExpression);
    expect(new AwaitExpressionView(node).argument.node).toMatchObject({ name: "p", type: AST.Identifier });
  });
});

describe("PropertyView", () => {
  it("should return views of the key and value and expose the static name", () => {
    const node = getFirstNodeOfType<TSESTree.Property>("const o = { signal: (fn as any) };", AST.Property);
    const view = new PropertyView(node);
    expect(view.key.node).toMatchObject({ name: "signal", type: AST.Identifier });
    expect(view.key.node).toBe(node.key);
    expect(view.value.node).toMatchObject({ name: "fn", type: AST.Identifier });
    expect(view.name).toBe("signal");
  });

  it("should expose the max-effort static name", () => {
    const node = getFirstNodeOfType<TSESTree.Property>("const o = { 'signal': fn };", AST.Property);
    const view = new PropertyView(node);
    expect(view.name).toBeNull();
    expect(view.nameMax).toBe("signal");
  });
});

describe("JSXExpressionContainerView", () => {
  it("should return a view of the expression, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.JSXExpressionContainer>(
      "const el = <div>{(x as any)}</div>;",
      AST.JSXExpressionContainer,
    );
    expect(new JSXExpressionContainerView(node).expression.node).toMatchObject({ name: "x", type: AST.Identifier });
  });
});

describe("VariableDeclaratorView", () => {
  it("should return a view of the initializer, unwrapped", () => {
    const node = getFirstNodeOfType<TSESTree.VariableDeclarator>("const x = foo as string;", AST.VariableDeclarator);
    expect(new VariableDeclaratorView(node).init.node).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should return an absent view when there is no initializer", () => {
    const node = getFirstNodeOfType<TSESTree.VariableDeclarator>("let x;", AST.VariableDeclarator);
    const init = new VariableDeclaratorView(node).init;
    expect(init).toBeInstanceOf(AbsentView);
    expect(isAbsentView(init)).toBe(true);
    expect(init.node).toBeUndefined();
  });
});

describe("AbsentView", () => {
  it("should wrap no node and have no parent", () => {
    const view = new AbsentView();
    expect(view.node).toBeUndefined();
    expect(view.type).toBeUndefined();
    expect(view.parent).toBeUndefined();
  });
});

describe("isAbsentView", () => {
  it("should return true for an absent view", () => {
    expect(isAbsentView(from(null))).toBe(true);
    expect(isAbsentView(from(undefined))).toBe(true);
  });

  it("should return false for a node view", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("foo;", AST.Identifier);
    expect(isAbsentView(from(node))).toBe(false);
  });
});

describe("View type narrowing", () => {
  it("should narrow a view over a broad node type to the dedicated view by type", () => {
    const node = getFirstNodeOfType<TSESTree.Node>("foo();", AST.CallExpression);
    const view = from(node);
    if (view.type === AST.CallExpression) {
      expectTypeOf(view).toEqualTypeOf<CallExpressionView>();
      expectTypeOf(view.node).toEqualTypeOf<TSESTree.CallExpression>();
    }
  });

  it("should narrow to the base class with a precise node for types without a dedicated view", () => {
    const node = getFirstNodeOfType<TSESTree.Node>("foo;", AST.Identifier);
    const view = from(node);
    if (view.type === AST.Identifier) {
      expectTypeOf(view).toEqualTypeOf<Class<TSESTree.Identifier>>();
      expectTypeOf(view.node).toEqualTypeOf<TSESTree.Identifier>();
    }
  });

  it("should narrow a getter result union by type, including the absent view branch", () => {
    const node = getFirstNodeOfType<TSESTree.VariableDeclarator>("const x = {};", AST.VariableDeclarator);
    const init = from(node).init;
    if (init.type === AST.ObjectExpression) {
      expectTypeOf(init).toEqualTypeOf<Class<TSESTree.ObjectExpression>>();
      expectTypeOf(init.node).toEqualTypeOf<TSESTree.ObjectExpression>();
    }
    if (init.type == null) {
      expectTypeOf(init).toEqualTypeOf<AbsentView>();
    }
  });

  it("should narrow a view over a nullable node by type", () => {
    const node = getFirstNodeOfType<TSESTree.ReturnStatement>("function f() { return 1; }", AST.ReturnStatement);
    const view = from(node.argument);
    if (view.type === AST.Literal) {
      expectTypeOf(view.node).toEqualTypeOf<TSESTree.Literal>();
    }
    if (view.type == null) {
      expectTypeOf(view).toEqualTypeOf<AbsentView>();
    }
  });
});

describe("from", () => {
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
    const view = from(node);
    expect(view).toBeInstanceOf(ViewClass);
    expect(view.node).toBe(node);
    expect(view.type).toBe(type);
  });

  it("should return the specialized view for known node types", () => {
    const call = getFirstNodeOfType<TSESTree.CallExpression>("foo();", AST.CallExpression);
    expect(from(call)).toBeInstanceOf(CallExpressionView);
    const member = getFirstNodeOfType<TSESTree.MemberExpression>("a.b;", AST.MemberExpression);
    expect(from(member)).toBeInstanceOf(MemberExpressionView);
  });

  it("should return the base view for node types without a dedicated view", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("foo;", AST.Identifier);
    const view = from(node);
    expect(view).toBeInstanceOf(Class);
    expect(view).not.toBeInstanceOf(CallExpressionView);
    expect(view.node).toBe(node);
  });

  it("should return an absent view for null and undefined", () => {
    expect(from(null)).toBeInstanceOf(AbsentView);
    expect(from(undefined)).toBeInstanceOf(AbsentView);
  });
});
