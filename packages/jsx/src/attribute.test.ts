import type { RuleContext } from "@eslint-react/eslint";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import {
  findAttribute,
  findParentAttribute,
  findSpreadProperty,
  getAttributeName,
  getAttributeStaticValue,
  getAttributeValue,
  hasAnyAttribute,
  hasAttribute,
  hasEveryAttribute,
  hasUnresolvableSpread,
  isAttributeNamed,
  isPlainAttribute,
  resolveAttributeStaticValue,
  resolveAttributeValue,
} from "./attribute";

function parseJSXElement(code: string): { context: RuleContext; element: TSESTree.JSXElement } {
  const { context, node } = getNodeInRule<TSESTree.JSXElement>(code, "JSXElement");
  return { context, element: node };
}

function getAttribute(element: TSESTree.JSXElement, index = 0): TSESTree.JSXAttribute {
  const attribute = element.openingElement.attributes[index];
  if (attribute?.type !== AST.JSXAttribute) {
    throw new Error(`expected attribute ${index} to be a JSXAttribute`);
  }
  return attribute;
}

function getAnyAttribute(element: TSESTree.JSXElement, index = 0): TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute {
  const attribute = element.openingElement.attributes[index];
  if (attribute == null) throw new Error(`expected attribute ${index} to exist`);
  return attribute;
}

function getSpreadArgument(element: TSESTree.JSXElement, index = 0): TSESTree.Expression {
  const attribute = getAnyAttribute(element, index);
  if (attribute.type !== AST.JSXSpreadAttribute) {
    throw new Error(`expected attribute ${index} to be a JSXSpreadAttribute`);
  }
  return attribute.argument;
}

describe("getAttributeName", () => {
  it("returns the plain identifier name", () => {
    expect(getAttributeName(getAttribute(parseJSXElement('<div className="x" />;').element))).toBe("className");
  });

  it("returns dashed names as-is", () => {
    expect(getAttributeName(getAttribute(parseJSXElement('<div aria-label="x" />;').element))).toBe("aria-label");
  });

  it("joins namespaced names with a colon", () => {
    expect(getAttributeName(getAttribute(parseJSXElement('<div xml:space="preserve" />;').element))).toBe("xml:space");
  });
});

describe("isPlainAttribute", () => {
  it("matches in data-first style", () => {
    expect(isPlainAttribute(getAttribute(parseJSXElement('<div className="x" />;').element), "className")).toBe(true);
  });

  it("matches in data-last (curried) style", () => {
    expect(isPlainAttribute("className")(getAttribute(parseJSXElement('<div className="x" />;').element))).toBe(true);
    expect(isPlainAttribute("other")(getAttribute(parseJSXElement('<div className="x" />;').element))).toBe(false);
  });

  it("does not match namespaced attributes", () => {
    const attr = getAttribute(parseJSXElement('<div xml:space="preserve" />;').element);
    expect(isPlainAttribute(attr, "xml:space")).toBe(false);
    expect(isPlainAttribute(attr, "space")).toBe(false);
  });

  it("does not match non-attribute or nullish nodes", () => {
    const { element } = parseJSXElement("<div />;");
    expect(isPlainAttribute(element, "div")).toBe(false);
    expect(isPlainAttribute(null, "div")).toBe(false);
    expect(isPlainAttribute(undefined, "div")).toBe(false);
  });
});

describe("isAttributeNamed", () => {
  it("matches plain names in data-first and curried styles", () => {
    const attr = getAttribute(parseJSXElement('<div className="x" />;').element);
    expect(isAttributeNamed(attr, "className")).toBe(true);
    expect(isAttributeNamed("className")(attr)).toBe(true);
    expect(isAttributeNamed(attr, "other")).toBe(false);
  });

  it("matches namespaced names", () => {
    const attr = getAttribute(parseJSXElement('<div xml:space="preserve" />;').element);
    expect(isAttributeNamed(attr, "xml:space")).toBe(true);
    expect(isAttributeNamed(attr, "space")).toBe(false);
  });

  it("does not match non-attribute or nullish nodes", () => {
    const { element } = parseJSXElement("<div />;");
    expect(isAttributeNamed(element, "div")).toBe(false);
    expect(isAttributeNamed(null, "div")).toBe(false);
    expect(isAttributeNamed(undefined, "div")).toBe(false);
  });
});

