import { type ParseCodeOptions, fixturePath, getFirstExpression, getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getNestedIdentifiers } from "./helpers";

function getNames(node: TSESTree.Node): string[] {
  return getNestedIdentifiers(node).map((id) => id.name);
}

describe("getNestedIdentifiers", () => {
  it("should collect the node itself when it is an identifier", () => {
    expect(getNames(getFirstExpression("foo;"))).toEqual(["foo"]);
  });

  it("should collect nothing from a literal", () => {
    expect(getNames(getFirstExpression("42;"))).toEqual([]);
  });

  it("should visit the callee before the call arguments", () => {
    expect(getNames(getFirstExpression("foo(a, b);"))).toEqual(["foo", "a", "b"]);
  });

  it("should visit the callee before the new arguments", () => {
    expect(getNames(getFirstExpression("new Foo(a);"))).toEqual(["Foo", "a"]);
  });

  it("should visit a callee before descending into its arguments", () => {
    expect(getNames(getFirstExpression("foo(bar(x), y);"))).toEqual(["foo", "bar", "x", "y"]);
  });

  it("should skip holes in array expressions", () => {
    expect(getNames(getFirstExpression("[a, , b];"))).toEqual(["a", "b"]);
  });

  it("should collect a shorthand property exactly once", () => {
    expect(getNames(getFirstExpression("({ a });"))).toEqual(["a"]);
  });

  it("should never visit property keys, even computed ones", () => {
    expect(getNames(getFirstExpression("({ [k]: v });"))).toEqual(["v"]);
  });

  it("should collect pattern defaults through object patterns", () => {
    const pattern = getFirstNodeOfType<TSESTree.ObjectPattern>("const { a = b } = c;", AST.ObjectPattern);
    expect(getNames(pattern)).toEqual(["a", "b"]);
  });

  it("should not descend into rest elements of patterns", () => {
    const pattern = getFirstNodeOfType<TSESTree.ArrayPattern>("const [first, ...rest] = x;", AST.ArrayPattern);
    expect(getNames(pattern)).toEqual(["first"]);
  });

  it("should skip the property of non-computed member access", () => {
    expect(getNames(getFirstExpression("obj.prop;"))).toEqual(["obj"]);
    expect(getNames(getFirstExpression("a.b.c;"))).toEqual(["a"]);
  });

  it("should visit the property of computed member access", () => {
    expect(getNames(getFirstExpression("obj[prop];"))).toEqual(["obj", "prop"]);
  });

  it("should visit binary and logical operands in left-to-right order", () => {
    expect(getNames(getFirstExpression("a + b;"))).toEqual(["a", "b"]);
    expect(getNames(getFirstExpression("a && b;"))).toEqual(["a", "b"]);
  });

  it("should visit assignment sides in left-to-right order", () => {
    expect(getNames(getFirstExpression("a = b;"))).toEqual(["a", "b"]);
  });

  it("should visit conditional branches in test, consequent, alternate order", () => {
    expect(getNames(getFirstExpression("a ? b : c;"))).toEqual(["a", "b", "c"]);
  });

  it("should visit sequence expressions in order", () => {
    expect(getNames(getFirstExpression("(a, b, c);"))).toEqual(["a", "b", "c"]);
  });

  it("should visit template literal expressions", () => {
    expect(getNames(getFirstExpression("`${a}${b}`;"))).toEqual(["a", "b"]);
  });

  it("should visit the tag before the quasi in tagged templates", () => {
    expect(getNames(getFirstExpression("tag`${a}`;"))).toEqual(["tag", "a"]);
  });

  it("should visit unary and update arguments", () => {
    expect(getNames(getFirstExpression("!x;"))).toEqual(["x"]);
    expect(getNames(getFirstExpression("++x;"))).toEqual(["x"]);
  });

  it("should visit await arguments", () => {
    const node = getFirstNodeOfType<TSESTree.AwaitExpression>("async function f() { await x; }", AST.AwaitExpression);
    expect(getNames(node)).toEqual(["x"]);
  });

  it("should visit yield arguments when present", () => {
    const node = getFirstNodeOfType<TSESTree.YieldExpression>("function* g() { yield x; }", AST.YieldExpression);
    expect(getNames(node)).toEqual(["x"]);
  });

  it("should collect nothing from a bare yield", () => {
    const node = getFirstNodeOfType<TSESTree.YieldExpression>("function* g() { yield; }", AST.YieldExpression);
    expect(getNames(node)).toEqual([]);
  });

  it("should unwrap chain expressions, skipping non-computed members", () => {
    expect(getNames(getFirstExpression("a?.b?.[c];"))).toEqual(["a", "c"]);
  });

  it("should unwrap TS type wrappers without collecting type references", () => {
    expect(getNames(getFirstExpression("x as Foo;"))).toEqual(["x"]);
    expect(getNames(getFirstExpression("x!;"))).toEqual(["x"]);
    expect(getNames(getFirstExpression("x satisfies Foo;"))).toEqual(["x"]);
  });

  it("should unwrap TS instantiation and assertion expressions", () => {
    const options: ParseCodeOptions = { filePath: fixturePath("file.ts") };
    expect(getNames(getFirstExpression("f<number>;", options))).toEqual(["f"]);
    expect(getNames(getFirstExpression("(<Foo>x);", options))).toEqual(["x"]);
  });

  it("should visit spread element arguments", () => {
    expect(getNames(getFirstExpression("[...a];"))).toEqual(["a"]);
  });

  it("should visit import expression sources", () => {
    expect(getNames(getFirstExpression("import(source);", { sourceType: "module" }))).toEqual(["source"]);
  });

  it("should not descend into function bodies or params", () => {
    expect(getNames(getFirstExpression("((a) => foo(a))(bar);"))).toEqual(["bar"]);
    expect(getNames(getFirstExpression("foo(function () { return x; });"))).toEqual(["foo"]);
  });

  it("should not descend into object method bodies", () => {
    expect(getNames(getFirstExpression("({ m() { return x; } });"))).toEqual([]);
  });

  it("should not descend into class heritage or bodies", () => {
    expect(getNames(getFirstExpression("(class extends Base {});"))).toEqual([]);
  });

  it("should not descend into JSX", () => {
    expect(getNames(getFirstExpression("(<div attr={a}>{b}</div>);"))).toEqual([]);
  });

  it("should visit for-in left and right but not the body", () => {
    const node = getFirstNodeOfType<TSESTree.ForInStatement>("for (x in obj) { foo(); }", AST.ForInStatement);
    expect(getNames(node)).toEqual(["x", "obj"]);
  });

  it("should not descend into for-of declaration left sides", () => {
    const node = getFirstNodeOfType<TSESTree.ForOfStatement>("for (const k of obj) { foo(); }", AST.ForOfStatement);
    expect(getNames(node)).toEqual(["obj"]);
  });

  it("should collect a deep mixed nesting of calls, news, and members in exact order", () => {
    expect(getNames(getFirstExpression("foo(bar(x), new Baz(y)).qux;"))).toEqual(["foo", "bar", "x", "Baz", "y"]);
  });

  it("should collect only the roots and computed keys of mixed member chains", () => {
    expect(getNames(getFirstExpression("a.b[c].d[e];"))).toEqual(["a", "c", "e"]);
  });

  it("should visit the optional member callee before the call arguments", () => {
    expect(getNames(getFirstExpression("a?.b?.[c]?.(d);"))).toEqual(["a", "c", "d"]);
  });

  it("should visit the object of a member callee before the call arguments", () => {
    expect(getNames(getFirstExpression("a.b(c);"))).toEqual(["a", "c"]);
  });

  it("should collect renamed pattern values and defaults but not keys", () => {
    const pattern = getFirstNodeOfType<TSESTree.ObjectPattern>("const { a: { b = c }, d: [e] } = f;", AST.ObjectPattern);
    expect(getNames(pattern)).toEqual(["b", "c", "e"]);
  });

  it("should visit a sequence mixing assignment and conditional in order", () => {
    expect(getNames(getFirstExpression("(a = b, c ? d : e);"))).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("should visit a template literal nested in a tagged template", () => {
    expect(getNames(getFirstExpression("tag`${`${a}${b}`}`;"))).toEqual(["tag", "a", "b"]);
  });

  it("should visit spread elements nested in call arguments and arrays", () => {
    expect(getNames(getFirstExpression("f(...[g, ...h]);"))).toEqual(["f", "g", "h"]);
  });

  it("should exclude function bodies nested among collected nodes", () => {
    expect(getNames(getFirstExpression("foo(() => { return bar; }, baz);"))).toEqual(["foo", "baz"]);
  });

  it("should exclude class expressions nested in collected nodes", () => {
    expect(getNames(getFirstExpression("foo(class extends Bar {});"))).toEqual(["foo"]);
  });

  it("should unwrap stacked TS wrappers and instantiation calls", () => {
    const options: ParseCodeOptions = { filePath: fixturePath("file.ts") };
    expect(getNames(getFirstExpression("(x as A)!;", options))).toEqual(["x"]);
    expect(getNames(getFirstExpression("f<number>(g);", options))).toEqual(["f", "g"]);
  });

  it("should visit an await nested in a yield argument", () => {
    const node = getFirstNodeOfType<TSESTree.YieldExpression>("function* g() { yield await x; }", AST.YieldExpression);
    expect(getNames(node)).toEqual(["x"]);
  });

  it("should visit update arguments through member chains", () => {
    expect(getNames(getFirstExpression("++a.b[c];"))).toEqual(["a", "c"]);
  });

  it("should collect a deep stress nesting alternating call, member, template, and binary in exact order", () => {
    expect(getNames(getFirstExpression("f(g.h(`${i + o(p)}`), k[l]).m[n];"))).toEqual([
      "f",
      "g",
      "i",
      "o",
      "p",
      "k",
      "l",
      "n",
    ]);
  });
});
