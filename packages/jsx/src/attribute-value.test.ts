import type { RuleContext } from "@eslint-react/eslint";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, expectTypeOf, it } from "vitest";

import { type AttributeValue, evaluateAttributeValue, getAttributeStaticValue, getAttributeValue, resolveAttributeValue } from "./attribute-value";

function parseJsxElement(code: string): { context: RuleContext; element: TSESTree.JSXElement } {
  const { context, node } = getNodeInRule<TSESTree.JSXElement>(code, "JSXElement");
  return { context: context as never, element: node };
}

function getAttribute(element: TSESTree.JSXElement, index = 0) {
  const attr = element.openingElement.attributes[index];
  if (attr == null) throw new Error(`expected attribute ${index} to exist`);
  return attr;
}

function getPlainAttribute(element: TSESTree.JSXElement): TSESTree.JSXAttribute {
  const attribute = getAttribute(element);
  if (attribute.type !== AST.JSXAttribute) throw new Error("expected a plain attribute");
  return attribute;
}

function requireValue(value: AttributeValue | undefined): AttributeValue {
  if (value == null) throw new Error("expected an attribute value");
  return value;
}

describe("resolveAttributeValue", () => {
  it("describes boolean shorthand without inventing a value node", () => {
    const { context, element } = parseJsxElement("<input disabled />;");
    const attribute = getPlainAttribute(element);
    const value = resolveAttributeValue(context, attribute);
    expectTypeOf(value).toEqualTypeOf<AttributeValue>();
    expect(value).toEqual({ kind: "boolean", node: null });
  });

  it.each(
    [
      ['<div attr="x" />;', "literal", AST.Literal],
      ['<div attr={"x"} />;', "literal", AST.Literal],
      ['<div {...{ attr: "x" }} />;', "literal", AST.Literal],
      ["<div attr={1 + 1} />;", "expression", AST.BinaryExpression],
      ["<div {...{ attr: 1 + 1 }} />;", "expression", AST.BinaryExpression],
      ["<div attr={Math.random()} />;", "expression", AST.CallExpression],
      ["<div attr={/* nothing */} />;", "empty", AST.JSXEmptyExpression],
      ["<div attr=<span /> />;", "element", AST.JSXElement],
      ["<div attr={<span />} />;", "element", AST.JSXElement],
      ["<div {...{ attr: <span /> }} />;", "element", AST.JSXElement],
      ["<div attr={<></>} />;", "fragment", AST.JSXFragment],
      ["<div {...{ attr: <></> }} />;", "fragment", AST.JSXFragment],
    ] as const,
  )("normalizes value syntax: %s", (code, kind, type) => {
    const { context, element } = parseJsxElement(code);
    const attribute = getAttribute(element);
    const value = requireValue(resolveAttributeValue(context, attribute, "attr"));
    expect(value.kind).toBe(kind);
    expect(value.node?.type).toBe(type);
    expect(value).not.toHaveProperty("attribute");
    expect(value).not.toHaveProperty("toStatic");
    expect(value).not.toHaveProperty("getProperty");
  });

  it("preserves the actual spread property value node", () => {
    const { context, element } = parseJsxElement('<div {...{ attr: "x" }} />;');
    const attribute = getAttribute(element);
    if (attribute.type !== AST.JSXSpreadAttribute || attribute.argument.type !== AST.ObjectExpression) {
      throw new Error("expected an object spread");
    }
    const property = attribute.argument.properties[0];
    if (property?.type !== AST.Property) throw new Error("expected a property");
    const value = resolveAttributeValue(context, attribute, "attr");
    expectTypeOf(value).toEqualTypeOf<AttributeValue | undefined>();
    expect(value?.node).toBe(property.value);
  });

  it("returns undefined for a missing spread property", () => {
    const { context, element } = parseJsxElement('<div {...{ attr: "x" }} />;');
    expect(resolveAttributeValue(context, getAttribute(element), "missing")).toBeUndefined();
  });

  it("returns undefined for an unresolvable spread", () => {
    const { context, element } = parseJsxElement("<div {...props} />;");
    expect(resolveAttributeValue(context, getAttribute(element), "attr")).toBeUndefined();
  });

  it("requires a property name for spreads at both type and runtime boundaries", () => {
    const { context, element } = parseJsxElement('<div {...{ attr: "x" }} />;');
    const attribute = getAttribute(element);
    expect(() => {
      // @ts-expect-error A spread is a props object, not a single attribute value.
      resolveAttributeValue(context, attribute);
    }).toThrow(TypeError);
  });

  it("ignores the lookup name for a plain attribute", () => {
    const { context, element } = parseJsxElement('<div attr="x" />;');
    const attribute = getPlainAttribute(element);
    expect(resolveAttributeValue(context, attribute, "other")).toEqual(resolveAttributeValue(context, attribute));
  });

  it("retains the non-standard JSXSpreadChild syntax without evaluating it", () => {
    const { context, element } = parseJsxElement("<div>{...children}</div>;");
    const node = element.children[0];
    if (node?.type !== AST.JSXSpreadChild) throw new Error("expected a spread child");
    // Parsers do not produce spread children in attribute position, but TSESTree permits it.
    const attribute: TSESTree.JSXAttribute = {
      ...getPlainAttribute(parseJsxElement("<div attr />;").element),
      value: node,
    };
    const value = resolveAttributeValue(context, attribute);
    expect(value).toEqual({ kind: "spreadChild", node });
    expect(evaluateAttributeValue(context, value)).toBeUndefined();
  });
});

