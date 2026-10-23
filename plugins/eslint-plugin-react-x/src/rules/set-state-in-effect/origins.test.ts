import { getText } from "@eslint-react/eslint";
import { type TestRuleContext, collectNodes, findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";
import { createSetStateResolver, isArgumentUsingRefValue, isInitializedFromRef, isRefGatedContext } from "./origins";

function findCall(context: TestRuleContext, program: TSESTree.Program, textPrefix: string) {
  const call = collectNodes<TSESTree.CallExpression>(program, AST.CallExpression).find((node) => getText(context, node).startsWith(textPrefix));
  if (call == null) throw new Error(`No call starting with "${textPrefix}" found`);
  return call;
}

function findReference(program: TSESTree.Program, name: string, index = 0) {
  const refs = findIdentifierReferences(program, name);
  const ref = refs.at(index) ?? refs.at(-1);
  if (ref == null) throw new Error(`No reference to "${name}" found`);
  return ref;
}

describe("createSetStateResolver", () => {
  describe("isSetStateId", () => {
    it("should match the element at index 1 of an array-destructured useState tuple", () => {
      const code = "const [data, setData] = useState(); setData; data;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return [
          resolver.isSetStateId(findReference(program, "setData"), 1),
          resolver.isSetStateId(findReference(program, "data"), 1),
        ];
      });
      expect(fact).toEqual([true, false]);
    });

    it("should match the binding at numeric key 1 of an object-destructured useState tuple", () => {
      const code = "const { 1: setData } = useState(); setData;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateId(findReference(program, "setData"), 1);
      });
      expect(fact).toBe(true);
    });

    it("should not match the binding at numeric key 0 of an object-destructured useState tuple", () => {
      const code = "const { 0: data } = useState(); data;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateId(findReference(program, "data"), 1);
      });
      expect(fact).toBe(false);
    });

    it("should match a whole-tuple binding so member access like data[1] can be resolved", () => {
      const code = "const data = useState(); data;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateId(findReference(program, "data"), 1);
      });
      expect(fact).toBe(true);
    });

    it("should not match a binding initialized by a non-state hook", () => {
      const code = "const [, setData] = useFoo(); setData;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateId(findReference(program, "setData"), 1);
      });
      expect(fact).toBe(false);
    });

    it("should not match an unresolvable identifier", () => {
      const code = "setData;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateId(findReference(program, "setData"), 1);
      });
      expect(fact).toBe(false);
    });

    it("should match the setter of a tuple destructured with a hole", () => {
      const code = "const [, setData] = useState(); setData;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateId(findReference(program, "setData"), 1);
      });
      expect(fact).toBe(true);
    });

    it("should match both bindings of an object-destructured tuple by their numeric keys", () => {
      const code = "const { 0: data, 1: setData } = useState(); data; setData;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return [
          resolver.isSetStateId(findReference(program, "data"), 1),
          resolver.isSetStateId(findReference(program, "setData"), 1),
        ];
      });
      expect(fact).toEqual([false, true]);
    });

    it("should match a setter destructured from a namespace state hook call", () => {
      const code = "const [, setData] = React.useState(); setData;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateId(findReference(program, "setData"), 1);
      });
      expect(fact).toBe(true);
    });

    it("should not match a setter reached through an alias variable", () => {
      const code = "const [data, setData] = useState(); const alias = setData; alias;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateId(findReference(program, "alias"), 1);
      });
      expect(fact).toBe(false);
    });

    it("should not match a binding initialized by a non-call expression", () => {
      const code = "const setData = foo; setData;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateId(findReference(program, "setData"), 1);
      });
      expect(fact).toBe(false);
    });
  });

  describe("isSetStateCall", () => {
    it("should match a direct call of the destructured setter", () => {
      const code = "const [data, setData] = useState(); setData(1);";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "setData"));
      });
      expect(fact).toBe(true);
    });

    it("should match member access at index 1 on a whole-tuple binding", () => {
      const code = "const data = useState(); data[1]();";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "data[1]"));
      });
      expect(fact).toBe(true);
    });

    it("should not match member access at index 0 on a whole-tuple binding", () => {
      const code = "const data = useState(); data[0]();";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "data[0]"));
      });
      expect(fact).toBe(false);
    });

    it("should match an at(1) call on a whole-tuple binding", () => {
      const code = "const data = useState(); data.at(1)();";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "data.at(1)("));
      });
      expect(fact).toBe(true);
    });

    it("should not match an at(0) call on a whole-tuple binding", () => {
      const code = "const data = useState(); data.at(0)();";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "data.at(0)("));
      });
      expect(fact).toBe(false);
    });

    it("should not match an at() call without arguments", () => {
      const code = "const data = useState(); data.at()();";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "data.at()("));
      });
      expect(fact).toBe(false);
    });

    it("should not match a call of an unrelated function", () => {
      const code = "function foo() {} foo();";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "foo"));
      });
      expect(fact).toBe(false);
    });

    it("should match an optional call of the destructured setter", () => {
      const code = "const [data, setData] = useState(); setData?.(1);";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "setData"));
      });
      expect(fact).toBe(true);
    });

    it("should match an optional call of a member access at index 1", () => {
      const code = "const data = useState(); data[1]?.();";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "data[1]"));
      });
      expect(fact).toBe(true);
    });

    it("should not match an at(-1) call on a whole-tuple binding", () => {
      const code = "const data = useState(); data.at(-1)();";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "data.at(-1)("));
      });
      expect(fact).toBe(false);
    });

    it("should match an at() call whose index is a statically known variable", () => {
      const code = "const index = 1; const data = useState(); data.at(index)();";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "data.at(index)("));
      });
      expect(fact).toBe(true);
    });

    it("should not match an at() call whose index is not statically known", () => {
      const code = "function f(index) { const data = useState(); data.at(index)(); }";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, "data.at(index)("));
      });
      expect(fact).toBe(false);
    });

    it("should not match a computed string-literal member access", () => {
      const code = 'const data = useState(); data["1"]();';
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, 'data["1"]'));
      });
      expect(fact).toBe(false);
    });
  });

  describe("resolveValues", () => {
    it("should resolve a setter through a stable alias", () => {
      const code = "const [data, setData] = useState(); const alias = setData; alias;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.resolveValues(findReference(program, "alias")).map((target) =>
          target.kind === "setter" ? resolver.getSetterName(target.node) : target.kind
        );
      });
      expect(fact).toEqual(["setData"]);
    });

    it("should resolve a function through multiple aliases", () => {
      const code = "const inner = () => setData(1); const outer = inner; outer;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.resolveValues(findReference(program, "outer")).map((target) => target.kind);
      });
      expect(fact).toEqual(["function"]);
    });

    it("should resolve the value returned from useMemo rather than its factory", () => {
      const code = "const [data, setData] = useState(); const set = useMemo(() => setData, []); set;";
      const fact = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.resolveValues(findReference(program, "set")).map((target) =>
          target.kind === "setter" ? resolver.getSetterName(target.node) : target.kind
        );
      });
      expect(fact).toEqual(["setData"]);
    });

    it("should not resolve a function received as a parameter", () => {
      const code = "function C({ onDone }) { onDone; }";
      const fact = runInRule(code, (context, program) => createSetStateResolver(context).resolveValues(findReference(program, "onDone")));
      expect(fact).toEqual([]);
    });

    it("should terminate on alias cycles", () => {
      const code = "const a = b; const b = a; a;";
      const fact = runInRule(code, (context, program) => createSetStateResolver(context).resolveValues(findReference(program, "a")));
      expect(fact).toEqual([]);
    });
  });
});

