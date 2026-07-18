import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getCalleeName } from "./extract";

function getFirstCallExpression(code: string): TSESTree.CallExpression {
  return getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
}

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
