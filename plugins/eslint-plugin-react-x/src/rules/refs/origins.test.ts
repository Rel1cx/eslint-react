import { type TestRuleContext, collectNodes, findIdentifierReferences, getFirstNodeOfType, getTextOf, runCollector } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { createFactCollector } from "./collect";
import { type BindingResolver, createBindingResolver } from "./origins";

function withResolver<T>(code: string, fn: (resolver: BindingResolver, context: TestRuleContext, program: TSESTree.Program) => T): T {
  let context: TestRuleContext | null = null;
  return runCollector(
    code,
    (ctx) => {
      context = ctx;
      const collector = createFactCollector();
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts, program) => {
      if (context == null) throw new Error("The rule context was not captured");
      return fn(createBindingResolver(context, facts), context, program);
    },
  );
}

function findReference(program: TSESTree.Program, name: string, index = 0) {
  const refs = findIdentifierReferences(program, name);
  const ref = refs.at(index) ?? refs.at(-1);
  if (ref == null) throw new Error(`No reference to "${name}" found`);
  return ref;
}

function findVariableOf(resolver: BindingResolver, program: TSESTree.Program, name: string, index = 0) {
  const id = findReference(program, name, index);
  const variable = resolver.getVariable(id);
  if (variable == null) throw new Error(`No variable for "${name}" found`);
  return { id, variable };
}

function findCall(code: string, program: TSESTree.Program, text: string, index = 0) {
  const calls = collectNodes<TSESTree.CallExpression>(program, AST.CallExpression)
    .filter((node) => getTextOf(code, node) === text);
  const call = calls.at(index);
  if (call == null) throw new Error(`No call "${text}" found`);
  return call;
}

function findRefAccess(code: string, program: TSESTree.Program, text: string) {
  const access = collectNodes<TSESTree.MemberExpression>(program, AST.MemberExpression)
    .find((node) => getTextOf(code, node) === text);
  if (access == null) throw new Error(`No member access "${text}" found`);
  return access;
}

function resolveRefAt(code: string, name: string, index = 0) {
  return withResolver(code, (resolver, _context, program) => {
    const { id, variable } = findVariableOf(resolver, program, name, index);
    return resolver.resolveRef(variable, id.range[0]);
  });
}

function resolveCallableAt(code: string, callText: string, index = 0) {
  return withResolver(code, (resolver, _context, program) => {
    const call = findCall(code, program, callText, index);
    const target = resolver.resolveCallable(call.callee, call.range[0]);
    return target == null ? null : getTextOf(code, target);
  });
}

function getNullBranchFor(code: string, name = "ref") {
  return withResolver(code, (resolver, _context, program) => {
    const test = getFirstNodeOfType<TSESTree.IfStatement>(program, AST.IfStatement).test;
    const { variable } = findVariableOf(resolver, program, name);
    return resolver.getNullBranch(test, variable);
  });
}

