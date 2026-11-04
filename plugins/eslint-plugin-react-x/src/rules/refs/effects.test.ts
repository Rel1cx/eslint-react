import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { merge } from "@eslint-react/eslint";
import { type TestRuleContext, getTextOf, runCollector } from "@local/testkit";
import tsx from "dedent";
import { describe, expect, it } from "vitest";

import { createFactCollector } from "./collect";
import { collectReachableFunctions, inferCallGraph, inferRefPassViolations, inferRefViolations } from "./effects";
import { createBindingResolver } from "./origins";

function inferViolationSummaries(code: string) {
  let context: TestRuleContext | null = null;
  return runCollector(
    code,
    (ctx) => {
      context = ctx;
      const hooks = core.getHookCollector(ctx);
      const comps = core.getFunctionComponentCollector(ctx);
      const collector = createFactCollector();
      return {
        api: { comps: comps.api, facts: collector.facts, hooks: hooks.api },
        visitor: merge(hooks.visitor, comps.visitor, collector.visitor),
      };
    },
    ({ comps, facts, hooks }, program) => {
      if (context == null) throw new Error("The rule context was not captured");
      const boundaries = new Set<TSESTreeFunction>([
        ...comps.getAllComponents(program).map((component) => component.node),
        ...hooks.getAllHooks(program).map((hook) => hook.node),
      ]);
      const resolver = createBindingResolver(context, facts);
      const callGraph = inferCallGraph(boundaries, facts.callEdges, resolver.resolveCallable);
      const reachability = collectReachableFunctions(boundaries, callGraph);
      return [
        ...inferRefViolations(facts.refAccesses, boundaries, reachability, resolver),
        ...inferRefPassViolations(facts.passSites, boundaries, reachability, resolver),
      ].map((violation) => ({ kind: violation.kind, text: getTextOf(code, violation.node) }));
    },
  );
}

