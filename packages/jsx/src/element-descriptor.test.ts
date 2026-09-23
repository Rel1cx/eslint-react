import type { RuleContext } from "@eslint-react/eslint";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, expectTypeOf, it } from "vitest";

import type { AttributeDescriptor } from "./attribute-descriptor";
import { type ElementDescriptor, resolveElement } from "./element-descriptor";

function parseNode(code: string, selector = ":matches(JSXElement, JSXFragment, CallExpression)"): { context: RuleContext; node: TSESTree.Node } {
  const { context, node } = getNodeInRule<TSESTree.Node>(code, selector);
  return { context: context as never, node };
}

function parseElement(code: string, selector?: string) {
  const { context, node } = parseNode(code, selector);
  const element = resolveElement(context, node);
  if (element == null) throw new Error("expected an element descriptor");
  return { context, node, element };
}

describe("resolveElement", () => {
  it("exposes a discriminated descriptor with shared prop and child methods", () => {
    const { context, node } = parseNode("<div />;");
    const element = resolveElement(context, node);
    expectTypeOf(element).toEqualTypeOf<ElementDescriptor | undefined>();
    if (element == null) throw new Error("expected an element descriptor");
    expectTypeOf(element.type).toEqualTypeOf<string>();
    expectTypeOf(element.getProp("id")).toEqualTypeOf<AttributeDescriptor | undefined>();
    expectTypeOf(element.getChildren()).toEqualTypeOf<readonly TSESTree.Node[]>();
    if (element.kind === "jsx") {
      expectTypeOf(element.node).toEqualTypeOf<TSESTree.JSXElement | TSESTree.JSXFragment>();
    } else {
      expectTypeOf(element.node).toEqualTypeOf<TSESTree.CallExpression>();
    }
  });

  it.each([
    ["<div />;", "div"],
    ["<Widget />;", "Widget"],
    ["<Foo.Bar.Baz />;", "Foo.Bar.Baz"],
    ["<React.Fragment />;", "React.Fragment"],
    ["<svg:path />;", "svg:path"],
    ["<></>;", ""],
  ])("describes JSX names and preserves node identity: %s", (code, type) => {
    const { element, node } = parseElement(code);
    expect(element.kind).toBe("jsx");
    expect(element.type).toBe(type);
    expect(element.node).toBe(node);
    expect(element.getProp("missing")).toBeUndefined();
    expect(element.getChildren()).toEqual([]);
  });

  it.each([
    ['createElement("div");', "div"],
    ["React.createElement('span', null);", "span"],
    ['Factory.React.createElement("div", null);', "div"],
    ['unrelated.createElement("div", null);', "div"],
    ['function createElement() {} createElement("div", null);', "div"],
    ['createElement("d\\u0069v", null);', "div"],
    ["createElement(Widget, null);", "Widget"],
    ["createElement(Foo.Bar.Baz, null);", "Foo.Bar.Baz"],
    ["createElement(React.Fragment, null);", "React.Fragment"],
    ['const Tag = "div"; createElement(Tag, null);', "Tag"],
    ['createElement(Foo["Bar"], null);', 'Foo["Bar"]'],
    ["createElement(flag ? Foo : Bar, null);", "flag ? Foo : Bar"],
    ["createElement(getType(), null);", "getType()"],
    ["createElement(() => null, null);", "() => null"],
    ["createElement(`div`, null);", "`div`"],
    ['createElement("div" as const, null);', "div"],
    ["createElement((Foo as ComponentType).Bar!, null);", "Foo.Bar"],
    ['(React.createElement as Factory)("div", null);', "div"],
  ])("uses name-based call recognition and syntactic types: %s", (code, type) => {
    const { element, node } = parseElement(code);
    expect(element.kind).toBe("createElement");
    expect(element.type).toBe(type);
    expect(element.node).toBe(node);
    expect(element.getProp("missing")).toBeUndefined();
    expect(element.getChildren()).toEqual([]);
  });

  it.each([
    ["(<div /> as unknown);", "TSAsExpression", "jsx", "div"],
    ["(<></>)!;", "TSNonNullExpression", "jsx", ""],
    ['createElement("div", null) satisfies unknown;', "TSSatisfiesExpression", "createElement", "div"],
    ['React?.createElement("div", null);', "ChainExpression", "createElement", "div"],
  ])("unwraps element expressions: %s", (code, selector, kind, type) => {
    const { element, node } = parseElement(code, selector);
    if (!("expression" in node)) throw new Error("expected a wrapped expression");
    expect(element.kind).toBe(kind);
    expect(element.type).toBe(type);
    expect(element.node).toBe(node.expression);
  });

  it.each([
    ["value;", "Identifier"],
    ['"div";', "Literal"],
    ["({ type: 'div' });", "ObjectExpression"],
    ["<div />;", "JSXOpeningElement"],
    ["<div id='x' />;", "JSXAttribute"],
    ["<></>;", "JSXOpeningFragment"],
    ["<div />;", "ExpressionStatement"],
    ['cloneElement("div", null);', "CallExpression"],
    ['React.createElementFactory("div", null);', "CallExpression"],
    ['notcreateElement("div", null);', "CallExpression"],
    ['React["createElement"]("div", null);', "CallExpression"],
    ['import { createElement as h } from "react"; h("div", null);', "CallExpression"],
    ['const h = React.createElement; h("div", null);', "CallExpression"],
    ['new React.createElement("div", null);', "NewExpression"],
  ])("does not resolve unrelated syntax or call aliases: %s", (code, selector) => {
    const { context, node } = parseNode(code, selector);
    expect(resolveElement(context, node)).toBeUndefined();
  });

  it.each([
    "createElement();",
    "createElement(null, {});",
    "createElement(false, {});",
    "createElement(true, {});",
    "createElement(0, {});",
    "createElement(1n, {});",
    "createElement(/div/, {});",
    "createElement(null as never, {});",
    "createElement(...args);",
    'createElement(...["div", null]);',
    'createElement(...types, { id: "wrong" }, "child");',
    'createElement("div", ...configs);',
    'createElement("div", ...[], "child");',
    'createElement("div", ...[{ id: "wrong" }], "child");',
    'createElement("div", ...configs, { id: "wrong" }, ...children);',
  ])("rejects invalid types or uncertain argument positions: %s", (code) => {
    const { context, node } = parseNode(code);
    expect(resolveElement(context, node)).toBeUndefined();
  });
});

