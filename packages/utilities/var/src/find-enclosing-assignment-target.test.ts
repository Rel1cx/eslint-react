/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { findEnclosingAssignmentTarget } from "./find-enclosing-assignment-target";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
    jsx: true,
  });
}

function findFirstNodeOfType<T extends TSESTree.Node>(ast: TSESTree.Program, type: AST): T {
  let found: T | undefined;
  simpleTraverse(ast, {
    enter(node) {
      if (found == null && node.type === type) {
        found = node as T;
      }
    },
  }, true);
  if (found == null) {
    throw new Error(`No node of type ${type} found in the AST`);
  }
  return found;
}

describe("findEnclosingAssignmentTarget", () => {
  describe("basic functionality", () => {
    it("should return the variable identifier for a VariableDeclarator", () => {
      const code = "const x = new ResizeObserver(() => {})";
      const { ast } = parse(code);
      const newExpr = findFirstNodeOfType<TSESTree.NewExpression>(ast, AST.NewExpression);

      const result = findEnclosingAssignmentTarget(newExpr);

      expect(result).not.toBeNull();
      expect(result!.type).toBe(AST.Identifier);
      expect((result as TSESTree.Identifier).name).toBe("x");
    });

    it("should return the left side for an AssignmentExpression", () => {
      const code = "let x; x = new ResizeObserver(() => {})";
      const { ast } = parse(code);
      const newExpr = findFirstNodeOfType<TSESTree.NewExpression>(ast, AST.NewExpression);

      const result = findEnclosingAssignmentTarget(newExpr);

      expect(result).not.toBeNull();
      expect(result!.type).toBe(AST.Identifier);
      expect((result as TSESTree.Identifier).name).toBe("x");
    });

    it("should return the property key for a PropertyDefinition", () => {
      const code = "class Foo { y = new ResizeObserver(() => {}) }";
      const { ast } = parse(code);
      const newExpr = findFirstNodeOfType<TSESTree.NewExpression>(ast, AST.NewExpression);

      const result = findEnclosingAssignmentTarget(newExpr);

      expect(result).not.toBeNull();
      expect(result!.type).toBe(AST.Identifier);
      expect((result as TSESTree.Identifier).name).toBe("y");
    });

    it("should return null when hitting a BlockStatement boundary", () => {
      const code = "function foo() { new ResizeObserver(() => {}) }";
      const { ast } = parse(code);
      const newExpr = findFirstNodeOfType<TSESTree.NewExpression>(ast, AST.NewExpression);

      const result = findEnclosingAssignmentTarget(newExpr);

      expect(result).toBeNull();
    });

    it("should return null when hitting the Program boundary", () => {
      const code = "new ResizeObserver(() => {})";
      const { ast } = parse(code);
      const newExpr = findFirstNodeOfType<TSESTree.NewExpression>(ast, AST.NewExpression);

      const result = findEnclosingAssignmentTarget(newExpr);

      expect(result).toBeNull();
    });
  });

  describe("issue verification", () => {
    it("ExportDefaultDeclaration is now recognized as an assignment target", () => {
      const code = "export default new ResizeObserver(() => {})";
      const { ast } = parse(code);
      const newExpr = findFirstNodeOfType<TSESTree.NewExpression>(ast, AST.NewExpression);

      // ExportDefaultDeclaration is now handled — it returns the declaration node.
      const result = findEnclosingAssignmentTarget(newExpr);

      expect(result).not.toBeNull();
      expect(result!.type).toBe(AST.NewExpression);
    });

    it("ISSUE: ForOfStatement — returns null from inside the for-of body due to BlockStatement boundary", () => {
      const code = "const items = [1, 2, 3];\nfor (const item of items) { item; }";
      const { ast } = parse(code);

      // Find the `item` Identifier reference inside the for-of body (ExpressionStatement),
      // not the declaration site in the VariableDeclarator.
      let itemRef: TSESTree.Identifier | null = null;
      simpleTraverse(ast, {
        enter(node, parent) {
          if (
            node.type === AST.Identifier
            && node.name === "item"
            && parent?.type === AST.ExpressionStatement
          ) {
            itemRef = node;
          }
        },
      }, true);
      expect(itemRef).not.toBeNull();

      // Starting from the `item` reference in the body, the function walks up:
      // Identifier → ExpressionStatement → BlockStatement → returns null.
      // The for-of assignment context is not reachable because BlockStatement
      // acts as a boundary.
      const result = findEnclosingAssignmentTarget(itemRef!);

      expect(result).toBeNull();
    });

    it("Property in object literal — returns outer VariableDeclarator id instead of property key", () => {
      const code = "const obj = { foo: new ResizeObserver(() => {}) }";
      const { ast } = parse(code);
      const newExpr = findFirstNodeOfType<TSESTree.NewExpression>(ast, AST.NewExpression);

      // The function walks up: NewExpression → Property (not handled, falls through
      // to default) → ObjectExpression (not handled) → VariableDeclarator → returns
      // node.id which is `obj`.
      // The Property node type is intentionally NOT handled because downstream
      // rules (e.g. no-missing-context-display-name) rely on traversal past
      // Property to find the outer VariableDeclarator for autofix purposes.
      const result = findEnclosingAssignmentTarget(newExpr);

      expect(result).not.toBeNull();
      expect(result!.type).toBe(AST.Identifier);
      // Returns `obj` (the VariableDeclarator's id) rather than `foo` (the Property key)
      expect((result as TSESTree.Identifier).name).toBe("obj");
    });

    it("node.parent == null boundary check handles Program root correctly", () => {
      const code = "const x = 1; function foo() { return x; }";
      const { ast } = parse(code);

      // The Program node's parent is undefined, so the `node.parent == null`
      // guard correctly stops traversal at the root.
      expect((ast as any).parent).toBeUndefined();

      // Verify that no node in a standard AST has parent === node
      // (the old dead-code guard that was replaced with `node.parent == null`).
      const allNodes: TSESTree.Node[] = [];
      simpleTraverse(ast, {
        enter(node) {
          allNodes.push(node);
        },
      }, true);

      expect(allNodes.length).toBeGreaterThan(0);

      for (const node of allNodes) {
        expect(node.parent === node).toBe(false);
      }
    });
  });
});
