import { getFirstNodeOfType, getTextOf } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getCalleeName, getFullyQualifiedName, getJSXName, unwrap } from "./extract";

function getFirstCallExpression(code: string): TSESTree.CallExpression {
  return getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
}

describe("unwrap", () => {
  it("should return an unwrapped node unchanged", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("foo;", AST.Identifier);
    expect(unwrap(node)).toBe(node);
  });

  it("should unwrap nested type expressions", () => {
    const node = getFirstNodeOfType<TSESTree.TSAsExpression>("foo as unknown as string;", AST.TSAsExpression);
    expect(unwrap(node)).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should unwrap a chain expression", () => {
    const node = getFirstNodeOfType<TSESTree.ChainExpression>("foo?.bar;", AST.ChainExpression);
    expect(unwrap(node).type).toBe(AST.MemberExpression);
  });

  it("should unwrap nested chain and type expressions", () => {
    const node = getFirstNodeOfType<TSESTree.TSAsExpression>("(foo?.bar) as unknown;", AST.TSAsExpression);
    expect(unwrap(node).type).toBe(AST.MemberExpression);
  });
});

describe("getJSXName", () => {
  it("should return a JSX identifier name", () => {
    const code = "<div />;";
    const node = getFirstNodeOfType<TSESTree.JSXIdentifier>(code, AST.JSXIdentifier);
    expect(getJSXName(node)).toBe("div");
  });

  it("should return a JSX member expression name", () => {
    const code = "<Foo.Bar.Baz />;";
    const node = getFirstNodeOfType<TSESTree.JSXMemberExpression>(code, AST.JSXMemberExpression);
    expect(getJSXName(node)).toBe("Foo.Bar.Baz");
  });

  it("should return a JSX namespaced name", () => {
    const code = "<svg:path />;";
    const node = getFirstNodeOfType<TSESTree.JSXNamespacedName>(code, AST.JSXNamespacedName);
    expect(getJSXName(node)).toBe("svg:path");
  });
});

describe("getFullyQualifiedName", () => {
  it("should return an identifier name", () => {
    const code = "foo;";
    const node = getFirstNodeOfType<TSESTree.Identifier>(code, AST.Identifier);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe("foo");
  });

  it("should preserve the prefix of a private identifier", () => {
    const code = "class Foo { #bar; }";
    const node = getFirstNodeOfType<TSESTree.PrivateIdentifier>(code, AST.PrivateIdentifier);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe("#bar");
  });

  it("should distinguish private and public member properties", () => {
    const privateCode = "class Foo { #bar; m() { return this.#bar; } }";
    const publicCode = "class Foo { bar; m() { return this.bar; } }";
    const privateNode = getFirstNodeOfType<TSESTree.MemberExpression>(privateCode, AST.MemberExpression);
    const publicNode = getFirstNodeOfType<TSESTree.MemberExpression>(publicCode, AST.MemberExpression);
    expect(getFullyQualifiedName(privateNode, (n) => getTextOf(privateCode, n))).toBe("this.#bar");
    expect(getFullyQualifiedName(publicNode, (n) => getTextOf(publicCode, n))).toBe("this.bar");
  });

  it("should return a member expression name", () => {
    const code = "foo.bar.baz;";
    const node = getFirstNodeOfType<TSESTree.MemberExpression>(code, AST.MemberExpression);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe("foo.bar.baz");
  });

  it("should unwrap type expressions", () => {
    const code = "foo.bar as unknown;";
    const node = getFirstNodeOfType<TSESTree.TSAsExpression>(code, AST.TSAsExpression);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe("foo.bar");
  });

  it("should use source text for computed member expressions", () => {
    const code = 'foo["bar"];';
    const node = getFirstNodeOfType<TSESTree.MemberExpression>(code, AST.MemberExpression);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe('foo["bar"]');
  });

  it("should return a JSX member expression name", () => {
    const code = "<Foo.Bar />;";
    const node = getFirstNodeOfType<TSESTree.JSXMemberExpression>(code, AST.JSXMemberExpression);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe("Foo.Bar");
  });

  it("should return a JSX namespaced name", () => {
    const code = "<svg:path />;";
    const node = getFirstNodeOfType<TSESTree.JSXNamespacedName>(code, AST.JSXNamespacedName);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe("svg:path");
  });

  it("should return JSX text", () => {
    const code = "<div>content</div>;";
    const node = getFirstNodeOfType<TSESTree.JSXText>(code, AST.JSXText);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe("content");
  });

  it("should return the raw literal text", () => {
    const code = '"foo";';
    const node = getFirstNodeOfType<TSESTree.Literal>(code, AST.Literal);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe('"foo"');
  });

  it("should use source text for other node types", () => {
    const code = "foo();";
    const node = getFirstCallExpression(code);
    expect(getFullyQualifiedName(node, (n) => getTextOf(code, n))).toBe("foo()");
  });
});

describe("getCalleeName", () => {
  it("should return the name of an identifier callee", () => {
    const node = getFirstCallExpression("foo();");
    expect(getCalleeName(node)).toBe("foo");
  });

  it("should return the property name of a member expression callee", () => {
    const node = getFirstCallExpression("obj.foo();");
    expect(getCalleeName(node)).toBe("foo");
  });

  it("should return the property name of a nested member expression callee", () => {
    const node = getFirstCallExpression("obj.foo.bar();");
    expect(getCalleeName(node)).toBe("bar");
  });

  it("should return the property name through optional chaining", () => {
    const node = getFirstCallExpression("obj?.foo();");
    expect(getCalleeName(node)).toBe("foo");
  });

  it("should return the property name through nested optional chaining", () => {
    const node = getFirstCallExpression("obj?.foo?.bar();");
    expect(getCalleeName(node)).toBe("bar");
  });

  it("should return the name through a type assertion", () => {
    const node = getFirstCallExpression("(foo as any)();");
    expect(getCalleeName(node)).toBe("foo");
  });

  it("should return the property name through a type assertion", () => {
    const node = getFirstCallExpression("(obj.foo as any)();");
    expect(getCalleeName(node)).toBe("foo");
  });

  it("should return null for a computed identifier callee", () => {
    const node = getFirstCallExpression("obj[foo]();");
    expect(getCalleeName(node)).toBe(null);
  });

  it("should return null for a computed identifier callee through optional chaining", () => {
    const node = getFirstCallExpression("obj?.[foo]();");
    expect(getCalleeName(node)).toBe(null);
  });

  it("should return null for a computed string literal callee", () => {
    const node = getFirstCallExpression('obj["foo"]();');
    expect(getCalleeName(node)).toBe(null);
  });

  it("should return null for a computed template literal callee", () => {
    const node = getFirstCallExpression("obj[`foo`]();");
    expect(getCalleeName(node)).toBe(null);
  });

  it("should return the property name for a member expression indirect call", () => {
    const node = getFirstCallExpression("foo.call(bar);");
    expect(getCalleeName(node)).toBe("call");
  });
});
