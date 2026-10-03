import { collectNodes, findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { isAssignmentTargetEqual } from "./is-assignment-target-equal";

describe("isAssignmentTargetEqual", () => {
  it("should return true for structurally equal nodes", () => {
    // Two separate `obj.x` member expressions are structurally identical,
    // so `Compare.isEqual` returns true and short-circuits.
    const code = "foo(obj.x); bar(obj.x);";
    const fact = runInRule(code, (context, ast) => {
      const members = collectNodes<TSESTree.MemberExpression>(ast, AST.MemberExpression);
      expect(members).toHaveLength(2);
      return isAssignmentTargetEqual(context, members[0]!, members[1]!);
    });
    expect(fact).toBe(true);
  });

  it("should return true for value-equal but structurally different nodes", () => {
    // A literal `2` and a binary expression `1 + 1` are structurally different
    // (different AST node types), so `Compare.isEqual` returns false.
    // However, `isValueEqual` falls through to `getStaticValue` which evaluates
    // both to the same value (2), so `isAssignmentTargetEqual` returns true.
    const code = "foo(2); bar(1 + 1);";
    const fact = runInRule(code, (context, ast) => {
      const calls = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
      expect(calls).toHaveLength(2);
      const argA = calls[0]!.arguments[0]!;
      const argB = calls[1]!.arguments[0]!;
      // Verify they are structurally different node types
      expect(argA.type).toBe(AST.Literal);
      expect(argB.type).toBe(AST.BinaryExpression);
      return isAssignmentTargetEqual(context, argA, argB);
    });
    expect(fact).toBe(true);
  });

  it("should return false for nodes that are neither structurally nor value-equal", () => {
    // `x` and `y` are different variables with different values,
    // so both `Compare.isEqual` (different names) and `isValueEqual`
    // (different variables) return false.
    const code = "const x = 1; const y = 2; foo(x); bar(y);";
    const fact = runInRule(code, (context, ast) => {
      const xRefs = findIdentifierReferences(ast, "x");
      const yRefs = findIdentifierReferences(ast, "y");
      const xRef = xRefs.find((r) => r.parent.type === AST.CallExpression);
      const yRef = yRefs.find((r) => r.parent.type === AST.CallExpression);
      expect(xRef).toBeDefined();
      expect(yRef).toBeDefined();
      return isAssignmentTargetEqual(context, xRef!, yRef!);
    });
    expect(fact).toBe(false);
  });

  it("should return true for identifiers referring to the same variable", () => {
    const code = "const x = 1; foo(x); bar(x);";
    const fact = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x").filter((r) => r.parent.type === AST.CallExpression);
      expect(refs).toHaveLength(2);
      return isAssignmentTargetEqual(context, refs[0]!, refs[1]!);
    });
    expect(fact).toBe(true);
  });

  it("should return false for same-name identifiers referring to different variables", () => {
    // The two `x` bindings live in different function scopes, so they are
    // different variables even though `Compare.isEqual` would call them equal
    // by name.
    const code = "function a() { const x = 1; foo(x); } function b() { const x = 2; bar(x); }";
    const fact = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x").filter((r) => r.parent.type === AST.CallExpression);
      expect(refs).toHaveLength(2);
      return isAssignmentTargetEqual(context, refs[0]!, refs[1]!);
    });
    expect(fact).toBe(false);
  });
});
