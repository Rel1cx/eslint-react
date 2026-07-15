/// <reference types="node" />

import type { RuleContext } from "@eslint-react/eslint";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import tsx from "dedent";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../testing/helpers";
import { findAttribute } from "./find-attribute";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

function createContext(parsed: ReturnType<typeof parse>): RuleContext {
  const { scopeManager } = parsed;
  return {
    sourceCode: {
      getScope(node: TSESTree.Node) {
        const inner = node.type !== AST.Program;
        for (let current: TSESTree.Node | undefined = node; current != null; current = current.parent) {
          const scope = scopeManager.acquire(current, inner);
          if (scope != null) {
            return scope.type === "function-expression-name"
              ? scope.childScopes[0]
              : scope;
          }
        }
        return scopeManager.scopes[0];
      },
    },
  } as unknown as RuleContext;
}

function parseJsxElement(code: string): { context: RuleContext; element: TSESTree.JSXElement } {
  const parsed = parse(code);
  const last = parsed.ast.body.at(-1);
  if (last?.type !== AST.ExpressionStatement || last.expression.type !== AST.JSXElement) {
    throw new Error(`expected last statement to be a JSXElement, got ${last?.type ?? "unknown"}`);
  }
  return { context: createContext(parsed), element: last.expression };
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
    const { context, element } = parseJsxElement(tsx`
      const inner = { className: 'x' };
      const middle = { ...inner };
      const props = { ...middle };
      <div {...props} />;
    `);
    const attr = findAttribute(context, element, "className");
    expect(attr?.type).toBe(AST.JSXSpreadAttribute);
  });

  it("returns undefined when the attribute is not present", () => {
    const { context, element } = parseJsxElement("<div />;");
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

  it("does not infinite loop on circular spread references", () => {
    const { context, element } = parseJsxElement(tsx`
      const a = {};
      const b = { ...a };
      Object.assign(a, { ...b });
      <div {...a} />;
    `);
    expect(() => findAttribute(context, element, "className")).not.toThrow();
  });
});