describe("isInitializedFromRef", () => {
  it("should match a local initialized from ref.current", () => {
    const code = "function f() { const ref = useRef(null); const el = ref.current; sink(el); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "el")));
    expect(fact).toBe(true);
  });

  it("should match a local initialized from a nested member expression rooted at a ref", () => {
    const code = "function f() { const ref = useRef(null); const w = ref.current.offsetWidth; sink(w); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "w")));
    expect(fact).toBe(true);
  });

  it("should match a local rooted at another ref-derived local", () => {
    const code = "function f() { const scrollerRef = useRef(null); const scroller = scrollerRef.current; const w = scroller.clientWidth; sink(w); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "w")));
    expect(fact).toBe(true);
  });

  it("should not match a local initialized from a plain call", () => {
    const code = "function f() { const el = foo(); sink(el); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "el")));
    expect(fact).toBe(false);
  });

  it("should match a variable reassigned from a ref-derived value before the use", () => {
    const code = "function f() { const containerRef = useRef(null); let overflow = false; overflow = containerRef.scrollWidth > 0; sink(overflow); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "overflow", -1)));
    expect(fact).toBe(true);
  });

  it("should not match a variable reassigned from a ref-derived value after the use", () => {
    const code = "function f() { const ref = useRef(0); let v; sink(v); v = ref.current; }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v")));
    expect(fact).toBe(false);
  });

  it("should not match a variable written only inside a nested function", () => {
    const code = "function f() { const ref = useRef(0); let v; const g = () => { v = ref.current; }; sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(false);
  });

  it("should match a parameter named ref", () => {
    const code = "function useDetect(ref) { sink(ref.current); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "ref")));
    expect(fact).toBe(true);
  });

  it("should match a parameter whose name ends with Ref", () => {
    const code = "function useDetect(containerRef) { sink(containerRef.current); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "containerRef")));
    expect(fact).toBe(true);
  });

  it("should not match a parameter without a ref-like name", () => {
    const code = "function f(el) { sink(el); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "el")));
    expect(fact).toBe(false);
  });

  it("should match a parameter present in the ref-derived parameter set", () => {
    const code = "function update(el) { sink(el); }";
    const fact = runInRule(code, (context, program) => {
      const fn = collectNodes<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration)[0];
      const param = fn?.params[0];
      if (param == null) throw new Error("No parameter found");
      return isInitializedFromRef(context, findReference(program, "el"), new Set([param]));
    });
    expect(fact).toBe(true);
  });

  it("should match a local initialized from a conditional expression reading a ref", () => {
    const code = "function f() { const ref = useRef(0); const v = cond ? ref.current : 0; sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v")));
    expect(fact).toBe(true);
  });

  it("should match a local initialized from a call reading a ref", () => {
    const code = "function f() { const ref = useRef(0); const v = measure(ref.current); sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v")));
    expect(fact).toBe(true);
  });

  it("should match a variable written from a ref-derived value in a branch before the use", () => {
    const code = "function f() { const ref = useRef(0); let v = 0; if (cond) { v = ref.current; } sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(true);
  });

  it("should match a variable written in an enclosing function before a nested-function use", () => {
    const code = "function outer() { const ref = useRef(0); let v = 0; v = ref.current; function inner() { sink(v); } }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(true);
  });

  it("should match a variable written and used inside the same nested function", () => {
    const code = "function f() { const ref = useRef(0); let v; const g = () => { v = ref.current; sink(v); }; }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(true);
  });

  it("should not match a variable written in a sibling nested function of the use", () => {
    const code = "function f() { const ref = useRef(0); let v; const g = () => { v = ref.current; }; const h = () => { sink(v); }; }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(false);
  });

  it("should match a variable written at module scope before a nested-function use", () => {
    const code = "const ref = useRef(0); let v; v = ref.current; function f() { sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(true);
  });

  it("should not match a variable written in a nested function when the use is in the enclosing function", () => {
    const code = "function f() { const ref = useRef(0); let v; sink(v); const g = () => { v = ref.current; }; }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(false);
  });

  it("should not match a variable reassigned from itself", () => {
    const code = "function f() { let v = 0; v = v + 1; sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(false);
  });

  it("should not hang on mutually-referencing assignments", () => {
    const code = "function f() { let a; let b; a = b; b = a; sink(a); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "a", -1)));
    expect(fact).toBe(false);
  });

  it("should not match an earlier ref write after a later plain overwrite", () => {
    const code = "function f() { const ref = useRef(0); let v = 0; v = ref.current; v = 42; sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(false);
  });

  it("should trace a self-referencing write back to an earlier ref definition", () => {
    const code = "function f() { const ref = useRef(0); let v = ref.current; v = v + 1; sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(true);
  });

  it("should trace a compound assignment back to an earlier ref definition", () => {
    const code = "function f() { const ref = useRef(0); let v = ref.current; v += 1; sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(true);
  });

  it("should keep a ref path when a later plain write is conditional", () => {
    const code = "function f() { const ref = useRef(0); let v = ref.current; if (cond) { v = 0; } sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(true);
  });

  it("should let a later plain write in the same branch replace a ref write", () => {
    const code = "function f() { const ref = useRef(0); let v = 0; if (cond) { v = ref.current; v = 0; } sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(false);
  });

  it("should retain ref and plain alternatives from sibling branches", () => {
    const code = "function f() { const ref = useRef(0); let v = 0; if (cond) { v = ref.current; } else { v = 0; } sink(v); }";
    const fact = runInRule(code, (context, program) => isInitializedFromRef(context, findReference(program, "v", -1)));
    expect(fact).toBe(true);
  });

  it("should let a plain assignment override a ref-fed parameter", () => {
    const code = "function update(el) { el = 0; sink(el); }";
    const fact = runInRule(code, (context, program) => {
      const fn = collectNodes<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration)[0];
      const param = fn?.params[0];
      if (param == null) throw new Error("No parameter found");
      return isInitializedFromRef(context, findReference(program, "el", -1), new Set([param]));
    });
    expect(fact).toBe(false);
  });
});

