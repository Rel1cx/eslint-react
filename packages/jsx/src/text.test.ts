import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { collapseMultilineText, isEmptyStringExpression, isPaddingWhitespace, isWhitespaceText } from "./text";

function parseJsx(code: string): TSESTreeJSXElementLike {
  return getNodeInRule<TSESTreeJSXElementLike>(code, ":matches(JSXElement, JSXFragment)").node;
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

  it("matches CRLF whitespace padding", () => {
    const child = parseJsx("<div>\r\n  <span />\r\n</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isPaddingWhitespace(child)).toBe(true);
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

  it("does not match entity-only text (the check reads raw, not the decoded value)", () => {
    // For `<div>&nbsp;</div>` the raw is "&nbsp;" while the value is the
    // decoded "\u00a0"; neither is padding, matching React's behavior of
    // rendering the entity as a text node.
    const child = parseJsx("<div>&nbsp;</div>;").children[0];
    if (child?.type !== AST.JSXText) throw new Error("expected JSXText");
    expect(child.raw).not.toBe(child.value);
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
