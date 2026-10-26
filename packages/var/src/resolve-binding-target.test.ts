import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { resolveBindingTarget } from "./resolve-binding-target";

describe("resolveBindingTarget", () => {
  describe("AssignmentPattern defaults", () => {
    it("should unwrap an Identifier default to its binding", () => {
      const node = getFirstNodeOfType<TSESTree.AssignmentPattern>("const [a = 1] = arr;", AST.AssignmentPattern);
      const target = resolveBindingTarget(node);
      expect(target.type).toBe(AST.Identifier);
      expect((target as TSESTree.Identifier).name).toBe("a");
    });

    it("should unwrap an ObjectPattern default to its binding", () => {
      const node = getFirstNodeOfType<TSESTree.AssignmentPattern>("const [{ a } = {}] = arr;", AST.AssignmentPattern);
      const target = resolveBindingTarget(node);
      expect(target.type).toBe(AST.ObjectPattern);
    });

    it("should unwrap an ArrayPattern default to its binding", () => {
      const node = getFirstNodeOfType<TSESTree.AssignmentPattern>("function f([a] = []) {}", AST.AssignmentPattern);
      const target = resolveBindingTarget(node);
      expect(target.type).toBe(AST.ArrayPattern);
    });
  });

  describe("non-default nodes", () => {
    it("should return non-default nodes unchanged", () => {
      const identifier = getFirstNodeOfType<TSESTree.Identifier>("const [a] = arr;", AST.Identifier);
      expect(resolveBindingTarget(identifier)).toBe(identifier);

      const restElement = getFirstNodeOfType<TSESTree.RestElement>("const [...rest] = arr;", AST.RestElement);
      expect(resolveBindingTarget(restElement)).toBe(restElement);
    });

    it("should return null for null", () => {
      expect(resolveBindingTarget(null)).toBeNull();
    });
  });
});
