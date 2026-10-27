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

function childAt(code: string, index = 0) {
  const child = parseJSX(code).children.at(index);
  if (child == null) {
    throw new Error(`expected a child in: ${code}`);
  }
  return child;
}

// Cases within each suite are ordered from the most typical JSX usage to rarer
// edge cases.

describe("getChildren", () => {
  it("keeps meaningful children in order", () => {
    const children = getChildren(parseJSX("<div>a{1}<span /></div>;"));
    expect(children.map((c) => c.type)).toEqual([
      AST.JSXText,
      AST.JSXExpressionContainer,
      AST.JSXElement,
    ]);
  });

  it("filters out newline-containing whitespace padding", () => {
    const children = getChildren(parseJSX("<div>\n  <span />\n</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXElement);
  });

  it("keeps multiline text with content and drops trailing padding", () => {
    const children = getChildren(parseJSX("<div>\n  hello\n  <span />\n</div>;"));
    expect(children.map((c) => c.type)).toEqual([AST.JSXText, AST.JSXElement]);
    const [text] = children;
    if (text?.type !== AST.JSXText) throw new Error("expected JSXText");
    expect(text.value).toContain("hello");
  });

  it("keeps same-line whitespace text", () => {
    const children = getChildren(parseJSX("<div> </div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXText);
  });

  it("works for fragments", () => {
    const children = getChildren(parseJSX("<>\n  <span />\n</>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXElement);
  });

  it("returns no children for an empty element or fragment", () => {
    expect(getChildren(parseJSX("<div />;"))).toEqual([]);
    expect(getChildren(parseJSX("<></>;"))).toEqual([]);
  });

  it("filters out bare empty expression containers", () => {
    expect(getChildren(parseJSX("<div>{}</div>;"))).toEqual([]);
  });

  it("filters out empty expression containers", () => {
    expect(getChildren(parseJSX("<div>{/* comment */}</div>;"))).toEqual([]);
  });

  it("filters comment-only containers, including multiline and TS directive comments", () => {
    expect(getChildren(parseJSX("<div>{/* multi\nline */}</div>;"))).toEqual([]);
    expect(getChildren(parseJSX("<div>{/* @ts-expect-error */}</div>;"))).toEqual([]);
    expect(getChildren(parseJSX("<div>{ }</div>;"))).toEqual([]);
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

  it("keeps a comment attached to an expression (syntactic contract)", () => {
    const children = getChildren(parseJSX("<div>{/* comment */ null}</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXExpressionContainer);
  });

  it("keeps whitespace string expressions (definitional difference)", () => {
    // Unlike JSXText " ", the expression {" "} is not whitespace-only text and
    // renders a space, so it is not filtered.
    expect(getChildren(parseJSX('<div>{" "}</div>;')).length).toBe(1);
  });

  it("keeps entity-encoded whitespace text", () => {
    const children = getChildren(parseJSX("<div>&nbsp;</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXText);
  });

  it("filters entity-encoded line breaks but keeps other entities", () => {
    // isPaddingWhitespace reads the decoded value and follows Babel's
    // cleanJSXElementLiteralChild, so entities decoding to LF, CR, or CRLF are
    // padding even though the raw text contains no line break.
    expect(getChildren(parseJSX("<div>&#10;</div>;"))).toEqual([]);
    expect(getChildren(parseJSX("<div>&#13;</div>;"))).toEqual([]);
    expect(getChildren(parseJSX("<div>&#13;&#10;</div>;"))).toEqual([]);
    // Without a line break in the decoded value, entity whitespace is kept.
    expect(getChildren(parseJSX("<div>&#32;</div>;")).length).toBe(1);
    expect(getChildren(parseJSX("<div>&nbsp;</div>;")).length).toBe(1);
  });

  it("keeps TypeScript JSX element children with member names and type arguments", () => {
    const children = getChildren(parseJSX("<div><Foo.Bar /><Foo<string> /></div>;"));
    expect(children.length).toBe(2);
    expect(children.every((c) => c.type === AST.JSXElement)).toBe(true);
  });

  it("keeps TypeScript-cast and non-null-asserted expressions (syntactic limitation)", () => {
    const children = getChildren(parseJSX('<div>{"" as string}{""!}</div>;'));
    expect(children.length).toBe(2);
    expect(children.every((c) => c.type === AST.JSXExpressionContainer)).toBe(true);
  });

  it("keeps spread children (syntactic contract)", () => {
    const children = getChildren(parseJSX("<div>{...items}</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXSpreadChild);
  });

  it("keeps tabs but filters CR-only whitespace (CR is a line break)", () => {
    // A tab is not a line break, so same-line tab text is kept. Lone CR is a
    // line break in Babel's cleanJSXElementLiteralChild, so CR-only text is padding.
    expect(getChildren(parseJSX("<div> \t </div>;")).length).toBe(1);
    expect(getChildren(parseJSX("<div>\r  \r</div>;"))).toEqual([]);
  });
});

describe("getMeaningfulChildren", () => {
  it("filters out newline-containing whitespace padding", () => {
    const children = getMeaningfulChildren(parseJSX("<div>\n  <span />\n</div>;"));
    expect(children.length).toBe(1);
    expect(children[0]?.type).toBe(AST.JSXElement);
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

  it("filters out same-line whitespace text", () => {
    expect(getMeaningfulChildren(parseJSX("<div> </div>;"))).toEqual([]);
  });

  it("keeps dynamically empty expressions", () => {
    expect(getMeaningfulChildren(parseJSX("<div>{null}</div>;")).length).toBe(1);
    expect(getMeaningfulChildren(parseJSX("<div>{false}</div>;")).length).toBe(1);
  });

  it("filters out empty expression containers and empty strings", () => {
    expect(getMeaningfulChildren(parseJSX("<div>{}</div>;"))).toEqual([]);
    expect(getMeaningfulChildren(parseJSX("<div>{/* comment */}</div>;"))).toEqual([]);
    expect(getMeaningfulChildren(parseJSX('<div>{""}</div>;'))).toEqual([]);
  });

  it("keeps entity-encoded line break text that getChildren filters", () => {
    // isMeaningfulChild uses raw text; getChildren follows Babel's decoded-value
    // cleaning. Entities that decode to line breaks are content here and padding
    // there.
    for (const code of ["<div>&#10;</div>;", "<div>&#13;</div>;", "<div>&#13;&#10;</div>;"]) {
      const node = parseJSX(code);
      expect(getChildren(node)).toEqual([]);
      expect(getMeaningfulChildren(node).map((c) => c.type)).toEqual([AST.JSXText]);
      expect(hasMeaningfulChildren(node)).toBe(true);
    }
  });

  it("excludes CR-only and tab-only whitespace", () => {
    expect(getMeaningfulChildren(parseJSX("<div>\r  \r</div>;"))).toEqual([]);
    expect(getMeaningfulChildren(parseJSX("<div> \t </div>;"))).toEqual([]);
  });
});

describe("hasMeaningfulChildren", () => {
  it("returns true for meaningful children", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>a</div>;"))).toBe(true);
  });

  it("returns false for an empty element", () => {
    expect(hasMeaningfulChildren(parseJSX("<div />;"))).toBe(false);
  });

  it("returns false for same-line whitespace-only content", () => {
    expect(hasMeaningfulChildren(parseJSX("<div> </div>;"))).toBe(false);
  });

  it("returns false for a bare empty expression container", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>{}</div>;"))).toBe(false);
  });

  it("returns false for an empty expression container (comment-only)", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>{/* comment */}</div>;"))).toBe(false);
  });

  it("returns false for an empty string expression", () => {
    expect(hasMeaningfulChildren(parseJSX('<div>{""}</div>;'))).toBe(false);
  });

  it("returns true for dynamically empty expressions (syntactic contract)", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>{null}</div>;"))).toBe(true);
    expect(hasMeaningfulChildren(parseJSX("<div>{false}</div>;"))).toBe(true);
  });

  it("returns true for a comment container mixed with meaningful children", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>{/* comment */}a</div>;"))).toBe(true);
  });

  it("differs from getChildren for same-line whitespace", () => {
    const node = parseJSX("<div> </div>;");
    expect(getChildren(node).length).toBe(1);
    expect(getMeaningfulChildren(node).length).toBe(0);
    expect(hasMeaningfulChildren(node)).toBe(false);
  });

  it("returns false for tab-only whitespace and empty fragments", () => {
    expect(hasMeaningfulChildren(parseJSX("<div> \t </div>;"))).toBe(false);
    expect(hasMeaningfulChildren(parseJSX("<></>;"))).toBe(false);
  });

  it("treats CR-only whitespace consistently with getChildren", () => {
    // Lone CR is a line break for padding detection, so neither API keeps it.
    const node = parseJSX("<div>\r  \r</div>;");
    expect(getChildren(node).length).toBe(0);
    expect(getMeaningfulChildren(node).length).toBe(0);
    expect(hasMeaningfulChildren(node)).toBe(false);
  });

  it("returns true for spread children (syntactic contract)", () => {
    expect(hasMeaningfulChildren(parseJSX("<div>{...items}</div>;"))).toBe(true);
  });
});

describe("isMeaningfulChild", () => {
  it("matches the filtering used by getMeaningfulChildren", () => {
    const children = parseJSX('<div> <span />{""}{}</div>;').children;
    expect(children.map(isMeaningfulChild)).toEqual([false, true, false, false]);
  });

  it("distinguishes a JSXText space from an expression space (definitional difference)", () => {
    // Both render a space, but only the expression is syntactically non-empty.
    expect(isMeaningfulChild(childAt("<div> </div>;"))).toBe(false);
    expect(isMeaningfulChild(childAt('<div>{" "}</div>;'))).toBe(true);
  });

  it("treats dynamically empty expressions as content (syntactic contract)", () => {
    const children = parseJSX("<div>{null}{false}{undefined}{0}{NaN}</div>;").children;
    expect(children.map(isMeaningfulChild)).toEqual([true, true, true, true, true]);
  });

  it("treats non-breaking-space text and strings as content", () => {
    expect(isMeaningfulChild(childAt("<div>&nbsp;</div>;"))).toBe(true);
    expect(isMeaningfulChild(childAt('<div>{"\\u00a0"}</div>;'))).toBe(true);
  });

  it("treats TypeScript-cast empty strings as content (syntactic limitation)", () => {
    // The empty-string check does not look through TS wrappers.
    expect(isMeaningfulChild(childAt('<div>{"" as string}</div>;'))).toBe(true);
    expect(isMeaningfulChild(childAt('<div>{""!}</div>;'))).toBe(true);
  });

  it("treats spreads, nested JSX, and generic arrow expressions as content (syntactic contract)", () => {
    expect(isMeaningfulChild(childAt("<div>{...items}</div>;"))).toBe(true);
    expect(isMeaningfulChild(childAt("<div>{<span />}</div>;"))).toBe(true);
    expect(isMeaningfulChild(childAt("<div>{<T,>(x: T) => x}</div>;"))).toBe(true);
  });

  it("uses raw text, so entity-encoded line feeds are content", () => {
    // isWhitespaceText reads raw source text while isPaddingWhitespace applies
    // Babel's decoded-value cleaning, so this entity is meaningful here but
    // filtered by getChildren.
    expect(isMeaningfulChild(childAt("<div>&#10;</div>;"))).toBe(true);
  });

  it("excludes tab-only text", () => {
    expect(isMeaningfulChild(childAt("<div> \t </div>;"))).toBe(false);
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

  it("matches whitespace-only, multiline, and TS directive comment containers", () => {
    expect(isEmptyExpressionContainer(childAt("<div>{ }</div>;"))).toBe(true);
    expect(isEmptyExpressionContainer(childAt("<div>{/* multi\nline */}</div>;"))).toBe(true);
    expect(isEmptyExpressionContainer(childAt("<div>{/* @ts-expect-error */}</div>;"))).toBe(true);
  });

  it("does not match a comment attached to an expression", () => {
    expect(isEmptyExpressionContainer(childAt("<div>{/* comment */ null}</div>;"))).toBe(false);
  });

  it("does not match spread children", () => {
    expect(isEmptyExpressionContainer(childAt("<div>{...items}</div>;"))).toBe(false);
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

  it("matches single-quoted and commented empty strings", () => {
    expect(isEmptyStringExpression(childAt("<div>{''}</div>;"))).toBe(true);
    expect(isEmptyStringExpression(childAt('<div>{/* comment */ ""}</div>;'))).toBe(true);
  });

  it("does not match whitespace or non-breaking-space strings", () => {
    expect(isEmptyStringExpression(childAt('<div>{" "}</div>;'))).toBe(false);
    expect(isEmptyStringExpression(childAt('<div>{"\\u00a0"}</div>;'))).toBe(false);
  });

  it("does not match other expression values", () => {
    // 0 and NaN are not empty strings; React renders them as "0" and "NaN".
    expect(isEmptyStringExpression(childAt("<div>{0}</div>;"))).toBe(false);
    expect(isEmptyStringExpression(childAt("<div>{NaN}</div>;"))).toBe(false);
  });

  it("does not evaluate template literals", () => {
    const child = parseJSX("<div>{``}</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isEmptyStringExpression(child)).toBe(false);
  });

  it("does not evaluate template literals with expressions (syntactic limitation)", () => {
    expect(isEmptyStringExpression(childAt("<div>{`${''}`}</div>;"))).toBe(false);
  });

  it("does not match TypeScript-cast or non-null-asserted empty strings (syntactic limitation)", () => {
    expect(isEmptyStringExpression(childAt('<div>{"" as string}</div>;'))).toBe(false);
    expect(isEmptyStringExpression(childAt('<div>{""!}</div>;'))).toBe(false);
    expect(isEmptyStringExpression(childAt('<div>{"" satisfies string}</div>;'))).toBe(false);
  });

  it("does not match text or nullish nodes", () => {
    const child = parseJSX("<div>x</div>;").children[0];
    if (child == null) throw new Error("expected child");
    expect(isEmptyStringExpression(child)).toBe(false);
    expect(isEmptyStringExpression(null)).toBe(false);
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

  it("does not match tabs or text with content across lines", () => {
    expect(isPaddingWhitespace(childAt("<div> \t </div>;"))).toBe(false);
    expect(isPaddingWhitespace(childAt("<div>\n  hello\n</div>;"))).toBe(false);
  });

  it("matches entity-encoded line feeds (the check reads the decoded value)", () => {
    const child = parseJSX("<div>&#10;</div>;").children[0];
    if (child?.type !== AST.JSXText) throw new Error("expected JSXText");
    expect(child.value).toContain("\n");
    expect(isPaddingWhitespace(child)).toBe(true);
  });

  it("reads the decoded value of entity-encoded line breaks", () => {
    expect(isPaddingWhitespace(childAt("<div>&#10;</div>;"))).toBe(true);
    expect(isPaddingWhitespace(childAt("<div>&#13;</div>;"))).toBe(true);
    expect(isPaddingWhitespace(childAt("<div>&#13;&#10;</div>;"))).toBe(true);
  });

  it("treats CR-only whitespace as padding (CR is a line break)", () => {
    const child = childAt("<div>\r  \r</div>;");
    expect(isWhitespaceText(child)).toBe(true);
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

  it("matches tabs and CR-only whitespace", () => {
    expect(isWhitespaceText(childAt("<div> \t </div>;"))).toBe(true);
    expect(isWhitespaceText(childAt("<div>\r  \r</div>;"))).toBe(true);
  });

  it("does not match entity-only text (the check reads raw, not the decoded value)", () => {
    const child = parseJSX("<div>&nbsp;</div>;").children[0];
    if (child?.type !== AST.JSXText) throw new Error("expected JSXText");
    expect(child.raw).not.toBe(child.value);
    expect(isWhitespaceText(child)).toBe(false);
  });

  it("reads raw text, so entity-encoded line feeds are not whitespace text", () => {
    expect(isWhitespaceText(childAt("<div>&#10;</div>;"))).toBe(false);
    expect(isWhitespaceText(childAt("<div>&#13;</div>;"))).toBe(false);
  });

  it("does not match expression containers", () => {
    expect(isWhitespaceText(childAt("<div>{x}</div>;"))).toBe(false);
  });

  it("does not match nullish nodes", () => {
    expect(isWhitespaceText(null)).toBe(false);
    expect(isWhitespaceText(undefined)).toBe(false);
  });
});

describe("syntactic contract", () => {
  // Executable version of the comparison table in `children.ts`. Both APIs
  // answer "is this syntactically content?", not "does React render something?".
  const matrix: { children: boolean; code: string; meaningful: boolean; name: string }[] = [
    { children: true, code: "<div> </div>;", meaningful: false, name: "same-line space text" },
    { children: true, code: "<div>\t</div>;", meaningful: false, name: "same-line tab text" },
    { children: false, code: "<div>\r  \r</div>;", meaningful: false, name: "CR-only whitespace" },
    { children: false, code: "<div>\n</div>;", meaningful: false, name: "LF-only whitespace" },
    { children: true, code: '<div>{" "}</div>;', meaningful: true, name: "expression space" },
    { children: true, code: "<div>&#32;</div>;", meaningful: true, name: "entity space" },
    { children: true, code: "<div>&nbsp;</div>;", meaningful: true, name: "entity non-breaking space" },
    { children: false, code: "<div>&#10;</div>;", meaningful: true, name: "entity line feed" },
    { children: false, code: "<div>&#13;</div>;", meaningful: true, name: "entity carriage return" },
    { children: false, code: "<div>{}</div>;", meaningful: false, name: "empty container" },
    { children: false, code: "<div>{/* comment */}</div>;", meaningful: false, name: "comment-only container" },
    { children: false, code: '<div>{""}</div>;', meaningful: false, name: "empty string literal" },
    { children: true, code: "<div>{null}</div>;", meaningful: true, name: "null child" },
    { children: true, code: "<div>{false}</div>;", meaningful: true, name: "false child" },
    { children: true, code: "<div>{0}</div>;", meaningful: true, name: "zero child" },
    { children: true, code: '<div>{"" as string}</div>;', meaningful: true, name: "TypeScript-cast empty string" },
    { children: true, code: "<div>{``}</div>;", meaningful: true, name: "template literal child" },
    { children: true, code: "<div>{...items}</div>;", meaningful: true, name: "spread child" },
  ];

  it.each(matrix)("matches the documented contract: $name", ({ children, code, meaningful }) => {
    const node = parseJSX(code);
    expect(getChildren(node).length > 0).toBe(children);
    expect(node.children.map(isMeaningfulChild)).toEqual([meaningful]);
  });
});
