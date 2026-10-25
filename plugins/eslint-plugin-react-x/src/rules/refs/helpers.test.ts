import { collectNodes, getFirstNodeOfType, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { type GetNullBranch, getNullCheckBranch, isAfterTerminatingNonNullGuard } from "./helpers";

const getNullBranch: GetNullBranch = (test) =>
  getNullCheckBranch(
    test,
    (node) => node.type === AST.MemberExpression && !node.computed && node.property.type === AST.Identifier && node.property.name === "current",
    (node) => node.type === AST.Literal && node.value == null,
  );

function isAllowedAfterGuard(code: string): boolean {
  return runInRule(code, (_context, program) => {
    const guard = getFirstNodeOfType<TSESTree.IfStatement>(program, AST.IfStatement);
    const access = collectNodes<TSESTree.MemberExpression>(program, AST.MemberExpression)
      .find((node) => node.range[0] > guard.range[1]);
    if (access == null) throw new Error("No ref access after the guard");
    return isAfterTerminatingNonNullGuard(access, getNullBranch);
  });
}

describe("isAfterTerminatingNonNullGuard", () => {
  it("should match a non-null branch that returns", () => {
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) return; ref.current = create(); }")).toBe(true);
  });

  it("should match a non-null branch that throws", () => {
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) throw new Error(); ref.current = create(); }")).toBe(true);
  });

  it("should match a block whose last statement returns", () => {
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) { return; } ref.current = create(); }")).toBe(true);
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) { { return; } } ref.current = create(); }")).toBe(true);
  });

  it("should match an if whose branches both terminate", () => {
    const code = "function f() { if (ref.current !== null) { if (x) return; else throw new Error(); } ref.current = create(); }";
    expect(isAllowedAfterGuard(code)).toBe(true);
  });

  it("should match the guard when it is not the immediately preceding statement", () => {
    const code = "function f() { if (ref.current !== null) return; if (x) foo(); ref.current = create(); }";
    expect(isAllowedAfterGuard(code)).toBe(true);
  });

  it("should not match when the non-null branch can complete normally", () => {
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) { if (x) return; } ref.current = create(); }")).toBe(false);
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) { foo(); } ref.current = create(); }")).toBe(false);
  });

  it("should not match when the terminating statement is not the last statement of the block", () => {
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) { return; foo(); } ref.current = create(); }")).toBe(false);
  });

  it("should not match `try`/`switch`/loop termination, matching the shared predicate", () => {
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) { try { return; } finally {} } ref.current = create(); }")).toBe(false);
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) { switch (x) { default: return; } } ref.current = create(); }")).toBe(false);
    expect(isAllowedAfterGuard("function f() { if (ref.current !== null) { while (true) { return; } } ref.current = create(); }")).toBe(false);
  });

  it("should not match when the terminating branch is the null branch", () => {
    expect(isAllowedAfterGuard("function f() { if (ref.current === null) return; ref.current = create(); }")).toBe(false);
  });
});