describe("findAttribute", () => {
  it("finds a direct attribute", () => {
    const { context, element } = parseJSXElement('<div className="x" />;');
    const match = findAttribute(context, element, "className");
    expect(match?.kind).toBe("plain");
    expect(match?.attribute.type).toBe(AST.JSXAttribute);
  });

  it("finds a namespaced attribute by its full name", () => {
    const { context, element } = parseJSXElement('<div xml:space="preserve" />;');
    const match = findAttribute(context, element, "xml:space");
    expect(match?.kind).toBe("plain");
    expect(findAttribute(context, element, "space")).toBeNull();
  });

  it("finds a property inside a spread object expression", () => {
    const { context, element } = parseJSXElement("<div {...{ className: 'x' }} />;");
    const match = findAttribute(context, element, "className");
    expect(match?.kind).toBe("spread");
    if (match?.kind !== "spread") return;
    expect(match.property.type).toBe(AST.Property);
    expect(match.property.value.type).toBe(AST.Literal);
  });

  it("finds a property behind a string literal key in a spread object", () => {
    const { context, element } = parseJSXElement('<div {...{ "className": "x" }} />;');
    expect(findAttribute(context, element, "className")?.kind).toBe("spread");
  });

  it("finds a property inside a spread identifier resolving to an object expression", () => {
    const { context, element } = parseJSXElement("const props = { className: 'x' }; <div {...props} />;");
    expect(findAttribute(context, element, "className")?.kind).toBe("spread");
  });

  it("finds a property nested in multiple object expression spreads", () => {
    const { context, element } = parseJSXElement("<div {...{ ...{ ...{ className: 'x' } } }} />;");
    expect(findAttribute(context, element, "className")?.kind).toBe("spread");
  });

  it("finds a property nested in multiple identifier spreads", () => {
    const { context, element } = parseJSXElement(
      "const inner = { className: 'x' };"
        + "const middle = { ...inner };"
        + "const props = { ...middle };"
        + "<div {...props} />;",
    );
    expect(findAttribute(context, element, "className")?.kind).toBe("spread");
  });

  it("returns null when the attribute is not present", () => {
    const { context, element } = parseJSXElement("<div />;");
    expect(findAttribute(context, element, "className")).toBeNull();
  });

  it("returns null when the spread argument does not resolve to an object", () => {
    const { context, element } = parseJSXElement("const props = null; <div {...props} />;");
    expect(findAttribute(context, element, "className")).toBeNull();
  });

  it("respects later-props-win semantics", () => {
    const { context, element } = parseJSXElement(
      "const props = { className: 'first' }; <div {...props} className=\"second\" />;",
    );
    expect(findAttribute(context, element, "className")?.kind).toBe("plain");
  });

  it("respects later-props-win semantics when the spread comes last", () => {
    const { context, element } = parseJSXElement(
      "const props = { className: 'second' }; <div className=\"first\" {...props} />;",
    );
    expect(findAttribute(context, element, "className")?.kind).toBe("spread");
  });

  it("falls back to an earlier explicit attribute when a later spread cannot be resolved", () => {
    const { context, element } = parseJSXElement(
      'declare const rest: { [k: string]: unknown }; <div className="explicit" {...rest} />;',
    );
    expect(findAttribute(context, element, "className")?.kind).toBe("plain");
  });

  it("returns the last matching attribute when the name is duplicated", () => {
    const { context, element } = parseJSXElement('<div id="a" id="b" />;');
    const match = findAttribute(context, element, "id");
    expect(match?.kind).toBe("plain");
    if (match?.kind !== "plain") return;
    expect(match.attribute).toBe(element.openingElement.attributes[1]);
  });

  it("returns the last matching spread attribute when the property is duplicated", () => {
    const { context, element } = parseJSXElement("<div {...{ id: 'a' }} {...{ id: 'b' }} />;");
    const match = findAttribute(context, element, "id");
    expect(match?.kind).toBe("spread");
    if (match?.kind !== "spread") return;
    expect(match.attribute).toBe(element.openingElement.attributes[1]);
  });

  it("does not infinite loop on circular spread references", () => {
    const { context, element } = parseJSXElement(
      "const a = {};"
        + "const b = { ...a };"
        + "Object.assign(a, { ...b });"
        + "<div {...a} />;",
    );
    expect(() => findAttribute(context, element, "className")).not.toThrow();
  });
});

