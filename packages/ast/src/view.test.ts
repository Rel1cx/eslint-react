import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { inspect } from "node:util";
import { describe, expect, it } from "vitest";

import * as Extract from "./extract";
import { NodeInspectSymbol } from "./inspect";
import { AssignmentExpressionView, CallExpressionView, Class, ConditionalExpressionView, MemberExpressionView, VariableDeclaratorView, of } from "./view";

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
