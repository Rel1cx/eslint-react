import { type TestRuleContext, runCollector } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { createFactCollector } from "./collect";
import { inferViolations } from "./effects";

function inferViolationNames(code: string): string[] {
  let context: TestRuleContext | null = null;
  return runCollector(
    code,
    (ctx) => {
      context = ctx;
      const collector = createFactCollector(ctx);
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts) => {
      if (context == null) throw new Error("The rule context was not captured");
      return inferViolations(context, facts).map((violation) => violation.name);
    },
  );
}

describe("inferViolations", () => {
  it("should report a setState call directly in a component", () => {
    const code = "function Component() { const [count, setCount] = useState(0); setCount(1); }";
    expect(inferViolationNames(code)).toEqual(["setCount"]);
  });

  it("should report multiple setState calls in source order", () => {
    const code = "function Component() { const [a, setA] = useState(0); const [b, setB] = useState(0); setA(1); setB(2); }";
    expect(inferViolationNames(code)).toEqual(["setA", "setB"]);
  });

  it("should report a setState call directly in a custom hook", () => {
    const code = "function useHook() { const [count, setCount] = useState(0); setCount(1); }";
    expect(inferViolationNames(code)).toEqual(["setCount"]);
  });

  it("should report a setState call in an anonymous component wrapper callback", () => {
    const code = "const Component = memo(() => { const [count, setCount] = useState(0); setCount(1); });";
    expect(inferViolationNames(code)).toEqual(["setCount"]);
  });

  it("should not report calls of unrelated functions", () => {
    const code = "function Component() { const [count, setCount] = useState(0); update(count); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in a nested callback", () => {
    const code = "function Component() { const [count, setCount] = useState(0); const handler = () => setCount(1); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in a synchronously invoked nested function", () => {
    const code = "function Component() { const [count, setCount] = useState(0); (() => setCount(1))(); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call outside a component or hook", () => {
    const code = "function update() { const [count, setCount] = useState(0); setCount(1); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report setState calls inside conditional constructs", () => {
    const code =
      "function Component({ cond }) { const [a, setA] = useState(0); if (cond) setA(1); cond ? setA(2) : null; cond && setA(3); switch (cond) { case 1: setA(4); } }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report setState calls in loops and try blocks", () => {
    const code = "function Component({ items }) { const [a, setA] = useState(0); for (const item of items) { setA(item); } try { setA(1); } catch {} }";
    expect(inferViolationNames(code)).toEqual(["setA", "setA"]);
  });

  it("should not report a setState call after an early return", () => {
    const code = "function Component({ cond }) { const [count, setCount] = useState(0); if (cond) return null; setCount(1); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a setState call before an early return", () => {
    const code = "function Component({ cond }) { const [count, setCount] = useState(0); setCount(1); if (cond) return null; }";
    expect(inferViolationNames(code)).toEqual(["setCount"]);
  });

  it("should not let an early return in another component guard a setState call", () => {
    const code = "function Other({ cond }) { if (cond) return null; } function Component() { const [count, setCount] = useState(0); setCount(1); }";
    expect(inferViolationNames(code)).toEqual(["setCount"]);
  });

  it("should attribute a setState call after a nested component to the outer component", () => {
    const code = "function Outer() { const [count, setCount] = useState(0); function Inner() { return null; } setCount(1); }";
    expect(inferViolationNames(code)).toEqual(["setCount"]);
  });

  it("should not report a setter reached through an alias", () => {
    const code = "function Component() { const [count, setCount] = useState(0); const alias = setCount; alias(1); }";
    expect(inferViolationNames(code)).toEqual([]);
  });
});
