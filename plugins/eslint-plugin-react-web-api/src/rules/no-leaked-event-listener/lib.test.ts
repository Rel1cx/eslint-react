import { findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getSignalValueExpression } from "./lib";

describe("getSignalValueExpression", () => {
  it("should resolve an identifier bound to a member expression", () => {
    const code = "const signal = controller.signal; useSignal(signal);";
    const fact = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "signal").at(-1)!;
      return getSignalValueExpression(context, ref);
    });
    expect(fact?.type).toBe(AST.MemberExpression);
  });

  it("should follow an alias chain to a member expression", () => {
    const code = "const s = controller.signal; const signal = s; useSignal(signal);";
    const fact = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "signal").at(-1)!;
      return getSignalValueExpression(context, ref);
    });
    expect(fact?.type).toBe(AST.MemberExpression);
  });

  it("should return null instead of overflowing on a cyclic alias chain", () => {
    const code = "const a = b; const b = a; const signal = a; useSignal(signal);";
    const fact = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "signal").at(-1)!;
      return getSignalValueExpression(context, ref);
    });
    expect(fact).toBeNull();
  });
});
