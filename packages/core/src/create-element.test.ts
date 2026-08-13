import { collectNodes, createScopeContext, getFirstNodeOfType, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import {
  getCreateElementChildrenArguments,
  getCreateElementProp,
  getCreateElementPropsObject,
  getCreateElementTypeArgument,
  isCreateElementChildrenArgument,
  isInsideCreateElementProps,
} from "./create-element";

/**
 * Parses `code` and returns the first `CallExpression` together with a
 * scope-aware rule context.
 */
function parseCallExpression(code: string) {
  const parsed = parseCode(code);
  const context = createScopeContext(parsed);
  return { context, node: getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression) };
}

function parseNode<T extends TSESTree.Node>(code: string, type: T["type"]) {
  const parsed = parseCode(code);
  const context = createScopeContext(parsed);
  return { context, node: getFirstNodeOfType<T>(code, type) };
}

/**
 * Reads the source text of `node` via its range (the mock context from
 * `createScopeContext` does not implement `sourceCode.getText`).
 */
function textOf(code: string, node: null | TSESTree.Node): string | null {
  return node == null ? null : code.slice(node.range[0], node.range[1]);
}

describe("getCreateElementTypeArgument", () => {
  it.each([
    [`React.createElement("div", null);`, `"div"`],
    [`createElement(App, null);`, `App`],
  ])("should return the first argument: %s", (code, expected) => {
    const { context, node } = parseCallExpression(code);
    expect(textOf(code, getCreateElementTypeArgument(context, node))).toBe(expected);
  });

  it.each([
    [`notCreateElement("div", null);`],
    [`React.createElement();`],
  ])("should return null: %s", (code) => {
    const { context, node } = parseCallExpression(code);
    expect(getCreateElementTypeArgument(context, node)).toBeNull();
  });
});

describe("getCreateElementPropsObject", () => {
  it("should return the props object expression", () => {
    const code = `React.createElement("div", { id: "a" });`;
    const { context, node } = parseCallExpression(code);
    expect(textOf(code, getCreateElementPropsObject(context, node))).toBe(`{ id: "a" }`);
  });

  it("should unwrap type expressions around the props argument", () => {
    const { context, node } = parseCallExpression(`React.createElement("div", { id: "a" } as const);`);
    expect(getCreateElementPropsObject(context, node)?.type).toBe(AST.ObjectExpression);
  });

  it.each([
    [`React.createElement("div");`],
    [`React.createElement("div", null);`],
    [`React.createElement("div", props);`],
    [`notCreateElement("div", {});`],
  ])("should return null: %s", (code) => {
    const { context, node } = parseCallExpression(code);
    expect(getCreateElementPropsObject(context, node)).toBeNull();
  });
});

describe("getCreateElementChildrenArguments", () => {
  it("should return the arguments after the props object", () => {
    const code = `React.createElement("div", null, "a", "b");`;
    const { context, node } = parseCallExpression(code);
    const children = getCreateElementChildrenArguments(context, node);
    expect(children.map((arg) => textOf(code, arg))).toEqual([`"a"`, `"b"`]);
  });

  it.each([
    [`React.createElement("div");`],
    [`React.createElement("div", null);`],
    [`notCreateElement("div", null, "a");`],
  ])("should return an empty array: %s", (code) => {
    const { context, node } = parseCallExpression(code);
    expect(getCreateElementChildrenArguments(context, node)).toEqual([]);
  });
});

describe("getCreateElementProp", () => {
  it.each([
    // Plain identifier key
    [`React.createElement("div", { children: "a" });`, `children: "a"`],
    // String-literal key
    [`React.createElement("div", { "children": "a" });`, `"children": "a"`],
    // Computed keys with statically resolvable names also match
    [`React.createElement("div", { ["children"]: "a" });`, `["children"]: "a"`],
  ])("should find the statically named property: %s", (code, expected) => {
    const { context, node } = parseCallExpression(code);
    expect(textOf(code, getCreateElementProp(context, node, "children"))).toBe(expected);
  });

  it.each([
    // No props object
    [`React.createElement("div");`],
    // Property with a different name
    [`React.createElement("div", { key: "a" });`],
    // Computed keys without a statically resolvable name do not match
    [`React.createElement("div", { [CHILDREN]: "a" });`],
    // Spread properties have no static name
    [`React.createElement("div", { ...props });`],
    // Not a createElement call
    [`notCreateElement("div", { children: "a" });`],
  ])("should return null: %s", (code) => {
    const { context, node } = parseCallExpression(code);
    expect(getCreateElementProp(context, node, "children")).toBeNull();
  });
});

describe("isCreateElementChildrenArgument", () => {
  it("should return true for a function passed as a children argument", () => {
    const { context, node } = parseNode<TSESTree.ArrowFunctionExpression>(
      `React.createElement("div", null, () => null);`,
      AST.ArrowFunctionExpression,
    );
    expect(isCreateElementChildrenArgument(context, node)).toBe(true);
  });

  it("should return true through wrapping type expressions", () => {
    const code = `React.createElement("div", null, (child as any));`;
    const parsed = parseCode(code);
    const context = createScopeContext(parsed);
    const node = collectNodes<TSESTree.Identifier>(code, AST.Identifier).find((id) => id.name === "child");
    expect(node).toBeDefined();
    expect(isCreateElementChildrenArgument(context, node!)).toBe(true);
  });

  it.each<[string, TSESTree.Node["type"]]>([
    // The type argument is not a children argument
    [`createElement("div", null);`, AST.Literal],
    // A function nested in the props object is not a children argument
    [`React.createElement("div", { children: () => null });`, AST.ArrowFunctionExpression],
    // Not a createElement call
    [`notCreateElement("div", null, () => null);`, AST.ArrowFunctionExpression],
  ])("should return false: %s", (code, type) => {
    const { context, node } = parseNode(code, type);
    expect(isCreateElementChildrenArgument(context, node)).toBe(false);
  });
});

describe("isInsideCreateElementProps", () => {
  it("should return true for a node inside the props object", () => {
    const { context, node } = parseNode<TSESTree.ArrowFunctionExpression>(
      `React.createElement("div", { render: () => null });`,
      AST.ArrowFunctionExpression,
    );
    expect(isInsideCreateElementProps(context, node)).toBe(true);
  });

  it.each<[string, TSESTree.Node["type"]]>([
    // Nodes in the children arguments are not inside the props object
    [`React.createElement("div", null, () => null);`, AST.ArrowFunctionExpression],
    // Not a createElement call
    [`notCreateElement("div", { render: () => null });`, AST.ArrowFunctionExpression],
  ])("should return false: %s", (code, type) => {
    const { context, node } = parseNode(code, type);
    expect(isInsideCreateElementProps(context, node)).toBe(false);
  });

  it("should return false for a node inside a nested object within the props object", () => {
    const { context, node } = parseNode<TSESTree.ArrowFunctionExpression>(
      `React.createElement("div", { style: { getValue: () => null } });`,
      AST.ArrowFunctionExpression,
    );
    expect(isInsideCreateElementProps(context, node)).toBe(false);
  });
});
