/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../test";
import { findParent } from "./traverse";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
    jsx: true,
  });
}

function parseAst(code: string) {
  return parse(code).ast;
}

function collectNodes<T extends TSESTree.Node>(ast: TSESTree.Node, type: AST): T[] {
  const nodes: T[] = [];
  simpleTraverse(
    ast,
    {
      enter(node) {
        if (node.type === type) {
          nodes.push(node as T);
        }
      },
    },
    true,
  );
  return nodes;
}

describe("findParent", () => {
  it("should return the first matching ancestor", () => {
    const ast = parseAst("function foo() { const x = 1; }");
    const [, identifier] = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    // @ts-expect-error
    const parent = findParent(identifier, (n) => n.type === AST.FunctionDeclaration);
    expect(parent).not.toBeNull();
    expect(parent!.type).toBe(AST.FunctionDeclaration);
  });

  it("should return null when the stop boundary itself matches test (stop wins)", () => {
    const ast = parseAst("function foo() { const x = 1; }");
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const [func] = collectNodes<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    const identifier = ids.at(-1)!;
    const parent = findParent(
      identifier,
      (n) => n.type === AST.FunctionDeclaration,
      (n) => n === func,
    );
    expect(parent).toBeNull();
  });

  it("should return the nested match when it appears before the stop boundary", () => {
    const ast = parseAst("function foo() { function bar() { const x = 1; } }");
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const [foo] = collectNodes<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    const identifier = ids.at(-1)!;
    const parent = findParent(
      identifier,
      (n) => n.type === AST.FunctionDeclaration,
      (n) => n === foo,
    );
    expect(parent).not.toBeNull();
    expect(parent!.type).toBe(AST.FunctionDeclaration);
    expect(parent).not.toBe(foo);
  });

  it("should return null when no match is found before Program", () => {
    const ast = parseAst("const x = 1;");
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const identifier = ids.at(-1)!;
    const parent = findParent(identifier, (n) => n.type === AST.FunctionDeclaration);
    expect(parent).toBeNull();
  });

  it("should return null when node is null", () => {
    const parent = findParent(null, (n) => n.type === AST.FunctionDeclaration);
    expect(parent).toBeNull();
  });

  it("should return null when a non-function stop blocks the search", () => {
    const ast = parseAst("function foo() { if (true) { const x = 1; } }");
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const [ifStmt] = collectNodes<TSESTree.IfStatement>(ast, AST.IfStatement);
    const identifier = ids.at(-1)!;
    const parent = findParent(
      identifier,
      (n) => n.type === AST.FunctionDeclaration,
      (n) => n === ifStmt,
    );
    expect(parent).toBeNull();
  });

  it("should find the match when stop is not an ancestor", () => {
    const ast = parseAst("function foo() { const x = 1; } function bar() {}");
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const [, x] = ids;
    const [, bar] = collectNodes<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    const parent = findParent(
      // @ts-expect-error
      x,
      (n) => n.type === AST.FunctionDeclaration,
      (n) => n === bar,
    );
    expect(parent).not.toBeNull();
    expect(parent!.type).toBe(AST.FunctionDeclaration);
    expect(parent).not.toBe(bar);
  });
});
