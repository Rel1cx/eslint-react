/// <reference types="node" />

import * as tsParser from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { Linter } from "eslint";
import { describe, expect, it } from "vitest";

import { isValueEqual } from "./is-value-equal";
import { resolve } from "./resolve";

// Helper: run code through eslint with a custom rule, call fn inside rule listener
function runInRule<T>(code: string, fn: (context: any, ast: TSESTree.Program) => T): T {
  let result: T | undefined;
  const linter = new Linter();
  linter.verify(code, {
    plugins: {
      test: {
        rules: {
          "test-rule": {
            meta: { type: "problem", messages: {}, schema: [] },
            create(context: any) {
              return {
                Program(programNode: TSESTree.Program) {
                  result = fn(context, programNode);
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
  return result as T;
}

// Helper: find all nodes of a given type
function findAll<T extends TSESTree.Node>(root: TSESTree.Node, type: AST): T[] {
  const result: T[] = [];
  simpleTraverse(root, {
    enter(node) {
      if (node.type === type) result.push(node as T);
    },
  }, true);
  return result;
}

// Find identifier references (not declarations) by name
function findIdentifierRefs(root: TSESTree.Node, name: string): TSESTree.Identifier[] {
  const result: TSESTree.Identifier[] = [];
  simpleTraverse(root, {
    enter(node) {
      if (node.type === AST.Identifier && node.name === name) {
        const parent = node.parent;
        if (parent.type === AST.VariableDeclarator && parent.id === node) return;
        if (parent.type === AST.FunctionDeclaration && parent.id === node) return;
        if (parent.type === AST.ClassDeclaration && parent.id === node) return;
        if (parent.type === AST.Property && parent.key === node && !parent.computed) return;
        result.push(node);
      }
    },
  }, true);
  return result;
}

describe("isValueEqual", () => {
  describe("basic functionality", () => {
    it("should return true for the same node reference", () => {
      const code = "const x = 1;";
      const result = runInRule(code, (context, ast) => {
        const literals = findAll<TSESTree.Literal>(ast, AST.Literal);
        expect(literals.length).toBeGreaterThanOrEqual(1);
        const node = literals[0]!;
        return isValueEqual(context, node, node);
      });
      expect(result).toBe(true);
    });

    it("should return true for literals with the same value", () => {
      const code = "const a = 42; const b = 42;";
      const result = runInRule(code, (context, ast) => {
        const literals = findAll<TSESTree.Literal>(ast, AST.Literal);
        expect(literals).toHaveLength(2);
        return isValueEqual(context, literals[0]!, literals[1]!);
      });
      expect(result).toBe(true);
    });

    it("should return false for literals with different values", () => {
      const code = "const a = 42; const b = 99;";
      const result = runInRule(code, (context, ast) => {
        const literals = findAll<TSESTree.Literal>(ast, AST.Literal);
        expect(literals).toHaveLength(2);
        return isValueEqual(context, literals[0]!, literals[1]!);
      });
      expect(result).toBe(false);
    });

    it("should return true for identifier references to the same variable", () => {
      const code = "const x = 1; foo(x); bar(x);";
      const result = runInRule(code, (context, ast) => {
        const refs = findIdentifierRefs(ast, "x");
        expect(refs.length).toBeGreaterThanOrEqual(2);
        return isValueEqual(context, refs[0]!, refs[1]!);
      });
      expect(result).toBe(true);
    });

    it("should return false for identifier references to different variables", () => {
      const code = "const x = 1; const y = 2; foo(x); bar(y);";
      const result = runInRule(code, (context, ast) => {
        const xRefs = findIdentifierRefs(ast, "x");
        const yRefs = findIdentifierRefs(ast, "y");
        expect(xRefs.length).toBeGreaterThanOrEqual(1);
        expect(yRefs.length).toBeGreaterThanOrEqual(1);
        return isValueEqual(context, xRefs[0]!, yRefs[0]!);
      });
      expect(result).toBe(false);
    });

    it("should return true for simple MemberExpression equality", () => {
      const code = "const obj = {}; foo(obj.a); bar(obj.a);";
      const result = runInRule(code, (context, ast) => {
        const members = findAll<TSESTree.MemberExpression>(ast, AST.MemberExpression);
        expect(members).toHaveLength(2);
        return isValueEqual(context, members[0]!, members[1]!);
      });
      expect(result).toBe(true);
    });
  });

  describe("issue verification", () => {
    it("FIXED: MemberExpression computed property now uses value equality", () => {
      // Previously `isValueEqual` used `Compare.areEqual(a.property, b.property)` for
      // MemberExpression properties, which is structural equality. For computed properties
      // like `obj[1 + 1]` vs `obj[2]`, the property nodes are structurally different
      // (BinaryExpression vs Literal) even though they evaluate to the same value.
      // The fix uses `isValueEqual` for computed properties, which falls through to
      // `getStaticValue` and correctly evaluates both to `2`.
      const code = [
        "const obj = {};",
        "foo(obj[1 + 1]);",
        "bar(obj[2]);",
      ].join("\n");

      const result = runInRule(code, (context, ast) => {
        const members = findAll<TSESTree.MemberExpression>(ast, AST.MemberExpression);
        expect(members).toHaveLength(2);
        return isValueEqual(context, members[0]!, members[1]!);
      });
      // Fixed: computed properties now use isValueEqual instead of isNodeEqual,
      // so obj[1 + 1] and obj[2] are correctly recognized as equal.
      expect(result).toBe(true);
    });

    it("FIXED: ForOfStatement same statement — destructured variables are not equal", () => {
      // When both variables come from the SAME for-of statement (e.g. `[a, b]`),
      // they are different bindings and should not be considered equal.
      // The fix falls back to variable identity (`aVar === bVar`) for same-statement cases.
      const code = [
        "function test() {",
        "  const items = [[1, 2]];",
        "  for (const [a, b] of items) {",
        "    foo(a);",
        "    bar(b);",
        "  }",
        "}",
      ].join("\n");

      const result = runInRule(code, (context, ast) => {
        const aRefs = findIdentifierRefs(ast, "a");
        const bRefs = findIdentifierRefs(ast, "b");
        const aRef = aRefs.find((r) => r.parent.type === AST.CallExpression);
        const bRef = bRefs.find((r) => r.parent.type === AST.CallExpression);
        expect(aRef).toBeDefined();
        expect(bRef).toBeDefined();
        return isValueEqual(context, aRef!, bRef!);
      });
      // Fixed: same for-of statement falls back to variable identity,
      // so `a` and `b` are correctly recognized as different.
      expect(result).toBe(false);
    });

    it("ForOfStatement different statements — variables iterating the same source are equal", () => {
      // When variables come from DIFFERENT for-of statements that iterate the
      // same source, they represent the same values and should be equal.
      // This is the case in addEventListener/removeEventListener cleanup patterns.
      const code = [
        "function test() {",
        "  const events = ['click', 'keydown'];",
        "  for (const event of events) {",
        "    foo(event);",
        "  }",
        "  for (const evt of events) {",
        "    bar(evt);",
        "  }",
        "}",
      ].join("\n");

      const result = runInRule(code, (context, ast) => {
        const eventRefs = findIdentifierRefs(ast, "event");
        const evtRefs = findIdentifierRefs(ast, "evt");
        const eventRef = eventRefs.find((r) => r.parent.type === AST.CallExpression);
        const evtRef = evtRefs.find((r) => r.parent.type === AST.CallExpression);
        expect(eventRef).toBeDefined();
        expect(evtRef).toBeDefined();
        return isValueEqual(context, eventRef!, evtRef!);
      });
      // Different for-of statements iterating the same source → equal
      expect(result).toBe(true);
    });

    it("ISSUE: resolve called with at: 0 (default) in isValueEqual but at: -1 in computeObjectType", () => {
      // `isValueEqual` calls `resolve(context, a)` which defaults to `at: 0` (first definition).
      // `computeObjectType` calls `resolve(context, node, { at: -1 })` (last definition).
      // With `var` redeclarations, these resolve to different nodes.
      const code = "var x = 1; var x = []; foo(x);";

      const result = runInRule(code, (context, ast) => {
        const xRefs = findIdentifierRefs(ast, "x");
        // Get the last reference (the one in foo(x))
        const ref = xRefs[xRefs.length - 1]!;
        expect(ref).toBeDefined();

        const resolvedFirst = resolve(context, ref, { at: 0 });
        const resolvedLast = resolve(context, ref, { at: -1 });

        return {
          firstType: resolvedFirst?.type,
          lastType: resolvedLast?.type,
          areDifferent: resolvedFirst !== resolvedLast,
        };
      });

      // at: 0 resolves to the first definition's initializer → Literal (1)
      expect(result.firstType).toBe(AST.Literal);
      // at: -1 resolves to the last definition's initializer → ArrayExpression ([])
      expect(result.lastType).toBe(AST.ArrayExpression);
      // They are different nodes, demonstrating the inconsistency
      expect(result.areDifferent).toBe(true);
    });
  });
});
