import type { RuleContext } from "@eslint-react/eslint";
import { collectNodes, createScopeContext, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { findObjectProperty, getStaticPropertyName, hasObjectProperty, isStaticPropertyKey } from "./property";

/**
 * Parses `code` and returns the outermost `ObjectExpression` together with a
 * scope-aware rule context. The outermost object is the one with the largest
 * source range, which is the object under test when nested spreads are present.
 */
function parseObject(code: string): { context: RuleContext; object: TSESTree.ObjectExpression } {
  const parsed = parseCode(code);
  const context = createScopeContext(parsed);
  const objects = collectNodes<TSESTree.ObjectExpression>(code, AST.ObjectExpression);
  if (objects.length === 0) throw new Error("expected an ObjectExpression");
  const object = objects.reduce((outer, candidate) => {
    const outerSize = outer.range[1] - outer.range[0];
    const candidateSize = candidate.range[1] - candidate.range[0];
    return candidateSize > outerSize ? candidate : outer;
  });
  return { context, object };
}

function getFirstProperty(object: TSESTree.ObjectExpression): TSESTree.Property {
  const property = object.properties[0];
  if (property?.type !== AST.Property) throw new Error("expected a Property");
  return property;
}

describe("getStaticPropertyName", () => {
  it("returns identifier keys", () => {
    const { context, object } = parseObject("const value = { a: 1 };");
    expect(getStaticPropertyName(context, getFirstProperty(object))).toBe("a");
  });

  it("returns string literal keys", () => {
    const { context, object } = parseObject('const value = { "a": 1 };');
    expect(getStaticPropertyName(context, getFirstProperty(object))).toBe("a");
  });

  it("returns computed string literal keys", () => {
    const { context, object } = parseObject('const value = { ["a"]: 1 };');
    expect(getStaticPropertyName(context, getFirstProperty(object))).toBe("a");
  });

  it("returns computed template literal keys", () => {
    const { context, object } = parseObject("const value = { [`a`]: 1 };");
    expect(getStaticPropertyName(context, getFirstProperty(object))).toBe("a");
  });

  it("evaluates computed binary keys", () => {
    const { context, object } = parseObject('const value = { ["a" + "b"]: 1 };');
    expect(getStaticPropertyName(context, getFirstProperty(object))).toBe("ab");
  });

  it("resolves computed keys backed by a constant", () => {
    const { context, object } = parseObject('const key = "a"; const value = { [key]: 1 };');
    expect(getStaticPropertyName(context, getFirstProperty(object))).toBe("a");
  });

  it("does not treat a computed identifier key as a plain name", () => {
    const { context, object } = parseObject("const value = { [foo]: 1 };");
    expect(getStaticPropertyName(context, getFirstProperty(object))).toBeNull();
  });

  it("returns null for non-string static keys", () => {
    const { context, object } = parseObject("const value = { [1]: 1 };");
    expect(getStaticPropertyName(context, getFirstProperty(object))).toBeNull();
  });
});

describe("isStaticPropertyKey", () => {
  it("returns true for non-computed keys", () => {
    const { context, object } = parseObject("const value = { a: 1 };");
    expect(isStaticPropertyKey(context, getFirstProperty(object))).toBe(true);
  });

  it("returns true for statically evaluable computed keys", () => {
    const { context, object } = parseObject('const value = { ["a" + "b"]: 1 };');
    expect(isStaticPropertyKey(context, getFirstProperty(object))).toBe(true);
  });

  it("returns true for statically known non-string keys", () => {
    const { context, object } = parseObject("const value = { [1]: 1 };");
    expect(isStaticPropertyKey(context, getFirstProperty(object))).toBe(true);
  });

  it("returns false for dynamic computed keys", () => {
    const { context, object } = parseObject("const value = { [name]: 1 };");
    expect(isStaticPropertyKey(context, getFirstProperty(object))).toBe(false);
  });
});

describe("findObjectProperty", () => {
  it("finds a direct property", () => {
    const { context, object } = parseObject("const value = { a: 1, b: 2 };");
    const property = findObjectProperty(context, object, "a");
    expect(property?.value.type).toBe(AST.Literal);
    if (property?.value.type === AST.Literal) expect(property.value.value).toBe(1);
  });

  it("returns null when the property is absent", () => {
    const { context, object } = parseObject("const value = { a: 1 };");
    expect(findObjectProperty(context, object, "b")).toBeNull();
  });

  it("later properties win over earlier ones", () => {
    const { context, object } = parseObject("const value = { a: 1, a: 2 };");
    const property = findObjectProperty(context, object, "a");
    expect(property?.value.type).toBe(AST.Literal);
    if (property?.value.type === AST.Literal) expect(property.value.value).toBe(2);
  });

  it("finds properties in an inline object spread", () => {
    const { context, object } = parseObject("const value = { ...{ a: 1 } };");
    expect(findObjectProperty(context, object, "a")?.type).toBe(AST.Property);
  });

  it("finds properties through identifier spreads", () => {
    const { context, object } = parseObject("const inner = { a: 1 }; const value = { ...inner };");
    expect(findObjectProperty(context, object, "a")?.type).toBe(AST.Property);
  });

  it("follows identifier aliases", () => {
    const { context, object } = parseObject("const inner = { a: 1 }; const alias = inner; const value = { ...alias };");
    expect(findObjectProperty(context, object, "a")?.type).toBe(AST.Property);
  });

  it("searches deeply nested spreads", () => {
    const { context, object } = parseObject("const value = { ...{ ...{ ...{ a: 1 } } } };");
    expect(findObjectProperty(context, object, "a")?.type).toBe(AST.Property);
  });

  it("matches statically evaluable computed keys", () => {
    const { context, object } = parseObject('const value = { ["a" + "b"]: 1 };');
    expect(findObjectProperty(context, object, "ab")?.type).toBe(AST.Property);
  });

  it("returns null for unresolvable spreads", () => {
    const { context, object } = parseObject("const value = { ...props };");
    expect(findObjectProperty(context, object, "a")).toBeNull();
  });

  it("does not infinite loop on circular aliases", () => {
    const { context, object } = parseObject("const a = b; const b = { ...a }; const value = { ...a };");
    expect(() => findObjectProperty(context, object, "k")).not.toThrow();
    expect(findObjectProperty(context, object, "k")).toBeNull();
  });

  it("resolves a property reachable through a diamond", () => {
    const { context, object } = parseObject(
      "const inner = { k: 1 };"
        + "const left = { ...inner, l: 1 };"
        + "const right = { ...inner, r: 2 };"
        + "const value = { ...left, ...right };",
    );
    expect(findObjectProperty(context, object, "k")?.type).toBe(AST.Property);
  });
});

describe("hasObjectProperty", () => {
  it("matches any of the given names", () => {
    const { context, object } = parseObject("const value = { a: 1, b: 2 };");
    expect(hasObjectProperty(context, object, new Set(["b"]))).toBe(true);
    expect(hasObjectProperty(context, object, new Set(["c"]))).toBe(false);
  });

  it("matches names in nested spreads", () => {
    const { context, object } = parseObject("const inner = { b: 1 }; const value = { ...inner };");
    expect(hasObjectProperty(context, object, new Set(["b"]))).toBe(true);
  });

  it("matches statically evaluable computed keys", () => {
    const { context, object } = parseObject('const value = { ["a" + "b"]: 1 };');
    expect(hasObjectProperty(context, object, new Set(["ab"]))).toBe(true);
  });

  it("returns false for an empty name set", () => {
    const { context, object } = parseObject("const value = { a: 1 };");
    expect(hasObjectProperty(context, object, new Set())).toBe(false);
  });

  it("returns false for unresolvable spreads", () => {
    const { context, object } = parseObject("const value = { ...props };");
    expect(hasObjectProperty(context, object, new Set(["a"]))).toBe(false);
  });
});
