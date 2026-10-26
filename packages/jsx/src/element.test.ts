import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getElementFullType, getElementSelfType, isElement, isFragmentElement, isHostElement } from "./element";

function parseJSX(code: string): TSESTreeJSXElementLike {
  return getNodeInRule<TSESTreeJSXElementLike>(code, ":matches(JSXElement, JSXFragment)").node;
}

describe("getElementFullType", () => {
  it("returns the tag name for simple elements", () => {
    expect(getElementFullType(parseJSX("<div />;"))).toBe("div");
  });

  it("returns the qualified name for member expressions", () => {
    expect(getElementFullType(parseJSX("<Foo.Bar.Baz />;"))).toBe("Foo.Bar.Baz");
  });

  it("returns the qualified name for React.Fragment", () => {
    expect(getElementFullType(parseJSX("<React.Fragment />;"))).toBe("React.Fragment");
  });

  it("returns the namespaced name", () => {
    expect(getElementFullType(parseJSX("<xml:space />;"))).toBe("xml:space");
  });

  it("returns an empty string for fragments", () => {
    expect(getElementFullType(parseJSX("<></>;"))).toBe("");
  });
});

describe("getElementSelfType", () => {
  it("returns the last segment of a member expression", () => {
    expect(getElementSelfType(parseJSX("<Foo.Bar.Baz />;"))).toBe("Baz");
  });

  it("returns the tag name for simple elements", () => {
    expect(getElementSelfType(parseJSX("<div />;"))).toBe("div");
  });

  it("does not split namespaced names on the colon", () => {
    expect(getElementSelfType(parseJSX("<xml:space />;"))).toBe("xml:space");
  });

  it("returns an empty string for fragments", () => {
    expect(getElementSelfType(parseJSX("<></>;"))).toBe("");
  });
});

describe("isElement", () => {
  it("matches any JSX element without a test", () => {
    expect(isElement(parseJSX("<div />;"))).toBe(true);
  });

  it("does not match null or non-JSX nodes", () => {
    const node = parseJSX("<div />;");
    expect(isElement(null)).toBe(false);
    expect(isElement(undefined)).toBe(false);
    if (node.type !== AST.JSXElement) throw new Error("expected element");
    expect(isElement(node.openingElement)).toBe(false);
  });

  it("matches against a string test", () => {
    const node = parseJSX("<div />;");
    expect(isElement(node, "div")).toBe(true);
    expect(isElement(node, "span")).toBe(false);
  });

  it("matches against an array test", () => {
    const node = parseJSX("<div />;");
    expect(isElement(node, ["span", "div"])).toBe(true);
    expect(isElement(node, ["span", "a"])).toBe(false);
  });

  it("passes the element type and node to a function test", () => {
    const node = parseJSX("<Foo.Bar />;");
    expect(isElement(node, (type, n) => type === "Foo.Bar" && n === node)).toBe(true);
    expect(isElement(node, (type) => type === "div")).toBe(false);
  });

  it("matches fragments", () => {
    const node = parseJSX("<></>;");
    expect(isElement(node)).toBe(true);
    expect(isElement(node, "")).toBe(true);
  });
});

describe("isFragmentElement", () => {
  it("matches the shorthand fragment syntax", () => {
    expect(isFragmentElement(parseJSX("<></>;"), "React.Fragment")).toBe(true);
  });

  it("matches <Fragment> with the React.Fragment factory", () => {
    expect(isFragmentElement(parseJSX("<Fragment />;"), "React.Fragment")).toBe(true);
  });

  it("matches <React.Fragment> with the React.Fragment factory", () => {
    expect(isFragmentElement(parseJSX("<React.Fragment />;"), "React.Fragment")).toBe(true);
  });

  it("matches a custom factory", () => {
    expect(isFragmentElement(parseJSX("<Preact.Fragment />;"), "Preact.Fragment")).toBe(true);
  });

  it("compares only the self name segment of the factory", () => {
    expect(isFragmentElement(parseJSX("<Preact.Fragment />;"), "React.Fragment")).toBe(true);
    expect(isFragmentElement(parseJSX("<Foo />;"), "React.Fragment")).toBe(false);
  });

  it("does not match nullish nodes", () => {
    expect(isFragmentElement(null, "React.Fragment")).toBe(false);
    expect(isFragmentElement(undefined, "React.Fragment")).toBe(false);
  });
});

describe("isHostElement", () => {
  it("matches lowercase tag names", () => {
    expect(isHostElement(parseJSX("<div />;"))).toBe(true);
  });

  it("does not match capitalized components", () => {
    expect(isHostElement(parseJSX("<Foo />;"))).toBe(false);
  });

  it("does not match member expressions", () => {
    expect(isHostElement(parseJSX("<Foo.bar />;"))).toBe(false);
  });

  it("matches lowercase namespaced names", () => {
    expect(isHostElement(parseJSX("<svg:rect />;"))).toBe(true);
  });

  it("does not match fragments or nullish nodes", () => {
    expect(isHostElement(parseJSX("<></>;"))).toBe(false);
    expect(isHostElement(null)).toBe(false);
    expect(isHostElement(undefined)).toBe(false);
  });
});
