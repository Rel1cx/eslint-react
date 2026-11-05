import { type TestRuleContext, collectNodes, runCollector } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { createFactCollector } from "./collect";
import { inferCreatedComponents } from "./effects";
import { createRenderBoundaryChecker } from "./helpers";

function inferEffects(code: string) {
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
      return inferCreatedComponents(context, facts.componentUsages, isInsideRender).map((effect) => ({
        creation: code.slice(effect.creationNode.range[0], effect.creationNode.range[1]),
        name: effect.name,
        usage: code.slice(effect.node.range[0], effect.node.range[1]),
      }));
    },
  );
}

describe("inferCreatedComponents", () => {
  it("reports a component created by an arrow initializer inside render", () => {
    const code = "function Parent() { const C = () => <div />; return <C />; }";
    expect(inferEffects(code)).toEqual([{ creation: "() => <div />", name: "C", usage: "C" }]);
  });

  it("reports a component created by a nested function declaration inside render", () => {
    const code = "function Parent() { function C() { return <div />; } return <C />; }";
    expect(inferEffects(code)).toEqual([{ creation: "function C() { return <div />; }", name: "C", usage: "C" }]);
  });

  it("reports each usage of the same creation site in order", () => {
    const code = "function Parent() { const C = () => <div />; return <><C /><C /></>; }";
    expect(inferEffects(code)).toEqual([
      { creation: "() => <div />", name: "C", usage: "C" },
      { creation: "() => <div />", name: "C", usage: "C" },
    ]);
  });

  it("reports a component created inside a class component boundary", () => {
    const code = "class Parent { render() { const C = () => <div />; return <C />; } }";
    expect(inferEffects(code)).toEqual([{ creation: "() => <div />", name: "C", usage: "C" }]);
  });

  it("skips a usage whose binding is unresolvable", () => {
    expect(inferEffects("function Parent() { return <C />; }")).toEqual([]);
  });

  it("skips a component declared outside the render boundary", () => {
    const code = "const C = () => <div />; function Parent() { return <C />; }";
    expect(inferEffects(code)).toEqual([]);
  });

  it("skips a static alias resolved inside render", () => {
    const code = "const External = () => <div />; function Parent() { const B = External; return <B />; }";
    expect(inferEffects(code)).toEqual([]);
  });

  it("skips a module-scope binding that is dynamically reassigned inside render", () => {
    const code = "let C = DefaultComponent; function Parent() { C = make(); return <C />; }";
    expect(inferEffects(code)).toEqual([]);
  });

  it("skips a dynamic declaration that is never used as a JSX tag", () => {
    expect(inferEffects("function Parent() { const C = () => <div />; return <div />; }")).toEqual([]);
  });
});
