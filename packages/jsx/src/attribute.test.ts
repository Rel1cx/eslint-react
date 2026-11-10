import type { RuleContext } from "@eslint-react/eslint";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import {
  findAttribute,
  findParentAttribute,
  getAttributeName,
  getAttributeStaticValue,
  getAttributeStaticValueByName,
  getAttributeValue,
  getAttributeValueByName,
  hasAnyAttribute,
  hasAttribute,
  hasEveryAttribute,
  isAttributeNamed,
  isPlainAttribute,
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
    const { element } = parseJSXElement('<div className="x" />;');
    expect(findAttribute(element, "className")?.type).toBe(AST.JSXAttribute);
  });

  it("finds a namespaced attribute by its full name", () => {
    const { element } = parseJSXElement('<div xml:space="preserve" />;');
    expect(findAttribute(element, "xml:space")?.type).toBe(AST.JSXAttribute);
    expect(findAttribute(element, "space")).toBeNull();
  });

  it("returns the last matching attribute when the name is duplicated", () => {
    const { element } = parseJSXElement('<div id="a" id="b" />;');
    expect(findAttribute(element, "id")).toBe(element.openingElement.attributes[1]);
  });

  it("returns a direct attribute even when a later spread may override it", () => {
    const { element } = parseJSXElement('<div id="a" {...props} />;');
    expect(findAttribute(element, "id")).toBe(element.openingElement.attributes[0]);
  });

  it("ignores inline object spread attributes", () => {
    const { element } = parseJSXElement("<div {...{ className: 'x' }} />;");
    expect(findAttribute(element, "className")).toBeNull();
  });

  it("ignores identifier spread attributes", () => {
    const { element } = parseJSXElement("const props = { className: 'x' }; <div {...props} />;");
    expect(findAttribute(element, "className")).toBeNull();
  });

  it("returns null when the attribute is not present", () => {
    const { element } = parseJSXElement("<div />;");
    expect(findAttribute(element, "className")).toBeNull();
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

  it("finds the nearest attribute when JSX attributes are nested", () => {
    const { element } = parseJSXElement("<div outer={<span inner={value} />} />;");
    const outer = getAttribute(element);
    const innerElement = (outer.value as TSESTree.JSXExpressionContainer).expression;
    if (innerElement.type !== AST.JSXElement) throw new Error("expected nested JSX element");
    const inner = getAttribute(innerElement);
    const expression = (inner.value as TSESTree.JSXExpressionContainer).expression;
    expect(findParentAttribute(expression)).toBe(inner);
    expect(findParentAttribute(expression, "outer")).toBe(outer);
  });

  it("returns null when no attribute ancestor exists or the node is nullish", () => {
    const { element } = parseJSXElement("<div />;");
    expect(findParentAttribute(element)).toBeNull();
    expect(findParentAttribute(null)).toBeNull();
    expect(findParentAttribute(undefined)).toBeNull();
  });
});

describe("hasAttribute / hasAnyAttribute / hasEveryAttribute", () => {
  it("finds direct attributes", () => {
    const { element } = parseJSXElement("<div disabled />;");
    expect(hasAttribute(element, "disabled")).toBe(true);
  });

  it("ignores spread attributes", () => {
    const inlineSpread = parseJSXElement("<div {...{ disabled: true }} />;");
    expect(hasAttribute(inlineSpread.element, "disabled")).toBe(false);

    const identifierSpread = parseJSXElement("const props = { disabled: true }; <div {...props} />;");
    expect(hasAttribute(identifierSpread.element, "disabled")).toBe(false);
  });

  it("returns false when the attribute is absent", () => {
    const { element } = parseJSXElement("<div />;");
    expect(hasAttribute(element, "disabled")).toBe(false);
    expect(hasAnyAttribute(element, ["a", "b"])).toBe(false);
    expect(hasEveryAttribute(element, ["a", "b"])).toBe(false);
  });

  it("checks any and every semantics", () => {
    const { element } = parseJSXElement('<div a="1" b="2" />;');
    expect(hasAnyAttribute(element, ["a", "missing"])).toBe(true);
    expect(hasEveryAttribute(element, ["a", "b"])).toBe(true);
    expect(hasEveryAttribute(element, ["a", "missing"])).toBe(false);
  });

  it("handles empty name lists", () => {
    const { element } = parseJSXElement('<div a="1" />;');
    expect(hasAnyAttribute(element, [])).toBe(false);
    expect(hasEveryAttribute(element, [])).toBe(true);
  });
});