describe("evaluateAttributeValue", () => {
  it.each(
    [
      ["<div attr />;", true],
      ['<div attr="x" />;', "x"],
      ["<div attr={false} />;", false],
      ["<div attr={0} />;", 0],
      ["<div attr={null} />;", null],
      ["<div attr={1 + 1} />;", 2],
      ["const x = 5; <div attr={x} />;", 5],
      ["<div attr={undefined} />;", undefined],
      ["<div attr={void 0} />;", undefined],
      ["<div {...{ attr: undefined }} />;", undefined],
      ["<div attr={{ nested: [1, 2] }} />;", { nested: [1, 2] }],
    ] as const,
  )("wraps a known static value: %s", (code, expected) => {
    const { context, element } = parseJsxElement(code);
    const value = requireValue(getAttributeValue(context, element, "attr"));
    expect(evaluateAttributeValue(context, value)).toEqual({ value: expected });
  });

  it.each([
    "<div attr={Math.random()} />;",
    "<div attr={notDefined} />;",
    "<div attr={/* empty */} />;",
    "<div attr=<span /> />;",
    "<div attr={<span />} />;",
    "<div attr={<></>} />;",
    "<div {...{ attr: Math.random() }} />;",
    "<div {...{ get attr() { return 'x'; } }} />;",
  ])("returns no result when evaluation is unavailable: %s", (code) => {
    const { context, element } = parseJsxElement(code);
    const value = requireValue(getAttributeValue(context, element, "attr"));
    expect(evaluateAttributeValue(context, value)).toBeUndefined();
  });

  it("evaluates spread properties in their declaration scope, not their use scope", () => {
    const { context, element } = parseJsxElement(
      'const x = "outer"; const props = { attr: x }; function Component() { const x = "inner"; return <div {...props} />; }',
    );
    const value = requireValue(getAttributeValue(context, element, "attr"));
    expect(evaluateAttributeValue(context, value)).toEqual({ value: "outer" });
  });
});

describe("getAttributeValue", () => {
  it("distinguishes absent, empty, dynamic, and known undefined values", () => {
    const { context, element } = parseJsxElement("<div empty={} dynamic={foo()} known={undefined} />;");
    expect(getAttributeValue(context, element, "absent")).toBeUndefined();
    const empty = requireValue(getAttributeValue(context, element, "empty"));
    const dynamic = requireValue(getAttributeValue(context, element, "dynamic"));
    const known = requireValue(getAttributeValue(context, element, "known"));
    expect(empty.kind).toBe("empty");
    expect(dynamic.kind).toBe("expression");
    expect(known.kind).toBe("expression");
    expect(evaluateAttributeValue(context, empty)).toBeUndefined();
    expect(evaluateAttributeValue(context, dynamic)).toBeUndefined();
    expect(evaluateAttributeValue(context, known)).toEqual({ value: undefined });
  });

  it("preserves dynamic spread property syntax even when evaluation fails", () => {
    const { context, element } = parseJsxElement("<div {...{ attr: foo() }} />;");
    const value = requireValue(getAttributeValue(context, element, "attr"));
    expect(value.kind).toBe("expression");
    expect(value.node?.type).toBe(AST.CallExpression);
    expect(evaluateAttributeValue(context, value)).toBeUndefined();
  });
});

describe("getAttributeStaticValue", () => {
  it.each(
    [
      ["<div />;", undefined],
      ['<div attr="x" />;', "x"],
      ["<div attr />;", true],
      ["<div attr={Math.random()} />;", undefined],
      ["<div attr={undefined} />;", undefined],
      ["<div attr={} />;", undefined],
      ['const props = { attr: "x" }; <div {...props} />;', "x"],
      ['const a = { attr: "x" }; const b = a; <div {...b} />;', "x"],
      ['<div {...{ ["at" + "tr"]: "x" }} />;', "x"],
      ["<div {...{ ...{ attr: 1 }, attr: 2 }} />;", 2],
      ["<div {...{ attr: 2, ...{ attr: 1 } }} />;", 1],
      ['const props = { attr: "first" }; <div {...props} attr="second" />;', "second"],
      ['const props = { attr: "second" }; <div attr="first" {...props} />;', "second"],
      ['<div attr="a" attr="b" />;', "b"],
      ['<div attr="a" {...{ attr: undefined }} />;', undefined],
      ['<div attr="a" {...{ attr: foo() }} />;', undefined],
      ["const a = b; const b = a; <div {...a} />;", undefined],
    ] as const,
  )("returns the best-effort static value: %s", (code, expected) => {
    const { context, element } = parseJsxElement(code);
    expect(getAttributeStaticValue(context, element, "attr")).toBe(expected);
  });

  it("retains best-effort lookup through unknown spreads", () => {
    const { context, element } = parseJsxElement('<div attr="known" {...unknownProps} />;');
    expect(getAttributeStaticValue(context, element, "attr")).toBe("known");
  });
});
