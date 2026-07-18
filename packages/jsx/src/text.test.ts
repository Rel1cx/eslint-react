/// <reference types="node" />

import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import * as tsParser from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { Linter } from "eslint";
import { describe, expect, it } from "vitest";

import { collapseMultilineText, isEmptyStringExpression, isPaddingWhitespace, isWhitespaceText } from "./text";

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

describe("collapseMultilineText", () => {
  it("keeps single-line text untouched", () => {
    expect(collapseMultilineText("foo")).toBe("foo");
    expect(collapseMultilineText("  foo  ")).toBe("  foo  ");
  });

  it("collapses multiline text following JSX whitespace rules", () => {
    expect(collapseMultilineText("foo\n  bar")).toBe("foo bar");
    expect(collapseMultilineText("\n  foo\n  bar\n")).toBe("foo bar");
  });

  it("collapses tabs into spaces", () => {
    expect(collapseMultilineText("\tfoo")).toBe(" foo");
  });

  it("returns null for whitespace-only text", () => {
    expect(collapseMultilineText("\n   \n  ")).toBeNull();
    expect(collapseMultilineText("")).toBeNull();
  });
});

describe("isPaddingWhitespace", () => {
  it("matches whitespace text containing a newline", () => {
    const child = parseJsx("<div>\n  <span />\n</div>;").children[0];
    expect(child?.type).toBe(AST.JSXText);
    if (child == null) return;
    expect(isPaddingWhitespace(child)).toBe(true);
  });

  it("does not match same-line whitespace", () => {
    const child = parseJsx("<div> <span /></div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isPaddingWhitespace(child)).toBe(false);
  });

  it("does not match non-text nodes", () => {
    const child = parseJsx("<div><span /></div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isPaddingWhitespace(child)).toBe(false);
  });
});

describe("isWhitespaceText", () => {
  it("matches any whitespace-only text", () => {
    const child = parseJsx("<div> <span /></div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isWhitespaceText(child)).toBe(true);
  });

  it("matches newline-containing whitespace", () => {
    const child = parseJsx("<div>\n  <span />\n</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isWhitespaceText(child)).toBe(true);
  });

  it("does not match meaningful text", () => {
    const child = parseJsx("<div>x</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isWhitespaceText(child)).toBe(false);
  });
});

describe("isEmptyStringExpression", () => {
  it("matches an empty string expression", () => {
    const child = parseJsx('<div>{""}</div>;').children[0];
    if (child == null) throw new Error("expected child");
    expect(isEmptyStringExpression(child)).toBe(true);
  });

  it("does not match a non-empty string expression", () => {
    const child = parseJsx('<div>{"x"}</div>;').children[0];
    if (child == null) throw new Error("expected child");
    expect(isEmptyStringExpression(child)).toBe(false);
  });

  it("does not match text nodes", () => {
    const child = parseJsx("<div>x</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isEmptyStringExpression(child)).toBe(false);
  });
});
