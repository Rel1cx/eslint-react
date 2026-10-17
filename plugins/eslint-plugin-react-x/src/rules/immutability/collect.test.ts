import { getTextOf, runCollector } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { type ImmutabilityFacts, createFactCollector } from "./collect";

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

function summarizeMutations(code: string, facts: ImmutabilityFacts) {
  return facts.mutations.map((mutation) => ({
    kind: mutation.kind,
    root: mutation.root.name,
    target: getTextOf(code, mutation.target),
    text: getTextOf(code, mutation.node),
  }));
}

function summarizeSinks(code: string, facts: ImmutabilityFacts) {
  return facts.sinks.map((sink) => ({
    kind: sink.kind,
    text: getTextOf(code, sink.expression),
  }));
}

describe("createFactCollector", () => {
  describe("mutations", () => {
    it("should collect an identifier assignment as a binding mutation", () => {
      const code = "function f() { x = 1; }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "binding", root: "x", target: "x", text: "x = 1" },
      ]);
    });

    it("should collect a compound assignment as a binding mutation", () => {
      const code = "function f() { x += 1; }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "binding", root: "x", target: "x", text: "x += 1" },
      ]);
    });

    it("should collect a member assignment as a value mutation rooted at the base identifier", () => {
      const code = "function f() { a.b.c = 1; }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "value", root: "a", target: "a.b.c", text: "a.b.c = 1" },
      ]);
    });

    it("should collect every target of a destructuring assignment", () => {
      const code = "function f() { ({ a, b: c.d } = value); }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "binding", root: "a", target: "a", text: "{ a, b: c.d } = value" },
        { kind: "value", root: "c", target: "c.d", text: "{ a, b: c.d } = value" },
      ]);
    });

    it("should collect every target of an array-pattern assignment", () => {
      const code = "function f() { [x, y.z] = value; }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "binding", root: "x", target: "x", text: "[x, y.z] = value" },
        { kind: "value", root: "y", target: "y.z", text: "[x, y.z] = value" },
      ]);
    });

    it("should collect an update of an identifier as a binding mutation", () => {
      const code = "function f() { x++; }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "binding", root: "x", target: "x", text: "x++" },
      ]);
    });

    it("should collect an update of a member as a value mutation", () => {
      const code = "function f() { --a.b; }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "value", root: "a", target: "a.b", text: "--a.b" },
      ]);
    });

    it("should collect a delete of a member as a value mutation", () => {
      const code = "function f() { delete a.b; }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "value", root: "a", target: "a.b", text: "delete a.b" },
      ]);
    });

    it("should not collect a delete of a bare identifier", () => {
      const facts = collectFacts("function f() { delete a; }");
      expect(facts.mutations).toHaveLength(0);
    });

    it("should collect a for-of loop target without a declaration", () => {
      const code = "function f() { for (x of items) {} }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "binding", root: "x", target: "x", text: "for (x of items) {}" },
      ]);
    });

    it("should collect a for-in member loop target without a declaration", () => {
      const code = "function f() { for (a.b in items) {} }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "value", root: "a", target: "a.b", text: "for (a.b in items) {}" },
      ]);
    });

    it("should not collect loop targets declared by the loop", () => {
      const facts = collectFacts("function f() { for (const x of items) {} for (let k in items) {} }");
      expect(facts.mutations).toHaveLength(0);
    });

    it("should collect a known mutating method call as a value mutation of the receiver", () => {
      const code = "function f() { items.push(1); }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "value", root: "items", target: "items", text: "items.push(1)" },
      ]);
    });

    it("should collect an optional-chained mutating method call", () => {
      const code = "function f() { cache?.set('k', 'v'); }";
      const facts = collectFacts(code);
      expect(summarizeMutations(code, facts)).toEqual([
        { kind: "value", root: "cache", target: "cache", text: "cache?.set('k', 'v')" },
      ]);
    });

    it("should not collect calls of methods not known to mutate", () => {
      const facts = collectFacts("function f() { items.map(fn); cache.get('k'); }");
      expect(facts.mutations).toHaveLength(0);
    });

    it("should not collect a computed member call even when the key is a mutating method name", () => {
      const facts = collectFacts("function f() { cache['set']('k', 'v'); }");
      expect(facts.mutations).toHaveLength(0);
    });

    it("should not collect a mutating method call whose receiver has no root identifier", () => {
      const facts = collectFacts("function f() { getItems().push(1); }");
      expect(facts.mutations).toHaveLength(0);
    });

    it("should not collect plain function calls", () => {
      const facts = collectFacts("function f() { mutate(items); }");
      expect(facts.mutations).toHaveLength(0);
    });

    it("should not collect mutations outside any function", () => {
      const facts = collectFacts("x = 1; a.b = 2; items.push(3);");
      expect(facts.mutations).toHaveLength(0);
    });

    it("should record the innermost enclosing function of each mutation", () => {
      const code = "function outer() { const g = () => { x = 1; }; }";
      const facts = collectFacts(code);
      expect(facts.mutations).toHaveLength(1);
      expect(getTextOf(code, facts.mutations[0]!.enclosingFunction)).toBe("() => { x = 1; }");
    });
  });

  describe("sinks", () => {
    it("should collect every non-spread argument of a hook call", () => {
      const code = "function f() { useFoo(a, b); }";
      const facts = collectFacts(code);
      expect(summarizeSinks(code, facts)).toEqual([
        { kind: "hook-argument", text: "a" },
        { kind: "hook-argument", text: "b" },
      ]);
    });

    it("should collect the arguments of a namespace hook call", () => {
      const code = "function f() { React.useEffect(fn, []); }";
      const facts = collectFacts(code);
      expect(summarizeSinks(code, facts)).toEqual([
        { kind: "hook-argument", text: "fn" },
        { kind: "hook-argument", text: "[]" },
      ]);
    });

    it("should not collect spread arguments of a hook call", () => {
      const facts = collectFacts("function f() { useFoo(...fns); }");
      expect(facts.sinks).toHaveLength(0);
    });

    it("should not collect the arguments of a non-hook call", () => {
      const facts = collectFacts("function f() { foo(fn); useful(fn); }");
      expect(facts.sinks).toHaveLength(0);
    });

    it("should collect a JSX attribute expression as a jsx-prop sink", () => {
      const code = "const el = <Foo fn={handler} count={1} />;";
      const facts = collectFacts(code);
      expect(summarizeSinks(code, facts)).toEqual([
        { kind: "jsx-prop", text: "handler" },
        { kind: "jsx-prop", text: "1" },
      ]);
    });

    it("should not collect string-valued or valueless JSX attributes", () => {
      const facts = collectFacts('const el = <Foo label="x" disabled />;');
      expect(facts.sinks).toHaveLength(0);
    });

    it("should not collect JSX children expressions", () => {
      const facts = collectFacts("const el = <Foo>{fn}</Foo>;");
      expect(facts.sinks).toHaveLength(0);
    });

    it("should collect sinks at the top level where no function encloses them", () => {
      const code = "useFoo(fn);";
      const facts = collectFacts(code);
      expect(summarizeSinks(code, facts)).toEqual([
        { kind: "hook-argument", text: "fn" },
      ]);
    });
  });
});
