/// <reference types="node" />

import type { RuleContext } from "@eslint-react/eslint";
import * as tsParser from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { Linter } from "eslint";
import { describe, expect, it } from "vitest";

import { findAttribute, findParentAttribute, findSpreadProperty } from "./attribute-find";

function parseJsxElement(code: string): { context: RuleContext; element: TSESTree.JSXElement } {
  const found: { context: RuleContext | null; element: TSESTree.JSXElement | null } = { context: null, element: null };
  new Linter().verify(code, {
    plugins: {
      test: {
        rules: {
          "test-rule": {
            meta: { type: "problem", messages: {}, schema: [] },
            create(ctx: unknown) {
              found.context = ctx as never;
              return {
                JSXElement(node: TSESTree.JSXElement) {
                  found.element ??= node;
                },
              };
            },
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
  if (found.context == null || found.element == null) throw new Error("expected a JSX element in the code");
  return { context: found.context, element: found.element };
}

function getSpreadArgument(element: TSESTree.JSXElement, index = 0): TSESTree.Expression {
  const attr = element.openingElement.attributes[index];
  if (attr?.type !== AST.JSXSpreadAttribute) {
    throw new Error(`expected attribute ${index} to be a JSXSpreadAttribute, got ${attr?.type ?? "unknown"}`);
  }
  return attr.argument;
}

describe("findAttribute", () => {
  it("finds a direct attribute", () => {
    const { context, element } = parseJsxElement('<div className="x" />;');
    const attr = findAttribute(context, element, "className");
    expect(attr?.type).toBe(AST.JSXAttribute);
  });

  it("finds a property inside a spread object expression", () => {
    const { context, element } = parseJsxElement("<div {...{ className: 'x' }} />;");
    const attr = findAttribute(context, element, "className");
    expect(attr?.type).toBe(AST.JSXSpreadAttribute);
  });

  it("finds a property behind a string literal key in a spread object", () => {
    const { context, element } = parseJsxElement('<div {...{ "className": "x" }} />;');
    const attr = findAttribute(context, element, "className");
    expect(attr?.type).toBe(AST.JSXSpreadAttribute);
  });

  it("finds a property inside a spread identifier resolving to an object expression", () => {
    const { context, element } = parseJsxElement(
      "const props = { className: 'x' }; <div {...props} />;",
    );
    const attr = findAttribute(context, element, "className");
    expect(attr?.type).toBe(AST.JSXSpreadAttribute);
  });

  it("finds a property nested in multiple object expression spreads", () => {
    const { context, element } = parseJsxElement(
      "<div {...{ ...{ ...{ className: 'x' } } }} />;",
    );
    const attr = findAttribute(context, element, "className");
    expect(attr?.type).toBe(AST.JSXSpreadAttribute);
  });

  it("finds a property nested in multiple identifier spreads", () => {
    const { context, element } = parseJsxElement(
      "const inner = { className: 'x' };"
        + "const middle = { ...inner };"
        + "const props = { ...middle };"
        + "<div {...props} />;",
    );
    const attr = findAttribute(context, element, "className");
    expect(attr?.type).toBe(AST.JSXSpreadAttribute);
  });

  it("returns undefined when the attribute is not present", () => {
    const { context, element } = parseJsxElement("<div />;");
    const attr = findAttribute(context, element, "className");
    expect(attr).toBeUndefined();
  });

  it("returns undefined when the spread argument does not resolve to an object", () => {
    const { context, element } = parseJsxElement("const props = null; <div {...props} />;");
    const attr = findAttribute(context, element, "className");
    expect(attr).toBeUndefined();
  });

  it("respects later-props-win semantics", () => {
    const { context, element } = parseJsxElement(
      "const props = { className: 'first' }; <div {...props} className=\"second\" />;",
    );
    const attr = findAttribute(context, element, "className");
    expect(attr?.type).toBe(AST.JSXAttribute);
  });

  it("returns the last matching attribute when the name is duplicated", () => {
    const { context, element } = parseJsxElement('<div id="a" id="b" />;');
    const attr = findAttribute(context, element, "id");
    expect(attr).toBe(element.openingElement.attributes[1]);
  });

  it("returns the last matching spread attribute when the property is duplicated", () => {
    const { context, element } = parseJsxElement(
      "<div {...{ id: 'a' }} {...{ id: 'b' }} />;",
    );
    const attr = findAttribute(context, element, "id");
    expect(attr).toBe(element.openingElement.attributes[1]);
  });

  it("does not infinite loop on circular spread references", () => {
    const { context, element } = parseJsxElement(
      "const a = {};"
        + "const b = { ...a };"
        + "Object.assign(a, { ...b });"
        + "<div {...a} />;",
    );
    expect(() => findAttribute(context, element, "className")).not.toThrow();
  });
});

describe("findParentAttribute", () => {
  it("finds the enclosing attribute from a nested expression", () => {
    const { element } = parseJsxElement('<div className={foo} id="y" />;');
    const attr = element.openingElement.attributes[0];
    if (attr?.type !== AST.JSXAttribute || attr.value?.type !== AST.JSXExpressionContainer) {
      throw new Error("unexpected attribute shape");
    }
    const found = findParentAttribute(attr.value.expression);
    expect(found).toBe(attr);
  });

  it("filters candidates with the predicate", () => {
    const { element } = parseJsxElement('<div className={foo} id="y" />;');
    const attr = element.openingElement.attributes[0];
    if (attr?.type !== AST.JSXAttribute || attr.value?.type !== AST.JSXExpressionContainer) {
      throw new Error("unexpected attribute shape");
    }
    const found = findParentAttribute(
      attr.value.expression,
      (n) => n.name.type === AST.JSXIdentifier && n.name.name === "id",
    );
    expect(found).toBeUndefined();
  });

  it("returns undefined when no attribute ancestor exists", () => {
    const { element } = parseJsxElement("<div />;");
    expect(findParentAttribute(element)).toBeUndefined();
  });
});

describe("findSpreadProperty", () => {
  it("finds a property in an inline object expression", () => {
    const { context, element } = parseJsxElement("<div {...{ a: 1, b: 2 }} />;");
    const prop = findSpreadProperty(context, getSpreadArgument(element), "a");
    expect(prop?.value.type).toBe(AST.Literal);
    if (prop?.value.type === AST.Literal) {
      expect(prop.value.value).toBe(1);
    }
  });

  it("later properties win over earlier ones", () => {
    const { context, element } = parseJsxElement("<div {...{ ...{ a: 1 }, a: 2 }} />;");
    const prop = findSpreadProperty(context, getSpreadArgument(element), "a");
    expect(prop?.value.type).toBe(AST.Literal);
    if (prop?.value.type === AST.Literal) {
      expect(prop.value.value).toBe(2);
    }
  });

  it("later spreads win over earlier properties", () => {
    const { context, element } = parseJsxElement("<div {...{ a: 2, ...{ a: 1 } }} />;");
    const prop = findSpreadProperty(context, getSpreadArgument(element), "a");
    expect(prop?.value.type).toBe(AST.Literal);
    if (prop?.value.type === AST.Literal) {
      expect(prop.value.value).toBe(1);
    }
  });

  it("matches string literal keys", () => {
    const { context, element } = parseJsxElement('<div {...{ "a": 1 }} />;');
    const prop = findSpreadProperty(context, getSpreadArgument(element), "a");
    expect(prop?.type).toBe(AST.Property);
  });

  it("skips computed keys", () => {
    const { context, element } = parseJsxElement('<div {...{ ["a"]: 1 }} />;');
    const prop = findSpreadProperty(context, getSpreadArgument(element), "a");
    expect(prop).toBeUndefined();
  });
});
