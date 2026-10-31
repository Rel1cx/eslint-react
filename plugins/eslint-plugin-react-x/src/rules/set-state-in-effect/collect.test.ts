import { toRegExp } from "@eslint-react/shared";
import { runCollector } from "@local/testkit";
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
    enclosing: code.slice(call.enclosingFunction.range[0], call.enclosingFunction.range[1]),
    text: code.slice(call.node.range[0], call.node.range[1]),
  }));
}

function summarizeRoots(code: string, facts: SetStateInEffectFacts) {
  return facts.effectRoots.map((root) => ({
    effect: code.slice(root.node.range[0], root.node.range[1]),
    setup: code.slice(root.setup.range[0], root.setup.range[1]),
  }));
}

describe("createFactCollector", () => {
  it("collects calls with their direct enclosing function", () => {
    const code = "useEffect(() => { foo(); }, []);";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      { enclosing: "() => { foo(); }", text: "foo()" },
    ]);
  });

  it("does not collect state and effect hook calls as ordinary calls", () => {
    const code = "function C() { const [s, setS] = useState(0); useEffect(() => { setS(1); }, []); }";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      { enclosing: "() => { setS(1); }", text: "setS(1)" },
    ]);
    expect(facts.effectRoots).toHaveLength(1);
  });

  it("collects async calls as raw facts without assigning a phase", () => {
    const code = "useEffect(async () => { foo(); }, []);";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      { enclosing: "async () => { foo(); }", text: "foo()" },
    ]);
  });

  it("attributes nested callbacks to their own function", () => {
    const code = "useEffect(() => { setTimeout(() => { foo(); }); }, []);";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      { enclosing: "() => { setTimeout(() => { foo(); }); }", text: "setTimeout(() => { foo(); })" },
      { enclosing: "() => { foo(); }", text: "foo()" },
    ]);
  });

  it("collects an additional effect root even without Effect in its name", () => {
    const code = "function C() { useCustom(() => { foo(); }); }";
    const facts = collectFacts(code, NO_ADDITIONAL_HOOKS, toRegExp("useCustom"));
    expect(summarizeRoots(code, facts)).toEqual([
      { effect: "useCustom(() => { foo(); })", setup: "() => { foo(); }" },
    ]);
  });

  it("classifies a hook configured as both state and effect as state first", () => {
    const facts = collectFacts("function C() { useWeird(setup, []); }", toRegExp("useWeird"), toRegExp("useWeird"));
    expect(facts.calls).toHaveLength(0);
    expect(facts.effectRoots).toHaveLength(0);
  });

  it("collects namespace and built-in effect roots", () => {
    const code = "React.useEffect(setup, []); useLayoutEffect(setup, []); useInsertionEffect(setup, []);";
    const facts = collectFacts(code);
    expect(facts.effectRoots).toHaveLength(3);
  });

  it("collects nested effects as independent roots", () => {
    const code = "useEffect(() => { useEffect(() => { foo(); }, []); bar(); }, []);";
    const facts = collectFacts(code);
    expect(facts.effectRoots).toHaveLength(2);
    expect(summarizeCalls(code, facts)).toEqual([
      { enclosing: "() => { foo(); }", text: "foo()" },
      { enclosing: "() => { useEffect(() => { foo(); }, []); bar(); }", text: "bar()" },
    ]);
  });

  it("preserves a TS-wrapped setup expression for later resolution", () => {
    const code = "useEffect((() => { foo(); }) as any, []);";
    const facts = collectFacts(code);
    expect(summarizeRoots(code, facts)).toEqual([
      { effect: code.slice(0, -1), setup: "(() => { foo(); }) as any" },
    ]);
  });

  it("collects only the setup argument rather than the deps array", () => {
    const code = "useEffect(setup, [helper, dep.prop]);";
    const facts = collectFacts(code);
    expect(summarizeRoots(code, facts)).toEqual([
      { effect: code.slice(0, -1), setup: "setup" },
    ]);
  });

  it("collects a top-level effect root but not a top-level ordinary call", () => {
    const code = "foo(); useEffect(setup, []);";
    const facts = collectFacts(code);
    expect(facts.calls).toHaveLength(0);
    expect(facts.effectRoots).toHaveLength(1);
  });

  it("does not add a root when the effect has no setup argument", () => {
    const facts = collectFacts("useEffect();");
    expect(facts.effectRoots).toHaveLength(0);
  });

  it("collects JSX ref expressions but not other attributes", () => {
    const code = "const C = () => <div ref={setNode} callback={setOther} />;";
    const facts = collectFacts(code);
    expect(facts.jsxRefExprs.map((node) => code.slice(node.range[0], node.range[1]))).toEqual(["setNode"]);
  });

  it("continues collecting nested calls inside state and effect hook arguments", () => {
    const code = "function C() { const [s, setS] = useState(initial()); useEffect(setup(), [dep()]); }";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      { enclosing: "function C() { const [s, setS] = useState(initial()); useEffect(setup(), [dep()]); }", text: "initial()" },
      { enclosing: "function C() { const [s, setS] = useState(initial()); useEffect(setup(), [dep()]); }", text: "setup()" },
      { enclosing: "function C() { const [s, setS] = useState(initial()); useEffect(setup(), [dep()]); }", text: "dep()" },
    ]);
    expect(summarizeRoots(code, facts)).toEqual([
      { effect: "useEffect(setup(), [dep()])", setup: "setup()" },
    ]);
  });

  it("restores the outer enclosing function after leaving a nested function", () => {
    const code = "function C() { useEffect(() => { (() => { inner(); })(); outer(); }, []); }";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([
      { enclosing: "() => { (() => { inner(); })(); outer(); }", text: "(() => { inner(); })()" },
      { enclosing: "() => { inner(); }", text: "inner()" },
      { enclosing: "() => { (() => { inner(); })(); outer(); }", text: "outer()" },
    ]);
  });

  it("ignores JSX ref attributes without an expression container", () => {
    const facts = collectFacts('const C = () => <><div ref /><div ref="node" /><div data-ref={setNode} /></>;');
    expect(facts.jsxRefExprs).toEqual([]);
  });
});
