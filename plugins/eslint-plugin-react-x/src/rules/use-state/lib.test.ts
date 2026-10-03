import { getFirstExpression, getFirstNodeOfType, getTextOf } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getNestedCallExpressions, getNestedNewExpressions } from "./lib";

function getCallTexts(code: string, node: TSESTree.Node): string[] {
  return getNestedCallExpressions(node).map((n) => getTextOf(code, n));
}

function getNewTexts(code: string, node: TSESTree.Node): string[] {
  return getNestedNewExpressions(node).map((n) => getTextOf(code, n));
}

describe("getNestedCallExpressions", () => {
  it("should collect the root itself when it is a call expression", () => {
    const code = "foo();";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["foo()"]);
  });

  it("should visit the callee after the arguments", () => {
    const code = "(foo())(bar());";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["(foo())(bar())", "bar()", "foo()"]);
  });

  it("should visit nested calls inside-out per argument", () => {
    const code = "foo(bar(x), y);";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["foo(bar(x), y)", "bar(x)"]);
  });

  it("should not visit non-computed member properties", () => {
    const code = "foo.bar();";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["foo.bar()"]);
  });

  it("should visit computed member properties", () => {
    const code = "foo[bar()]();";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["foo[bar()]()", "bar()"]);
  });

  it("should visit if statement test, consequent, and alternate", () => {
    const code = "if (foo()) bar(); else baz();";
    const node = getFirstNodeOfType<TSESTree.IfStatement>(code, AST.IfStatement);
    expect(getCallTexts(code, node)).toEqual(["foo()", "bar()", "baz()"]);
  });

  it("should not descend into block statements", () => {
    const code = "if (foo()) { bar(); }";
    const node = getFirstNodeOfType<TSESTree.IfStatement>(code, AST.IfStatement);
    expect(getCallTexts(code, node)).toEqual(["foo()"]);
  });

  it("should follow else-if chains through alternate", () => {
    const code = "if (a) b(); else if (c()) d();";
    const node = getFirstNodeOfType<TSESTree.IfStatement>(code, AST.IfStatement);
    expect(getCallTexts(code, node)).toEqual(["b()", "c()", "d()"]);
  });

  it("should not descend into switch statements", () => {
    const code = "switch (x) { case foo(): bar(); break; }";
    const node = getFirstNodeOfType<TSESTree.SwitchStatement>(code, AST.SwitchStatement);
    expect(getCallTexts(code, node)).toEqual([]);
  });

  it("should visit switch case test and consequent list", () => {
    const code = "switch (x) { case foo(): bar(); break; }";
    const node = getFirstNodeOfType<TSESTree.SwitchCase>(code, AST.SwitchCase);
    expect(getCallTexts(code, node)).toEqual(["foo()", "bar()"]);
  });

  it("should skip the null test of a default switch case", () => {
    const code = "switch (x) { default: baz(); }";
    const node = getFirstNodeOfType<TSESTree.SwitchCase>(code, AST.SwitchCase);
    expect(getCallTexts(code, node)).toEqual(["baz()"]);
  });

  it("should visit while and do-while tests but not their bodies", () => {
    const whileCode = "while (foo()) { bar(); }";
    const whileNode = getFirstNodeOfType<TSESTree.WhileStatement>(whileCode, AST.WhileStatement);
    expect(getCallTexts(whileCode, whileNode)).toEqual(["foo()"]);
    const doCode = "do { bar(); } while (foo());";
    const doNode = getFirstNodeOfType<TSESTree.DoWhileStatement>(doCode, AST.DoWhileStatement);
    expect(getCallTexts(doCode, doNode)).toEqual(["foo()"]);
  });

  it("should visit only the test of for statements", () => {
    const code = "for (init(); test(); update()) { body(); }";
    const node = getFirstNodeOfType<TSESTree.ForStatement>(code, AST.ForStatement);
    expect(getCallTexts(code, node)).toEqual(["test()"]);
  });

  it("should visit conditional branches", () => {
    const code = "a ? foo() : bar();";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["foo()", "bar()"]);
  });

  it("should visit template literal and tagged template expressions", () => {
    const code = "`${foo()}`;";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["foo()"]);
    const tagged = "tag`${foo()}`;";
    expect(getCallTexts(tagged, getFirstExpression(tagged))).toEqual(["foo()"]);
  });

  it("should visit spread element arguments", () => {
    const code = "foo(...bar());";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["foo(...bar())", "bar()"]);
  });

  it("should unwrap chain expressions", () => {
    const code = "a?.b();";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["a?.b()"]);
  });

  it("should unwrap TS type wrappers", () => {
    const code = "(foo() as Bar);";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["foo()"]);
  });

  it("should visit await arguments", () => {
    const code = "async function f() { await foo(); }";
    const node = getFirstNodeOfType<TSESTree.AwaitExpression>(code, AST.AwaitExpression);
    expect(getCallTexts(code, node)).toEqual(["foo()"]);
  });

  it("should not descend into function bodies or params", () => {
    const code = "((a = foo()) => bar(a))();";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["((a = foo()) => bar(a))()"]);
  });

  it("should not descend into class heritage or bodies", () => {
    const code = "class A extends mixin(foo()) { m() { bar(); } }";
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>(code, AST.ClassDeclaration);
    expect(getCallTexts(code, node)).toEqual([]);
  });

  it("should not descend into JSX elements", () => {
    const code = "<div>{foo()}</div>;";
    const node = getFirstNodeOfType<TSESTree.JSXElement>(code, AST.JSXElement);
    expect(getCallTexts(code, node)).toEqual([]);
  });

  it("should visit JSX expression containers and spread children", () => {
    const code = "<div>{foo()}</div>;";
    const container = getFirstNodeOfType<TSESTree.JSXExpressionContainer>(code, AST.JSXExpressionContainer);
    expect(getCallTexts(code, container)).toEqual(["foo()"]);
    const spreadCode = "<div>{...foo()}</div>;";
    const spread = getFirstNodeOfType<TSESTree.JSXSpreadChild>(spreadCode, AST.JSXSpreadChild);
    expect(getCallTexts(spreadCode, spread)).toEqual(["foo()"]);
  });

  it("should visit decorator expressions", () => {
    const code = "@foo() class A {}";
    const node = getFirstNodeOfType<TSESTree.Decorator>(code, AST.Decorator);
    expect(getCallTexts(code, node)).toEqual(["foo()"]);
  });

  it("should visit TS export assignment expressions", () => {
    const code = "export = foo();";
    const node = getFirstNodeOfType<TSESTree.TSExportAssignment>(code, AST.TSExportAssignment, {
      sourceType: "module",
    });
    expect(getCallTexts(code, node)).toEqual(["foo()"]);
  });
});

describe("getNestedNewExpressions", () => {
  it("should collect the root itself when it is a new expression", () => {
    const code = "new Foo();";
    expect(getNewTexts(code, getFirstExpression(code))).toEqual(["new Foo()"]);
  });

  it("should visit nested new expressions inside-out per argument", () => {
    const code = "new Foo(new Bar());";
    expect(getNewTexts(code, getFirstExpression(code))).toEqual(["new Foo(new Bar())", "new Bar()"]);
  });

  it("should visit call expressions inside the callee of a new expression", () => {
    const code = "new (foo())();";
    expect(getCallTexts(code, getFirstExpression(code))).toEqual(["foo()"]);
  });

  it("should not collect call expressions", () => {
    const code = "foo();";
    expect(getNewTexts(code, getFirstExpression(code))).toEqual([]);
  });
});
