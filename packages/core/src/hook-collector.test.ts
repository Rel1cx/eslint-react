import { runCollector } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { getHookCollector } from "./hook-collector";

function collectHooks(code: string) {
  return runCollector(
    code,
    (context) => getHookCollector(context as never),
    (api, program) => api.getAllHooks(program),
  );
}

describe("getHookCollector", () => {
  it("should collect regular hook calls", () => {
    const hooks = collectHooks(
      "function useMyHook() { const [state, setState] = useState(0); useEffect(() => {}, []); }",
    );
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.hookCalls).toHaveLength(2);
  });

  it("should attribute nested hook calls to the correct hook", () => {
    const hooks = collectHooks(
      "function useOuter() { function useInner() { useState(0); } return useInner(); }",
    );
    expect(hooks).toHaveLength(2);
    const outer = hooks.find((h) => h.name === "useOuter");
    const inner = hooks.find((h) => h.name === "useInner");
    expect(outer?.hookCalls).toHaveLength(1);
    expect(inner?.hookCalls).toHaveLength(1);
    expect(outer?.hookCalls[0]?.type).toBe("CallExpression");
    expect(inner?.hookCalls[0]?.type).toBe("CallExpression");
  });

  it("should collect hook with expression body", () => {
    const hooks = collectHooks("const useExpressionBody = () => useState(0);");
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.name).toBe("useExpressionBody");
    expect(hooks[0]?.hookCalls).toHaveLength(1);
  });

  it("should collect function expression hooks", () => {
    const hooks = collectHooks("const useExpressionHook = function() { return useState(0); };");
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.name).toBe("useExpressionHook");
    expect(hooks[0]?.hookCalls).toHaveLength(1);
  });

  it("should collect multiple hook calls", () => {
    const hooks = collectHooks(
      "function useMultipleHooks() { const [state] = useState(0); useEffect(() => {}); useCallback(() => {}, []); return state; }",
    );
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.hookCalls).toHaveLength(3);
  });

  it("should collect the React use hook", () => {
    const hooks = collectHooks("function useData(promise) { return use(promise); }");
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.hookCalls).toHaveLength(1);
  });

  it("should report hooks that do not call other hooks", () => {
    const hooks = collectHooks("function useSorted(items) { return items.slice().sort(); }");
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.hookCalls).toHaveLength(0);
  });

  it("should collect hook calls via tagged template literals", () => {
    const hooks = collectHooks("function useMyHook() { const shadow = useMotionTemplate`literal`; }");
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.hookCalls).toHaveLength(1);
    expect(hooks[0]?.hookCalls[0]?.type).toBe("TaggedTemplateExpression");
  });

  it("should collect member expression hook tags", () => {
    const hooks = collectHooks("function useMyHook() { const shadow = Motion.useMotionTemplate`literal`; }");
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.hookCalls).toHaveLength(1);
    expect(hooks[0]?.hookCalls[0]?.type).toBe("TaggedTemplateExpression");
  });

  it("should collect hook tags wrapped in type expressions", () => {
    const hooks = collectHooks("function useMyHook() { const shadow = (useMotionTemplate as any)`literal`; }");
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.hookCalls).toHaveLength(1);
    expect(hooks[0]?.hookCalls[0]?.type).toBe("TaggedTemplateExpression");
  });

  it("should not collect non-hook tagged templates", () => {
    const hooks = collectHooks("function useMyHook() { const x = notAHook`literal`; }");
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.hookCalls).toHaveLength(0);
  });

  it("should attribute nested tagged template hook calls to the correct hook", () => {
    const hooks = collectHooks(
      "function useOuter() { function useInner() { useMotionTemplate`inner`; } return useInner(); }",
    );
    expect(hooks).toHaveLength(2);
    const outer = hooks.find((h) => h.name === "useOuter");
    const inner = hooks.find((h) => h.name === "useInner");
    expect(outer?.hookCalls).toHaveLength(1);
    expect(inner?.hookCalls).toHaveLength(1);
    expect(outer?.hookCalls[0]?.type).toBe("CallExpression");
    expect(inner?.hookCalls[0]?.type).toBe("TaggedTemplateExpression");
  });
});
