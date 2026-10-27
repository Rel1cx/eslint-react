import { collectNodes, createScopeContext, getFirstNodeOfType, getTextOf, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import {
  findCreateElementProp,
  isCreateElementCall,
  isCreateElementChildrenArgument,
  isInsideCreateElementProps,
  parseCreateElementCall,
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
  return node == null ? null : getTextOf(code, node);
}

describe("isCreateElementCall", () => {
  it.each([
    [`React.createElement("div", null);`],
    [`createElement("div", null);`],
    [`foo.bar.createElement("div", null);`],
    [`React.createElement?.("div", null);`],
  ])("should return true: %s", (code) => {
    const { context, node } = parseCallExpression(code);
    expect(isCreateElementCall(context, node)).toBe(true);
  });

  it.each([
    [`notCreateElement("div", null);`],
    [`myCreateElement("div", null);`],
    [`React.createElementFoo("div", null);`],
  ])("should return false: %s", (code) => {
    const { context, node } = parseCallExpression(code);
    expect(isCreateElementCall(context, node)).toBe(false);
  });

  it("should return false for non-call and nullish nodes", () => {
    const { context, node } = parseNode<TSESTree.Literal>(`"div";`, AST.Literal);
    expect(isCreateElementCall(context, node)).toBe(false);
    expect(isCreateElementCall(context, null)).toBe(false);
    expect(isCreateElementCall(context, undefined)).toBe(false);
  });
});

describe("parseCreateElementCall", () => {
  it("should return null for a non-createElement call", () => {
    const { context, node } = parseCallExpression(`notCreateElement("div", null);`);
    expect(parseCreateElementCall(context, node)).toBeNull();
  });

  it("should return a descriptor for a call with no arguments", () => {
    const { context, node } = parseCallExpression(`React.createElement();`);
    const call = parseCreateElementCall(context, node);
    expect(call).not.toBeNull();
    expect(call?.typeArgument).toBeNull();
    expect(call?.propsArgument).toBeNull();
    expect(call?.propsObject).toBeNull();
    expect(call?.childrenArguments).toEqual([]);
  });

  it("should expose the positional arguments", () => {
    const code = `React.createElement("div", { id: "a" }, "x", "y");`;
    const { context, node } = parseCallExpression(code);
    const call = parseCreateElementCall(context, node);
    expect(textOf(code, call?.typeArgument ?? null)).toBe(`"div"`);
    expect(textOf(code, call?.propsArgument ?? null)).toBe(`{ id: "a" }`);
    expect(textOf(code, call?.propsObject ?? null)).toBe(`{ id: "a" }`);
    expect(call?.childrenArguments.map((arg) => textOf(code, arg))).toEqual([`"x"`, `"y"`]);
  });

  it("should unwrap type expressions around the props argument", () => {
    const { context, node } = parseCallExpression(`React.createElement("div", { id: "a" } as const);`);
    expect(parseCreateElementCall(context, node)?.propsObject?.type).toBe(AST.ObjectExpression);
  });

  it("should keep the raw props argument when it is not an object literal", () => {
    const { context, node } = parseCallExpression(`React.createElement("div", props);`);
    const call = parseCreateElementCall(context, node);
    expect(call?.propsArgument?.type).toBe(AST.Identifier);
    expect(call?.propsObject).toBeNull();
  });

  it("should expose spread arguments as raw positional arguments", () => {
    const code = `React.createElement(...args);`;
    const { context, node } = parseCallExpression(code);
    const call = parseCreateElementCall(context, node);
    expect(call?.typeArgument?.type).toBe(AST.SpreadElement);
    expect(call?.propsArgument).toBeNull();
  });
});

describe("findCreateElementProp", () => {
  it.each([
    [`React.createElement("div", { children: "a" });`, `children: "a"`],
    [`React.createElement("div", { "children": "a" });`, `"children": "a"`],
    [`React.createElement("div", { ["children"]: "a" });`, `["children"]: "a"`],
    ['React.createElement("div", { [`children`]: "a" });', '[`children`]: "a"'],
    [`React.createElement("div", { ["chi" + "ldren"]: "a" });`, `["chi" + "ldren"]: "a"`],
  ])("should find the statically named property: %s", (code, expected) => {
    const { context, node } = parseCallExpression(code);
    const call = parseCreateElementCall(context, node);
    expect(textOf(code, findCreateElementProp(context, call, "children"))).toBe(expected);
  });

  it("should find a computed key backed by a constant", () => {
    const code = `const KEY = "children"; React.createElement("div", { [KEY]: "a" });`;
    const { context, node } = parseCallExpression(code);
    const call = parseCreateElementCall(context, node);
    expect(findCreateElementProp(context, call, "children")?.type).toBe(AST.Property);
  });

  it("should ignore a property inside a nested spread", () => {
    const { context, node } = parseCallExpression(`React.createElement("div", { ...{ children: "a" } });`);
    const call = parseCreateElementCall(context, node);
    expect(findCreateElementProp(context, call, "children")).toBeNull();
  });

  it("should ignore a property inside an identifier spread", () => {
    const code = `const props = { children: "a" }; React.createElement("div", { ...props });`;
    const { context, node } = parseCallExpression(code);
    const call = parseCreateElementCall(context, node);
    expect(findCreateElementProp(context, call, "children")).toBeNull();
  });

  it("should not resolve a variable props argument", () => {
    const code = `const props = { children: "a" }; React.createElement("div", props);`;
    const { context, node } = parseCallExpression(code);
    const call = parseCreateElementCall(context, node);
    expect(call?.propsObject).toBeNull();
    expect(findCreateElementProp(context, call, "children")).toBeNull();
  });

  it("should apply last-property precedence", () => {
    const code = `React.createElement("div", { children: "a", children: "b" });`;
    const { context, node } = parseCallExpression(code);
    const call = parseCreateElementCall(context, node);
    const prop = findCreateElementProp(context, call, "children");
    expect(prop?.value.type).toBe(AST.Literal);
    if (prop?.value.type === AST.Literal) expect(prop.value.value).toBe("b");
  });

  it("should find a direct property even when a later spread may override it", () => {
    const code = `React.createElement("div", { children: "a", ...props });`;
    const { context, node } = parseCallExpression(code);
    const call = parseCreateElementCall(context, node);
    expect(textOf(code, findCreateElementProp(context, call, "children"))).toBe(`children: "a"`);
  });

  it.each([
    // No props object
    [`React.createElement("div");`],
    // Property with a different name
    [`React.createElement("div", { key: "a" });`],
    // Computed keys without a statically resolvable name do not match
    [`React.createElement("div", { [CHILDREN]: "a" });`],
    // A computed key that statically resolves to a non-string does not match
    [`React.createElement("div", { [0]: "a" });`],
    // Spread properties are ignored
    [`React.createElement("div", { ...props });`],
    // Not a createElement call
    [`notCreateElement("div", { children: "a" });`],
  ])("should return null: %s", (code) => {
    const { context, node } = parseCallExpression(code);
    const call = parseCreateElementCall(context, node);
    expect(findCreateElementProp(context, call, "children")).toBeNull();
  });

  it("should return null for a null call", () => {
    const { context } = parseCallExpression(`React.createElement("div");`);
    expect(findCreateElementProp(context, null, "children")).toBeNull();
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
    expect(isCreateElementChildrenArgument(context, node)).toBe(true);
  });

  it("should return true when the node is the type-expression children argument itself", () => {
    const code = `React.createElement("div", null, (child as any));`;
    const { context, node } = parseNode<TSESTree.TSAsExpression>(code, AST.TSAsExpression);
    expect(isCreateElementChildrenArgument(context, node)).toBe(true);
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

  it("should return false for nullish nodes", () => {
    const { context } = parseCallExpression(`React.createElement("div");`);
    expect(isCreateElementChildrenArgument(context, null)).toBe(false);
    expect(isCreateElementChildrenArgument(context, undefined)).toBe(false);
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

  it("should return true when the props object is wrapped in a type expression", () => {
    const { context, node } = parseNode<TSESTree.ArrowFunctionExpression>(
      `React.createElement("div", ({ render: () => null } as const));`,
      AST.ArrowFunctionExpression,
    );
    expect(isInsideCreateElementProps(context, node)).toBe(true);
  });

  it("should return false for nullish nodes", () => {
    const { context } = parseCallExpression(`React.createElement("div");`);
    expect(isInsideCreateElementProps(context, null)).toBe(false);
    expect(isInsideCreateElementProps(context, undefined)).toBe(false);
  });
});
