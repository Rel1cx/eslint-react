import { Extract } from "@eslint-react/ast";
import { collectNodes, getFirstNodeOfType, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import tsx from "dedent";
import { describe, expect, it } from "vitest";
import { getCallKind, getEffectContext, isSameObject } from "./helpers";

function getCall(code: string) {
  return getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
}

function getEffectContextSummary(code: string, method: "addEventListener" | "removeEventListener" = "addEventListener") {
  return runInRule(code, (_context, program) => {
    const call = collectNodes<TSESTree.CallExpression>(program, AST.CallExpression)
      .find((node) => Extract.getCalleeName(node) === method);
    if (call == null) throw new Error(`No ${method} call found`);
    const result = getEffectContext(call);
    if (result == null) return null;
    return {
      effect: result.effect?.type === AST.CallExpression ? Extract.getCalleeName(result.effect) : null,
      phase: result.phase,
    };
  });
}

function getCallee(code: string) {
  return Extract.unwrap(getCall(code).callee);
}

describe("getEffectContext", () => {
  it("should identify a call in an effect setup", () => {
    expect(getEffectContextSummary(`useEffect(() => { window.addEventListener("resize", onResize); }, []);`)).toEqual({
      effect: "useEffect",
      phase: "setup",
    });
  });

  it("should identify a call in an effect cleanup", () => {
    const code = `useEffect(() => { return () => window.removeEventListener("resize", onResize); }, []);`;
    expect(getEffectContextSummary(code, "removeEventListener")).toEqual({
      effect: "useEffect",
      phase: "cleanup",
    });
  });

  it("should use the surrounding effect phase through nested plain functions", () => {
    const code = tsx`
      useEffect(() => {
        setTimeout(() => window.addEventListener("resize", onResize));
        return () => {
          const teardown = () => window.removeEventListener("resize", onResize);
          teardown();
        };
      }, []);
    `;
    expect(getEffectContextSummary(code)).toEqual({ effect: "useEffect", phase: "setup" });
    expect(getEffectContextSummary(code, "removeEventListener")).toEqual({ effect: "useEffect", phase: "cleanup" });
  });

  it("should return the custom effect call and setup phase", () => {
    const code = `useCustomEffect(() => window.addEventListener("resize", onResize), []);`;
    expect(getEffectContextSummary(code)).toEqual({ effect: "useCustomEffect", phase: "setup" });
  });

  it("should return null outside an effect setup or cleanup", () => {
    expect(getEffectContextSummary(`window.addEventListener("resize", onResize);`)).toBeNull();
    expect(getEffectContextSummary(`useCallback(() => window.addEventListener("resize", onResize), []);`)).toBeNull();
    expect(getEffectContextSummary(`useEffectOnce(() => window.addEventListener("resize", onResize));`)).toBeNull();
  });
});

describe("getCallKind", () => {
  it("should classify addEventListener calls", () => {
    expect(getCallKind(getCall(`window.addEventListener("resize", onResize);`))).toBe("addEventListener");
  });

  it("should classify removeEventListener calls", () => {
    expect(getCallKind(getCall(`removeEventListener("resize", onResize);`))).toBe("removeEventListener");
  });

  it("should classify other calls", () => {
    expect(getCallKind(getCall(`window.addEvent("resize", onResize);`))).toBe("other");
    expect(getCallKind(getCall(`teardown();`))).toBe("other");
  });
});

describe("isSameObject", () => {
  it("should match member callees with structurally equal objects", () => {
    const a = getCallee(`window.matchMedia("dark").addEventListener("change", onChange);`);
    const b = getCallee(`window.matchMedia("dark").removeEventListener("change", onChange);`);
    expect(isSameObject(a, b)).toBe(true);
  });

  it("should not match member callees with different objects", () => {
    const a = getCallee(`window.addEventListener("resize", onResize);`);
    const b = getCallee(`document.removeEventListener("resize", onResize);`);
    expect(isSameObject(a, b)).toBe(false);
  });

  it("should match a global member callee with a bare callee in either direction", () => {
    const bare = getCallee(`addEventListener("resize", onResize);`);
    for (const object of ["window", "globalThis", "self"]) {
      const member = getCallee(`${object}.removeEventListener("resize", onResize);`);
      expect(isSameObject(member, bare)).toBe(true);
      expect(isSameObject(bare, member)).toBe(true);
    }
  });

  it("should not match a non-global member callee with a bare callee", () => {
    const member = getCallee(`document.addEventListener("resize", onResize);`);
    const bare = getCallee(`removeEventListener("resize", onResize);`);
    expect(isSameObject(member, bare)).toBe(false);
    expect(isSameObject(bare, member)).toBe(false);
  });

  it("should match two bare callees", () => {
    const a = getCallee(`addEventListener("resize", onResize);`);
    const b = getCallee(`removeEventListener("resize", onResize);`);
    expect(isSameObject(a, b)).toBe(true);
  });
});
