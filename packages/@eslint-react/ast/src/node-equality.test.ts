/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { isNodeEqual } from "./node-equality";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
    jsx: true,
  });
}

function collectJSXAttributes(code: string): TSESTree.JSXAttribute[] {
  const attrs: TSESTree.JSXAttribute[] = [];
  simpleTraverse(parse(code).ast, {
    enter(node) {
      if (node.type === AST.JSXAttribute) {
        attrs.push(node);
      }
    },
  }, true);
  return attrs;
}

function collectNodes<T extends TSESTree.Node>(code: string, type: AST): T[] {
  const nodes: T[] = [];
  simpleTraverse(parse(code).ast, {
    enter(node) {
      if (node.type === type) {
        nodes.push(node as T);
      }
    },
  }, true);
  return nodes;
}

describe("isNodeEqual", () => {
  describe("basic node equality", () => {
    it("should return true for identifiers with the same name", () => {
      const nodes1 = collectNodes<TSESTree.Identifier>("const a = 1;", AST.Identifier);
      const nodes2 = collectNodes<TSESTree.Identifier>("const a = 2;", AST.Identifier);
      expect(isNodeEqual(nodes1[0]!, nodes2[0]!)).toBe(true);
    });

    it("should return false for identifiers with different names", () => {
      const nodes1 = collectNodes<TSESTree.Identifier>("const a = 1;", AST.Identifier);
      const nodes2 = collectNodes<TSESTree.Identifier>("const b = 1;", AST.Identifier);
      expect(isNodeEqual(nodes1[0]!, nodes2[0]!)).toBe(false);
    });

    it("should return true for literals with the same value", () => {
      const nodes1 = collectNodes<TSESTree.Literal>("const a = 42;", AST.Literal);
      const nodes2 = collectNodes<TSESTree.Literal>("const b = 42;", AST.Literal);
      expect(isNodeEqual(nodes1[0]!, nodes2[0]!)).toBe(true);
    });

    it("should return false for literals with different values", () => {
      const nodes1 = collectNodes<TSESTree.Literal>("const a = 42;", AST.Literal);
      const nodes2 = collectNodes<TSESTree.Literal>("const b = 99;", AST.Literal);
      expect(isNodeEqual(nodes1[0]!, nodes2[0]!)).toBe(false);
    });
  });

  describe("JSXAttribute equality with JSXIdentifier names", () => {
    it("should return true for attributes with same name and value", () => {
      const attrs1 = collectJSXAttributes('<div className="a" />');
      const attrs2 = collectJSXAttributes('<div className="a" />');
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(true);
    });

    it("should return false for attributes with different names", () => {
      const attrs1 = collectJSXAttributes('<div className="a" />');
      const attrs2 = collectJSXAttributes('<div id="a" />');
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(false);
    });

    it("should return false for attributes with same name but different values", () => {
      const attrs1 = collectJSXAttributes('<div className="a" />');
      const attrs2 = collectJSXAttributes('<div className="b" />');
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(false);
    });

    it("should return true for boolean attributes (no value)", () => {
      const attrs1 = collectJSXAttributes("<input disabled />");
      const attrs2 = collectJSXAttributes("<input disabled />");
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(true);
    });
  });

  describe("JSXAttribute equality with JSXNamespacedName (PR #1662 bugfix)", () => {
    it("should return true for identical namespaced attributes", () => {
      const attrs1 = collectJSXAttributes('<svg xmlns:xlink="http://www.w3.org/1999/xlink" />');
      const attrs2 = collectJSXAttributes('<svg xmlns:xlink="http://www.w3.org/1999/xlink" />');
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(true);
    });

    it("should return true for identical xlink:href attributes", () => {
      const attrs1 = collectJSXAttributes('<svg xlink:href="#icon" />');
      const attrs2 = collectJSXAttributes('<svg xlink:href="#icon" />');
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(true);
    });

    it("should return false for namespaced attributes with different values", () => {
      const attrs1 = collectJSXAttributes('<svg xmlns:xlink="http://www.w3.org/1999/xlink" />');
      const attrs2 = collectJSXAttributes('<svg xmlns:xlink="http://other-url" />');
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(false);
    });

    it("should return false for namespaced attributes with different names", () => {
      const attrs1 = collectJSXAttributes('<svg xlink:href="#icon" />');
      const attrs2 = collectJSXAttributes('<svg xlink:title="icon" />');
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(false);
    });

    it("should return false for namespaced vs simple attribute", () => {
      const attrs1 = collectJSXAttributes('<svg xmlns:xlink="url" />');
      const attrs2 = collectJSXAttributes('<svg className="foo" />');
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(false);
    });

    it("should return false for different namespace prefixes", () => {
      const attrs1 = collectJSXAttributes('<svg xmlns:xlink="url" />');
      const attrs2 = collectJSXAttributes('<svg xmlns:href="url" />');
      expect(isNodeEqual(attrs1[0]!, attrs2[0]!)).toBe(false);
    });
  });

  describe("dual form (curried)", () => {
    it("should work in curried form for JSXAttributes", () => {
      const attrs1 = collectJSXAttributes('<div className="a" />');
      const attrs2 = collectJSXAttributes('<div className="a" />');
      const check = isNodeEqual(attrs1[0]!);
      expect(check(attrs2[0]!)).toBe(true);
    });

    it("should work in curried form for namespaced JSXAttributes", () => {
      const attrs1 = collectJSXAttributes('<svg xlink:href="#icon" />');
      const attrs2 = collectJSXAttributes('<svg xlink:href="#icon" />');
      const check = isNodeEqual(attrs1[0]!);
      expect(check(attrs2[0]!)).toBe(true);
    });
  });
});