describe("ElementDescriptor.getProp", () => {
  it.each([
    ['<div id="x" />;', "jsx"],
    ['<div id={"x"} />;', "jsx"],
    ['<div {...{ id: "x" }} />;', "jsxSpread"],
    ['createElement("div", { id: "x" });', "property"],
  ])("normalizes literal and braced props across element syntax: %s", (code, kind) => {
    const { element } = parseElement(code);
    const prop = element.getProp("id");
    expect(prop?.name).toBe("id");
    expect(prop?.source.kind).toBe(kind);
    expect(prop?.value.kind).toBe("literal");
    expect(prop?.value.node?.type).toBe(AST.Literal);
    expect(prop?.value).not.toHaveProperty("attribute");
    expect(prop?.getStaticValue()).toEqual({ value: "x" });
  });

  it("retains the source and value node of a plain JSX attribute", () => {
    const { element, node } = parseElement("<input disabled />;");
    if (node.type !== AST.JSXElement) throw new Error("expected JSX");
    const prop = element.getProp("disabled");
    expect(prop?.source).toEqual({ kind: "jsx", node: node.openingElement.attributes[0] });
    expect(prop?.value).toEqual({ kind: "boolean", node: null });
    expect(prop?.getStaticValue()).toEqual({ value: true });
  });

  it("retains both the authored spread attribute and its resolved property", () => {
    const { element, node } = parseElement('<div {...{ id: "x" }} />;');
    if (node.type !== AST.JSXElement) throw new Error("expected JSX");
    const attribute = node.openingElement.attributes[0];
    if (attribute?.type !== AST.JSXSpreadAttribute || attribute.argument.type !== AST.ObjectExpression) {
      throw new Error("expected an object spread");
    }
    const property = attribute.argument.properties[0];
    if (property?.type !== AST.Property) throw new Error("expected a property");
    const prop = element.getProp("id");
    expect(prop?.source).toEqual({ kind: "jsxSpread", node: attribute, property });
    expect(prop?.value.node).toBe(property.value);
  });

  it("retains the authored config property and its value node", () => {
    const { element, node } = parseElement('createElement("div", { id: "x" });');
    if (node.type !== AST.CallExpression) throw new Error("expected a call");
    const config = node.arguments[1];
    if (config?.type !== AST.ObjectExpression) throw new Error("expected a config object");
    const property = config.properties[0];
    if (property?.type !== AST.Property) throw new Error("expected a property");
    const prop = element.getProp("id");
    expect(prop?.source).toEqual({ kind: "property", node: property });
    expect(prop?.value.node).toBe(property.value);
  });

  it.each([
    '<div id="first" id="last" />;',
    '<div {...{ id: "first" }} id="last" />;',
    '<div id="first" {...{ id: "last" }} />;',
    'const base = { id: "first" }; const props = { ...base, id: "last" }; const alias = props; <div {...alias} />;',
    'createElement("div", { id: "first", id: "last" });',
    'createElement("div", { ...{ id: "first" }, id: "last" });',
    'createElement("div", { id: "first", ...{ id: "last" } });',
    'const base = { id: "last" }; const alias = base; const props = { ...{ ...alias } }; createElement("div", props);',
    'const base = { id: "last" }; const props = { ...base }; const alias = props; createElement("div", alias);',
    'const key = "id"; createElement("div", { [key]: "last" });',
    'createElement("div", { ["i" + "d"]: "last" });',
    'createElement("div", { "id": "last" });',
    'const id = "last"; createElement("div", { id });',
    'createElement("div", { id: "last" } as const);',
    'createElement("div", { id: "last" } satisfies object);',
    'const props = { id: "last" } as const; createElement("div", props!);',
    'const props = { id: "last" }; const alias = props as typeof props; createElement("div", alias);',
    '<div id="last" {...unknownProps} />;',
    'createElement("div", { id: "last", ...unknownProps });',
  ])("delegates alias, nested spread, key, and last-property lookup: %s", (code) => {
    const { element } = parseElement(code);
    expect(element.getProp("id")?.name).toBe("id");
    expect(element.getProp("id")?.getStaticValue()).toEqual({ value: "last" });
    expect(element.getProp("missing")).toBeUndefined();
  });

  it.each([
    "<></>;",
    "<div />;",
    "<div {...unknownProps} />;",
    'createElement("div");',
    'createElement("div", null);',
    'createElement("div", undefined);',
    'createElement("div", unknownProps);',
    'createElement("div", getProps());',
    'createElement("div", { other: 1 });',
    'const a = b; const b = a; createElement("div", a);',
    'const props = { ...props }; createElement("div", props);',
  ])("returns undefined for absent or unresolvable props: %s", (code) => {
    const { element } = parseElement(code);
    expect(element.getProp("id")).toBeUndefined();
  });

  it.each([
    'const id = "outer"; const props = { id }; function Component() { const id = "inner"; return <div {...props} />; }',
    'const id = "outer"; const props = { id }; function Component() { const id = "inner"; return createElement("div", props); }',
    'const key = "id"; const props = { [key]: "outer" }; function Component() { const key = "other"; return createElement("div", props); }',
  ])("resolves config keys and values in their declaration scope: %s", (code) => {
    const { element } = parseElement(code);
    expect(element.getProp("id")?.getStaticValue()).toEqual({ value: "outer" });
  });

  it.each([
    "<div dynamic={foo()} known={undefined} />;",
    "<div {...{ dynamic: foo(), known: undefined }} />;",
    'createElement("div", { dynamic: foo(), known: undefined });',
    'createElement("div", { known: "first", ...{ dynamic: foo(), known: void 0 } });',
  ])("distinguishes missing, dynamic, and statically undefined props: %s", (code) => {
    const { element } = parseElement(code);
    expect(element.getProp("missing")).toBeUndefined();
    const dynamic = element.getProp("dynamic");
    const known = element.getProp("known");
    expect(dynamic?.value.kind).toBe("expression");
    expect(dynamic?.value.node?.type).toBe(AST.CallExpression);
    expect(dynamic?.getStaticValue()).toBeUndefined();
    expect(known?.value.kind).toBe("expression");
    expect(known?.getStaticValue()).toEqual({ value: undefined });
  });

  it.each([
    "function Widget() {} Widget.defaultProps = { id: 'default' }; <Widget />;",
    "function Widget() {} Widget.defaultProps = { id: 'default' }; createElement(Widget, null);",
  ])("does not synthesize defaultProps: %s", (code) => {
    expect(parseElement(code).element.getProp("id")).toBeUndefined();
  });
});