describe("isArgumentUsingRefValue", () => {
  function check(code: string, textPrefix = "setWidth") {
    return runInRule(code, (context, program) => {
      const arg = findCall(context, program, textPrefix).arguments[0];
      if (arg == null) throw new Error("No argument found");
      return isArgumentUsingRefValue(context, arg);
    });
  }

  it("should match a direct ref member chain", () => {
    expect(check("const ref = useRef(null); setWidth(ref.current.offsetWidth);")).toBe(true);
  });

  it("should match an optional chain with a nullish fallback", () => {
    expect(check("const ref = useRef(null); setWidth(ref.current?.offsetWidth ?? 0);")).toBe(true);
  });

  it("should match an updater function reading a ref", () => {
    expect(check("const ref = useRef(null); setWidth(() => ref.current);")).toBe(true);
  });

  it("should match a local variable initialized from a ref", () => {
    expect(check("const ref = useRef(null); const el = ref.current; setWidth(el);")).toBe(true);
  });

  it("should match a .current read rooted at a parameter", () => {
    expect(check("function C({ anchor }) { setWidth(anchor?.current); }")).toBe(true);
  });

  it("should match a ref-derived value nested in a call argument", () => {
    expect(check("const ref = useRef(0); setWidth(compute(ref.current ?? 0));")).toBe(true);
  });

  it("should not match a plain value", () => {
    expect(check("const v = 1; setWidth(v);")).toBe(false);
  });

  it("should not match a .current read on an unrelated object", () => {
    expect(check("const obj = { current: 1 }; setWidth(obj.current);")).toBe(false);
  });

  it("should match a ref-derived value in a template literal", () => {
    expect(check("const ref = useRef(0); setWidth(`${ref.current}`);")).toBe(true);
  });

  it("should match a ref-derived value in a tagged template quasi", () => {
    expect(check("const ref = useRef(0); setWidth(String.raw`${ref.current}`);")).toBe(true);
  });

  it("should match a ref-derived value in an object literal", () => {
    expect(check("const ref = useRef(0); setWidth({ value: ref.current });")).toBe(true);
  });

  it("should match a ref-derived value in an array literal", () => {
    expect(check("const ref = useRef(0); setWidth([ref.current]);")).toBe(true);
  });

  it("should match a ref-derived value spread into an object literal", () => {
    expect(check("const ref = useRef(null); setWidth({ ...ref.current });")).toBe(true);
  });

  it("should match a ref-derived value in a binary expression", () => {
    expect(check("const ref = useRef(0); setWidth(ref.current + 1);")).toBe(true);
  });

  it("should match a ref-derived value in a unary expression", () => {
    expect(check("const ref = useRef(0); setWidth(-ref.current);")).toBe(true);
  });

  it("should match a ref-derived value in a sequence expression", () => {
    expect(check("const ref = useRef(0); setWidth((a, ref.current));")).toBe(true);
  });

  it("should match a ref-derived value in a conditional branch", () => {
    expect(check("const ref = useRef(0); setWidth(cond ? ref.current : 0);")).toBe(true);
  });

  it("should match a function-expression updater reading a ref", () => {
    expect(check("const ref = useRef(0); setWidth(function () { return ref.current; });")).toBe(true);
  });

  it("should match a deeper chain on a param-rooted .current", () => {
    expect(check("function C({ anchor }) { setWidth(anchor?.current?.offsetWidth); }")).toBe(true);
  });

  it("should match a ref-derived value passed through a helper parameter", () => {
    const code = "function update(el) { setWidth(el.scrollTop); }";
    const fact = runInRule(code, (context, program) => {
      const fn = collectNodes<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration)[0];
      const param = fn?.params[0];
      if (param == null) throw new Error("No parameter found");
      const arg = findCall(context, program, "setWidth").arguments[0];
      if (arg == null) throw new Error("No argument found");
      return isArgumentUsingRefValue(context, arg, new Set([param]));
    });
    expect(fact).toBe(true);
  });

  it("should not match an updater reading only its own parameter", () => {
    expect(check("setWidth((prev) => prev + 1);")).toBe(false);
  });

  it("should match a ref value wrapped in a TS assertion", () => {
    expect(check("const ref = useRef(0); setWidth(ref.current as number);")).toBe(true);
  });

  it("should match a ref value wrapped in a non-null assertion", () => {
    expect(check("const ref = useRef(0); setWidth(ref.current!);")).toBe(true);
  });

  it("should match a ref read in a computed member key", () => {
    expect(check("const ref = useRef('key'); setWidth(lookup[ref.current]);")).toBe(true);
  });

  it("should match a value returned by a local ref-reading getter", () => {
    expect(check("const ref = useRef(0); const getValue = () => ref.current; setWidth(getValue());")).toBe(true);
  });

  it("should not hang on a recursive getter with no ref return", () => {
    expect(check("function getValue() { return getValue(); } setWidth(getValue());")).toBe(false);
  });

  it("should not treat an async getter's promise as a ref value", () => {
    expect(check("const ref = useRef(0); const getValue = async () => ref.current; setWidth(getValue());")).toBe(false);
  });
});

