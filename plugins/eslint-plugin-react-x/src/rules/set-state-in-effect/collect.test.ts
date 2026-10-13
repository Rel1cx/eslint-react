import { toRegExp } from "@eslint-react/shared";
import { runCollector } from "@local/testkit";
import type { TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { type SetStateInEffectFacts, createFactCollector } from "./collect";

const NO_ADDITIONAL_HOOKS = { test: () => false };

function collectFacts(
  code: string,
  additionalStateHooks: { test: (s: string) => boolean } = NO_ADDITIONAL_HOOKS,
  additionalEffectHooks: { test: (s: string) => boolean } = NO_ADDITIONAL_HOOKS,
) {
  return runCollector(
    code,
    () => {
      const collector = createFactCollector(additionalStateHooks, additionalEffectHooks);
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts) => facts,
  );
}

function summarizeCalls(code: string, facts: SetStateInEffectFacts) {
  return facts.calls.map((call) => ({
    kind: call.enclosingFunctionKind,
    setup: call.setupFunction != null,
    text: code.slice(call.node.range[0], call.node.range[1]),
  }));
}

function identifierNames(identifiers: readonly TSESTree.Identifier[]) {
  return identifiers.map((id) => id.name);
}

describe("createFactCollector", () => {
  describe("calls", () => {
    it("should collect a call in the effect setup with its phase context", () => {
      const code = "useEffect(() => { foo(); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "foo()" },
      ]);
      expect(facts.calls[0]?.setupFunction).toBe(facts.calls[0]?.enclosingFunction);
    });

    it("should not collect the state and effect hook calls themselves", () => {
      const code = "function C() { const [s, setS] = useState(0); useEffect(() => { setS(1); }, []); }";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "setS(1)" },
      ]);
    });

    it("should classify calls in a then callback as deferred while keeping the setup attribution", () => {
      const code = "useEffect(() => { promise.then(() => { foo(); }); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "promise.then(() => { foo(); })" },
        { kind: "deferred", setup: true, text: "foo()" },
      ]);
    });

    it("should not collect calls inside an async setup function", () => {
      const code = "useEffect(async () => { foo(); }, []);";
      const facts = collectFacts(code);
      expect(facts.calls).toHaveLength(0);
    });

    it("should classify calls in an IIFE inside the setup as immediate", () => {
      const code = "useEffect(() => { (() => { foo(); })(); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "(() => { foo(); })()" },
        { kind: "immediate", setup: true, text: "foo()" },
      ]);
    });

    it("should classify calls in a cleanup callback as other", () => {
      const code = "useEffect(() => { return () => { foo(); }; }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "other", setup: true, text: "foo()" },
      ]);
    });

    it("should classify calls outside any effect as other without a setup function", () => {
      const code = "function f() { foo(); }";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "other", setup: false, text: "foo()" },
      ]);
    });

    it("should classify the callback of an additional effect hook as setup", () => {
      const code = "useMyEffect(() => { foo(); });";
      const facts = collectFacts(code, NO_ADDITIONAL_HOOKS, toRegExp("useMyEffect"));
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "foo()" },
      ]);
    });

    it("should classify a hook configured as both state and effect hook as a state hook first", () => {
      const code = "useWeird(setup, []);";
      const facts = collectFacts(code, toRegExp("useWeird"), toRegExp("useWeird"));
      expect(facts.calls).toHaveLength(0);
      expect(facts.setupIdentifiers).toHaveLength(0);
    });

    it("should classify the callback of a namespace effect call as setup", () => {
      const code = "React.useEffect(() => { foo(); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "foo()" },
      ]);
    });

    it("should classify the callbacks of other built-in effect hooks as setup", () => {
      const code = "useLayoutEffect(() => { foo(); }, []); useInsertionEffect(() => { bar(); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "foo()" },
        { kind: "setup", setup: true, text: "bar()" },
      ]);
    });

    it("should attribute calls in a nested effect setup to the inner setup function", () => {
      const code = "useEffect(() => { useEffect(() => { foo(); }, []); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "foo()" },
      ]);
      const setupFunction = facts.calls[0]?.setupFunction;
      expect(setupFunction == null ? null : code.slice(setupFunction.range[0], setupFunction.range[1])).toBe("() => { foo(); }");
    });

    it("should not collect calls inside an async function declared in the setup", () => {
      const code = "useEffect(() => { async function load() { foo(); } load(); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "load()" },
      ]);
    });

    it("should not collect calls inside an async arrow assigned in the setup", () => {
      const code = "useEffect(() => { const load = async () => { foo(); }; load(); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "load()" },
      ]);
    });

    it("should classify calls in a function-expression IIFE as immediate", () => {
      const code = "useEffect(() => { (function () { foo(); })(); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "(function () { foo(); })()" },
        { kind: "immediate", setup: true, text: "foo()" },
      ]);
    });

    it("should classify calls in an IIFE outside any effect as immediate without a setup function", () => {
      const code = "(() => { foo(); })();";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "immediate", setup: false, text: "foo()" },
      ]);
    });

    it("should keep the setup attribution for calls in a plain function declared inside the setup", () => {
      const code = "useEffect(() => { function helper() { foo(); } helper(); }, []);";
      const facts = collectFacts(code);
      // The body of the hoisted function declaration is visited before the
      // call statement that follows it
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "other", setup: true, text: "foo()" },
        { kind: "setup", setup: true, text: "helper()" },
      ]);
    });

    it("should classify calls in a timer callback as other while keeping the setup attribution", () => {
      const code = "useEffect(() => { setTimeout(() => { foo(); }); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "setTimeout(() => { foo(); })" },
        { kind: "other", setup: true, text: "foo()" },
      ]);
    });

    it("should collect calls from both branches of a conditional expression in the setup", () => {
      const code = "useEffect(() => { cond ? foo() : bar(); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "foo()" },
        { kind: "setup", setup: true, text: "bar()" },
      ]);
    });

    it("should collect calls in a loop body in the setup", () => {
      const code = "useEffect(() => { for (const item of items) { foo(item); } }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "foo(item)" },
      ]);
    });

    it("should collect an optional call in the setup", () => {
      const code = "useEffect(() => { helper?.(); }, []);";
      const facts = collectFacts(code);
      expect(summarizeCalls(code, facts)).toEqual([
        { kind: "setup", setup: true, text: "helper?.()" },
      ]);
    });

    it("should not collect calls at the top level where no function encloses them", () => {
      const code = "foo(); useEffect(setup, []);";
      const facts = collectFacts(code);
      expect(facts.calls).toHaveLength(0);
      expect(facts.setupIdentifiers).toHaveLength(0);
    });
  });

  describe("setupIdentifiers", () => {
    it("should collect the identifiers of an effect whose setup is referenced rather than inlined", () => {
      const facts = collectFacts("function f() { useEffect(setup, []); }");
      expect(identifierNames(facts.setupIdentifiers)).toEqual(["setup"]);
    });

    it("should not collect identifiers for an inline setup function", () => {
      const facts = collectFacts("useEffect(() => { foo(); }, []);");
      expect(facts.setupIdentifiers).toHaveLength(0);
    });

    it("should collect the identifiers of a useLayoutEffect whose setup is referenced", () => {
      const facts = collectFacts("function f() { useLayoutEffect(setup, []); }");
      expect(identifierNames(facts.setupIdentifiers)).toEqual(["setup"]);
    });

    it("should collect the identifiers of a parenthesized setup reference", () => {
      const facts = collectFacts("function f() { useEffect((setup), []); }");
      expect(identifierNames(facts.setupIdentifiers)).toEqual(["setup"]);
    });

    it("should collect the root identifier of a member-expression setup", () => {
      const facts = collectFacts("function f() { useEffect(obj.setup, []); }");
      expect(identifierNames(facts.setupIdentifiers)).toEqual(["obj"]);
    });

    it("should collect the identifiers of a conditional setup reference", () => {
      const facts = collectFacts("function f() { useEffect(cond ? setupA : setupB, []); }");
      expect(identifierNames(facts.setupIdentifiers)).toEqual(["cond", "setupA", "setupB"]);
    });

    it("should collect the identifiers for an additional effect hook whose setup is referenced", () => {
      const facts = collectFacts("function f() { useMyEffect(setup, []); }", NO_ADDITIONAL_HOOKS, toRegExp("useMyEffect"));
      expect(identifierNames(facts.setupIdentifiers)).toEqual(["setup"]);
    });

    it("should not collect the identifiers of a top-level effect whose setup is referenced", () => {
      const facts = collectFacts("useEffect(setup, []);");
      expect(facts.setupIdentifiers).toHaveLength(0);
    });

    it("should not collect the identifiers of the deps array", () => {
      const facts = collectFacts("function f() { useEffect(setup, [helper, dep.prop]); }");
      expect(identifierNames(facts.setupIdentifiers)).toEqual(["setup"]);
    });
  });

  describe("setStateReferences", () => {
    it("should collect an identifier used as an arrow body as a callback-body reference", () => {
      const facts = collectFacts("useMemo(() => setState, []);");
      expect(facts.setStateReferences).toHaveLength(1);
      expect(facts.setStateReferences[0]?.kind).toBe("callback-body");
      expect(facts.setStateReferences[0]?.node.name).toBe("setState");
    });

    it("should not collect the parameters of an arrow function as callback-body references", () => {
      const facts = collectFacts("useMemo((setState) => 0, []);");
      expect(facts.setStateReferences).toHaveLength(0);
    });

    it("should collect an identifier passed as the first call argument as a call-argument reference", () => {
      const facts = collectFacts("useCallback(setState, []);");
      expect(facts.setStateReferences).toHaveLength(1);
      expect(facts.setStateReferences[0]?.kind).toBe("call-argument");
      expect(facts.setStateReferences[0]?.node.name).toBe("setState");
    });

    it("should not collect the callee identifier of a call as a reference", () => {
      const facts = collectFacts("setState(1);");
      expect(facts.setStateReferences).toHaveLength(0);
    });

    it("should collect only the first argument of a call as a call-argument reference", () => {
      const facts = collectFacts("foo(a, setState);");
      expect(identifierNames(facts.setStateReferences.map((r) => r.node))).toEqual(["a"]);
    });

    it("should collect a setter passed directly to the effect as a call-argument reference", () => {
      const facts = collectFacts("function f() { useEffect(setState); }");
      expect(facts.setStateReferences).toHaveLength(1);
      expect(facts.setStateReferences[0]?.kind).toBe("call-argument");
      expect(facts.setStateReferences[0]?.node.name).toBe("setState");
    });

    it("should collect a setter referenced as the body of a nested arrow", () => {
      const facts = collectFacts("useMemo(() => () => setState, []);");
      expect(facts.setStateReferences).toHaveLength(1);
      expect(facts.setStateReferences[0]?.kind).toBe("callback-body");
      expect(facts.setStateReferences[0]?.node.name).toBe("setState");
    });

    it("should not collect a setter returned from a block-bodied callback", () => {
      const facts = collectFacts("useMemo(() => { return setState; }, []);");
      expect(facts.setStateReferences).toHaveLength(0);
    });

    it("should not collect a setter referenced in a conditional expression", () => {
      const facts = collectFacts("function f() { useEffect(cond ? setState : noop, []); }");
      expect(facts.setStateReferences).toHaveLength(0);
    });

    it("should not collect a setter assigned to a local variable", () => {
      const facts = collectFacts("function f() { useEffect(() => { const s = setState; }, []); }");
      expect(facts.setStateReferences).toHaveLength(0);
    });
  });
});
