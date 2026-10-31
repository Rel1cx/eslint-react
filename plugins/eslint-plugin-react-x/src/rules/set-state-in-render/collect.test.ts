import { getTextOf, runCollector } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { type SetStateInRenderFacts, createFactCollector } from "./collect";

function collectFacts(code: string) {
  return runCollector(
    code,
    (context) => {
      const collector = createFactCollector(context);
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts) => facts,
  );
}

function summarizeCalls(code: string, facts: SetStateInRenderFacts) {
  return facts.calls.map((call) => ({
    component: call.componentFunction == null ? null : getTextOf(code, call.componentFunction),
    enclosing: getTextOf(code, call.enclosingFunction),
    kind: call.enclosingFunctionKind,
    text: getTextOf(code, call.node),
  }));
}

describe("createFactCollector", () => {
  it("should collect calls with their enclosing function and component", () => {
    const code = "function Component() { const [count, setCount] = useState(0); setCount(1); }";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      {
        component: code,
        enclosing: code,
        kind: "component",
        text: "setCount(1)",
      },
    ]);
  });

  it("should not collect calls outside any function", () => {
    const facts = collectFacts("setCount(1);");
    expect(facts.calls).toEqual([]);
  });

  it("should not collect state hook calls but should collect calls in their arguments", () => {
    const code = "function Component() { const [count, setCount] = useState(initial()); }";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts).map((call) => call.text)).toEqual(["initial()"]);
  });

  it("should classify nested functions and attribute calls to the current component", () => {
    const code = "function Component() { const handler = () => setCount(1); useEffect(() => { setCount(2); }); }";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      {
        component: "function Component() { const handler = () => setCount(1); useEffect(() => { setCount(2); }); }",
        enclosing: "() => setCount(1)",
        kind: "other",
        text: "setCount(1)",
      },
      {
        component: "function Component() { const handler = () => setCount(1); useEffect(() => { setCount(2); }); }",
        enclosing: "function Component() { const handler = () => setCount(1); useEffect(() => { setCount(2); }); }",
        kind: "component",
        text: "useEffect(() => { setCount(2); })",
      },
      {
        component: "function Component() { const handler = () => setCount(1); useEffect(() => { setCount(2); }); }",
        enclosing: "() => { setCount(2); }",
        kind: "callback",
        text: "setCount(2)",
      },
    ]);
  });

  it("should restore the outer component after leaving a nested component", () => {
    const code = "function Outer() { function Inner() { inner(); } outer(); }";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      {
        component: "function Inner() { inner(); }",
        enclosing: "function Inner() { inner(); }",
        kind: "component",
        text: "inner()",
      },
      {
        component: code,
        enclosing: code,
        kind: "component",
        text: "outer()",
      },
    ]);
  });

  it("should treat custom hooks as render-phase functions", () => {
    const code = "function useHook() { setCount(1); }";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      { component: code, enclosing: code, kind: "component", text: "setCount(1)" },
    ]);
  });

  it("should collect only non-final returns belonging directly to the component", () => {
    const code = "function Component({ cond }) { if (cond) return null; const handler = () => { return null; }; return null; }";
    const facts = collectFacts(code);
    expect(facts.earlyReturns.map((entry) => getTextOf(code, entry.node))).toEqual(["return null;"]);
  });

  it("should not collect returns from a nested component for the outer component", () => {
    const code = "function Outer() { function Inner({ cond }) { if (cond) return null; inner(); } outer(); }";
    const facts = collectFacts(code);
    expect(facts.earlyReturns).toHaveLength(1);
    expect(getTextOf(code, facts.earlyReturns[0]!.componentFunction)).toBe("function Inner({ cond }) { if (cond) return null; inner(); }");
  });
});