describe("findParentAttribute", () => {
  it("finds the enclosing attribute from a nested expression", () => {
    const { element } = parseJSXElement('<div className={foo} id="y" />;');
    const attr = getAttribute(element);
    if (attr.value?.type !== AST.JSXExpressionContainer) throw new Error("unexpected attribute shape");
    expect(findParentAttribute(attr.value.expression)).toBe(attr);
  });

  it("matches a string test against the full name", () => {
    const { element } = parseJSXElement("<div xml:space={foo} />;");
    const attr = getAttribute(element);
    if (attr.value?.type !== AST.JSXExpressionContainer) throw new Error("unexpected attribute shape");
    expect(findParentAttribute(attr.value.expression, "xml:space")).toBe(attr);
    expect(findParentAttribute(attr.value.expression, "space")).toBeNull();
  });

  it("filters candidates with the predicate", () => {
    const { element } = parseJSXElement('<div className={foo} id="y" />;');
    const attr = getAttribute(element);
    if (attr.value?.type !== AST.JSXExpressionContainer) throw new Error("unexpected attribute shape");
    const found = findParentAttribute(
      attr.value.expression,
      (n) => n.name.type === AST.JSXIdentifier && n.name.name === "id",
    );
    expect(found).toBeNull();
  });

  it("returns null when no attribute ancestor exists or the node is nullish", () => {
    const { element } = parseJSXElement("<div />;");
    expect(findParentAttribute(element)).toBeNull();
    expect(findParentAttribute(null)).toBeNull();
    expect(findParentAttribute(undefined)).toBeNull();
  });
});

describe("findSpreadProperty", () => {
  it("finds a property in an inline object expression", () => {
    const { context, element } = parseJSXElement("<div {...{ a: 1, b: 2 }} />;");
    const prop = findSpreadProperty(context, getSpreadArgument(element), "a");
    expect(prop?.value.type).toBe(AST.Literal);
    if (prop?.value.type === AST.Literal) expect(prop.value.value).toBe(1);
  });

  it("later properties win over earlier ones", () => {
    const { context, element } = parseJSXElement("<div {...{ ...{ a: 1 }, a: 2 }} />;");
    const prop = findSpreadProperty(context, getSpreadArgument(element), "a");
    if (prop?.value.type === AST.Literal) expect(prop.value.value).toBe(2);
    expect(prop?.value.type).toBe(AST.Literal);
  });

  it("later spreads win over earlier properties", () => {
    const { context, element } = parseJSXElement("<div {...{ a: 2, ...{ a: 1 } }} />;");
    const prop = findSpreadProperty(context, getSpreadArgument(element), "a");
    if (prop?.value.type === AST.Literal) expect(prop.value.value).toBe(1);
    expect(prop?.value.type).toBe(AST.Literal);
  });

  it("matches string literal keys", () => {
    const { context, element } = parseJSXElement('<div {...{ "a": 1 }} />;');
    expect(findSpreadProperty(context, getSpreadArgument(element), "a")?.type).toBe(AST.Property);
  });

  it("matches statically evaluable computed keys", () => {
    const { context, element } = parseJSXElement('<div {...{ ["a" + "b"]: 1 }} />;');
    expect(findSpreadProperty(context, getSpreadArgument(element), "ab")?.type).toBe(AST.Property);
  });

  it("matches computed keys backed by a constant", () => {
    const { context, element } = parseJSXElement('const key = "a"; <div {...{ [key]: 1 }} />;');
    expect(findSpreadProperty(context, getSpreadArgument(element), "a")?.type).toBe(AST.Property);
  });

  it("skips computed keys that are not statically evaluable", () => {
    const { context, element } = parseJSXElement("<div {...{ [foo]: 1 }} />;");
    expect(findSpreadProperty(context, getSpreadArgument(element), "foo")).toBeNull();
  });

  it("follows identifier aliases", () => {
    const { context, element } = parseJSXElement("const a = { k: 1 }; const b = a; <div {...b} />;");
    const prop = findSpreadProperty(context, getSpreadArgument(element), "k");
    if (prop?.value.type === AST.Literal) expect(prop.value.value).toBe(1);
    expect(prop?.value.type).toBe(AST.Literal);
  });

  it("does not infinite loop on circular aliases", () => {
    const { context, element } = parseJSXElement("const a = b; const b = a; <div {...a} />;");
    expect(() => findSpreadProperty(context, getSpreadArgument(element), "k")).not.toThrow();
    expect(findSpreadProperty(context, getSpreadArgument(element), "k")).toBeNull();
  });

  it("resolves a property reachable through two spread chains (diamond)", () => {
    const { context, element } = parseJSXElement(
      "const inner = { k: 1 };"
        + "const left = { ...inner, l: 1 };"
        + "const right = { ...inner, r: 2 };"
        + "<div {...{ ...left, ...right }} />;",
    );
    const prop = findSpreadProperty(context, getSpreadArgument(element), "k");
    if (prop?.value.type === AST.Literal) expect(prop.value.value).toBe(1);
    expect(prop?.value.type).toBe(AST.Literal);
  });
});

