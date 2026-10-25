import { Traverse } from "@eslint-react/ast";
import { createScopeContext, getLastExpression, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { JSXDetectionHint, isJSXLike } from "./jsx";

/**
 * Parses `code` and returns the expression of the last top-level
 * `ExpressionStatement` together with a scope-aware rule context.
 */
function parseLastExpression(code: string) {
  const parsed = parseCode(code);
  const context = createScopeContext(parsed, code);
  return { context, node: getLastExpression(code) };
}

function run(code: string, hint?: JSXDetectionHint): boolean {
  const { context, node } = parseLastExpression(code);
  return isJSXLike(context, node, hint);
}

describe("isJSXLike", () => {
  describe("null and JSX nodes", () => {
    it("should return false for null node", () => {
      const { context } = parseLastExpression("1;");
      expect(isJSXLike(context, null)).toBe(false);
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
    ])("with JSXDetectionHint.None every literal is JSX-like: %s", (code) => {
      expect(run(code, JSXDetectionHint.None)).toBe(true);
    });

    it("should respect DoNotIncludeJSXWithNullValue", () => {
      expect(run("null;", JSXDetectionHint.DoNotIncludeJSXWithNullValue)).toBe(false);
    });

    it("should treat template literals as string values", () => {
      expect(run("`template`;", JSXDetectionHint.DoNotIncludeJSXWithStringValue)).toBe(false);
    });

    it("should return false for regex literals even with JSXDetectionHint.None", () => {
      // RegExp literals have an object value that is not null.
      expect(run("/foo/;", JSXDetectionHint.None)).toBe(false);
    });
  });

  describe("undefined identifier", () => {
    it("should be excluded by the default hint", () => {
      expect(run("undefined;")).toBe(false);
    });

    it("should be included with JSXDetectionHint.None", () => {
      expect(run("undefined;", JSXDetectionHint.None)).toBe(true);
    });
  });

  describe("array expressions", () => {
    it("should include empty arrays by default", () => {
      expect(run("[];")).toBe(true);
    });

    it("should respect DoNotIncludeJSXWithEmptyArrayValue", () => {
      expect(run("[];", JSXDetectionHint.DoNotIncludeJSXWithEmptyArrayValue)).toBe(false);
    });

    it("should return true if some element is JSX-like by default", () => {
      expect(run("[<div />, 0];")).toBe(true);
    });

    it("should return false if no element is JSX-like", () => {
      expect(run("[0, 'foo'];")).toBe(false);
    });

    it("should respect RequireAllArrayElementsToBeJSX", () => {
      const hint = 0n
        | JSXDetectionHint.DoNotIncludeJSXWithNumberValue
        | JSXDetectionHint.RequireAllArrayElementsToBeJSX;
      expect(run("[<div />, 0];", hint)).toBe(false);
      expect(run("[<div />, <span />];", hint)).toBe(true);
    });

    it("should treat array holes as not JSX-like", () => {
      expect(run("[, <div />];")).toBe(true);
      expect(run("[, <div />];", JSXDetectionHint.RequireAllArrayElementsToBeJSX)).toBe(false);
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

    it("should respect RequireBothSidesOfLogicalExpressionToBeJSX", () => {
      const hint = JSXDetectionHint.RequireBothSidesOfLogicalExpressionToBeJSX
        | JSXDetectionHint.DoNotIncludeJSXWithNumberValue;
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

    it("should respect RequireBothBranchesOfConditionalExpressionToBeJSX", () => {
      const hint = JSXDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJSX
        | JSXDetectionHint.DoNotIncludeJSXWithNumberValue;
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

  describe("TS wrapper expressions", () => {
    it.each([
      ["(<div />) as any;", true],
      ["(<div />) satisfies unknown;", true],
      ["(<div />)!;", true],
      ["(<div /> as any)!;", true],
      ["(0 as any);", false],
    ])("with default hint: %s === %s", (code, expected) => {
      expect(run(code)).toBe(expected);
    });

    it("should resolve identifiers through TS wrappers", () => {
      expect(run("const el = <div /> as any; el;")).toBe(true);
      expect(run("const el = 0 as any; el;")).toBe(false);
    });

    it("should unwrap await expressions", () => {
      expect(run("const el = <div />; await el;")).toBe(true);
      expect(run("await someUnknownIdentifier;")).toBe(false);
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

    it("should respect DoNotIncludeJSXWithCreateElementValue", () => {
      const hint = JSXDetectionHint.DoNotIncludeJSXWithCreateElementValue;
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

    it("treats any createElement call as JSX-like (current heuristic)", () => {
      // This documents the current loose behavior: isJSXLike does not verify
      // that createElement comes from React, so user-defined createElement
      // functions are also considered JSX-like.
      expect(run("const createElement = () => {}; createElement('div');")).toBe(true);
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

    it("should return false for an identifier bound to a function parameter", () => {
      // With value semantics (`resolve`), a parameter has no statically known value —
      // it is supplied by the caller.
      const code = "function f(x) { return x; }";
      const parsed = parseCode(code);
      const context = createScopeContext(parsed, code);
      const xRefs: TSESTree.Identifier[] = [];
      Traverse.simpleTraverse(parsed.ast, {
        enter(node, parent) {
          if (node.type === AST.Identifier && node.name === "x" && parent?.type === AST.ReturnStatement) {
            xRefs.push(node);
          }
        },
        setParentPointers: true,
      });
      expect(xRefs).toHaveLength(1);
      expect(isJSXLike(context, xRefs[0]!)).toBe(false);
    });

    it("should resolve a twice-referenced alias under RequireAllArrayElementsToBeJSX", () => {
      const hint = JSXDetectionHint.RequireAllArrayElementsToBeJSX;
      expect(run("const el = <div />; const alias = el; [alias, alias];", hint)).toBe(true);
    });

    it("should resolve a twice-referenced alias under RequireBothBranchesOfConditionalExpressionToBeJSX", () => {
      const hint = JSXDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJSX;
      expect(run("const el = <div />; const alias = el; x ? alias : alias;", hint)).toBe(true);
    });

    it("should resolve a shadowed 'undefined' binding to its initializer", () => {
      // A local binding named `undefined` shadows the global value, so the
      // identifier resolves to its initializer instead of the undefined value.
      expect(run("const undefined = <div />; undefined;")).toBe(true);
    });

    it("should return false for an identifier bound through a destructuring pattern", () => {
      // With value semantics (`resolve`), a destructured binding's value is a member of
      // the source object, not the initializer itself — so it is not JSX-like even when
      // the declarator's init is JSX.
      expect(run("const { el } = <div />; el;")).toBe(false);
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
