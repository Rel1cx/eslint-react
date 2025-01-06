import path from "node:path";

import { O } from "@eslint-react/eff";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { getClassIdentifier } from "./get-class-identifier";
import type { TSESTreeClass } from "./types";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "file.ts"),
  });
}

describe("get class identifier from class declaration", () => {
  it.each([
    ["class Foo {}", "Foo"],
    ["class Foo extends Bar {}", "Foo"],
    ["class Foo<T> {}", "Foo"],
    ["class Foo<T extends Bar> {}", "Foo"],
  ])("should return the class name from %s", (code, expected) => {
    let n = O.none<TSESTreeClass>();
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type !== T.ClassDeclaration) return;
        const id = O.getOrThrow(getClassIdentifier(node));
        expect(id).include({ type: T.Identifier, name: expected });
        n = O.fromNullable(node);
      },
    }, true);
    expect(O.isSome(n)).toBe(true);
  });
});

describe("get class identifier from class expression", () => {
  it.each([
    ["const Foo = class {};", "Foo"],
    ["const Foo = class extends Bar {};", "Foo"],
    ["const Foo = class<T> {};", "Foo"],
    ["const Foo = class<T extends Bar> {};", "Foo"],
  ])("should return the class name from %s", (code, expected) => {
    let n = O.none<TSESTreeClass>();
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type !== T.ClassExpression) return;
        const id = O.getOrThrow(getClassIdentifier(node));
        expect(id).include({ type: T.Identifier, name: expected });
        n = O.fromNullable(node);
      },
    }, true);
    expect(O.isSome(n)).toBe(true);
  });
});