describe("hasAttribute / hasAnyAttribute / hasEveryAttribute", () => {
  it("finds direct and spread attributes", () => {
    const direct = parseJSXElement("<div disabled />;");
    expect(hasAttribute(direct.context, direct.element, "disabled")).toBe(true);
    const spread = parseJSXElement("const props = { disabled: true }; <div {...props} />;");
    expect(hasAttribute(spread.context, spread.element, "disabled")).toBe(true);
  });

  it("returns false when the attribute is absent", () => {
    const { context, element } = parseJSXElement("<div />;");
    expect(hasAttribute(context, element, "disabled")).toBe(false);
    expect(hasAnyAttribute(context, element, ["a", "b"])).toBe(false);
    expect(hasEveryAttribute(context, element, ["a", "b"])).toBe(false);
  });

  it("checks any and every semantics", () => {
    const { context, element } = parseJSXElement('<div a="1" b="2" />;');
    expect(hasAnyAttribute(context, element, ["a", "missing"])).toBe(true);
    expect(hasEveryAttribute(context, element, ["a", "b"])).toBe(true);
    expect(hasEveryAttribute(context, element, ["a", "missing"])).toBe(false);
  });

  it("checks any of multiple names provided by a spread", () => {
    const spread = parseJSXElement("const props = { b: 1 }; <div {...props} />;");
    expect(hasAnyAttribute(spread.context, spread.element, ["a", "b"])).toBe(true);
    expect(hasAnyAttribute(spread.context, spread.element, ["a", "c"])).toBe(false);
  });

  it("checks any of multiple names provided by a nested spread", () => {
    const { context, element } = parseJSXElement("<div {...{ ...{ b: 1 } }} />;");
    expect(hasAnyAttribute(context, element, ["a", "b"])).toBe(true);
    expect(hasAnyAttribute(context, element, ["a", "c"])).toBe(false);
  });

  it("returns false for an empty name list", () => {
    const { context, element } = parseJSXElement("<div />;");
    expect(hasAnyAttribute(context, element, [])).toBe(false);
  });
});

describe("hasUnresolvableSpread", () => {
  function parseSpread(code: string) {
    const { context, element } = parseJSXElement(code);
    return { context, argument: getSpreadArgument(element) };
  }

  it("returns false for a statically resolvable object", () => {
    const { context, argument } = parseSpread("<div {...{ a: 1, ...{ b: 2 } }} />;");
    expect(hasUnresolvableSpread(context, argument)).toBe(false);
  });

  it("returns false for an identifier resolving to an object", () => {
    const { context, argument } = parseSpread("const props = { a: 1 }; <div {...props} />;");
    expect(hasUnresolvableSpread(context, argument)).toBe(false);
  });

  it("returns true for an identifier that does not resolve to an object", () => {
    const { context, argument } = parseSpread("<div {...props} />;");
    expect(hasUnresolvableSpread(context, argument)).toBe(true);
  });

  it("returns true for a nested unresolvable spread", () => {
    const { context, argument } = parseSpread("<div {...{ ...props }} />;");
    expect(hasUnresolvableSpread(context, argument)).toBe(true);
  });

  it("does not report shared resolvable objects as unresolvable", () => {
    const { context, argument } = parseSpread(
      "const shared = { a: 1 }; <div {...{ ...shared, ...shared }} />;",
    );
    expect(hasUnresolvableSpread(context, argument)).toBe(false);
  });

  it("returns true for a dynamic computed key", () => {
    const { context, argument } = parseSpread("<div {...{ [name]: 1 }} />;");
    expect(hasUnresolvableSpread(context, argument)).toBe(true);
  });

  it("returns true for a nested dynamic computed key", () => {
    const { context, argument } = parseSpread("<div {...{ ...{ [name]: 1 } }} />;");
    expect(hasUnresolvableSpread(context, argument)).toBe(true);
  });

  it("returns false for statically known computed keys", () => {
    const staticString = parseSpread('<div {...{ ["a"]: 1 }} />;');
    expect(hasUnresolvableSpread(staticString.context, staticString.argument)).toBe(false);

    const numeric = parseSpread("<div {...{ [1]: 1 }} />;");
    expect(hasUnresolvableSpread(numeric.context, numeric.argument)).toBe(false);

    const constant = parseSpread('const key = "a"; <div {...{ [key]: 1 }} />;');
    expect(hasUnresolvableSpread(constant.context, constant.argument)).toBe(false);
  });
});

