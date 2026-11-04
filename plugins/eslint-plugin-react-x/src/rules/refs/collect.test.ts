import { getTextOf, runCollector } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { type RefsFacts, createFactCollector } from "./collect";

function collectFacts(code: string) {
  return runCollector(
    code,
    () => {
      const collector = createFactCollector();
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts) => facts,
  );
}

function summarizeBindings(code: string, facts: RefsFacts) {
  return facts.bindings.map((binding) => {
    switch (binding.kind) {
      case "function":
        return { kind: binding.kind, name: binding.id.name, position: binding.position, value: getTextOf(code, binding.node) };
      case "identifier":
        return { kind: binding.kind, name: binding.id.name, position: binding.position, value: getTextOf(code, binding.value) };
      case "member":
        return {
          kind: binding.kind,
          name: binding.object.name,
          position: binding.position,
          property: binding.property,
          value: getTextOf(code, binding.value),
        };
    }
  });
}

function summarizeCalls(code: string, facts: RefsFacts) {
  return facts.callEdges.map((edge) => ({
    caller: getTextOf(code, edge.caller),
    text: getTextOf(code, edge.node),
  }));
}

function summarizePassSites(code: string, facts: RefsFacts) {
  return facts.passSites.map((site) => ({
    caller: getTextOf(code, site.caller),
    text: getTextOf(code, site.node),
  }));
}

function summarizeRefAccesses(code: string, facts: RefsFacts) {
  return facts.refAccesses.map((access) => ({
    enclosing: getTextOf(code, access.enclosingFunction),
    isInitializationWrite: access.isInitializationWrite,
    isWrite: access.isWrite,
    text: getTextOf(code, access.node),
  }));
}

