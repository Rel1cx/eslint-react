import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getAttributeName, isAttribute } from "./attribute-name";

function getFirstAttribute(code: string): TSESTree.JSXAttribute {
  const { node } = getNodeInRule<TSESTree.JSXElement>(code, "JSXElement");
  const attr = node.openingElement.attributes[0];
  if (attr?.type !== AST.JSXAttribute) throw new Error("expected a JSXAttribute");
  return attr;
}

describe("getAttributeName", () => {
  it("returns the plain identifier name", () => {
    expect(getAttributeName(getFirstAttribute('<div className="x" />;'))).toBe("className");
  });

  it("returns dashed names as-is", () => {
    expect(getAttributeName(getFirstAttribute('<div aria-label="x" />;'))).toBe("aria-label");
  });

  it("joins namespaced names with a colon", () => {
    expect(getAttributeName(getFirstAttribute('<div xml:space="preserve" />;'))).toBe("xml:space");
  });
});

describe("isAttribute", () => {
  it("matches in data-first style", () => {
    expect(isAttribute(getFirstAttribute('<div className="x" />;'), "className")).toBe(true);
  });

  it("matches in data-last (curried) style", () => {
    expect(isAttribute("className")(getFirstAttribute('<div className="x" />;'))).toBe(true);
    expect(isAttribute("other")(getFirstAttribute('<div className="x" />;'))).toBe(false);
  });

  it("does not match namespaced attributes", () => {
    const attr = getFirstAttribute('<div xml:space="preserve" />;');
    expect(isAttribute(attr, "xml:space")).toBe(false);
    expect(isAttribute(attr, "space")).toBe(false);
  });

  it("does not match non-attribute nodes", () => {
    const { node } = getNodeInRule<TSESTree.JSXElement>("<div />;", "JSXElement");
    expect(isAttribute(node, "div")).toBe(false);
  });
});