describe("getAttributeValue", () => {
  const valueOf = (code: string) => {
    const { element } = parseJSXElement(code);
    return getAttributeValue(getAttribute(element));
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
});

describe("getAttributeStaticValue", () => {
  const staticValueOf = (code: string) => {
    const { context, element } = parseJSXElement(code);
    return getAttributeStaticValue(context, getAttributeValue(getAttribute(element)));
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

  it("distinguishes a null literal from an indeterminate value", () => {
    expect(staticValueOf("<div id={null} />;")).toBeNull();
    expect(staticValueOf("<div id={undefined} />;")).toBeUndefined();
    // A statically known `undefined` is indistinguishable from an absent value
    expect(staticValueOf("<div id={void 0} />;")).toBeUndefined();
  });

  it("returns undefined for empty containers and JSX element values", () => {
    expect(staticValueOf("<div attr={} />;")).toBeUndefined();
    expect(staticValueOf("<div attr=<span /> />;")).toBeUndefined();
  });

  it("returns undefined for null", () => {
    expect(getAttributeStaticValue(parseJSXElement("<div />;").context, null)).toBeUndefined();
  });
});

describe("getAttributeValueByName", () => {
  it("returns null when the attribute is absent", () => {
    const { element } = parseJSXElement("<div />;");
    expect(getAttributeValueByName(element, "className")).toBeNull();
  });

  it("returns null for a spread-provided attribute", () => {
    const { element } = parseJSXElement("const props = { className: 'x' }; <div {...props} />;");
    expect(getAttributeValueByName(element, "className")).toBeNull();
  });

  it("returns the resolved value descriptor when present", () => {
    const { context, element } = parseJSXElement('<div className="x" />;');
    const value = getAttributeValueByName(element, "className");
    expect(value?.kind).toBe("literal");
    expect(getAttributeStaticValue(context, value)).toBe("x");
  });

  it("resolves a fragment-valued attribute instead of treating it as absent", () => {
    const { element } = parseJSXElement("<a href=<></> />;");
    expect(getAttributeValueByName(element, "href")?.kind).toBe("element");
  });
});

describe("getAttributeStaticValueByName", () => {
  it("returns undefined when the attribute is absent", () => {
    const { context, element } = parseJSXElement("<div />;");
    expect(getAttributeStaticValueByName(context, element, "className")).toBeUndefined();
  });

  it("returns undefined for a spread-provided attribute", () => {
    const { context, element } = parseJSXElement("const props = { className: 'x' }; <div {...props} />;");
    expect(getAttributeStaticValueByName(context, element, "className")).toBeUndefined();
  });

  it("returns the literal value", () => {
    const { context, element } = parseJSXElement('<div className="x" />;');
    expect(getAttributeStaticValueByName(context, element, "className")).toBe("x");
  });

  it("returns true for a boolean attribute", () => {
    const { context, element } = parseJSXElement("<input disabled />;");
    expect(getAttributeStaticValueByName(context, element, "disabled")).toBe(true);
  });

  it("returns undefined for a non-static expression", () => {
    const { context, element } = parseJSXElement("<div id={Math.random()} />;");
    expect(getAttributeStaticValueByName(context, element, "id")).toBeUndefined();
  });

  it("returns the last value when the attribute is duplicated", () => {
    const { context, element } = parseJSXElement('<div className="a" className="b" />;');
    expect(getAttributeStaticValueByName(context, element, "className")).toBe("b");
  });
});