describe("createFactCollector", () => {
  it("collects a variable declarator binding with its init value and position", () => {
    const code = "const ref = useRef(null);";
    expect(summarizeBindings(code, collectFacts(code))).toEqual([
      { kind: "identifier", name: "ref", position: code.indexOf("ref"), value: "useRef(null)" },
    ]);
  });

  it("collects an identifier assignment binding", () => {
    const code = "let value; value = 1;";
    expect(summarizeBindings(code, collectFacts(code))).toEqual([
      { kind: "identifier", name: "value", position: code.indexOf("value ="), value: "1" },
    ]);
  });

  it("collects a member assignment binding with its property name", () => {
    const code = "const helpers = {}; helpers.setup = () => {};";
    expect(summarizeBindings(code, collectFacts(code))).toEqual([
      { kind: "identifier", name: "helpers", position: code.indexOf("helpers ="), value: "{}" },
      { kind: "member", name: "helpers", position: code.indexOf("helpers.setup ="), property: "setup", value: "() => {}" },
    ]);
  });

  it("collects a function declaration binding at the synthetic position -1", () => {
    const code = "function setup() {}";
    expect(summarizeBindings(code, collectFacts(code))).toEqual([
      { kind: "function", name: "setup", position: -1, value: code },
    ]);
  });

  it("ignores compound assignments, uninitialized declarators, and destructured ids", () => {
    const code = "let a = 0; a += 1; a ??= 2; let b; const { c } = d;";
    expect(summarizeBindings(code, collectFacts(code))).toEqual([
      { kind: "identifier", name: "a", position: code.indexOf("a = 0"), value: "0" },
    ]);
  });

  it("ignores assignments to nested or computed member targets", () => {
    const code = "const a = {}; a.b.c = 1; a['b'] = 2;";
    expect(summarizeBindings(code, collectFacts(code))).toEqual([
      { kind: "identifier", name: "a", position: code.indexOf("a ="), value: "{}" },
    ]);
  });

  it("ignores anonymous function declarations", () => {
    expect(collectFacts("export default function () {}").bindings).toEqual([]);
  });

  it("attributes a call edge to its nearest enclosing function", () => {
    const code = "function C() { setTimeout(() => { foo(); }); }";
    expect(summarizeCalls(code, collectFacts(code))).toEqual([
      { caller: code, text: "setTimeout(() => { foo(); })" },
      { caller: "() => { foo(); }", text: "foo()" },
    ]);
  });

  it("does not collect call edges or pass sites without an enclosing function", () => {
    const facts = collectFacts("foo(); new Foo(); tag`x`;");
    expect(facts.callEdges).toEqual([]);
    expect(facts.passSites).toEqual([]);
  });

  it("collects calls, constructor calls, and tagged templates as pass sites but only calls as call edges", () => {
    const code = "function C() { foo(); new Foo(); tag`x`; }";
    const facts = collectFacts(code);
    expect(summarizeCalls(code, facts)).toEqual([{ caller: code, text: "foo()" }]);
    expect(summarizePassSites(code, facts)).toEqual([
      { caller: code, text: "foo()" },
      { caller: code, text: "new Foo()" },
      { caller: code, text: "tag`x`" },
    ]);
  });

  it("collects an identifier passed to a JSX ref attribute", () => {
    const code = "const C = () => <div ref={nodeRef} />;";
    const facts = collectFacts(code);
    expect(facts.jsxRefs.map((node) => getTextOf(code, node))).toEqual(["nodeRef"]);
  });

  it("collects a parenthesized identifier passed to a JSX ref attribute", () => {
    const code = "const C = () => <div ref={(nodeRef)} />;";
    const facts = collectFacts(code);
    expect(facts.jsxRefs.map((node) => getTextOf(code, node))).toEqual(["nodeRef"]);
  });

  it("ignores JSX ref attributes that are not plain identifiers", () => {
    const facts = collectFacts(
      'const C = () => <><div ref /><div ref="node" /><div ns:ref={r} /><div ref={obj.r} /><div ref={cond ? a : b} /><div ref={(node) => {}} /></>;',
    );
    expect(facts.jsxRefs).toEqual([]);
  });

  it("collects a .current read as neither a write nor an initialization write", () => {
    const code = "function C() { const value = ref.current; }";
    expect(summarizeRefAccesses(code, collectFacts(code))).toEqual([
      { enclosing: code, isInitializationWrite: false, isWrite: false, text: "ref.current" },
    ]);
  });

  it("collects a plain assignment to .current as an initialization write", () => {
    const code = "function C() { ref.current = value; }";
    expect(summarizeRefAccesses(code, collectFacts(code))).toEqual([
      { enclosing: code, isInitializationWrite: true, isWrite: true, text: "ref.current" },
    ]);
  });

  it("collects compound, update, and delete writes as non-initialization writes", () => {
    const code = "function C() { a.current += 1; b.current++; delete c.current; }";
    expect(summarizeRefAccesses(code, collectFacts(code))).toEqual([
      { enclosing: code, isInitializationWrite: false, isWrite: true, text: "a.current" },
      { enclosing: code, isInitializationWrite: false, isWrite: true, text: "b.current" },
      { enclosing: code, isInitializationWrite: false, isWrite: true, text: "c.current" },
    ]);
  });

  it("collects a nested member write rooted at .current as a non-initialization write", () => {
    const code = "function C() { ref.current.inner = value; const next = other.current.inner; }";
    expect(summarizeRefAccesses(code, collectFacts(code))).toEqual([
      { enclosing: code, isInitializationWrite: false, isWrite: true, text: "ref.current" },
      { enclosing: code, isInitializationWrite: false, isWrite: false, text: "other.current" },
    ]);
  });

  it("collects destructuring and for-of targets rooted at .current as writes", () => {
    const code = "function C() { ({ a: ref.current } = value); for (other.current of items) {} }";
    expect(summarizeRefAccesses(code, collectFacts(code))).toEqual([
      { enclosing: code, isInitializationWrite: false, isWrite: true, text: "ref.current" },
      { enclosing: code, isInitializationWrite: false, isWrite: true, text: "other.current" },
    ]);
  });

  it("does not collect a .current access outside any function", () => {
    expect(collectFacts("const value = ref.current;").refAccesses).toEqual([]);
  });

  it("attributes a .current access in a nested function to that function", () => {
    const code = "function C() { const read = () => ref.current; }";
    expect(summarizeRefAccesses(code, collectFacts(code))).toEqual([
      { enclosing: "() => ref.current", isInitializationWrite: false, isWrite: false, text: "ref.current" },
    ]);
  });

  it("classifies a write through a TypeScript-wrapped target", () => {
    const code = "function C() { (ref.current as any) = value; const v = (ref.current as any); }";
    expect(summarizeRefAccesses(code, collectFacts(code))).toEqual([
      { enclosing: code, isInitializationWrite: true, isWrite: true, text: "ref.current" },
      { enclosing: code, isInitializationWrite: false, isWrite: false, text: "ref.current" },
    ]);
  });
});
