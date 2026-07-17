/// <reference types="node" />

import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import * as tsParser from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { Linter } from "eslint";
import { describe, expect, it } from "vitest";

import { isElement, isFragmentElement, isHostElement } from "./element-is";
import { getElementFullType, getElementSelfType } from "./element-type";

function parseJsx(code: string): TSESTreeJSXElementLike {
  const found: { node: TSESTreeJSXElementLike | null } = { node: null };
  new Linter().verify(code, {
    plugins: {
      test: {
        rules: {
          "test-rule": {
            meta: { type: "problem", messages: {}, schema: [] },
            create: () => ({
              JSXElement(node: TSESTree.JSXElement) {
                found.node ??= node;
              },
              JSXFragment(node: TSESTree.JSXFragment) {
                found.node ??= node;
              },
            }),
          },
        },
      },
    },
    rules: { "test/test-rule": "error" },
    languageOptions: {
      parser: tsParser,
      parserOptions: { jsx: true, ecmaFeatures: { jsx: true } },
    },
  });
  if (found.node == null) throw new Error("expected JSX in the code");
  return found.node;
}

describe("getElementFullType", () => {
  it("returns the tag name for simple elements", () => {
    expect(getElementFullType(parseJsx("<div />;"))).toBe("div");
  });

  it("returns the qualified name for member expressions", () => {
    expect(getElementFullType(parseJsx("<Foo.Bar.Baz />;"))).toBe("Foo.Bar.Baz");
  });

  it("returns the qualified name for React.Fragment", () => {
    expect(getElementFullType(parseJsx("<React.Fragment />;"))).toBe("React.Fragment");
  });

  it("returns the namespaced name", () => {
    expect(getElementFullType(parseJsx("<xml:space />;"))).toBe("xml:space");
  });

  it("returns an empty string for fragments", () => {
    expect(getElementFullType(parseJsx("<></>;"))).toBe("");
  });
});

describe("getElementSelfType", () => {
  it("returns the last segment of a member expression", () => {
    expect(getElementSelfType(parseJsx("<Foo.Bar.Baz />;"))).toBe("Baz");
  });

  it("returns the tag name for simple elements", () => {
    expect(getElementSelfType(parseJsx("<div />;"))).toBe("div");
  });

  it("returns an empty string for fragments", () => {
    expect(getElementSelfType(parseJsx("<></>;"))).toBe("");
  });
});

describe("isElement", () => {
  it("matches any JSX element without a test", () => {
    expect(isElement(parseJsx("<div />;"))).toBe(true);
  });

  it("does not match null or non-JSX nodes", () => {
    const node = parseJsx("<div />;");
    expect(isElement(null)).toBe(false);
    expect(isElement(undefined)).toBe(false);
    if (node.type !== AST.JSXElement) throw new Error("expected element");
    expect(isElement(node.openingElement)).toBe(false);
  });

  it("matches against a string test", () => {
    const node = parseJsx("<div />;");
    expect(isElement(node, "div")).toBe(true);
    expect(isElement(node, "span")).toBe(false);
  });

  it("matches against an array test", () => {
    const node = parseJsx("<div />;");
    expect(isElement(node, ["span", "div"])).toBe(true);
    expect(isElement(node, ["span", "a"])).toBe(false);
  });

  it("matches against a function test", () => {
    const node = parseJsx("<Foo.Bar />;");
    expect(isElement(node, (type) => type.startsWith("Foo"))).toBe(true);
    expect(isElement(node, (type) => type === "div")).toBe(false);
  });

  it("matches fragments", () => {
    const node = parseJsx("<></>;");
    expect(isElement(node)).toBe(true);
    expect(isElement(node, "")).toBe(true);
  });
});

describe("isFragmentElement", () => {
  it("matches the shorthand fragment syntax", () => {
    expect(isFragmentElement(parseJsx("<></>;"))).toBe(true);
  });

  it("matches <Fragment> with the default factory", () => {
    expect(isFragmentElement(parseJsx("<Fragment />;"))).toBe(true);
  });

  it("matches <React.Fragment> with the default factory", () => {
    expect(isFragmentElement(parseJsx("<React.Fragment />;"))).toBe(true);
  });

  it("matches a custom factory", () => {
    expect(isFragmentElement(parseJsx("<Preact.Fragment />;"), "Preact.Fragment")).toBe(true);
  });

  it("compares only the self name segment of the factory", () => {
    // The heuristic matches any `<*.Fragment>` regardless of the qualifier.
    expect(isFragmentElement(parseJsx("<Preact.Fragment />;"))).toBe(true);
    expect(isFragmentElement(parseJsx("<Foo />;"))).toBe(false);
  });
});

describe("isHostElement", () => {
  it("matches lowercase tag names", () => {
    expect(isHostElement(parseJsx("<div />;"))).toBe(true);
  });

  it("does not match capitalized components", () => {
    expect(isHostElement(parseJsx("<Foo />;"))).toBe(false);
  });

  it("does not match member expressions", () => {
    expect(isHostElement(parseJsx("<Foo.bar />;"))).toBe(false);
  });

  it("matches lowercase namespaced names", () => {
    expect(isHostElement(parseJsx("<svg:rect />;"))).toBe(true);
  });

  it("does not match fragments", () => {
    expect(isHostElement(parseJsx("<></>;"))).toBe(false);
  });
});
