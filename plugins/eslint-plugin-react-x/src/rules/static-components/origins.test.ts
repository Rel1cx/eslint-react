import { Traverse } from "@eslint-react/ast";
import { findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { describe, expect, it } from "vitest";

import type { IsInsideRender } from "./helpers";
import { resolveDynamicComponentOrigin, resolveDynamicMemberOrigin } from "./origins";

const EVERYWHERE: IsInsideRender = () => true;

// Treats only nodes inside `function Parent() { ... }` as render content, so
// module-scope declarations count as static outer scope.
const INSIDE_PARENT: IsInsideRender = (node) => Traverse.hasParent(node, (n) => n.type === AST.FunctionDeclaration && n.id?.name === "Parent");

function resolveOrigin(code: string, name: string, isInsideRender: IsInsideRender = EVERYWHERE) {
  return runInRule(code, (context, program) => {
    const reference = findIdentifierReferences(program, name).at(-1);
    if (reference == null) throw new Error(`No reference to "${name}" found`);
    const variable = findVariable(context.sourceCode.getScope(reference), name);
    if (variable == null) throw new Error(`No variable named "${name}" found`);
    const { creationNode, isDynamic } = resolveDynamicComponentOrigin(context, variable, isInsideRender);
    return {
      creation: creationNode == null ? null : code.slice(creationNode.range[0], creationNode.range[1]),
      isDynamic,
    };
  });
}

function resolveMemberOrigin(code: string, name: string, path: string[], isInsideRender: IsInsideRender = EVERYWHERE) {
  return runInRule(code, (context, program) => {
    const reference = findIdentifierReferences(program, name).at(-1);
    if (reference == null) throw new Error(`No reference to "${name}" found`);
    const variable = findVariable(context.sourceCode.getScope(reference), name);
    if (variable == null) throw new Error(`No variable named "${name}" found`);
    const { creationNode, isDynamic } = resolveDynamicMemberOrigin(context, variable, path, isInsideRender);
    return {
      creation: creationNode == null ? null : code.slice(creationNode.range[0], creationNode.range[1]),
      isDynamic,
    };
  });
}

describe("resolveDynamicComponentOrigin", () => {
  it("treats a function declaration inside render as dynamic, created at the declaration", () => {
    const code = "function Parent() { function C() { return null; } C; }";
    expect(resolveOrigin(code, "C")).toEqual({ creation: "function C() { return null; }", isDynamic: true });
  });

  it("treats a class declaration inside render as dynamic, created at the declaration", () => {
    const code = "function Parent() { class C {} C; }";
    expect(resolveOrigin(code, "C")).toEqual({ creation: "class C {}", isDynamic: true });
  });

  it("resolves a variable initialized with an arrow function to the arrow function", () => {
    expect(resolveOrigin("const C = () => 1; C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("resolves a variable initialized with a function expression to the function expression", () => {
    expect(resolveOrigin("const C = function() {}; C;", "C")).toEqual({ creation: "function() {}", isDynamic: true });
  });

  it("resolves a variable initialized with a class expression to the class expression", () => {
    expect(resolveOrigin("const C = class {}; C;", "C")).toEqual({ creation: "class {}", isDynamic: true });
  });

  it("resolves a variable initialized with a call to the call", () => {
    expect(resolveOrigin("const C = make(); C;", "C")).toEqual({ creation: "make()", isDynamic: true });
  });

  it("resolves a variable initialized with a method call to the call", () => {
    expect(resolveOrigin("const C = props.make(); C;", "C")).toEqual({ creation: "props.make()", isDynamic: true });
  });

  it("resolves a variable initialized with a new expression to the new expression", () => {
    expect(resolveOrigin("const C = new Factory(); C;", "C")).toEqual({ creation: "new Factory()", isDynamic: true });
  });

  it("follows an identifier alias to the original creation site", () => {
    expect(resolveOrigin("const A = () => 1; const B = A; B;", "B")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("follows an alias chain to the original creation site", () => {
    expect(resolveOrigin("const A = make(); const B = A; const C = B; C;", "C")).toEqual({ creation: "make()", isDynamic: true });
  });

  it("returns static for an alias of a static value", () => {
    expect(resolveOrigin("const A = 1; const B = A; B;", "B")).toEqual({ creation: null, isDynamic: false });
  });

  it("returns static for an alias of an unresolvable value", () => {
    expect(resolveOrigin("const B = External; B;", "B")).toEqual({ creation: null, isDynamic: false });
  });

  it("traces the dynamic consequent of a ternary", () => {
    expect(resolveOrigin("const C = cond ? () => 1 : Fallback; C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("traces the dynamic alternate of a ternary", () => {
    expect(resolveOrigin("const C = cond ? Fallback : () => 1; C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("returns static when both ternary branches are static", () => {
    expect(resolveOrigin("const A = 1; const B = 2; const C = cond ? A : B; C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("traces the right side of a logical expression", () => {
    expect(resolveOrigin("const C = Fallback || (() => 1); C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("traces the left side of a logical expression", () => {
    expect(resolveOrigin("const C = (() => 1) || Fallback; C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("resolves a sequence expression to its final element", () => {
    expect(resolveOrigin("const C = (setup(), () => 1); C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("returns static for a sequence expression whose final element is static", () => {
    expect(resolveOrigin("const C = (setup(), 1); C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("resolves a dynamic reassignment of a static declaration", () => {
    expect(resolveOrigin("let C = Fallback; C = make(); C;", "C")).toEqual({ creation: "make()", isDynamic: true });
  });

  it("resolves a reassignment through an identifier alias", () => {
    expect(resolveOrigin("let A = Fallback; const B = () => 1; A = B; A;", "A")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("ignores destructuring writes", () => {
    expect(resolveOrigin("let C = Fallback; [C] = [make()]; C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("ignores member writes", () => {
    expect(resolveOrigin("let C = Fallback; C.prop = make(); C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("unwraps TS type expressions before classification", () => {
    expect(resolveOrigin("const C = make() as any; C;", "C")).toEqual({ creation: "make()", isDynamic: true });
  });

  it("unwraps chain expressions before classification", () => {
    expect(resolveOrigin("const C = factory?.(); C;", "C")).toEqual({ creation: "factory?.()", isDynamic: true });
  });

  it("treats a mutual reassignment cycle as static instead of recursing indefinitely", () => {
    expect(resolveOrigin("let A = Fallback; let B = Fallback; A = B; B = A; A;", "A")).toEqual({ creation: null, isDynamic: false });
  });

  it("does not mistake a parameter definition for a function created during render", () => {
    expect(resolveOrigin("function render(C) { C; }", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("does not treat an import binding as dynamic", () => {
    expect(resolveOrigin("import C from './c'; C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("honors the render boundary gate on definitions", () => {
    const code = "function Parent() { function C() { return null; } C; }";
    expect(resolveOrigin(code, "C", () => false)).toEqual({ creation: null, isDynamic: false });
  });

  it("returns static for a declaration without an initializer and no reassignment", () => {
    expect(resolveOrigin("let C; C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("treats useMemo of an external component as static", () => {
    expect(resolveOrigin("const C = useMemo(() => External, []); C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("treats a block-bodied useMemo that returns an external component as static", () => {
    expect(resolveOrigin("const C = useMemo(() => { return External; }, []); C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("treats React.useMemo of an external component as static", () => {
    expect(resolveOrigin("const C = React.useMemo(() => External, [dep]); C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("treats useCallback of an external component as static", () => {
    expect(resolveOrigin("const C = useCallback(External, []); C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("traces a useMemo factory that returns an inline component to that component", () => {
    expect(resolveOrigin("const C = useMemo(() => () => 1, []); C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("traces a block-bodied useMemo factory that returns an inline component", () => {
    expect(resolveOrigin("const C = useMemo(() => { return () => 1; }, []); C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("traces a useMemo factory that returns a call to that call", () => {
    expect(resolveOrigin("const C = useMemo(() => make(), []); C;", "C")).toEqual({ creation: "make()", isDynamic: true });
  });

  it("traces a useMemo factory that returns a component created in the same scope", () => {
    expect(resolveOrigin("const A = () => 1; const C = useMemo(() => A, []); C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("treats a useCallback of an inline function as that function", () => {
    expect(resolveOrigin("const C = useCallback(() => 1, []); C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("treats a useMemo reassignment that returns the same static component as static", () => {
    expect(resolveOrigin("let C = External; C = useMemo(() => { return C; }, [C]); C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("flags a useMemo factory when any returned value is dynamic", () => {
    expect(resolveOrigin("const C = useMemo(() => { if (cond) return External; return () => 1; }, []); C;", "C")).toEqual({
      creation: "() => 1",
      isDynamic: true,
    });
  });

  it("does not unwrap a call that is not a memoization hook", () => {
    expect(resolveOrigin("const C = notMemo(() => External); C;", "C")).toEqual({ creation: "notMemo(() => External)", isDynamic: true });
  });

  it("does not inspect a useMemo factory that is not a function literal", () => {
    expect(resolveOrigin("const factory = () => External; const C = useMemo(factory, []); C;", "C")).toEqual({
      creation: "useMemo(factory, [])",
      isDynamic: true,
    });
  });

  it("traces an initializer that is a member access on an in-render namespace", () => {
    expect(resolveOrigin("const Ns = { Bar: () => 1 }; const C = Ns.Bar; C;", "C")).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("returns static for a member access on an unresolvable namespace", () => {
    expect(resolveOrigin("const C = Ns.Bar; C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("returns static for a member access whose property is missing", () => {
    expect(resolveOrigin("const Ns = { Other: () => 1 }; const C = Ns.Bar; C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("returns static for a member access whose property value is static", () => {
    expect(resolveOrigin("const Ns = { Bar: 1 }; const C = Ns.Bar; C;", "C")).toEqual({ creation: null, isDynamic: false });
  });

  it("returns static for a member access on `this`", () => {
    expect(resolveOrigin("class Foo { m() { const C = this.Foo; C; } }", "C")).toEqual({ creation: null, isDynamic: false });
  });
});

describe("resolveDynamicMemberOrigin", () => {
  it("resolves a member tag to the property's inline component", () => {
    expect(resolveMemberOrigin("const Ns = { Bar: () => 1 }; Ns.Bar;", "Ns", ["Bar"])).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("resolves a nested property path", () => {
    expect(resolveMemberOrigin("const Ns = { Deep: { Bar: () => 1 } }; Ns.Deep.Bar;", "Ns", ["Deep", "Bar"])).toEqual({
      creation: "() => 1",
      isDynamic: true,
    });
  });

  it("resolves a member tag to a factory call held by the property", () => {
    expect(resolveMemberOrigin("const Ns = { Bar: make() }; Ns.Bar;", "Ns", ["Bar"])).toEqual({ creation: "make()", isDynamic: true });
  });

  it("traces a shorthand property through the aliased binding", () => {
    expect(resolveMemberOrigin("const Bar = () => 1; const Ns = { Bar }; Ns.Bar;", "Ns", ["Bar"])).toEqual({
      creation: "() => 1",
      isDynamic: true,
    });
  });

  it("follows a namespace alias", () => {
    const code = "function Parent() { const Ns1 = { Bar: () => 1 }; const Ns2 = Ns1; Ns2.Bar; }";
    expect(resolveMemberOrigin(code, "Ns2", ["Bar"], INSIDE_PARENT)).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("resolves through a member expression initializer", () => {
    const code = "function Parent() { const Outer = { Inner: { Bar: () => 1 } }; const Ns = Outer.Inner; Ns.Bar; }";
    expect(resolveMemberOrigin(code, "Ns", ["Bar"], INSIDE_PARENT)).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("resolves a namespace reassignment", () => {
    const code = "function Parent() { let Ns = DefaultNs; Ns = { Bar: () => 1 }; Ns.Bar; }";
    expect(resolveMemberOrigin(code, "Ns", ["Bar"], INSIDE_PARENT)).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("resolves a namespace reassigned after a declaration without an initializer", () => {
    const code = "function Parent() { let Ns; Ns = { Bar: () => 1 }; Ns.Bar; }";
    expect(resolveMemberOrigin(code, "Ns", ["Bar"], INSIDE_PARENT)).toEqual({ creation: "() => 1", isDynamic: true });
  });

  it("returns static for a property holding a component declared outside render", () => {
    const code = "const External = () => 1; function Parent() { const Ns = { Bar: External }; Ns.Bar; }";
    expect(resolveMemberOrigin(code, "Ns", ["Bar"], INSIDE_PARENT)).toEqual({ creation: null, isDynamic: false });
  });

  it("honors the render boundary gate on the namespace declaration", () => {
    const code = "const Ns = { Bar: () => 1 }; function Parent() { Ns.Bar; }";
    expect(resolveMemberOrigin(code, "Ns", ["Bar"], INSIDE_PARENT)).toEqual({ creation: null, isDynamic: false });
  });

  it("returns static for a namespace produced by a call", () => {
    const code = "function Parent() { const Ns = makeNamespace(); Ns.Bar; }";
    expect(resolveMemberOrigin(code, "Ns", ["Bar"], INSIDE_PARENT)).toEqual({ creation: null, isDynamic: false });
  });

  it("returns static for a spread property it cannot resolve", () => {
    expect(resolveMemberOrigin("const Ns = { ...Other }; Ns.Bar;", "Ns", ["Bar"])).toEqual({ creation: null, isDynamic: false });
  });

  it("returns static for a computed property it cannot resolve", () => {
    expect(resolveMemberOrigin("const Ns = { ['Bar']: () => 1 }; Ns.Bar;", "Ns", ["Bar"])).toEqual({ creation: null, isDynamic: false });
  });

  it("treats a property cycle as static instead of recursing indefinitely", () => {
    const code = "function Parent() { const Ns = { Bar: Ns.Bar }; Ns.Bar; }";
    expect(resolveMemberOrigin(code, "Ns", ["Bar"], INSIDE_PARENT)).toEqual({ creation: null, isDynamic: false });
  });

  it("delegates to identifier resolution for an empty path", () => {
    expect(resolveMemberOrigin("const C = () => 1; C;", "C", [])).toEqual({ creation: "() => 1", isDynamic: true });
  });
});
