import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { getNodeInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getChildren, hasChildren } from "./children";

function parseJsx(code: string): TSESTreeJSXElementLike {
  return getNodeInRule<TSESTreeJSXElementLike>(code, ":matches(JSXElement, JSXFragment)").node;
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
