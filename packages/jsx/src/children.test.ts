import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import {
  getChildren,
  getMeaningfulChildren,
  hasMeaningfulChildren,
  isEmptyExpressionContainer,
  isEmptyStringExpression,
  isMeaningfulChild,
  isPaddingWhitespace,
  isWhitespaceText,
} from "./children";

function parseJSX(code: string): TSESTreeJSXElementLike {
  return getNodeInRule<TSESTreeJSXElementLike>(code, ":matches(JSXElement, JSXFragment)").node;
}

describe("getChildren", () => {
  it("filters out newline-containing whitespace padding", () => {
    const children = getChildren(parseJSX("<div>\n  <span />\n</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXElement);
  });

  it("keeps same-line whitespace text", () => {
    const children = getChildren(parseJSX("<div> </div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXText);
  });

  it("filters out empty expression containers", () => {
    expect(getChildren(parseJSX("<div>{/* comment */}</div>;"))).toEqual([]);
  });

  it("filters out bare empty expression containers", () => {
    expect(getChildren(parseJSX("<div>{}</div>;"))).toEqual([]);
  });

  it("filters out empty string expressions", () => {
    expect(getChildren(parseJSX('<div>{""}</div>;'))).toEqual([]);
  });

  it("keeps dynamically empty expressions", () => {
    expect(getChildren(parseJSX("<div>{null}</div>;")).length).toBe(1);
    expect(getChildren(parseJSX("<div>{false}</div>;")).length).toBe(1);
    expect(getChildren(parseJSX("<div>{undefined}</div>;")).length).toBe(1);
  });

  it("keeps comment containers mixed with meaningful children", () => {
    const children = getChildren(parseJSX("<div>{/* comment */}a</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXText);
  });

  it("keeps entity-encoded whitespace text", () => {
    const children = getChildren(parseJSX("<div>&nbsp;</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXText);
  });

  it("keeps meaningful children in order", () => {
    const children = getChildren(parseJSX("<div>a{1}<span /></div>;"));
    expect(children.map((c) => c.type)).toEqual([
      AST.JSXText,
      AST.JSXExpressionContainer,
      AST.JSXElement,
    ]);
  });

  it("works for fragments", () => {
    const children = getChildren(parseJSX("<>\n  <span />\n</>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXElement);
  });
});

describe("isMeaningfulChild", () => {
  it("matches the filtering used by getMeaningfulChildren", () => {
    const children = parseJSX('<div> <span />{""}{}</div>;').children;
    expect(children.map(isMeaningfulChild)).toEqual([false, true, false, false]);
  });
});

describe("getMeaningfulChildren", () => {
  it("filters out newline-containing whitespace padding", () => {
    const children = getMeaningfulChildren(parseJSX("<div>\n  <span />\n</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXElement);
  });

  it("filters out same-line whitespace text", () => {
    expect(getMeaningfulChildren(parseJSX("<div> </div>;"))).toEqual([]);
  });

  it("filters out empty expression containers and empty strings", () => {
    expect(getMeaningfulChildren(parseJSX("<div>{}</div>;"))).toEqual([]);
    expect(getMeaningfulChildren(parseJSX("<div>{/* comment */}</div>;"))).toEqual([]);
    expect(getMeaningfulChildren(parseJSX('<div>{""}</div>;'))).toEqual([]);
  });

  it("keeps dynamically empty expressions", () => {
    expect(getMeaningfulChildren(parseJSX("<div>{null}</div>;")).length).toBe(1);
    expect(getMeaningfulChildren(parseJSX("<div>{false}</div>;")).length).toBe(1);
  });

  it("keeps meaningful children in order", () => {
    const children = getMeaningfulChildren(parseJSX("<div>a{1}<span /></div>;"));
    expect(children.map((c) => c.type)).toEqual([
      AST.JSXText,
      AST.JSXExpressionContainer,
      AST.JSXElement,
    ]);
  });

  it("works for fragments", () => {
    const children = getMeaningfulChildren(parseJSX("<>\n  <span />\n</>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXElement);
  });
});

describe("hasMeaningfulChildren", () => {
  it("returns false for an empty element", () => {
    expect(hasMeaningfulChildren(parseJSX("<div />;"))).toBe(false);
  });

  it("returns false for same-line whitespace-only content", () => {
    expect(hasMeaningfulChildren(parseJSX("<div> </div>;"))).toBe(false);
  });

  it("returns false for an empty string expression", () => {
    expect(hasMeaningfulChildren(parseJSX('<div>{""}</div>;'))).toBe(false);
  });

  it("returns false for an empty expression container (comment-only)", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>{/* comment */}</div>;"))).toBe(false);
  });

  it("returns true for meaningful children", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>a</div>;"))).toBe(true);
  });

  it("returns true for dynamically empty expressions", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>{null}</div>;"))).toBe(true);
    expect(hasMeaningfulChildren(parseJSX("<div>{false}</div>;"))).toBe(true);
  });

  it("returns true for a comment container mixed with meaningful children", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>{/* comment */}a</div>;"))).toBe(true);
  });

  it("returns false for a bare empty expression container", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>{}</div>;"))).toBe(false);
  });

  it("differs from getChildren for same-line whitespace", () => {
    const node = parseJSX("<div> </div>;");
    expect(getChildren(node).length).toBe(1);
    expect(getMeaningfulChildren(node).length).toBe(0);
    expect(hasMeaningfulChildren(node)).toBe(false);
  });

  it("differs from getChildren for CR-only whitespace (no \\n present)", () => {
    // isPaddingWhitespace requires a newline, so CR-only whitespace text is
    // kept by getChildren but still treated as non-meaningful.
    const node = parseJSX("<div>\r  \r</div>;");
    expect(getChildren(node).length).toBe(1);
    expect(getMeaningfulChildren(node).length).toBe(0);
    expect(hasMeaningfulChildren(node)).toBe(false);
  });
});

describe("isPaddingWhitespace", () => {
  it("matches whitespace text containing a newline", () => {
    const child = parseJSX("<div>\n  <span />\n</div>;").children[0];
    expect(child?.type).toBe(AST.JSXText);
    if (child == null) return;
    expect(isPaddingWhitespace(child)).toBe(true);
  });

  it("matches CRLF whitespace padding", () => {
    const child = parseJSX("<div>\r\n  <span />\r\n</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isPaddingWhitespace(child)).toBe(true);
  });

  it("does not match same-line whitespace", () => {
    const child = parseJSX("<div> <span /></div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isPaddingWhitespace(child)).toBe(false);
  });

  it("matches entity-encoded line feeds (the check reads the decoded value)", () => {
    const child = parseJSX("<div>&#10;</div>;").children[0];
    if (child?.type !== AST.JSXText) throw new Error("expected JSXText");
    expect(child.value).toContain("\n");
    expect(isPaddingWhitespace(child)).toBe(true);
  });

  it("does not match non-text or nullish nodes", () => {
    const child = parseJSX("<div><span /></div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isPaddingWhitespace(child)).toBe(false);
    expect(isPaddingWhitespace(null)).toBe(false);
    expect(isPaddingWhitespace(undefined)).toBe(false);
  });
});

describe("isWhitespaceText", () => {
  it("matches any whitespace-only text", () => {
    const child = parseJSX("<div> <span /></div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isWhitespaceText(child)).toBe(true);
  });

  it("matches newline-containing whitespace", () => {
    const child = parseJSX("<div>\n  <span />\n</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isWhitespaceText(child)).toBe(true);
  });

  it("does not match meaningful text", () => {
    const child = parseJSX("<div>x</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isWhitespaceText(child)).toBe(false);
  });

  it("does not match entity-only text (the check reads raw, not the decoded value)", () => {
    const child = parseJSX("<div>&nbsp;</div>;").children[0];
    if (child?.type !== AST.JSXText) throw new Error("expected JSXText");
    expect(child.raw).not.toBe(child.value);
    expect(isWhitespaceText(child)).toBe(false);
  });

  it("does not match nullish nodes", () => {
    expect(isWhitespaceText(null)).toBe(false);
    expect(isWhitespaceText(undefined)).toBe(false);
  });
});

describe("isEmptyExpressionContainer", () => {
  it("matches bare and comment-only containers", () => {
    expect(isEmptyExpressionContainer(parseJSX("<div>{}</div>;").children[0])).toBe(true);
    expect(isEmptyExpressionContainer(parseJSX("<div>{/* comment */}</div>;").children[0])).toBe(true);
  });

  it("does not match non-empty containers or other nodes", () => {
    expect(isEmptyExpressionContainer(parseJSX("<div>{x}</div>;").children[0])).toBe(false);
    expect(isEmptyExpressionContainer(parseJSX("<div>x</div>;").children[0])).toBe(false);
    expect(isEmptyExpressionContainer(null)).toBe(false);
  });
});

describe("isEmptyStringExpression", () => {
  it("matches an empty string literal expression", () => {
    const child = parseJSX('<div>{""}</div>;').children[0];
    if (child == null) throw new Error("expected child");
    expect(isEmptyStringExpression(child)).toBe(true);
  });

  it("does not match a non-empty string expression", () => {
    const child = parseJSX('<div>{"x"}</div>;').children[0];
    if (child == null) throw new Error("expected child");
    expect(isEmptyStringExpression(child)).toBe(false);
  });

  it("does not evaluate template literals", () => {
    const child = parseJSX("<div>{``}</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isEmptyStringExpression(child)).toBe(false);
  });

  it("does not match text or nullish nodes", () => {
    const child = parseJSX("<div>x</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isEmptyStringExpression(child)).toBe(false);
    expect(isEmptyStringExpression(null)).toBe(false);
  });
});
