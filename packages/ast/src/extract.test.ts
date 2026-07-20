import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { findProperty, getCalleeName, getFullyQualifiedName, getIdentifierAt, getPropertyName, unwrap } from "./extract";

function getFirstCallExpression(code: string): TSESTree.CallExpression {
  return getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
}

function getFirstObjectExpression(code: string): TSESTree.ObjectExpression {
  return getFirstNodeOfType<TSESTree.ObjectExpression>(code, AST.ObjectExpression);
}

function getFirstProperty(code: string): TSESTree.Property {
  return getFirstNodeOfType<TSESTree.Property>(code, AST.Property);
}

function makeGetText(code: string): (node: TSESTree.Node) => string {
  return (node) => code.slice(node.range[0], node.range[1]);
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

describe("findProperty", () => {
  it("should find a direct identifier property", () => {
    const { properties } = getFirstObjectExpression("({ foo: 1, bar: 2 });");
    expect(findProperty(properties, "foo")?.key).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should find a property in a nested object spread", () => {
    const { properties } = getFirstObjectExpression("({ ...{ ...{ foo: 1 } } });");
    expect(findProperty(properties, "foo")?.key).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should ignore computed properties", () => {
    const { properties } = getFirstObjectExpression("({ [foo]: 1 });");
    expect(findProperty(properties, "foo")).toBe(null);
  });

  it("should ignore non-identifier properties", () => {
    const { properties } = getFirstObjectExpression('({ "foo": 1 });');
    expect(findProperty(properties, "foo")).toBe(null);
  });

  it("should return null when no property matches", () => {
    const { properties } = getFirstObjectExpression("({ foo: 1 });");
    expect(findProperty(properties, "bar")).toBe(null);
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

describe("getFullyQualifiedName", () => {
  it("should return an identifier name", () => {
    const code = "foo;";
    const node = getFirstNodeOfType<TSESTree.Identifier>(code, AST.Identifier);
    expect(getFullyQualifiedName(node, makeGetText(code))).toBe("foo");
  });

  it("should return a member expression name", () => {
    const code = "foo.bar.baz;";
    const node = getFirstNodeOfType<TSESTree.MemberExpression>(code, AST.MemberExpression);
    expect(getFullyQualifiedName(node, makeGetText(code))).toBe("foo.bar.baz");
  });

  it("should unwrap type expressions", () => {
    const code = "foo.bar as unknown;";
    const node = getFirstNodeOfType<TSESTree.TSAsExpression>(code, AST.TSAsExpression);
    expect(getFullyQualifiedName(node, makeGetText(code))).toBe("foo.bar");
  });

  it("should use source text for computed member expressions", () => {
    const code = 'foo["bar"];';
    const node = getFirstNodeOfType<TSESTree.MemberExpression>(code, AST.MemberExpression);
    expect(getFullyQualifiedName(node, makeGetText(code))).toBe('foo["bar"]');
  });

  it("should return a JSX member expression name", () => {
    const code = "<Foo.Bar />;";
    const node = getFirstNodeOfType<TSESTree.JSXMemberExpression>(code, AST.JSXMemberExpression);
    expect(getFullyQualifiedName(node, makeGetText(code))).toBe("Foo.Bar");
  });

  it("should return a JSX namespaced name", () => {
    const code = "<svg:path />;";
    const node = getFirstNodeOfType<TSESTree.JSXNamespacedName>(code, AST.JSXNamespacedName);
    expect(getFullyQualifiedName(node, makeGetText(code))).toBe("svg:path");
  });

  it("should return JSX text", () => {
    const code = "<div>content</div>;";
    const node = getFirstNodeOfType<TSESTree.JSXText>(code, AST.JSXText);
    expect(getFullyQualifiedName(node, makeGetText(code))).toBe("content");
  });

  it("should return the raw literal text", () => {
    const code = '"foo";';
    const node = getFirstNodeOfType<TSESTree.Literal>(code, AST.Literal);
    expect(getFullyQualifiedName(node, makeGetText(code))).toBe('"foo"');
  });

  it("should use source text for other node types", () => {
    const code = "foo();";
    const node = getFirstCallExpression(code);
    expect(getFullyQualifiedName(node, makeGetText(code))).toBe("foo()");
  });
});

describe("getPropertyName", () => {
  describe('"min" effort', () => {
    it("should return the name of a non-computed identifier property by default", () => {
      const property = getFirstProperty("({ foo: 1 });");
      expect(getPropertyName(property)).toBe("foo");
    });

    it("should return null for a computed identifier property", () => {
      const property = getFirstProperty("({ [foo]: 1 });");
      expect(getPropertyName(property, "min")).toBe(null);
    });

    it("should return null for a string literal property", () => {
      const property = getFirstProperty('({ "foo": 1 });');
      expect(getPropertyName(property, "min")).toBe(null);
    });
  });

  describe('"max" effort', () => {
    it("should return the name of a non-computed identifier property", () => {
      const property = getFirstProperty("({ foo: 1 });");
      expect(getPropertyName(property, "max")).toBe("foo");
    });

    it("should return null for a computed identifier property", () => {
      const property = getFirstProperty("({ [foo]: 1 });");
      expect(getPropertyName(property, "max")).toBe(null);
    });

    it("should return the value of a string literal property", () => {
      const property = getFirstProperty('({ "foo": 1 });');
      expect(getPropertyName(property, "max")).toBe("foo");
    });

    it("should return the value of a computed string literal property", () => {
      const property = getFirstProperty('({ ["foo"]: 1 });');
      expect(getPropertyName(property, "max")).toBe("foo");
    });

    it("should return the value of a static template literal property", () => {
      const property = getFirstProperty("({ [`foo`]: 1 });");
      expect(getPropertyName(property, "max")).toBe("foo");
    });

    it("should return null for a dynamic template literal property", () => {
      const property = getFirstProperty("({ [`foo${bar}`]: 1 });");
      expect(getPropertyName(property, "max")).toBe(null);
    });

    it("should return null for a numeric literal property", () => {
      const property = getFirstProperty("({ 1: true });");
      expect(getPropertyName(property, "max")).toBe(null);
    });
  });
});

describe("getIdentifierAt", () => {
  it("should return an identifier at either edge", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("foo;", AST.Identifier);
    expect(getIdentifierAt(node, 0)).toBe(node);
    expect(getIdentifierAt(node, -1)).toBe(node);
  });

  it("should return the leftmost identifier at position 0", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("foo.bar.baz;", AST.MemberExpression);
    expect(getIdentifierAt(node, 0)).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should return the rightmost identifier at position -1", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("foo.bar.baz;", AST.MemberExpression);
    expect(getIdentifierAt(node, -1)).toMatchObject({ name: "baz", type: AST.Identifier });
  });

  it("should support intermediate positive and negative positions", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("foo.bar.baz;", AST.MemberExpression);
    expect(getIdentifierAt(node, 1)).toMatchObject({ name: "bar", type: AST.Identifier });
    expect(getIdentifierAt(node, -2)).toMatchObject({ name: "bar", type: AST.Identifier });
  });

  it("should unwrap type and chain expressions", () => {
    const node = getFirstNodeOfType<TSESTree.TSAsExpression>("foo?.bar as unknown;", AST.TSAsExpression);
    expect(getIdentifierAt(node, 0)).toMatchObject({ name: "foo", type: AST.Identifier });
    expect(getIdentifierAt(node, -1)).toMatchObject({ name: "bar", type: AST.Identifier });
  });

  it("should return null for a non-identifier at the target position", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("this.foo;", AST.MemberExpression);
    expect(getIdentifierAt(node, 0)).toBe(null);
    expect(getIdentifierAt(node, -1)).toMatchObject({ name: "foo", type: AST.Identifier });
  });

  it("should return a computed identifier at the target position", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("foo[bar];", AST.MemberExpression);
    expect(getIdentifierAt(node, -1)).toMatchObject({ name: "bar", type: AST.Identifier });
  });

  it("should return null when the target property is not an identifier", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>('foo["bar"];', AST.MemberExpression);
    expect(getIdentifierAt(node, -1)).toBe(null);
  });

  it("should return null when the position is out of bounds", () => {
    const node = getFirstNodeOfType<TSESTree.MemberExpression>("foo.bar;", AST.MemberExpression);
    expect(getIdentifierAt(node, 2)).toBe(null);
    expect(getIdentifierAt(node, -3)).toBe(null);
  });

  it("should return null for a private identifier", () => {
    const node = getFirstNodeOfType<TSESTree.PrivateIdentifier>("class Foo { #bar; }", AST.PrivateIdentifier);
    expect(getIdentifierAt(node, 0)).toBe(null);
  });
});
