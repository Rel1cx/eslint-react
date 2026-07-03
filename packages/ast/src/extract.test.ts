/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../testing/helpers";
import { getPropertyName } from "./extract";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
    jsx: true,
  });
}

function getMemberExpression(code: string): TSESTree.MemberExpression {
  const nodes: TSESTree.MemberExpression[] = [];
  simpleTraverse(
    parse(code).ast,
    {
      enter(node) {
        if (node.type === AST.MemberExpression) {
          nodes.push(node);
        }
      },
    },
    true,
  );
  const [node] = nodes;
  if (node == null) {
    throw new Error(`No MemberExpression found in: ${code}`);
  }
  return node;
}

describe("getPropertyName", () => {
  describe("non-computed properties", () => {
    it("should return the name of an identifier property", () => {
      const member = getMemberExpression("obj.eval;");
      expect(member.computed).toBe(false);
      expect(getPropertyName(member.property)).toBe("eval");
    });

    it("should return the name of a private identifier property", () => {
      const member = getMemberExpression("class A { #x = 1; m() { return this.#x; } }");
      expect(member.computed).toBe(false);
      expect(getPropertyName(member.property)).toBe("x");
    });
  });

  describe("computed properties", () => {
    it("should return the value of a string literal key", () => {
      const member = getMemberExpression('obj["eval"];');
      expect(member.computed).toBe(true);
      expect(getPropertyName(member.property)).toBe("eval");
    });

    it("should return the stringified value of a numeric literal key", () => {
      const member = getMemberExpression("obj[0];");
      expect(member.computed).toBe(true);
      expect(getPropertyName(member.property)).toBe("0");
    });

    it("should return the cooked value of a template literal key without expressions", () => {
      const member = getMemberExpression("obj[`eval`];");
      expect(member.computed).toBe(true);
      expect(getPropertyName(member.property)).toBe("eval");
    });

    it("should return null for a template literal key with expressions", () => {
      const member = getMemberExpression("obj[`ev${suffix}`];");
      expect(member.computed).toBe(true);
      expect(getPropertyName(member.property)).toBe(null);
    });

    it("should unwrap type expressions around a literal key", () => {
      const member = getMemberExpression('obj["eval" as string];');
      expect(member.computed).toBe(true);
      expect(getPropertyName(member.property)).toBe("eval");
    });

    it("should return null for a non-static expression key", () => {
      const member = getMemberExpression("obj[a + b];");
      expect(member.computed).toBe(true);
      expect(getPropertyName(member.property)).toBe(null);
    });

    // Note: getPropertyName does not know whether the enclosing member
    // expression is computed. For `obj[key]` the actual property is the
    // runtime *value* of `key`, not the name "key", but by default
    // getPropertyName still returns the identifier's name. Callers that
    // need the static property name must pass a `resolve` callback that
    // takes `member.computed` into account (see the "resolve parameter"
    // suite below).
    it("should return the identifier name for a computed identifier key by default", () => {
      const member = getMemberExpression("obj[key];");
      expect(member.computed).toBe(true);
      expect(getPropertyName(member.property)).toBe("key");
    });
  });

  describe("resolve parameter", () => {
    const staticName = (member: TSESTree.MemberExpression) => {
      return getPropertyName(member.property, (n) => member.computed ? null : n.name);
    };

    it("should return null for a computed identifier key when resolve rejects it", () => {
      const member = getMemberExpression("obj[key];");
      expect(staticName(member)).toBe(null);
    });

    it("should still return the name for a non-computed identifier property", () => {
      const member = getMemberExpression("obj.eval;");
      expect(staticName(member)).toBe("eval");
    });

    it("should not consult resolve for literal keys", () => {
      const member = getMemberExpression('obj["eval"];');
      expect(staticName(member)).toBe("eval");
      expect(getPropertyName(member.property, () => null)).toBe("eval");
    });

    it("should not consult resolve for template literal keys", () => {
      const member = getMemberExpression("obj[`eval`];");
      expect(getPropertyName(member.property, () => null)).toBe("eval");
    });

    it("should apply resolve to the unwrapped identifier inside type expressions", () => {
      const member = getMemberExpression("obj[key as any];");
      expect(member.computed).toBe(true);
      expect(staticName(member)).toBe(null);
      expect(getPropertyName(member.property)).toBe("key");
    });

    it("should apply resolve to private identifier properties", () => {
      const member = getMemberExpression("class A { #x = 1; m() { return this.#x; } }");
      expect(getPropertyName(member.property, (n) => `#${n.name}`)).toBe("#x");
    });
  });
});
