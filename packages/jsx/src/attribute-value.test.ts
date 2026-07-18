import type { RuleContext } from "@eslint-react/eslint";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getAttributeStaticValue, getAttributeValue, resolveAttributeValue } from "./attribute-value";

function parseJsxElement(code: string): { context: RuleContext; element: TSESTree.JSXElement } {
  const { context, node } = getNodeInRule<TSESTree.JSXElement>(code, "JSXElement");
  return { context: context as never, element: node };
}

function getAttribute(element: TSESTree.JSXElement, index = 0) {
  const attr = element.openingElement.attributes[index];
  if (attr == null) throw new Error(`expected attribute ${index} to exist`);
  return attr;
}

describe("resolveAttributeValue", () => {
  it("resolves a boolean attribute", () => {
    const { context, element } = parseJsxElement("<input disabled />;");
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("boolean");
    expect(value.node).toBeNull();
    expect(value.toStatic()).toBe(true);
  });

  it("resolves a literal attribute", () => {
    const { context, element } = parseJsxElement('<div className="x" />;');
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("literal");
    expect(value.node?.type).toBe(AST.Literal);
    expect(value.toStatic()).toBe("x");
  });

  it("resolves a statically evaluable expression", () => {
    const { context, element } = parseJsxElement("<div tabIndex={1 + 1} />;");
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("unknown");
    expect(value.toStatic()).toBe(2);
  });

  it("resolves an expression referencing a constant", () => {
    const { context, element } = parseJsxElement("const x = 5; <div id={x} />;");
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("unknown");
    expect(value.toStatic()).toBe(5);
  });

  it("returns undefined for a non-static expression", () => {
    const { context, element } = parseJsxElement("<div id={Math.random()} />;");
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("unknown");
    expect(value.toStatic()).toBeUndefined();
  });

  it("resolves an empty expression container as a missing value", () => {
    const { context, element } = parseJsxElement("<div attr={/* nothing */} />;");
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("missing");
    expect(value.node?.type).toBe(AST.JSXEmptyExpression);
    expect(value.toStatic()).toBeUndefined();
  });

  it("resolves a JSX element value", () => {
    const { context, element } = parseJsxElement("<div attr=<span /> />;");
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("element");
    expect(value.node?.type).toBe(AST.JSXElement);
    expect(value.toStatic()).toBeUndefined();
  });

  it("resolves properties of an inline spread object", () => {
    const { context, element } = parseJsxElement('<div {...{ className: "x", n: Math.random() }} />;');
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("spreadProps");
    if (value.kind !== "spreadProps") return;
    expect(value.getProperty("className")).toBe("x");
    expect(value.getProperty("n")).toBeUndefined();
    expect(value.getProperty("missing")).toBeUndefined();
  });

  it("resolves properties of a spread identifier", () => {
    const { context, element } = parseJsxElement('const props = { className: "x" }; <div {...props} />;');
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("spreadProps");
    if (value.kind !== "spreadProps") return;
    expect(value.getProperty("className")).toBe("x");
  });

  it("resolves properties through identifier aliases", () => {
    const { context, element } = parseJsxElement('const a = { className: "x" }; const b = a; <div {...b} />;');
    const value = resolveAttributeValue(context, getAttribute(element));
    if (value.kind !== "spreadProps") throw new Error("expected spreadProps");
    expect(value.getProperty("className")).toBe("x");
  });

  it("resolves properties behind statically evaluable computed keys", () => {
    const { context, element } = parseJsxElement('<div {...{ ["class" + "Name"]: "x" }} />;');
    const value = resolveAttributeValue(context, getAttribute(element));
    if (value.kind !== "spreadProps") throw new Error("expected spreadProps");
    expect(value.getProperty("className")).toBe("x");
  });

  it("applies later-props-win semantics inside spread objects", () => {
    const { context, element } = parseJsxElement("<div {...{ ...{ a: 1 }, a: 2 }} />;");
    const value = resolveAttributeValue(context, getAttribute(element));
    if (value.kind !== "spreadProps") throw new Error("expected spread");
    expect(value.getProperty("a")).toBe(2);
  });

  it("toStatic() returns undefined for spread attributes without a name", () => {
    const { context, element } = parseJsxElement('<div {...{ className: "x" }} />;');
    const value = resolveAttributeValue(context, getAttribute(element));
    expect(value.kind).toBe("spreadProps");
    expect(value.toStatic()).toBeUndefined();
  });

  it("toStatic() resolves the named property for spread attributes", () => {
    const { context, element } = parseJsxElement('<div {...{ className: "x" }} />;');
    const value = resolveAttributeValue(context, getAttribute(element), "className");
    expect(value.kind).toBe("spreadProps");
    expect(value.toStatic()).toBe("x");
  });

  it("toStatic() ignores the name for plain attributes", () => {
    const { context, element } = parseJsxElement('<div className="x" />;');
    const value = resolveAttributeValue(context, getAttribute(element), "className");
    expect(value.kind).toBe("literal");
    expect(value.toStatic()).toBe("x");
  });
});

describe("getAttributeValue", () => {
  it("returns undefined when the attribute is absent", () => {
    const { context, element } = parseJsxElement("<div />;");
    expect(getAttributeValue(context, element, "className")).toBeUndefined();
  });

  it("returns the resolved value descriptor when present", () => {
    const { context, element } = parseJsxElement('<div className="x" />;');
    const value = getAttributeValue(context, element, "className");
    expect(value?.kind).toBe("literal");
    expect(value?.toStatic()).toBe("x");
  });

  it("resolves the named property of a spread attribute", () => {
    const { context, element } = parseJsxElement('const props = { className: "x" }; <div {...props} />;');
    const value = getAttributeValue(context, element, "className");
    expect(value?.kind).toBe("spreadProps");
    expect(value?.toStatic()).toBe("x");
  });
});

describe("getAttributeStaticValue", () => {
  it("returns undefined when the attribute is absent", () => {
    const { context, element } = parseJsxElement("<div />;");
    expect(getAttributeStaticValue(context, element, "className")).toBeUndefined();
  });

  it("returns the literal value", () => {
    const { context, element } = parseJsxElement('<div className="x" />;');
    expect(getAttributeStaticValue(context, element, "className")).toBe("x");
  });

  it("returns true for a boolean attribute", () => {
    const { context, element } = parseJsxElement("<input disabled />;");
    expect(getAttributeStaticValue(context, element, "disabled")).toBe(true);
  });

  it("returns undefined for a non-static expression", () => {
    const { context, element } = parseJsxElement("<div id={Math.random()} />;");
    expect(getAttributeStaticValue(context, element, "id")).toBeUndefined();
  });

  it("resolves the named property from a spread", () => {
    const { context, element } = parseJsxElement('const props = { className: "x" }; <div {...props} />;');
    expect(getAttributeStaticValue(context, element, "className")).toBe("x");
  });

  it("respects later-props-win semantics", () => {
    const { context, element } = parseJsxElement(
      'const props = { className: "first" }; <div {...props} className="second" />;',
    );
    expect(getAttributeStaticValue(context, element, "className")).toBe("second");
  });

  it("returns the last value when the attribute is duplicated", () => {
    const { context, element } = parseJsxElement('<div className="a" className="b" />;');
    expect(getAttributeStaticValue(context, element, "className")).toBe("b");
  });
});