describe("inferRefViolations", () => {
  it("should report a read of ref.current directly in the component body", () => {
    const code = "function C() { const ref = useRef(0); const value = ref.current; return <div>{value}</div>; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should report a write of ref.current directly in the component body", () => {
    const code = "function C({ value }) { const ref = useRef(null); ref.current = value; return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "write", text: "ref.current" }]);
  });

  it("should report a nested member write rooted at ref.current", () => {
    const code = "function C({ value }) { const ref = useRef(null); ref.current.inner = value; return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "write", text: "ref.current" }]);
  });

  it("should report a read of ref.current in a custom hook", () => {
    const code = "function useThing() { const ref = useRef(0); return ref.current; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should not report accesses outside any component or hook boundary", () => {
    const code = "function helper(boxRef) { return boxRef.current; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should not report a read inside an effect callback", () => {
    const code = "function C() { const ref = useRef(0); useEffect(() => { const v = ref.current; }, []); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should not report a read inside an event handler that is never invoked during render", () => {
    const code = tsx`
      function C() {
        const ref = useRef(0);
        const onClick = () => {
          sink(ref.current);
        };
        return <button onClick={onClick} />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should report a read inside an IIFE invoked during render", () => {
    const code = "function C() { const ref = useRef(0); (() => { sink(ref.current); })(); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should report a read inside a local helper invoked during render", () => {
    const code = "function C() { const ref = useRef(0); const read = () => ref.current; const v = read(); return <div>{v}</div>; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should not report a read inside a helper that is never invoked", () => {
    const code = "function C() { const ref = useRef(0); const read = () => ref.current; return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should report a read inside a helper invoked through an alias", () => {
    const code = "function C() { const ref = useRef(0); const read = () => ref.current; const alias = read; const v = alias(); return <div>{v}</div>; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should report a read reached through two levels of local helpers", () => {
    const code = tsx`
      function C() {
        const ref = useRef(0);
        const inner = () => ref.current;
        const outer = () => inner();
        const value = outer();
        return <div>{value}</div>;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should report a read inside a useMemo factory", () => {
    const code = "function C() { const ref = useRef(0); const v = useMemo(() => ref.current, []); return <div>{v}</div>; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should report a read inside a useState initializer", () => {
    const code = "function C() { const ref = useRef(0); const [s] = useState(() => ref.current); return <div>{s}</div>; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should report a read inside a useReducer init function", () => {
    const code = tsx`
      function C() {
        const ref = useRef(0);
        const [state, dispatch] = useReducer(reducer, 0, (initial) => {
          sink(ref.current);
          return initial;
        });
        return <div>{state}</div>;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should report a read inside a synchronous array method callback", () => {
    const code = "function C() { const ref = useRef(0); const out = items.map((item) => ref.current); return <div>{out}</div>; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should not report reads inside deferred callbacks", () => {
    const code = tsx`
      function C() {
        const ref = useRef(0);
        setTimeout(() => {
          sink(ref.current);
        });
        promise.then(() => {
          sink(ref.current);
        });
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should not report a read in a helper invoked only inside an effect", () => {
    const code = tsx`
      function C() {
        const ref = useRef(0);
        const read = () => ref.current;
        useEffect(() => {
          read();
        }, []);
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should not report a read in a module-scope helper that has no boundary of its own", () => {
    const code = tsx`
      function helper(boxRef) {
        sink(boxRef.current);
      }
      function C() {
        const ref = useRef(null);
        helper(ref);
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([{ kind: "pass", text: "ref" }]);
  });

  it("should allow a single guard-initialized write per ref", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        if (ref.current == null) {
          ref.current = compute();
        }
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should report a second guard-initialized write of the same ref in one boundary", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        if (ref.current == null) {
          ref.current = 1;
        }
        if (ref.current == null) {
          ref.current = 2;
        }
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([{ kind: "duplicate-init", text: "ref.current" }]);
  });

  it("should track guard-initialized refs per boundary", () => {
    const code = tsx`
      function A() {
        const ref = sharedRef;
        if (ref.current == null) {
          ref.current = 1;
        }
        return <div />;
      }
      function B() {
        const ref = sharedRef;
        if (ref.current == null) {
          ref.current = 2;
        }
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should not report a read in the non-null branch of a null guard", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        if (ref.current === null) {
          ref.current = 1;
        } else {
          sink(ref.current);
        }
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should report a write in the non-null branch of a null guard", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        if (ref.current === null) {
          sink(0);
        } else {
          ref.current = 2;
        }
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([{ kind: "write", text: "ref.current" }]);
  });

  it("should report a read in the null branch of a null guard", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        if (ref.current === null) {
          sink(ref.current);
        }
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should report a non-initialization write in the null branch of a null guard", () => {
    const code = tsx`
      function C() {
        const ref = useRef(0);
        if (ref.current === null) {
          ref.current += 1;
        }
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([{ kind: "write", text: "ref.current" }]);
  });

  it("should allow an initialization write after a terminating non-null guard", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        if (ref.current !== null) return;
        ref.current = compute();
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should report a read after a terminating non-null guard", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        if (ref.current !== null) return;
        sink(ref.current);
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "ref.current" }]);
  });

  it("should not treat a truthiness check as a lazy-initialization guard", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        if (!ref.current) {
          ref.current = 1;
        }
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([
      { kind: "read", text: "ref.current" },
      { kind: "write", text: "ref.current" },
    ]);
  });

  it("should report a read of a ref-like-named member root", () => {
    const code = "function C(props) { sink(props.boxRef.current); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "read", text: "props.boxRef.current" }]);
  });

  it("should not report an access on a shadowed variable that is not a ref", () => {
    const code = tsx`
      function C() {
        const value = useRef(null);
        const read = (value) => value.current;
        read(0);
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });
});

describe("inferRefPassViolations", () => {
  it("should report a ref passed to a plain function during render", () => {
    const code = "function C() { const ref = useRef(null); foo(ref); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "pass", text: "ref" }]);
  });

  it("should not report a ref passed to a hook call", () => {
    const code = "function C() { const ref = useRef(null); useSomeHook(ref); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should not report a ref passed to mergeRefs", () => {
    const code = "function C() { const ref = useRef(null); mergeRefs(ref); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should not report a ref passed to an alias of an imported mergeRefs", () => {
    const code = tsx`
      import { mergeRefs } from "./merge-refs";
      function C() {
        const ref = useRef(null);
        const combine = mergeRefs;
        combine(ref);
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should not report a ref passed to a member render function", () => {
    const code = "function C() { const ref = useRef(null); obj.render(ref); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should report a ref passed to a bare identifier named render", () => {
    const code = "function C() { const ref = useRef(null); render(ref); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "pass", text: "ref" }]);
  });

  it("should report a ref passed to a constructor call", () => {
    const code = "function C() { const ref = useRef(null); new Foo(ref); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "pass", text: "ref" }]);
  });

  it("should report a ref interpolated into a tagged template", () => {
    const code = "function C() { const ref = useRef(null); tag`${ref}`; return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "pass", text: "ref" }]);
  });

  it("should not report a ref passed inside an effect callback", () => {
    const code = "function C() { const ref = useRef(null); useEffect(() => { foo(ref); }, []); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("should report a ref passed inside a synchronously invoked array callback", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        items.map((item) => {
          foo(ref);
          return item;
        });
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([{ kind: "pass", text: "ref" }]);
  });

  it("should report an alias of a ref passed to a plain function", () => {
    const code = "function C() { const a = useRef(null); const b = a; foo(b); return <div />; }";
    expect(inferViolationSummaries(code)).toEqual([{ kind: "pass", text: "b" }]);
  });

  it("should not report spread, plain, or unresolvable arguments", () => {
    const code = tsx`
      function C() {
        const ref = useRef(null);
        const [node] = useState(null);
        foo(...[ref]);
        foo(node);
        foo(mystery);
        return <div />;
      }
    `;
    expect(inferViolationSummaries(code)).toEqual([]);
  });
});
