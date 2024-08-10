import path from "node:path";

import { MutRef, O } from "@eslint-react/tools";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { getFunctionIdentifier } from "./get-function-identifier";
import { isFunction } from "./is";
import type { TSESTreeFunction } from "./types";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

describe("get function identifier from function declaration", () => {
  it.each([
    ["function foo() {}", "foo"],
    ["function bar() {}", "bar"],
    ["function baz<T>() {}", "baz"],
  ])("should return the function name from %s", (code, expected) => {
    const n = MutRef.make<TSESTreeFunction | null>(null);
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (!isFunction(node)) return;
        const id = O.getOrThrow(getFunctionIdentifier(node));
        expect(id).include({ type: AST_NODE_TYPES.Identifier, name: expected });
        MutRef.set(n, node);
      },
    }, true);
    expect(MutRef.get(n)).not.toBeNull();
  });
});

describe("get function identifier from function expression", () => {
  it.each([
    ["const foo = function() {};", "foo"],
    ["const bar = function() {};", "bar"],
    ["const baz = function<T>() {};", "baz"],
    ["qux = function() {};", "qux"],
    ["const { Foo = function() {} } = {};", "Foo"],
    ["const { Foo = () => {} } = {};", "Foo"],
    ["({ Foo = function() {} } = {});", "Foo"],
    ["({ Foo = () => {} } = {});", "Foo"],
    ["const object = { Foo() { return <div />; } };", "Foo"],
    ["const object = { Foo: function() { return <div />; } };", "Foo"],
    ["class Clazz { Foo() {} }", "Foo"],
    ["class Clazz { Foo = function() {} }", "Foo"],
    ["class Clazz { Foo = () => {} }", "Foo"],
  ])("should return the function name from %s", (code, expected) => {
    const n = MutRef.make<TSESTreeFunction | null>(null);
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (!isFunction(node)) return;
        const id = O.getOrThrow(getFunctionIdentifier(node));
        expect(id).include({ type: AST_NODE_TYPES.Identifier, name: expected });
        MutRef.set(n, node);
      },
    }, true);
    expect(MutRef.get(n)).not.toBeNull();
  });
});
