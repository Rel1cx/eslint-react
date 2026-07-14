/// <reference types="node" />

import type { RuleContext } from "@eslint-react/eslint";
import { JsxDetectionHint } from "@eslint-react/jsx";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../testing/helpers";
import { isJsxLike } from "./jsx";

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
          const scope = scopeManager?.acquire(current, inner);
          if (scope != null) {
            return scope.type === "function-expression-name"
              ? scope.childScopes[0]
              : scope;
          }
        }
        return scopeManager?.scopes[0];
      },
    },
  } as unknown as RuleContext;
}

/**
 * Parses `code` and returns the expression of the last top-level
 * `ExpressionStatement` together with a scope-aware rule context.
 */
function parseLastExpression(code: string) {
  const parsed = parse(code);
  const context = createContext(parsed);
  const last = parsed.ast.body.at(-1);
  if (last?.type !== AST.ExpressionStatement) {
    throw new Error(`expected last statement to be an ExpressionStatement, got ${last?.type}`);
  }
  return { context, node: last.expression };
}

function run(code: string, hint?: JsxDetectionHint): boolean {
  const { context, node } = parseLastExpression(code);
  return isJsxLike(context, node, hint);
}

describe("isJsxLike", () => {
  describe("null and JSX nodes", () => {
    it("should return false for null node", () => {
      const { context } = parseLastExpression("1;");
      expect(isJsxLike(context, null)).toBe(false);
    });

    it.each([
      ["<div />;"],
      ["<App />;"],
      ["<></>;"],
      ["<div>{0}</div>;"],
    ])("should return true for JSX node: %s", (code) => {
      expect(run(code)).toBe(true);
    });
  });

  describe("literals", () => {
    it.each([
      // Default hint allows null but excludes number, bigint, string, and boolean.
      ["null;", true],
      ["0;", false],
      ["1n;", false],
      ["'foo';", false],
      ["true;", false],
      ["false;", false],
      ["`template`;", false],
    ])("with default hint: %s === %s", (code, expected) => {
      expect(run(code)).toBe(expected);
    });

    it.each([
      ["null;"],
      ["0;"],
      ["1n;"],
      ["'foo';"],
      ["true;"],
      ["`template`;"],
    ])("with JsxDetectionHint.None every literal is JSX-like: %s", (code) => {
      expect(run(code, JsxDetectionHint.None)).toBe(true);
    });

    it("should respect DoNotIncludeJsxWithNullValue", () => {
      expect(run("null;", JsxDetectionHint.DoNotIncludeJsxWithNullValue)).toBe(false);
    });

    it("should treat template literals as string values", () => {
      expect(run("`template`;", JsxDetectionHint.DoNotIncludeJsxWithStringValue)).toBe(false);
    });

    it("should return false for regex literals even with JsxDetectionHint.None", () => {
      // RegExp literals have an object value that is not null.
      expect(run("/foo/;", JsxDetectionHint.None)).toBe(false);
    });
  });

  describe("undefined identifier", () => {
    it("should be excluded by the default hint", () => {
      expect(run("undefined;")).toBe(false);
    });

    it("should be included with JsxDetectionHint.None", () => {
      expect(run("undefined;", JsxDetectionHint.None)).toBe(true);
    });
  });

  describe("array expressions", () => {
    it("should include empty arrays by default", () => {
      expect(run("[];")).toBe(true);
    });

    it("should respect DoNotIncludeJsxWithEmptyArrayValue", () => {
      expect(run("[];", JsxDetectionHint.DoNotIncludeJsxWithEmptyArrayValue)).toBe(false);
    });

    it("should return true if some element is JSX-like by default", () => {
      expect(run("[<div />, 0];")).toBe(true);
    });

    it("should return false if no element is JSX-like", () => {
      expect(run("[0, 'foo'];")).toBe(false);
    });

    it("should respect RequireAllArrayElementsToBeJsx", () => {
      const hint = 0n
        | JsxDetectionHint.DoNotIncludeJsxWithNumberValue
        | JsxDetectionHint.RequireAllArrayElementsToBeJsx;
      expect(run("[<div />, 0];", hint)).toBe(false);
      expect(run("[<div />, <span />];", hint)).toBe(true);
    });

    it("should treat array holes as not JSX-like", () => {
      expect(run("[, <div />];")).toBe(true);
      expect(run("[, <div />];", JsxDetectionHint.RequireAllArrayElementsToBeJsx)).toBe(false);
    });
  });

  describe("logical expressions", () => {
    it.each([
      ["x && <div />;", true],
      ["<div /> ?? null;", true],
      ["0 || 1;", false],
    ])("with default hint: %s === %s", (code, expected) => {
      expect(run(code)).toBe(expected);
    });

    it("should respect RequireBothSidesOfLogicalExpressionToBeJsx", () => {
      const hint = JsxDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx
        | JsxDetectionHint.DoNotIncludeJsxWithNumberValue;
      expect(run("0 && <div />;", hint)).toBe(false);
      expect(run("<a /> || <b />;", hint)).toBe(true);
    });
  });

  describe("conditional expressions", () => {
    it.each([
      ["x ? <div /> : null;", true],
      ["x ? <div /> : 0;", true],
      ["x ? 0 : 1;", false],
    ])("with default hint: %s === %s", (code, expected) => {
      expect(run(code)).toBe(expected);
    });

    it("should respect RequireBothBranchesOfConditionalExpressionToBeJsx", () => {
      const hint = JsxDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx
        | JsxDetectionHint.DoNotIncludeJsxWithNumberValue;
      expect(run("x ? <div /> : 0;", hint)).toBe(false);
      expect(run("x ? <div /> : <span />;", hint)).toBe(true);
    });

    it("should detect JSX through nested conditional branches", () => {
      expect(run("x ? 0 : y ? <div /> : 1;")).toBe(true);
    });
  });

  describe("sequence expressions", () => {
    it("should only consider the last expression", () => {
      expect(run("(0, <div />);")).toBe(true);
      expect(run("(<div />, 0);")).toBe(false);
    });
  });

  describe("call expressions", () => {
    it.each([
      ["createElement('div');", true],
      ["React.createElement('div');", true],
      ["foo('div');", false],
      ["foo.bar('div');", false],
    ])("with default hint: %s === %s", (code, expected) => {
      expect(run(code)).toBe(expected);
    });

    it("should respect DoNotIncludeJsxWithCreateElementValue", () => {
      const hint = JsxDetectionHint.DoNotIncludeJsxWithCreateElementValue;
      expect(run("createElement('div');", hint)).toBe(false);
      expect(run("React.createElement('div');", hint)).toBe(false);
    });

    it("should not match computed member access", () => {
      // `React['createElement']` has a Literal property, which is not statically resolved.
      expect(run("React['createElement']('div');")).toBe(false);
    });

    it("should detect createElement when callee is wrapped in TSAsExpression", () => {
      expect(run("(createElement as any)('div', null, null);")).toBe(true);
    });

    it("should detect React.createElement when callee is wrapped in TSAsExpression", () => {
      expect(run("(React.createElement as any)('div', null, null);")).toBe(true);
    });
  });

  describe("identifier resolution", () => {
    it("should resolve identifiers to JSX initializers", () => {
      expect(run("const el = <div />; el;")).toBe(true);
    });

    it("should resolve identifiers through aliases", () => {
      expect(run("const el = <div />; const alias = el; alias;")).toBe(true);
    });

    it("should resolve identifiers to non-JSX initializers", () => {
      expect(run("const el = 0; el;")).toBe(false);
    });

    it("should return false for unresolvable identifiers", () => {
      expect(run("someUnknownIdentifier;")).toBe(false);
    });

    it("should not recurse infinitely on circular variable definitions", () => {
      expect(run("var a = b; var b = a; a;")).toBe(false);
      expect(run("var a = a; a;")).toBe(false);
    });
  });

  describe("other node types", () => {
    it.each([
      ["({});"],
      ["(() => <div />);"],
      ["function foo() {}; foo;"],
      ["class Foo {}; new Foo();"],
    ])("should return false for non-JSX value: %s", (code) => {
      expect(run(code)).toBe(false);
    });
  });
});