describe("isRefGatedContext", () => {
  function check(code: string) {
    return runInRule(code, (context, program) => isRefGatedContext(context, findCall(context, program, "setData")));
  }

  it("should match a setState call inside an if block gated by a ref", () => {
    expect(check("function f() { const ref = useRef(0); if (ref.current > 0) { setData(1); } }")).toBe(true);
  });

  it("should match a setState call inside a conditional expression gated by a ref", () => {
    expect(check("function f() { const ref = useRef(0); ref.current ? setData(1) : null; }")).toBe(true);
  });

  it("should match a setState call guarded by a preceding ref-gated early return", () => {
    expect(check("function f() { const ref = useRef(0); if (ref.current === 0) return; setData(1); }")).toBe(true);
  });

  it("should not match a setState call when the guard comes after it", () => {
    expect(check("function f() { const ref = useRef(0); setData(1); if (ref.current === 0) return; }")).toBe(false);
  });

  it("should not match a setState call gated by a non-ref condition", () => {
    expect(check("function f() { if (ready) { setData(1); } }")).toBe(false);
  });

  it("should not match a setState call in a nested function inside a ref-gated block", () => {
    expect(check("function f() { const ref = useRef(0); if (ref.current) { window.addEventListener('x', () => setData(1)); } }")).toBe(false);
  });

  it("should match a setState call gated by a logical-and test reading a ref", () => {
    expect(check("function f() { const ref = useRef(0); if (ref.current !== null && ref.current > 0) { setData(1); } }")).toBe(true);
  });

  it("should match a setState call on the right of a ref-derived logical-and left", () => {
    expect(check("function f() { const ref = useRef(0); ref.current && setData(1); }")).toBe(true);
  });

  it("should match a setState call on the right of a ref-derived logical-or left", () => {
    expect(check("function f() { const ref = useRef(0); ref.current || setData(1); }")).toBe(true);
  });

  it("should match a setState call on the right of a ref-derived nullish coalescing left", () => {
    expect(check("function f() { const ref = useRef(0); ref.current ?? setData(1); }")).toBe(true);
  });

  it("should match a setState call gated by a ref read in an earlier link of a logical chain", () => {
    expect(check("function f() { const ref = useRef(0); ready && ref.current && setData(1); }")).toBe(true);
  });

  it("should not match a setState call on the left of a logical-and with a ref read on the right", () => {
    expect(check("function f() { const ref = useRef(0); setData(1) && ref.current; }")).toBe(false);
  });

  it("should not match a setState call on the right of a non-ref logical-and left", () => {
    expect(check("function f() { ready && setData(1); }")).toBe(false);
  });

  it("should match a setState call gated by a ref-derived local variable", () => {
    expect(check("function f() { const ref = useRef(0); const dv = ref.current; if (dv === 0) { setData(1); } }")).toBe(true);
  });

  it("should match a setState call guarded by a preceding ref-gated throw", () => {
    expect(check("function f() { const ref = useRef(0); if (ref.current) throw new Error(); setData(1); }")).toBe(true);
  });

  it("should match a setState call guarded by a ref-gated block that returns", () => {
    expect(check("function f() { const ref = useRef(0); if (ref.current) { return; } setData(1); }")).toBe(true);
  });

  it("should not match a setState call preceded by a ref-gated statement that does not terminate", () => {
    expect(check("function f() { const ref = useRef(0); if (ref.current) { log(); } setData(1); }")).toBe(false);
  });

  it("should match a setState call gated by a ref in a doubly nested if", () => {
    expect(check("function f() { const ref = useRef(0); if (ready) { if (ref.current) { setData(1); } } }")).toBe(true);
  });

  it("should not match a setState call whose gate reads a ref only inside a nested callback", () => {
    expect(check("function f() { const ref = useRef(0); if (items.some((x) => x === ref.current)) { setData(1); } }")).toBe(false);
  });

  it("should match a setState call in a helper gated on a ref-fed parameter", () => {
    const code = "function update(el) { if (el.scrollTop === 0) { setData(1); } }";
    const fact = runInRule(code, (context, program) => {
      const fn = collectNodes<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration)[0];
      const param = fn?.params[0];
      if (param == null) throw new Error("No parameter found");
      return isRefGatedContext(context, findCall(context, program, "setData"), new Set([param]));
    });
    expect(fact).toBe(true);
  });

  it("should match a setState call gated by a ref-derived local variable on the left of a logical-and", () => {
    expect(check("function f() { const ref = useRef(0); const el = ref.current; el && setData(1); }")).toBe(true);
  });

  it("should match a setState call gated by a ref read buried in a binary expression on the left of a logical-and", () => {
    expect(check("function f() { const ref = useRef(0); (ref.current ?? 0) > 1 && setData(1); }")).toBe(true);
  });

  it("should match a setState call gated by a negated ref read on the left of a logical-and", () => {
    expect(check("function f() { const ref = useRef(0); !ref.current && setData(1); }")).toBe(true);
  });

  it("should match a setState call in a helper gated by a ref-fed parameter on the left of a logical-and", () => {
    const code = "function update(el) { el && setData(1); }";
    const fact = runInRule(code, (context, program) => {
      const fn = collectNodes<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration)[0];
      const param = fn?.params[0];
      if (param == null) throw new Error("No parameter found");
      return isRefGatedContext(context, findCall(context, program, "setData"), new Set([param]));
    });
    expect(fact).toBe(true);
  });

  it("should not match a setState call in a helper gated by a plain parameter on the left of a logical-and", () => {
    expect(check("function update(el) { el && setData(1); }")).toBe(false);
  });

  it("should not match a setState call in an IIFE on the right of a ref-gated logical-and", () => {
    expect(check("function f() { const ref = useRef(0); ref.current && (() => { setData(1); })(); }")).toBe(false);
  });

  it("should not match a setState call in an IIFE inside a ref-gated if block", () => {
    expect(check("function f() { const ref = useRef(0); if (ref.current) { (() => { setData(1); })(); } }")).toBe(false);
  });

  it("should not let a setter inside an if test gate itself", () => {
    expect(check("function f() { const ref = useRef(0); if ((setData(1), ref.current)) { console.log('x'); } }")).toBe(false);
  });
});