describe("resolveAttributeValue", () => {
  const valueOf = (code: string) => {
    const { element } = parseJSXElement(code);
    return resolveAttributeValue(getAnyAttribute(element));
  };

  it("resolves a boolean attribute", () => {
    const value = valueOf("<input disabled />;");
    expect(value.kind).toBe("boolean");
    if (value.kind !== "boolean") return;
    expect(value.node).toBeNull();
    expect(value.attribute.type).toBe(AST.JSXAttribute);
  });

  it("resolves a literal attribute", () => {
    const value = valueOf('<div className="x" />;');
    expect(value.kind).toBe("literal");
    if (value.kind !== "literal") return;
    expect(value.node.type).toBe(AST.Literal);
    expect(value.attribute.type).toBe(AST.JSXAttribute);
  });

  it("resolves an expression container", () => {
    const value = valueOf("<div tabIndex={1 + 1} />;");
    expect(value.kind).toBe("unknown");
    if (value.kind !== "unknown") return;
    expect(value.node.type).toBe(AST.BinaryExpression);
  });

  it("resolves an empty expression container", () => {
    const value = valueOf("<div attr={/* nothing */} />;");
    expect(value.kind).toBe("missing");
    if (value.kind !== "missing") return;
    expect(value.node.type).toBe(AST.JSXEmptyExpression);
  });

  it("resolves a JSX element value", () => {
    const value = valueOf("<div attr=<span /> />;");
    expect(value.kind).toBe("element");
    if (value.kind !== "element") return;
    expect(value.node.type).toBe(AST.JSXElement);
  });

  it("resolves a JSX fragment value as an element", () => {
    const value = valueOf("<a href=<></> />;");
    expect(value.kind).toBe("element");
    if (value.kind !== "element") return;
    expect(value.node.type).toBe(AST.JSXFragment);
  });

  it("resolves a raw spread attribute without a matched property", () => {
    const value = valueOf('<div {...{ className: "x" }} />;');
    expect(value.kind).toBe("spreadProps");
    if (value.kind !== "spreadProps") return;
    expect(value.property).toBeNull();
    expect(value.attribute.type).toBe(AST.JSXSpreadAttribute);
  });

  it("carries the matched property for a spread attribute", () => {
    const { context, element } = parseJSXElement('<div {...{ className: "x" }} />;');
    const match = findAttribute(context, element, "className");
    if (match == null) throw new Error("expected a match");
    const value = resolveAttributeValue(match);
    expect(value.kind).toBe("spreadProps");
    if (value.kind !== "spreadProps") return;
    expect(value.property?.type).toBe(AST.Property);
  });
});

