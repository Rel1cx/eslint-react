import { type TestRuleContext, getTextOf, runCollector } from "@local/testkit";
import tsx from "dedent";
import { describe, expect, it } from "vitest";
import { createFactCollector } from "./collect";
import { inferEventListenerViolations } from "./effect";
import { resolveEventListenerFacts } from "./origins";

function inferViolationSummaries(code: string) {
  let context: TestRuleContext | null = null;
  return runCollector(
    code,
    (ctx) => {
      context = ctx;
      const collector = createFactCollector();
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts) => {
      if (context == null) throw new Error("The rule context was not captured");
      const resolved = resolveEventListenerFacts(context, facts);
      return inferEventListenerViolations(context, resolved).map((violation) => ({
        data: violation.data,
        kind: violation.kind,
        text: getTextOf(code, violation.node),
      }));
    },
  );
}

describe("inferEventListenerViolations", () => {
  it("returns typed inline-listener and leaked-listener violations in report order", () => {
    const code = tsx`useEffect(() => { window.addEventListener("resize", () => {}); }, []);`;
    expect(inferViolationSummaries(code)).toEqual([
      {
        data: { effectMethodKind: "useEffect" },
        kind: "expected-remove-event-listener-in-cleanup",
        text: 'window.addEventListener("resize", () => {})',
      },
      {
        data: { eventMethodKind: "addEventListener" },
        kind: "unexpected-inline-function",
        text: "() => {}",
      },
    ]);
  });

  it("does not report a listener paired in the cleanup", () => {
    const code = tsx`
      useEffect(() => {
        window.addEventListener("resize", onResize, { capture: true });
        return () => window.removeEventListener("resize", onResize, { capture: true });
      }, []);
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("reports a listener whose capture option does not match its removal", () => {
    const code = tsx`
      useEffect(() => {
        window.addEventListener("resize", onResize, { capture: true });
        return () => window.removeEventListener("resize", onResize, { capture: false });
      }, []);
    `;
    expect(inferViolationSummaries(code).map((violation) => violation.kind)).toEqual([
      "expected-remove-event-listener-in-cleanup",
    ]);
  });

  it("exempts a signal-managed listener from both inline and leak violations", () => {
    const code = tsx`
      useEffect(() => {
        const ac = new AbortController();
        window.addEventListener("resize", () => {}, { signal: ac.signal });
        return () => ac.abort();
      }, []);
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("accepts a setup-phase remover invoked by the cleanup", () => {
    const code = tsx`
      useEffect(() => {
        const remove = () => window.removeEventListener("resize", onResize);
        window.addEventListener("resize", onResize);
        return () => remove();
      }, []);
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("uses the actual effect hook name in leak violations", () => {
    const code = tsx`useLayoutEffect(() => { window.addEventListener("resize", onResize); }, []);`;
    expect(inferViolationSummaries(code)[0]?.data).toEqual({ effectMethodKind: "useLayoutEffect" });
  });
});
