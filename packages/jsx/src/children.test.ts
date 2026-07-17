/// <reference types="node" />

import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import * as tsParser from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { Linter } from "eslint";
import { describe, expect, it } from "vitest";

import { getChildren, hasChildren } from "./children";

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

describe("getChildren", () => {
  it("filters out newline-containing whitespace padding", () => {
    const children = getChildren(parseJsx("<div>\n  <span />\n</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXElement);
  });

  it("keeps same-line whitespace text", () => {
    const children = getChildren(parseJsx("<div> </div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXText);
  });

  it("filters out empty expression containers", () => {
    expect(getChildren(parseJsx("<div>{/* comment */}</div>;"))).toEqual([]);
  });

  it("filters out empty string expressions", () => {
    expect(getChildren(parseJsx('<div>{""}</div>;'))).toEqual([]);
  });

  it("keeps meaningful children in order", () => {
    const children = getChildren(parseJsx("<div>a{1}<span /></div>;"));
    expect(children.map((c) => c.type)).toEqual([
      AST.JSXText,
      AST.JSXExpressionContainer,
      AST.JSXElement,
    ]);
  });

  it("works for fragments", () => {
    const children = getChildren(parseJsx("<>\n  <span />\n</>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXElement);
  });
});

describe("hasChildren", () => {
  it("returns false for an empty element", () => {
    expect(hasChildren(parseJsx("<div />;"))).toBe(false);
  });

  it("returns false for same-line whitespace-only content", () => {
    expect(hasChildren(parseJsx("<div> </div>;"))).toBe(false);
  });

  it("returns false for an empty string expression", () => {
    expect(hasChildren(parseJsx('<div>{""}</div>;'))).toBe(false);
  });

  it("returns true for meaningful children", () => {
    expect(hasChildren(parseJsx("<div>a</div>;"))).toBe(true);
  });

  it("differs from getChildren for same-line whitespace", () => {
    const node = parseJsx("<div> </div>;");
    expect(getChildren(node).length).toBe(1);
    expect(hasChildren(node)).toBe(false);
  });
});
