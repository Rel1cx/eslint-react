/// <reference types="node" />

import * as tsParser from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { Linter } from "eslint";
import { describe, expect, it } from "vitest";

import { resolve } from "./resolve";

function collectResults<T>(code: string, fn: (context: any, ast: TSESTree.Program) => T[]): T[] {
  const results: T[] = [];
  const linter = new Linter();
  linter.verify(code, {
    plugins: {
      test: {
        rules: {
          "test-rule": {
            meta: { type: "problem", messages: {}, schema: [] },
            create(context: any) {
              return {
                Program(programNode: TSESTree.Program) {
                  results.push(...fn(context, programNode));
                },
              };
            },
          },
        },
      },
    },
    rules: { "test/test-rule": "error" },
    languageOptions: {
      parser: tsParser,
      parserOptions: { jsx: true, ecmaFeatures: { jsx: true } },
    },
  });
  return results;
}

/**
 * Find all Identifier nodes with the given name that are references (not declarations).
 * A reference is an Identifier whose parent is not a VariableDeclarator with `id === node`,
 * not a FunctionDeclaration with `id === node`, not a ClassDeclaration with `id === node`,
 * not an ImportSpecifier, and not a function parameter.
 */
function findIdentifierReferences(ast: TSESTree.Program, name: string): TSESTree.Identifier[] {
  const refs: TSESTree.Identifier[] = [];
  simpleTraverse(ast, {
    enter(node, parent) {
      if (node.type !== AST.Identifier || node.name !== name) return;
      if (parent == null) return;
      // Skip declaration sites
      if (parent.type === AST.VariableDeclarator && parent.id === node) return;
      if (parent.type === AST.FunctionDeclaration && parent.id === node) return;
      if (parent.type === AST.ClassDeclaration && parent.id === node) return;
      if (parent.type === AST.ImportSpecifier) return;
      if (parent.type === AST.ImportDefaultSpecifier) return;
      // Skip function parameters (Identifier directly inside a function params array)
      if (
        (parent.type === AST.FunctionDeclaration
          || parent.type === AST.FunctionExpression
          || parent.type === AST.ArrowFunctionExpression)
        && parent.params.some((p) => p === node)
      ) {
        return;
      }
      refs.push(node);
    },
  }, true);
  return refs;
}

describe("resolve", () => {
  it("should resolve a variable definition to its initializer", () => {
    const code = "const x = 42; x;";
    const results = collectResults(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(results).toHaveLength(1);
    const node = results[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.Literal);
    expect((node as TSESTree.Literal | undefined)?.value).toBe(42);
  });

  it("should resolve a FunctionName to the FunctionDeclaration node", () => {
    const code = "function foo() {} foo;";
    const results = collectResults(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "foo");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(results).toHaveLength(1);
    const node = results[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.FunctionDeclaration);
  });

  it("should resolve a ClassName to the ClassDeclaration node", () => {
    const code = "class Foo {} Foo;";
    const results = collectResults(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "Foo");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(results).toHaveLength(1);
    const node = results[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.ClassDeclaration);
  });

  it("should resolve a Parameter to the containing function node", () => {
    const code = "function bar(p) { p; }";
    const results = collectResults(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "p");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(results).toHaveLength(1);
    const node = results[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.FunctionDeclaration);
  });

  it("should return null for an ImportBinding", () => {
    const code = 'import { x } from "mod"; x;';
    const results = collectResults(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(results).toHaveLength(1);
    expect(results[0]?.resolved).toBeNull();
  });

  it("should return null for a variable without an initializer", () => {
    const code = "let x; x;";
    const results = collectResults(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(results).toHaveLength(1);
    expect(results[0]?.resolved).toBeNull();
  });

  it("should respect the `at` option to pick among multiple definitions", () => {
    const code = "var x = 1; var x = 2; x;";
    const results = collectResults(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const ref = refs[refs.length - 1]!;
      const resolvedFirst = resolve(context, ref, { at: 0 });
      const resolvedLast = resolve(context, ref, { at: -1 });
      return [{ first: resolvedFirst, last: resolvedLast }];
    });
    expect(results).toHaveLength(1);
    const { first, last } = results[0] ?? {};
    expect(first).not.toBeNull();
    expect(first?.type).toBe(AST.Literal);
    expect((first as TSESTree.Literal | undefined)?.value).toBe(1);
    expect(last).not.toBeNull();
    expect(last?.type).toBe(AST.Literal);
    expect((last as TSESTree.Literal | undefined)?.value).toBe(2);
  });

  it("should find outer scope variable when localOnly is false but not when localOnly is true", () => {
    const code = "const outer = 99; function inner() { outer; }";
    const results = collectResults(code, (context, ast) => {
      // Find the `outer` reference inside the function body
      const identifiers: TSESTree.Identifier[] = [];
      simpleTraverse(ast, {
        enter(node, parent) {
          if (node.type !== AST.Identifier || node.name !== "outer") return;
          if (parent == null) return;
          if (parent.type === AST.VariableDeclarator && parent.id === node) return;
          identifiers.push(node);
        },
      }, true);
      expect(identifiers.length).toBeGreaterThanOrEqual(1);
      // The reference inside the function body
      const ref = identifiers[identifiers.length - 1]!;
      const resolvedDefault = resolve(context, ref, { localOnly: false });
      const resolvedLocal = resolve(context, ref, { localOnly: true });
      return [{ resolvedDefault, resolvedLocal }];
    });
    expect(results).toHaveLength(1);
    const { resolvedDefault, resolvedLocal } = results[0] ?? {};
    // localOnly: false should resolve to the outer variable's initializer
    expect(resolvedDefault).not.toBeNull();
    expect(resolvedDefault?.type).toBe(AST.Literal);
    expect((resolvedDefault as TSESTree.Literal | undefined)?.value).toBe(99);
    // localOnly: true should not find it since it's in an outer scope
    expect(resolvedLocal).toBeNull();
  });
});
