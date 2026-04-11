/// <reference types="node" />

import { isFunction } from "@eslint-react/ast";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { isHookCall, isHookDefinition } from "./hook";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

describe("isHookDefinition", () => {
  it.each([
    ["function useMyHook() {}", true],
    ["function useFoo() {}", true],
    ["function use() {}", true],
  ])("should return true for hook function declaration: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["function notAHook() {}", false],
  ])("should return false for non-hook function declaration: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["const useBar = () => {}", true],
  ])("should return true for arrow function with hook name: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["const helper = () => {}", false],
  ])("should return false for arrow function without hook name: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for null", () => {
    expect(isHookDefinition(null)).toBe(false);
  });
});

describe("isHookCall", () => {
  it.each([
    ["useState()", true],
    ["useEffect(() => {})", true],
    ["useMemo(() => {}, [])", true],
    ["React.useState()", true],
  ])("should return true for hook call: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isHookCall(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["notAHook()", false],
    ["user()", false],
  ])("should return false for non-hook call: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isHookCall(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for null", () => {
    expect(isHookCall(null)).toBe(false);
  });
});
