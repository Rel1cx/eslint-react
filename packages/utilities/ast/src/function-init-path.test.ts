/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { getFunctionInitPath } from "./function-init-path";
import { isFunction } from "./node-is";
import type { TSESTreeFunction } from "./node-types";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

function collectFunctions(code: string): TSESTreeFunction[] {
  const fns: TSESTreeFunction[] = [];
  simpleTraverse(parse(code).ast, {
    enter(node) {
      if (isFunction(node)) fns.push(node);
    },
  }, true);
  return fns;
}

describe("getFunctionInitPath", () => {
  describe("ClassDeclaration (existing behavior)", () => {
    it("should return a 4-element tuple for a method in a class declaration", () => {
      const code = "class Comp { render() { return null; } }";
      const fns = collectFunctions(code);
      const methodFn = fns.find((fn) => fn.parent.type === AST.MethodDefinition);
      expect(methodFn).toBeDefined();

      const initPath = getFunctionInitPath(methodFn!);
      expect(initPath).not.toBeNull();
      expect(initPath).toHaveLength(4);
      expect(initPath![0].type).toBe(AST.ClassDeclaration);
      expect(initPath![1]!.type).toBe(AST.ClassBody);
      expect(initPath![2]!.type).toBe(AST.MethodDefinition);
      expect(initPath![3]!.type).toBe(AST.FunctionExpression);
    });

    it("should return a 4-element tuple for an arrow property in a class declaration", () => {
      const code = "class Comp { render = () => { return null; }; }";
      const fns = collectFunctions(code);
      const propFn = fns.find((fn) => fn.parent.type === AST.PropertyDefinition);
      expect(propFn).toBeDefined();

      const initPath = getFunctionInitPath(propFn!);
      expect(initPath).not.toBeNull();
      expect(initPath).toHaveLength(4);
      expect(initPath![0].type).toBe(AST.ClassDeclaration);
      expect(initPath![1]!.type).toBe(AST.ClassBody);
      expect(initPath![2]!.type).toBe(AST.PropertyDefinition);
      expect(initPath![3]!.type).toBe(AST.ArrowFunctionExpression);
    });
  });

  describe("ClassExpression (bugfix from PR #1662)", () => {
    it("should return a 4-element tuple for a method in a class expression", () => {
      const code = "const Comp = class { render() { return null; } };";
      const fns = collectFunctions(code);
      const methodFn = fns.find((fn) => fn.parent.type === AST.MethodDefinition);
      expect(methodFn).toBeDefined();

      const initPath = getFunctionInitPath(methodFn!);
      expect(initPath).not.toBeNull();
      expect(initPath).toHaveLength(4);
      expect(initPath![0].type).toBe(AST.ClassExpression);
      expect(initPath![1]!.type).toBe(AST.ClassBody);
      expect(initPath![2]!.type).toBe(AST.MethodDefinition);
      expect(initPath![3]!.type).toBe(AST.FunctionExpression);
    });

    it("should return a 4-element tuple for an arrow property in a class expression", () => {
      const code = "const Comp = class { render = () => { return null; }; };";
      const fns = collectFunctions(code);
      const propFn = fns.find((fn) => fn.parent.type === AST.PropertyDefinition);
      expect(propFn).toBeDefined();

      const initPath = getFunctionInitPath(propFn!);
      expect(initPath).not.toBeNull();
      expect(initPath).toHaveLength(4);
      expect(initPath![0].type).toBe(AST.ClassExpression);
      expect(initPath![1]!.type).toBe(AST.ClassBody);
      expect(initPath![2]!.type).toBe(AST.PropertyDefinition);
      expect(initPath![3]!.type).toBe(AST.ArrowFunctionExpression);
    });
  });

  describe("other existing patterns", () => {
    it("should return a 1-element tuple for a function declaration", () => {
      const code = "function Comp() { return null; }";
      const fns = collectFunctions(code);
      expect(fns).toHaveLength(1);

      const initPath = getFunctionInitPath(fns[0]!);
      expect(initPath).not.toBeNull();
      expect(initPath).toHaveLength(1);
      expect(initPath![0].type).toBe(AST.FunctionDeclaration);
    });

    it("should return a 3-element tuple for a variable arrow function", () => {
      const code = "const Comp = () => { return null; };";
      const fns = collectFunctions(code);
      expect(fns).toHaveLength(1);

      const initPath = getFunctionInitPath(fns[0]!);
      expect(initPath).not.toBeNull();
      expect(initPath).toHaveLength(3);
      expect(initPath![0].type).toBe(AST.VariableDeclaration);
      expect(initPath![1]!.type).toBe(AST.VariableDeclarator);
      expect(initPath![2]!.type).toBe(AST.ArrowFunctionExpression);
    });
  });
});
