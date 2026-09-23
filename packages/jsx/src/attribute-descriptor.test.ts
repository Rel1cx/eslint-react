import type { RuleContext } from "@eslint-react/eslint";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, expectTypeOf, it } from "vitest";

import { type AttributeDescriptor, getAttributeDescriptor, resolveAttribute } from "./attribute-descriptor";
import { findSpreadProperty } from "./attribute-find";

function parseElement(code: string): { context: RuleContext; element: TSESTree.JSXElement } {
  const { context, node } = getNodeInRule<TSESTree.JSXElement>(code, "JSXElement");
  return { context: context as never, element: node };
}

function parseProperty(code: string): { context: RuleContext; property: TSESTree.Property } {
  const { context, node } = getNodeInRule<TSESTree.Property>(code, "Property");
  return { context: context as never, property: node };
}

function requireDescriptor(descriptor: AttributeDescriptor | undefined): AttributeDescriptor {
  if (descriptor == null) throw new Error("expected an attribute descriptor");
  return descriptor;
}

function firstAttribute(element: TSESTree.JSXElement) {
  const attribute = element.openingElement.attributes[0];
  if (attribute == null) throw new Error("expected an attribute");
  return attribute;
}

describe("resolveAttribute", () => {
  it("describes a plain JSX attribute with a guaranteed result", () => {
    const { context, element } = parseElement("<input disabled />;");
    const attribute = firstAttribute(element);
    if (attribute.type !== AST.JSXAttribute) throw new Error("expected a plain attribute");
    const descriptor = resolveAttribute(context, attribute);
    expectTypeOf(descriptor).toEqualTypeOf<AttributeDescriptor>();
    expect(descriptor.name).toBe("disabled");
    expect(descriptor.source.kind).toBe("jsx");
    expect(descriptor.source.node).toBe(attribute);
    expect(descriptor.value).toEqual({ kind: "boolean", node: null });
    expect(descriptor.getStaticValue()).toEqual({ value: true });
  });

  it("preserves namespaced JSX names", () => {
    const { context, element } = parseElement('<svg xml:space="preserve" />;');
    const descriptor = requireDescriptor(resolveAttribute(context, firstAttribute(element), "ignored"));
    expect(descriptor.name).toBe("xml:space");
    expect(descriptor.getStaticValue()).toEqual({ value: "preserve" });
  });

  it("separates spread use site, property declaration, and actual value", () => {
    const { context, element } = parseElement('const props = { title: "hello" }; <div {...props} />;');
    const attribute = firstAttribute(element);
    const descriptor = requireDescriptor(resolveAttribute(context, attribute, "title"));
    if (attribute.type !== AST.JSXSpreadAttribute || descriptor.source.kind !== "jsxSpread") {
      throw new Error("expected a spread source");
    }
    expectTypeOf(descriptor.source.node).toEqualTypeOf<TSESTree.JSXSpreadAttribute>();
    expect(descriptor.source.node).toBe(attribute);
    expect(descriptor.source.property).toBe(findSpreadProperty(context, attribute.argument, "title"));
    expect(descriptor.value.node).toBe(descriptor.source.property.value);
    expect(descriptor.value).not.toHaveProperty("attribute");
    expect(descriptor.name).toBe("title");
    const evaluate = descriptor.getStaticValue;
    expect(evaluate()).toEqual({ value: "hello" });
  });

  it("requires a property name when resolving a JSX spread", () => {
    const { context, element } = parseElement("<div {...props} />;");
    const attribute = firstAttribute(element);
    if (attribute.type !== AST.JSXSpreadAttribute) throw new Error("expected a spread attribute");
    expect(() => {
      // @ts-expect-error A props object cannot be resolved as a single named attribute.
      resolveAttribute(context, attribute);
    }).toThrow(TypeError);
  });

  it.each(["<div {...props} />;", "<div {...{ other: 1 }} />;", "const a = b; const b = a; <div {...a} />;"])(
    "returns no descriptor for an unresolved spread property: %s",
    (code) => {
      const { context, element } = parseElement(code);
      expect(resolveAttribute(context, firstAttribute(element), "title")).toBeUndefined();
    },
  );

  it.each([
    ['({ title: "hello" });', "title"],
    ['({ "aria-label": "hello" });', "aria-label"],
    ['({ "": "hello" });', ""],
    ['({ [`title`]: "hello" });', "title"],
    ['({ [``]: "hello" });', ""],
    ['({ ["title" as const]: "hello" });', "title"],
    ['({ ["ti" + "tle"]: "hello" });', "title"],
    ['const key = "title"; ({ [key]: "hello" });', "title"],
    ['({ 1: "hello" });', "1"],
    ['({ [true]: "hello" });', "true"],
  ])("describes object property names: %s", (code, name) => {
    const { context, property } = parseProperty(code);
    const result = resolveAttribute(context, property);
    expectTypeOf(result).toEqualTypeOf<AttributeDescriptor | undefined>();
    const descriptor = requireDescriptor(result);
    expect(descriptor.name).toBe(name);
    expect(descriptor.source.kind).toBe("property");
    expect(descriptor.source.node).toBe(property);
    expect(descriptor.value.node).toBe(property.value);
    expect(descriptor.getStaticValue()).toEqual({ value: "hello" });
    expect(resolveAttribute(context, property, "ignored")?.name).toBe(name);
  });

  it.each(["({ [unknownKey]: 1 });", "({ [Symbol.iterator]: 1 });"])("rejects unknown or symbol property names: %s", (code) => {
    const { context, property } = parseProperty(code);
    expect(resolveAttribute(context, property)).toBeUndefined();
  });

  it.each([
    "const { title = 'default' } = props;",
    "const { title } = props;",
    "const { title: [first] } = props;",
    "const { title: { nested } } = props;",
  ])("does not treat destructuring as a props value: %s", (code) => {
    const { context, property } = parseProperty(code);
    expect(resolveAttribute(context, property)).toBeUndefined();
  });

  it.each(
    [
      ['({ title: "hello" });', "literal", { value: "hello" }],
      ["({ title: undefined });", "expression", { value: undefined }],
      ["({ title: getTitle() });", "expression", undefined],
      ["({ title: <span /> });", "element", undefined],
      ["({ title: <></> });", "fragment", undefined],
      ['({ get title() { return "hello"; } });', "expression", undefined],
      ["({ title() {} });", "expression", undefined],
    ] as const,
  )("keeps property syntax separate from evaluation: %s", (code, kind, result) => {
    const { context, property } = parseProperty(code);
    const descriptor = requireDescriptor(resolveAttribute(context, property));
    expect(descriptor.value.kind).toBe(kind);
    expect(descriptor.getStaticValue()).toEqual(result);
  });
});

