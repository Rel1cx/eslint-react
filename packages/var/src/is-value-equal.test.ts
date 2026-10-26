import { collectNodes, findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { isValueEqual } from "./is-value-equal";
import { resolve } from "./resolve";

describe("isValueEqual", () => {
  describe("basic functionality", () => {
    it("should return true for the same node reference", () => {
      const code = "const x = 1;";
      const fact = runInRule(code, (context, ast) => {
        const literals = collectNodes<TSESTree.Literal>(ast, AST.Literal);
        expect(literals.length).toBeGreaterThanOrEqual(1);
        const node = literals[0]!;
        return isValueEqual(context, node, node);
      });
      expect(fact).toBe(true);
    });

    it("should return true for literals with the same value", () => {
      const code = "const a = 42; const b = 42;";
      const fact = runInRule(code, (context, ast) => {
        const literals = collectNodes<TSESTree.Literal>(ast, AST.Literal);
        expect(literals).toHaveLength(2);
        return isValueEqual(context, literals[0]!, literals[1]!);
      });
      expect(fact).toBe(true);
    });

    it("should return false for literals with different values", () => {
      const code = "const a = 42; const b = 99;";
      const fact = runInRule(code, (context, ast) => {
        const literals = collectNodes<TSESTree.Literal>(ast, AST.Literal);
        expect(literals).toHaveLength(2);
        return isValueEqual(context, literals[0]!, literals[1]!);
      });
      expect(fact).toBe(false);
    });

    it("should return true for identifier references to the same variable", () => {
      const code = "const x = 1; foo(x); bar(x);";
      const fact = runInRule(code, (context, ast) => {
        const refs = findIdentifierReferences(ast, "x");
        expect(refs.length).toBeGreaterThanOrEqual(2);
        return isValueEqual(context, refs[0]!, refs[1]!);
      });
      expect(fact).toBe(true);
    });

    it("should return false for identifier references to different variables", () => {
      const code = "const x = 1; const y = 2; foo(x); bar(y);";
      const fact = runInRule(code, (context, ast) => {
        const xRefs = findIdentifierReferences(ast, "x");
        const yRefs = findIdentifierReferences(ast, "y");
        expect(xRefs.length).toBeGreaterThanOrEqual(1);
        expect(yRefs.length).toBeGreaterThanOrEqual(1);
        return isValueEqual(context, xRefs[0]!, yRefs[0]!);
      });
      expect(fact).toBe(false);
    });

    it("should return true for references to the same configured global", () => {
      // Configured globals have no scope-manager definition; identity still
      // comes from the shared variable object.
      const code = "/* global EVENT */\nfoo(EVENT); bar(EVENT);";
      const fact = runInRule(code, (context, ast) => {
        const refs = findIdentifierReferences(ast, "EVENT");
        expect(refs).toHaveLength(2);
        return isValueEqual(context, refs[0]!, refs[1]!);
      });
      expect(fact).toBe(true);
    });

    it("should return false for references to different configured globals", () => {
      const code = "/* global FIRST, SECOND */\nfoo(FIRST); bar(SECOND);";
      const fact = runInRule(code, (context, ast) => {
        const first = findIdentifierReferences(ast, "FIRST");
        const second = findIdentifierReferences(ast, "SECOND");
        expect(first).toHaveLength(1);
        expect(second).toHaveLength(1);
        return isValueEqual(context, first[0]!, second[0]!);
      });
      expect(fact).toBe(false);
    });

    it("should return true for simple MemberExpression equality", () => {
      const code = "const obj = {}; foo(obj.a); bar(obj.a);";
      const fact = runInRule(code, (context, ast) => {
        const members = collectNodes<TSESTree.MemberExpression>(ast, AST.MemberExpression);
        expect(members).toHaveLength(2);
        return isValueEqual(context, members[0]!, members[1]!);
      });
      expect(fact).toBe(true);
    });
  });

  describe("issue verification", () => {
    it("FIXED: MemberExpression computed property now uses value equality", () => {
      // Previously `isValueEqual` used `ast.isNodeEqual(a.property, b.property)` for
      // MemberExpression properties, which is structural equality. For computed properties
      // the property nodes of `obj[1 + 1]` and `obj[2]` are structurally different
      // (BinaryExpression and Literal, respectively) even though they evaluate to the same value.
      // The fix uses `isValueEqual` for computed properties, which falls through to
      // `getStaticValue` and correctly evaluates both to `2`.
      const code = [
        "const obj = {};",
        "foo(obj[1 + 1]);",
        "bar(obj[2]);",
      ].join("\n");

      const fact = runInRule(code, (context, ast) => {
        const members = collectNodes<TSESTree.MemberExpression>(ast, AST.MemberExpression);
        expect(members).toHaveLength(2);
        return isValueEqual(context, members[0]!, members[1]!);
      });
      // Fixed: computed properties now use isValueEqual instead of isNodeEqual,
      // so obj[1 + 1] and obj[2] are correctly recognized as equal.
      expect(fact).toBe(true);
    });

    it("ISSUE: resolveOrigin called with at: 0 (default) in isValueEqual but at: -1 in resolveObjectType", () => {
      // `isValueEqual` calls `resolveOrigin(context, a)` which defaults to `at: 0` (first definition).
      // `resolveObjectType` calls `resolve(context, node, { at: -1, localOnly: true })` (last definition).
      // With `var` redeclarations, these resolve to different nodes.
      const code = "var x = 1; var x = []; foo(x);";

      const fact = runInRule(code, (context, ast) => {
        const xRefs = findIdentifierReferences(ast, "x");
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
      expect(fact.firstType).toBe(AST.Literal);
      // at: -1 resolves to the last definition's initializer → ArrayExpression ([])
      expect(fact.lastType).toBe(AST.ArrayExpression);
      // They are different nodes, demonstrating the inconsistency
      expect(fact.areDifferent).toBe(true);
    });
  });

  describe("regular expression literals", () => {
    it("should return true for regex literals with the same pattern and flags", () => {
      const code = "foo(/abc/g); bar(/abc/g);";
      const fact = runInRule(code, (context, ast) => {
        const literals = collectNodes<TSESTree.Literal>(ast, AST.Literal);
        expect(literals).toHaveLength(2);
        return isValueEqual(context, literals[0]!, literals[1]!);
      });
      expect(fact).toBe(true);
    });

    it("should return false for regex literals with different flags", () => {
      const code = "foo(/abc/g); bar(/abc/i);";
      const fact = runInRule(code, (context, ast) => {
        const literals = collectNodes<TSESTree.Literal>(ast, AST.Literal);
        expect(literals).toHaveLength(2);
        return isValueEqual(context, literals[0]!, literals[1]!);
      });
      expect(fact).toBe(false);
    });

    it("should return false when a regex literal is compared to a string literal", () => {
      const code = 'foo(/abc/); bar("/abc/");';
      const fact = runInRule(code, (context, ast) => {
        const literals = collectNodes<TSESTree.Literal>(ast, AST.Literal);
        expect(literals).toHaveLength(2);
        return isValueEqual(context, literals[0]!, literals[1]!);
      });
      expect(fact).toBe(false);
    });
  });
});