describe("createBindingResolver", () => {
  describe("resolveRef", () => {
    it("should resolve a useRef-initialized variable to itself", () => {
      const resolved = resolveRefAt("function f() { const ref = useRef(null); sink(ref); }", "ref");
      expect(resolved?.name).toBe("ref");
    });

    it("should resolve a createRef-initialized variable", () => {
      expect(resolveRefAt("function f() { const ref = createRef(); sink(ref); }", "ref")?.name).toBe("ref");
      expect(resolveRefAt("function f() { const ref = React.createRef(); sink(ref); }", "ref")?.name).toBe("ref");
    });

    it("should resolve a variable initialized by a namespace useRef call", () => {
      expect(resolveRefAt("function f() { const ref = React.useRef(null); sink(ref); }", "ref")?.name).toBe("ref");
    });

    it("should resolve ref-like-named parameters without any binding", () => {
      expect(resolveRefAt("function f(ref) { sink(ref); }", "ref")?.name).toBe("ref");
      expect(resolveRefAt("function f(containerRef) { sink(containerRef); }", "containerRef")?.name).toBe("containerRef");
      expect(resolveRefAt("function f(el) { sink(el); }", "el")).toBeNull();
    });

    it("should resolve a variable passed to a JSX ref attribute regardless of position", () => {
      const code = "function C() { const node = getNode(); sink(node); return <div ref={node} />; }";
      expect(resolveRefAt(code, "node")?.name).toBe("node");
    });

    it("should resolve an alias to the terminal ref variable", () => {
      const code = "function f() { const a = useRef(null); const b = a; sink(b); }";
      const resolved = resolveRefAt(code, "b");
      expect(resolved?.name).toBe("a");
    });

    it("should resolve a variable initialized from a ref-like-named member", () => {
      expect(resolveRefAt("function f() { const r = factory.boxRef; sink(r); }", "r")?.name).toBe("r");
      expect(resolveRefAt("function f() { const r = factory.value; sink(r); }", "r")).toBeNull();
    });

    it("should respect the latest binding before the use position", () => {
      const code = "function f() { let a = useRef(null); sink(a); a = {}; sink(a); }";
      expect(resolveRefAt(code, "a", 0)?.name).toBe("a");
      expect(resolveRefAt(code, "a", -1)).toBeNull();
    });

    it("should not resolve a variable initialized by an unknown call", () => {
      expect(resolveRefAt("function f() { const x = make(); sink(x); }", "x")).toBeNull();
    });

    it("should terminate on alias cycles", () => {
      expect(resolveRefAt("function f() { const a = b; const b = a; sink(a); }", "a")).toBeNull();
    });

    it("should key resolution by scope identity rather than name", () => {
      const code = "function f() { const value = useRef(null); const read = (value) => value.current; return sink(value); }";
      expect(resolveRefAt(code, "value", 0)).toBeNull();
      expect(resolveRefAt(code, "value", -1)?.name).toBe("value");
    });
  });

  describe("getRefTarget", () => {
    it("should return the ref identity of a .current access on a ref variable", () => {
      const code = "function f() { const ref = useRef(null); sink(ref.current); }";
      const target = withResolver(code, (resolver, _context, program) => resolver.getRefTarget(findRefAccess(code, program, "ref.current")));
      expect(target?.identity?.name).toBe("ref");
    });

    it("should return an anonymous target for a ref-like-named member root", () => {
      const code = "function f(props) { sink(props.boxRef.current); }";
      const target = withResolver(code, (resolver, _context, program) => resolver.getRefTarget(findRefAccess(code, program, "props.boxRef.current")));
      expect(target).not.toBeNull();
      expect(target?.identity).toBeNull();
    });

    it("should not treat a .current access on a plain object as a ref", () => {
      const code = "function f() { const obj = {}; sink(obj.current); }";
      const target = withResolver(code, (resolver, _context, program) => resolver.getRefTarget(findRefAccess(code, program, "obj.current")));
      expect(target).toBeNull();
    });

    it("should not treat a .current access on an unresolvable identifier as a ref", () => {
      const code = "function f() { sink(mystery.current); }";
      const target = withResolver(code, (resolver, _context, program) => resolver.getRefTarget(findRefAccess(code, program, "mystery.current")));
      expect(target).toBeNull();
    });
  });

  describe("resolveCallable", () => {
    it("should resolve an IIFE callee to its function expression", () => {
      expect(resolveCallableAt("(() => {})();", "(() => {})()")).toBe("() => {}");
    });

    it("should resolve a TypeScript-wrapped IIFE callee", () => {
      expect(resolveCallableAt("((() => {}) as any)();", "((() => {}) as any)()")).toBe("() => {}");
    });

    it("should resolve a function declaration by name", () => {
      expect(resolveCallableAt("function helper() {} helper();", "helper()")).toBe("function helper() {}");
    });

    it("should resolve an alias to the aliased function", () => {
      expect(resolveCallableAt("const a = () => {}; const b = a; b();", "b()")).toBe("() => {}");
    });

    it("should resolve a member callee through an object property assignment", () => {
      expect(resolveCallableAt("const o = {}; o.run = () => {}; o.run();", "o.run()")).toBe("() => {}");
    });

    it("should resolve a member callee aliased to a function declaration", () => {
      const code = "function run() {} const o = {}; o.run = run; o.run();";
      expect(resolveCallableAt(code, "o.run()")).toBe("function run() {}");
    });

    it("should resolve each call to the function bound at its position", () => {
      const code = "function one() {} function two() {} let f = one; f(); f = two; f();";
      expect(resolveCallableAt(code, "f()", 0)).toBe("function one() {}");
      expect(resolveCallableAt(code, "f()", 1)).toBe("function two() {}");
    });

    it("should not resolve unresolvable or non-function callees", () => {
      expect(resolveCallableAt("foo();", "foo()")).toBeNull();
      expect(resolveCallableAt("const f = 1; f();", "f()")).toBeNull();
      expect(resolveCallableAt("const o = {}; o.m();", "o.m()")).toBeNull();
    });
  });

  describe("resolveAliasTarget", () => {
    it("should resolve an alias chain to its terminal variable", () => {
      const code = "const mergeRefs = () => {}; const combine = mergeRefs; sink(combine);";
      const terminal = withResolver(code, (resolver, _context, program) => {
        const { id, variable } = findVariableOf(resolver, program, "combine");
        return resolver.resolveAliasTarget(variable, id.range[0]);
      });
      expect(terminal.name).toBe("mergeRefs");
    });

    it("should resolve a reassigned alias to the value bound at the use position", () => {
      const code = "function a() {} function b() {} let alias = a; alias = b; sink(alias);";
      const terminal = withResolver(code, (resolver, _context, program) => {
        const { id, variable } = findVariableOf(resolver, program, "alias", -1);
        return resolver.resolveAliasTarget(variable, id.range[0]);
      });
      expect(terminal.name).toBe("b");
    });

    it("should return the variable itself when it is not an alias", () => {
      const code = "const x = 1; sink(x);";
      const terminal = withResolver(code, (resolver, _context, program) => {
        const { id, variable } = findVariableOf(resolver, program, "x");
        return resolver.resolveAliasTarget(variable, id.range[0]);
      });
      expect(terminal.name).toBe("x");
    });
  });

  describe("getNullBranch", () => {
    it("should return the consequent for an exact null check", () => {
      expect(getNullBranchFor("function f(ref) { if (ref.current === null) {} }")).toBe("consequent");
      expect(getNullBranchFor("function f(ref) { if (null === ref.current) {} }")).toBe("consequent");
      expect(getNullBranchFor("function f(ref) { if (ref.current == undefined) {} }")).toBe("consequent");
      expect(getNullBranchFor("function f(ref) { if (ref.current === void 0) {} }")).toBe("consequent");
    });

    it("should return the alternate for an exact non-null check", () => {
      expect(getNullBranchFor("function f(ref) { if (ref.current !== null) {} }")).toBe("alternate");
    });

    it("should flip the branch under negation", () => {
      expect(getNullBranchFor("function f(ref) { if (!(ref.current === null)) {} }")).toBe("alternate");
    });

    it("should not treat truthiness checks as null checks", () => {
      expect(getNullBranchFor("function f(ref) { if (!ref.current) {} }")).toBeNull();
    });

    it("should not treat comparisons against non-nullish values as null checks", () => {
      expect(getNullBranchFor("function f(ref) { if (ref.current === 0) {} }")).toBeNull();
    });

    it("should not match a null check on a different ref identity", () => {
      expect(getNullBranchFor("function f(ref, otherRef) { if (otherRef.current === null) {} sink(ref); }")).toBeNull();
    });

    it("should not treat a locally bound undefined as a nullish value", () => {
      expect(getNullBranchFor("function f(ref) { const undefined = {}; if (ref.current === undefined) {} }")).toBeNull();
    });

    it("should treat the global undefined as a nullish value", () => {
      expect(getNullBranchFor("function f(ref) { if (ref.current === undefined) {} }")).toBe("consequent");
    });
  });
});
