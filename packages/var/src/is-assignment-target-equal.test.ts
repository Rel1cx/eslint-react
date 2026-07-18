import { runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { isAssignmentTargetEqual } from "./is-assignment-target-equal";

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

describe("isAssignmentTargetEqual", () => {
  it("should return true for structurally equal nodes", () => {
    // Two separate `obj.x` member expressions are structurally identical,
    // so `Compare.areEqual` returns true and short-circuits.
    const code = "foo(obj.x); bar(obj.x);";
    const fact = runInRule(code, (context, ast) => {
      const members = findAll<TSESTree.MemberExpression>(ast, AST.MemberExpression);
      expect(members).toHaveLength(2);
      return isAssignmentTargetEqual(context, members[0]!, members[1]!);
    });
    expect(fact).toBe(true);
  });

  it("should return true for value-equal but structurally different nodes", () => {
    // A literal `2` and a binary expression `1 + 1` are structurally different
    // (different AST node types), so `Compare.areEqual` returns false.
    // However, `isValueEqual` falls through to `getStaticValue` which evaluates
    // both to the same value (2), so `isAssignmentTargetEqual` returns true.
    const code = "foo(2); bar(1 + 1);";
    const fact = runInRule(code, (context, ast) => {
      const calls = findAll<TSESTree.CallExpression>(ast, AST.CallExpression);
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
    // so both `Compare.areEqual` (different names) and `isValueEqual`
    // (different variables) return false.
    const code = "const x = 1; const y = 2; foo(x); bar(y);";
    const fact = runInRule(code, (context, ast) => {
      const xRefs = findIdentifierRefs(ast, "x");
      const yRefs = findIdentifierRefs(ast, "y");
      const xRef = xRefs.find((r) => r.parent.type === AST.CallExpression);
      const yRef = yRefs.find((r) => r.parent.type === AST.CallExpression);
      expect(xRef).toBeDefined();
      expect(yRef).toBeDefined();
      return isAssignmentTargetEqual(context, xRef!, yRef!);
    });
    expect(fact).toBe(false);
  });
});
