import type { TSESTreeFunction } from "../ast-node";

import path from "node:path";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

import { describe, expect, it } from "vitest";
import { getFixturesRootDir } from "../../../../../test";
import { getFunctionId } from "../ast-function-id";
import { isFunction } from "../ast-is";

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
    let n: null | TSESTreeFunction = null;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (!isFunction(node)) {
          return;
        }
        expect(getFunctionId(node)).include({ type: T.Identifier, name: expected });
        n = node;
      },
    }, true);
    expect(n).not.toBeNull();
  });
});

describe("get function identifier from function expression", () => {
  it.each([
    ["const foo = function() {};", "foo"],
    ["const bar = function() {};", "bar"],
    ["const baz = function<T>() {};", "baz"],
    ["const qux = (() => {})!;", "qux"],
    ["const quux = (() => {})!!;", "quux"],
    ["const quuz = (() => {}) as Function;", "quuz"],
    ["const corge = (() => {}) as () => void;", "corge"],
    ["const grault = (() => {}) satisfies Function;", "grault"],
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
    let n: null | TSESTreeFunction = null;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (!isFunction(node)) {
          return;
        }
        expect(getFunctionId(node)).include({ type: T.Identifier, name: expected });
        n = node;
      },
    }, true);
    expect(n).not.toBeNull();
  });
});
