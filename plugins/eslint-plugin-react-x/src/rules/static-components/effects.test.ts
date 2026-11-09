import { type TestRuleContext, collectNodes, runCollector } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { createFactCollector } from "./collect";
import { inferViolations } from "./effects";
import { createRenderBoundaryChecker } from "./helpers";

function inferViolationSummaries(code: string) {
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
      const program = context.sourceCode.ast;
      const componentNodes = [
        ...collectNodes<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration),
        ...collectNodes<TSESTree.ClassDeclaration>(program, AST.ClassDeclaration),
      ].filter((node) => node.id?.name === "Parent");
      const isInsideRender = createRenderBoundaryChecker(componentNodes);
      return inferViolations(context, facts.componentUsages, isInsideRender).map((violation) => ({
        creation: code.slice(violation.creationNode.range[0], violation.creationNode.range[1]),
        name: violation.name,
        usage: code.slice(violation.node.range[0], violation.node.range[1]),
      }));
    },
  );
}

describe("inferViolations", () => {
  it("reports a component created by an arrow initializer inside render", () => {
    const code = "function Parent() { const C = () => <div />; return <C />; }";
    expect(inferViolationSummaries(code)).toEqual([{ creation: "() => <div />", name: "C", usage: "C" }]);
  });

  it("reports a component created by a nested function declaration inside render", () => {
    const code = "function Parent() { function C() { return <div />; } return <C />; }";
    expect(inferViolationSummaries(code)).toEqual([{ creation: "function C() { return <div />; }", name: "C", usage: "C" }]);
  });

  it("reports each usage of the same creation site in order", () => {
    const code = "function Parent() { const C = () => <div />; return <><C /><C /></>; }";
    expect(inferViolationSummaries(code)).toEqual([
      { creation: "() => <div />", name: "C", usage: "C" },
      { creation: "() => <div />", name: "C", usage: "C" },
    ]);
  });

  it("reports a component created inside a class component boundary", () => {
    const code = "class Parent { render() { const C = () => <div />; return <C />; } }";
    expect(inferViolationSummaries(code)).toEqual([{ creation: "() => <div />", name: "C", usage: "C" }]);
  });

  it("skips a usage whose binding is unresolvable", () => {
    expect(inferViolationSummaries("function Parent() { return <C />; }")).toEqual([]);
  });

  it("skips a component declared outside the render boundary", () => {
    const code = "const C = () => <div />; function Parent() { return <C />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("skips a static alias resolved inside render", () => {
    const code = "const External = () => <div />; function Parent() { const B = External; return <B />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("skips a module-scope binding that is dynamically reassigned inside render", () => {
    const code = "let C = DefaultComponent; function Parent() { C = make(); return <C />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("skips a dynamic declaration that is never used as a JSX tag", () => {
    expect(inferViolationSummaries("function Parent() { const C = () => <div />; return <div />; }")).toEqual([]);
  });

  it("reports a component created in an object property and used via a member tag", () => {
    const code = "function Parent() { const Ns = { Bar: () => <div /> }; return <Ns.Bar />; }";
    expect(inferViolationSummaries(code)).toEqual([{ creation: "() => <div />", name: "Ns", usage: "Ns.Bar" }]);
  });

  it("reports a member tag whose property holds a factory call", () => {
    const code = "function Parent() { const Ns = { Bar: createComponent() }; return <Ns.Bar />; }";
    expect(inferViolationSummaries(code)).toEqual([{ creation: "createComponent()", name: "Ns", usage: "Ns.Bar" }]);
  });

  it("reports each member-tag usage of the same creation site in order", () => {
    const code = "function Parent() { const Ns = { Bar: () => <div /> }; return <><Ns.Bar /><Ns.Bar /></>; }";
    expect(inferViolationSummaries(code)).toEqual([
      { creation: "() => <div />", name: "Ns", usage: "Ns.Bar" },
      { creation: "() => <div />", name: "Ns", usage: "Ns.Bar" },
    ]);
  });

  it("skips a member tag whose property holds an outer-scope component", () => {
    const code = "const External = () => <div />; function Parent() { const Ns = { Bar: External }; return <Ns.Bar />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("skips a member tag on a module-scope namespace object", () => {
    const code = "const Ns = { Bar: () => <div /> }; function Parent() { return <Ns.Bar />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("skips a member tag whose namespace is a call result", () => {
    const code = "function Parent() { const Ns = makeNamespace(); return <Ns.Bar />; }";
    expect(inferViolationSummaries(code)).toEqual([]);
  });

  it("skips a member tag with an unresolvable root binding", () => {
    expect(inferViolationSummaries("function Parent() { return <Ns.Bar />; }")).toEqual([]);
  });
});
