import path from "node:path";

import { MutRef, O } from "@eslint-react/tools";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { getClassIdentifier } from "./get-class-identifier";

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
    const n = MutRef.make(0);
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type !== AST_NODE_TYPES.ClassDeclaration) return;
        const id = O.getOrThrow(getClassIdentifier(node));
        expect(id).include({ type: AST_NODE_TYPES.Identifier, name: expected });
        MutRef.increment(n);
      },
    }, true);
    expect(MutRef.get(n)).toBe(1);
  });
});

describe("get class identifier from class expression", () => {
  it.each([
    ["const Foo = class {};", "Foo"],
    ["const Foo = class extends Bar {};", "Foo"],
    ["const Foo = class<T> {};", "Foo"],
    ["const Foo = class<T extends Bar> {};", "Foo"],
  ])("should return the class name from %s", (code, expected) => {
    const n = MutRef.make(0);
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type !== AST_NODE_TYPES.ClassExpression) return;
        const id = O.getOrThrow(getClassIdentifier(node));
        expect(id).include({ type: AST_NODE_TYPES.Identifier, name: expected });
        MutRef.increment(n);
      },
    }, true);
    expect(MutRef.get(n)).toBe(1);
  });
});