describe("ElementDescriptor.getChildren", () => {
  it.each([
    '<div>\n  {/* comment */}\n  {""}\n  text{value}<span />{...items}\n</div>;',
    '<>\n  {/* comment */}\n  {""}\n  text{value}<span />{...items}\n</>;',
  ])("uses the JSX helper while preserving child syntax, order, and identity: %s", (code) => {
    const { element, node } = parseElement(code);
    if (node.type !== AST.JSXElement && node.type !== AST.JSXFragment) throw new Error("expected JSX");
    const children = element.getChildren();
    expect(children.map((child) => child.type)).toEqual([
      AST.JSXText,
      AST.JSXExpressionContainer,
      AST.JSXElement,
      AST.JSXSpreadChild,
    ]);
    expect(children).toEqual(node.children.slice(4, 8));
    children.forEach((child, index) => expect(child).toBe(node.children[index + 4]));
    expect(element.getProp("children")).toBeUndefined();
  });

  it("retains same-line whitespace and unevaluated expression containers", () => {
    const { element, context } = parseElement("<div> {null}{false}{undefined}{[1, 2]}</div>;");
    expect(element.getChildren().map((child) => context.sourceCode.getText(child))).toEqual([
      " ",
      "{null}",
      "{false}",
      "{undefined}",
      "{[1, 2]}",
    ]);
  });

  it("retains all positional children without flattening, filtering, or expanding spreads", () => {
    const { element, node, context } = parseElement(
      'createElement("div", null, "", null, false, undefined, [1, 2], ...items, <span />, ...["a", "b"], last);',
    );
    if (node.type !== AST.CallExpression) throw new Error("expected a call");
    const children = element.getChildren();
    expect(children).toEqual(node.arguments.slice(2));
    children.forEach((child, index) => expect(child).toBe(node.arguments[index + 2]));
    expect(children.map((child) => context.sourceCode.getText(child))).toEqual([
      '""',
      "null",
      "false",
      "undefined",
      "[1, 2]",
      "...items",
      "<span />",
      '...["a", "b"]',
      "last",
    ]);
    expect(children[5]?.type).toBe(AST.SpreadElement);
    expect(children[7]?.type).toBe(AST.SpreadElement);
    expect(element.getProp("children")).toBeUndefined();
  });

  it.each([
    'createElement("div", {}, ...items);',
    'createElement("div", null, ...items);',
    'createElement("div", undefined, ...items);',
    'createElement("div", unknownProps, ...items);',
  ])("accepts spreads once type and config positions are established: %s", (code) => {
    const { element, node } = parseElement(code);
    if (node.type !== AST.CallExpression) throw new Error("expected a call");
    expect(element.getChildren()).toEqual([node.arguments[2]]);
    expect(element.getChildren()[0]?.type).toBe(AST.SpreadElement);
  });

  it.each([
    '<div children="authored" />;',
    '<div {...{ children: "authored" }} />;',
    'createElement("div", { children: "authored" });',
    'const props = { children: "authored" }; createElement("div", props);',
  ])("does not fall back to the authored children prop: %s", (code) => {
    const { element } = parseElement(code);
    expect(element.getChildren()).toEqual([]);
    expect(element.getProp("children")?.getStaticValue()).toEqual({ value: "authored" });
  });

  it.each([
    ['<div children="authored">nested</div>;', "nested"],
    ['<div {...{ children: "authored" }}>nested</div>;', "nested"],
    ['createElement("div", { children: "authored" }, "nested");', '"nested"'],
    ['createElement("div", { children: "authored" }, ...items);', "...items"],
  ])("keeps authored children props distinct from nested/positional children: %s", (code, text) => {
    const { element, context } = parseElement(code);
    expect(element.getProp("children")?.getStaticValue()).toEqual({ value: "authored" });
    expect(element.getChildren().map((child) => context.sourceCode.getText(child))).toEqual([text]);
  });

  it("does not reinterpret a config array as positional children", () => {
    const { element } = parseElement('createElement("div", ["not a child"]);');
    expect(element.getChildren()).toEqual([]);
    expect(element.getProp("children")).toBeUndefined();
  });
});
