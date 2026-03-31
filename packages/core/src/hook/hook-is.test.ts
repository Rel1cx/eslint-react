/// <reference types="node" />

import { isFunction } from "@eslint-react/ast";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { isHookCall, isHookDefinition, isUseCallbackCall, isUseEffectCall, isUseStateCall } from "./hook-is";

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

describe("specific hook call checks (using internal isHookCallWithName)", () => {
  it("isUseStateCall should return true for useState(0)", () => {
    let found = false;
    simpleTraverse(parse("useState(0)").ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isUseStateCall(node)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("isUseEffectCall should return true for useEffect(() => {})", () => {
    let found = false;
    simpleTraverse(parse("useEffect(() => {})").ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isUseEffectCall(node)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("isUseCallbackCall should return true for useCallback(() => {})", () => {
    let found = false;
    simpleTraverse(parse("useCallback(() => {})").ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isUseCallbackCall(node)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("isUseEffectCall should return false for useState(0)", () => {
    let found = false;
    simpleTraverse(parse("useState(0)").ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isUseEffectCall(node)).toBe(false);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});