describe("resolveAttributeStaticValue", () => {
  const staticValueOf = (code: string) => {
    const { context, element } = parseJSXElement(code);
    return resolveAttributeStaticValue(context, resolveAttributeValue(getAnyAttribute(element)));
  };

  it("returns true for a boolean attribute", () => {
    expect(staticValueOf("<input disabled />;")).toBe(true);
  });

  it("returns literal values", () => {
    expect(staticValueOf('<div className="x" />;')).toBe("x");
  });

  it("evaluates statically known expressions", () => {
    expect(staticValueOf("<div tabIndex={1 + 1} />;")).toBe(2);
    expect(staticValueOf("const x = 5; <div id={x} />;")).toBe(5);
  });

  it("returns undefined for dynamic expressions", () => {
    expect(staticValueOf("<div id={Math.random()} />;")).toBeUndefined();
  });

  it("returns undefined for empty containers and JSX element values", () => {
    expect(staticValueOf("<div attr={} />;")).toBeUndefined();
    expect(staticValueOf("<div attr=<span /> />;")).toBeUndefined();
  });

  it("returns undefined for a raw spread attribute", () => {
    expect(staticValueOf('<div {...{ className: "x" }} />;')).toBeUndefined();
  });

  it("returns the matched spread property value", () => {
    const { context, element } = parseJSXElement('<div {...{ className: "x", n: Math.random() }} />;');
    const match = findAttribute(context, element, "className");
    if (match == null) throw new Error("expected a match");
    expect(resolveAttributeStaticValue(context, resolveAttributeValue(match))).toBe("x");

    const dynamic = findAttribute(context, element, "n");
    if (dynamic == null) throw new Error("expected a match");
    expect(resolveAttributeStaticValue(context, resolveAttributeValue(dynamic))).toBeUndefined();
  });

  it("returns undefined for null", () => {
    expect(resolveAttributeStaticValue(parseJSXElement("<div />;").context, null)).toBeUndefined();
  });
});

describe("getAttributeValue", () => {
  it("returns null when the attribute is absent", () => {
    const { context, element } = parseJSXElement("<div />;");
    expect(getAttributeValue(context, element, "className")).toBeNull();
  });

  it("returns the resolved value descriptor when present", () => {
    const { context, element } = parseJSXElement('<div className="x" />;');
    const value = getAttributeValue(context, element, "className");
    expect(value?.kind).toBe("literal");
    expect(resolveAttributeStaticValue(context, value)).toBe("x");
  });

  it("resolves a fragment-valued attribute instead of treating it as absent", () => {
    const { context, element } = parseJSXElement("<a href=<></> />;");
    expect(getAttributeValue(context, element, "href")?.kind).toBe("element");
  });

  it("resolves the named property of a spread attribute", () => {
    const { context, element } = parseJSXElement('const props = { className: "x" }; <div {...props} />;');
    const value = getAttributeValue(context, element, "className");
    expect(value?.kind).toBe("spreadProps");
    expect(resolveAttributeStaticValue(context, value)).toBe("x");
  });
});

describe("getAttributeStaticValue", () => {
  it("returns undefined when the attribute is absent", () => {
    const { context, element } = parseJSXElement("<div />;");
    expect(getAttributeStaticValue(context, element, "className")).toBeUndefined();
  });

  it("returns the literal value", () => {
    const { context, element } = parseJSXElement('<div className="x" />;');
    expect(getAttributeStaticValue(context, element, "className")).toBe("x");
  });

  it("returns true for a boolean attribute", () => {
    const { context, element } = parseJSXElement("<input disabled />;");
    expect(getAttributeStaticValue(context, element, "disabled")).toBe(true);
  });

  it("returns undefined for a non-static expression", () => {
    const { context, element } = parseJSXElement("<div id={Math.random()} />;");
    expect(getAttributeStaticValue(context, element, "id")).toBeUndefined();
  });

  it("resolves the named property from a spread", () => {
    const { context, element } = parseJSXElement('const props = { className: "x" }; <div {...props} />;');
    expect(getAttributeStaticValue(context, element, "className")).toBe("x");
  });

  it("respects later-props-win semantics in both directions", () => {
    const explicitLast = parseJSXElement(
      'const props = { className: "first" }; <div {...props} className="second" />;',
    );
    expect(getAttributeStaticValue(explicitLast.context, explicitLast.element, "className")).toBe("second");

    const spreadLast = parseJSXElement(
      'const props = { className: "second" }; <div className="first" {...props} />;',
    );
    expect(getAttributeStaticValue(spreadLast.context, spreadLast.element, "className")).toBe("second");
  });

  it("returns the last value when the attribute is duplicated", () => {
    const { context, element } = parseJSXElement('<div className="a" className="b" />;');
    expect(getAttributeStaticValue(context, element, "className")).toBe("b");
  });
});
