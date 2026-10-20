import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getChildren, hasChildren } from "./children";

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

  it("filters out empty string expressions", () => {
    expect(getChildren(parseJSX('<div>{""}</div>;'))).toEqual([]);
  });

  it("filters out bare empty expression containers", () => {
    expect(getChildren(parseJSX("<div>{}</div>;"))).toEqual([]);
  });

  it("keeps comment containers mixed with meaningful children", () => {
    const children = getChildren(parseJSX("<div>{/* comment */}a</div>;"));
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

describe("hasChildren", () => {
  it("returns false for an empty element", () => {
    expect(hasChildren(parseJSX("<div />;"))).toBe(false);
  });

  it("returns false for same-line whitespace-only content", () => {
    expect(hasChildren(parseJSX("<div> </div>;"))).toBe(false);
  });

  it("returns false for an empty string expression", () => {
    expect(hasChildren(parseJSX('<div>{""}</div>;'))).toBe(false);
  });

  it("returns false for an empty expression container (comment-only)", () => {
    expect(hasChildren(parseJSX("<div>{/* comment */}</div>;"))).toBe(false);
  });

  it("returns true for meaningful children", () => {
    expect(hasChildren(parseJSX("<div>a</div>;"))).toBe(true);
  });

  it("returns true for a comment container mixed with meaningful children", () => {
    expect(hasChildren(parseJSX("<div>{/* comment */}a</div>;"))).toBe(true);
  });

  it("returns false for a bare empty expression container", () => {
    expect(hasChildren(parseJSX("<div>{}</div>;"))).toBe(false);
  });

  it("differs from getChildren for same-line whitespace", () => {
    const node = parseJSX("<div> </div>;");
    expect(getChildren(node).length).toBe(1);
    expect(hasChildren(node)).toBe(false);
  });

  it("differs from getChildren for CR-only whitespace (no \\n present)", () => {
    // isPaddingWhitespace requires a newline, so CR-only whitespace text is
    // kept by getChildren but still treated as non-meaningful by hasChildren.
    const node = parseJSX("<div>\r  \r</div>;");
    expect(getChildren(node).length).toBe(1);
    expect(hasChildren(node)).toBe(false);
  });
});
