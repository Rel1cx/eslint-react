import { type TestRuleContext, findIdentifierReferences, getTextOf, runCollector, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";
import { describe, expect, it } from "vitest";
import { createFactCollector } from "./collect";
import { getSignalValueExpression, resolveEventListenerFacts } from "./origins";

function resolveFactSummaries(code: string) {
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
      return {
        cleanup: [...resolved.cleanupCalleeEntries.values()].map((callees) => ({
          functions: callees.functions.size,
          names: [...callees.names],
        })),
        entries: resolved.entries.map((entry) => ({
          capture: entry.capture,
          kind: entry.kind,
          signal: entry.signal == null ? null : getTextOf(code, entry.signal),
          text: getTextOf(code, entry.node),
        })),
      };
    },
  );
}

describe("resolveEventListenerFacts", () => {
  it("resolves listener arguments, capture options, and signals once", () => {
    const code = tsx`
      useEffect(() => {
        const ac = new AbortController();
        const options = { capture: true, signal: ac.signal };
        window.addEventListener("resize", onResize, options);
      }, []);
    `;
    expect(resolveFactSummaries(code).entries).toEqual([{
      capture: true,
      kind: "addEventListener",
      signal: "ac.signal",
      text: 'window.addEventListener("resize", onResize, options)',
    }]);
  });

  it("resolves bare and object-member cleanup callees", () => {
    const code = tsx`
      useEffect(() => {
        const handlers = { stop() {} };
        function teardown() {}
        return () => {
          teardown();
          handlers.stop();
          unknown();
        };
      }, []);
    `;
    expect(resolveFactSummaries(code).cleanup).toEqual([
      { functions: 2, names: ["unknown"] },
    ]);
  });

  it("skips React Native subscription calls while preserving DOM listener facts", () => {
    const code = tsx`
      import { BackHandler } from "react-native";
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
        window.addEventListener("resize", onResize);
      }, []);
    `;
    expect(resolveFactSummaries(code).entries.map((entry) => entry.kind)).toEqual(["addEventListener"]);
    expect(resolveFactSummaries(code).entries[0]?.text).toBe('window.addEventListener("resize", onResize)');
  });
});

describe("getSignalValueExpression", () => {
  it("should resolve an identifier bound to a member expression", () => {
    const code = "const signal = controller.signal; useSignal(signal);";
    const fact = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "signal").at(-1)!;
      return getSignalValueExpression({ context, node: ref });
    });
    expect(fact?.type).toBe(AST.MemberExpression);
  });

  it("should follow an alias chain to a member expression", () => {
    const code = "const s = controller.signal; const signal = s; useSignal(signal);";
    const fact = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "signal").at(-1)!;
      return getSignalValueExpression({ context, node: ref });
    });
    expect(fact?.type).toBe(AST.MemberExpression);
  });

  it("should return null instead of overflowing on a cyclic alias chain", () => {
    const code = "const a = b; const b = a; const signal = a; useSignal(signal);";
    const fact = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "signal").at(-1)!;
      return getSignalValueExpression({ context, node: ref });
    });
    expect(fact).toBeNull();
  });

  it("should return null instead of overflowing on a self-referential binding", () => {
    const code = "const a = a; useSignal(a);";
    const fact = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "a").at(-1)!;
      return getSignalValueExpression({ context, node: ref });
    });
    expect(fact).toBeNull();
  });

  it("should detect a cycle even when an alias is wrapped in a type assertion", () => {
    const code = "const a = b as any; const b = a; useSignal(a);";
    const fact = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "a").at(-1)!;
      return getSignalValueExpression({ context, node: ref });
    });
    expect(fact).toBeNull();
  });
});
