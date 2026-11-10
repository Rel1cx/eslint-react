import { Extract } from "@eslint-react/ast";
import { getTextOf, runCollector } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";
import { describe, expect, it } from "vitest";
import { createFactCollector } from "./collect";

function collectFactSummaries(code: string) {
  return runCollector(
    code,
    () => {
      const collector = createFactCollector();
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts) =>
      facts.calls.map((fact) => ({
        effect: fact.effect?.type === AST.CallExpression ? Extract.getCalleeName(fact.effect) : null,
        kind: fact.kind,
        phase: fact.phase,
        text: getTextOf(code, fact.node),
      })),
  );
}

describe("createFactCollector", () => {
  it("collects listener calls and cleanup callees with their effect phases", () => {
    const code = tsx`
      useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => {
          stop();
          window.removeEventListener("resize", onResize);
        };
      }, []);
    `;
    expect(collectFactSummaries(code)).toEqual([
      { effect: "useEffect", kind: "addEventListener", phase: "setup", text: 'window.addEventListener("resize", onResize)' },
      { effect: "useEffect", kind: "other", phase: "cleanup", text: "stop()" },
      { effect: "useEffect", kind: "removeEventListener", phase: "cleanup", text: 'window.removeEventListener("resize", onResize)' },
    ]);
  });

  it("attributes calls in nested plain functions to the surrounding effect phase", () => {
    const code = tsx`
      useEffect(() => {
        setTimeout(() => window.addEventListener("resize", onResize));
        return () => {
          const teardown = () => window.removeEventListener("resize", onResize);
          teardown();
        };
      }, []);
    `;
    expect(collectFactSummaries(code).map(({ kind, phase }) => ({ kind, phase }))).toEqual([
      { kind: "other", phase: "setup" },
      { kind: "addEventListener", phase: "setup" },
      { kind: "removeEventListener", phase: "cleanup" },
      { kind: "other", phase: "cleanup" },
    ]);
  });

  it("ignores calls outside effect setup and cleanup callbacks", () => {
    const code = tsx`
      window.addEventListener("resize", onResize);
      useEffect(() => {}, [window.addEventListener("scroll", onResize)]);
      useEffectOnce(() => window.addEventListener("focus", onResize));
    `;
    expect(collectFactSummaries(code)).toEqual([]);
  });

  it("collects custom effect hooks without resolving their semantics", () => {
    const code = tsx`useCustomEffect(() => window.addEventListener("resize", onResize), []);`;
    expect(collectFactSummaries(code).map(({ kind, phase }) => ({ kind, phase }))).toEqual([
      { kind: "addEventListener", phase: "setup" },
    ]);
  });

  it("captures the innermost enclosing function for later inference", () => {
    const code = tsx`
      useEffect(() => {
        const remove = () => window.removeEventListener("resize", onResize);
        window.addEventListener("resize", onResize);
        return () => remove();
      }, []);
    `;
    const facts = runCollector(
      code,
      () => {
        const collector = createFactCollector();
        return { api: collector.facts, visitor: collector.visitor };
      },
      (facts) => facts,
    );
    const removal = facts.calls.find((fact) => fact.kind === "removeEventListener");
    expect(removal?.enclosingFunction == null ? null : getTextOf(code, removal.enclosingFunction)).toBe(
      '() => window.removeEventListener("resize", onResize)',
    );
  });
});
