import type { TSESTreeFunction } from "@eslint-react/ast";
import { getFirstNodeOfType, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";
import { isComponentOrHookLikeFunction, isInsideConditional } from "./helpers";

function checkFunction(code: string, type: TSESTreeFunction["type"] = AST.FunctionDeclaration) {
  return runInRule(code, (context, program) => {
    const fn = getFirstNodeOfType<TSESTreeFunction>(program, type);
    return isComponentOrHookLikeFunction(context, fn);
  });
}

function checkConditional(code: string) {
  return runInRule(code, (context, program) => {
    void context;
    const call = getFirstNodeOfType<TSESTree.CallExpression>(program, AST.CallExpression);
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration);
    return isInsideConditional(call, fn);
  });
}

describe("isComponentOrHookLikeFunction", () => {
  it("should match a named function component", () => {
    expect(checkFunction("function Component() {}")).toBe(true);
  });

  it("should match a named custom hook", () => {
    expect(checkFunction("function useHook() {}")).toBe(true);
  });

  it("should not match an ordinary lowercase function", () => {
    expect(checkFunction("function helper() {}")).toBe(false);
  });

  it("should match a component or hook assigned to a member property", () => {
    expect(checkFunction("obj.Component = function () {};", AST.FunctionExpression)).toBe(true);
    expect(checkFunction("obj.useHook = function () {};", AST.FunctionExpression)).toBe(true);
  });

  it("should match anonymous memo and forwardRef callbacks", () => {
    expect(checkFunction("memo(() => {});", AST.ArrowFunctionExpression)).toBe(true);
    expect(checkFunction("forwardRef(() => {});", AST.ArrowFunctionExpression)).toBe(true);
  });

  it("should match namespaced component wrapper callbacks", () => {
    expect(checkFunction("React.memo(() => {});", AST.ArrowFunctionExpression)).toBe(true);
    expect(checkFunction("React.forwardRef(() => {});", AST.ArrowFunctionExpression)).toBe(true);
  });

  it("should not match an anonymous callback passed to another function", () => {
    expect(checkFunction("schedule(() => {});", AST.ArrowFunctionExpression)).toBe(false);
  });
});

describe("isInsideConditional", () => {
  it("should match calls inside if statements", () => {
    expect(checkConditional("function Component({ cond }) { if (cond) { setCount(1); } }")).toBe(true);
  });

  it("should match calls inside conditional and logical expressions", () => {
    expect(checkConditional("function Component({ cond }) { cond ? setCount(1) : null; }")).toBe(true);
    expect(checkConditional("function Component({ cond }) { cond && setCount(1); }")).toBe(true);
  });

  it("should match calls inside switch statements", () => {
    expect(checkConditional("function Component({ cond }) { switch (cond) { case 1: setCount(1); } }")).toBe(true);
  });

  it("should match a call in an if test", () => {
    expect(checkConditional("function Component() { if (setCount(1)) { return null; } }")).toBe(true);
  });

  it("should not match an unconditional call", () => {
    expect(checkConditional("function Component() { setCount(1); }")).toBe(false);
  });

  it("should not match a call guarded only by a loop", () => {
    expect(checkConditional("function Component({ items }) { for (const item of items) { setCount(item); } }")).toBe(false);
  });

  it("should stop at the given function boundary", () => {
    expect(checkConditional("if (cond) { function Component() { setCount(1); } }")).toBe(false);
  });
});