describe("getAttributeDescriptor", () => {
  it("distinguishes absent, empty, dynamic, and known undefined attributes", () => {
    const { context, element } = parseElement("<div empty={} dynamic={foo()} known={undefined} />;");
    expect(getAttributeDescriptor(context, element, "absent")).toBeUndefined();
    const empty = requireDescriptor(getAttributeDescriptor(context, element, "empty"));
    const dynamic = requireDescriptor(getAttributeDescriptor(context, element, "dynamic"));
    const known = requireDescriptor(getAttributeDescriptor(context, element, "known"));
    expect(empty.value.kind).toBe("empty");
    expect(dynamic.value.kind).toBe("expression");
    expect(empty.getStaticValue()).toBeUndefined();
    expect(dynamic.getStaticValue()).toBeUndefined();
    expect(known.getStaticValue()).toEqual({ value: undefined });
  });

  it.each(
    [
      ['<div title="first" title="last" />;', "last"],
      ['<div title="first" {...{ title: "last" }} />;', "last"],
      ['<div {...{ title: "first" }} title="last" />;', "last"],
      ['const a = { title: "last" }; const b = a; <div {...b} />;', "last"],
      ['<div {...{ title: "first", ...{ title: "last" } }} />;', "last"],
      ['const props = { title: "last" } as const; <div {...props} />;', "last"],
      ['const a = { title: "last" }; const b = a!; <div {...(b as typeof a)} />;', "last"],
      ['<div {...({ title: "last" } satisfies object)} />;', "last"],
      ['<div title="first" {...{ title: undefined }} />;', undefined],
    ] as const,
  )("uses last-known-match lookup through props syntax: %s", (code, expected) => {
    const { context, element } = parseElement(code);
    const descriptor = requireDescriptor(getAttributeDescriptor(context, element, "title"));
    expect(descriptor.name).toBe("title");
    expect(descriptor.getStaticValue()).toEqual({ value: expected });
  });

  it.each([
    ["<div {...{ 1: 'hello' }} />;", "1"],
    ["<div {...{ [true]: 'hello' }} />;", "true"],
  ])("uses the same property-name semantics as object descriptors: %s", (code, name) => {
    const { context, element } = parseElement(code);
    expect(getAttributeDescriptor(context, element, name)?.getStaticValue()).toEqual({ value: "hello" });
  });

  it("does not mistake symbol keys for string keys", () => {
    const { context, element } = parseElement('<div {...{ "Symbol(Symbol.iterator)": "string", [Symbol.iterator]: "symbol" }} />;');
    expect(getAttributeDescriptor(context, element, "Symbol(Symbol.iterator)")?.getStaticValue()).toEqual({ value: "string" });
  });

  it.each(["<div {...{ [{}]: 1 }} />;", "<div {...{ [{ toString: null }]: 1 }} />;"])("does not execute object key coercion: %s", (code) => {
    const { context, element } = parseElement(code);
    expect(getAttributeDescriptor(context, element, "[object Object]")).toBeUndefined();
  });

  it("evaluates values in their declaration scope", () => {
    const { context, element } = parseElement(
      'const title = "outer"; const props = { title }; function Component() { const title = "inner"; return <div {...props} />; }',
    );
    expect(getAttributeDescriptor(context, element, "title")?.getStaticValue()).toEqual({ value: "outer" });
  });

  it("preserves best-effort lookup without promising runtime certainty", () => {
    const { context, element } = parseElement('<div title="known" {...unknownProps} />;');
    expect(getAttributeDescriptor(context, element, "title")?.getStaticValue()).toEqual({ value: "known" });
  });
});
