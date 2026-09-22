import { Check } from "@eslint-react/ast";
import { runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { resolve } from "./resolve";

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
      if (!Check.isIdentifier(node, name)) return;
      if (parent == null) return;
      // Skip declaration sites
      if (parent.type === AST.VariableDeclarator && parent.id === node) return;
      if (parent.type === AST.FunctionDeclaration && parent.id === node) return;
      if (parent.type === AST.ClassDeclaration && parent.id === node) return;
      if (parent.type === AST.ImportSpecifier) return;
      if (parent.type === AST.ImportDefaultSpecifier) return;
      if (parent.type === AST.TSEnumDeclaration && parent.id === node) return;
      if (parent.type === AST.TSEnumMember && parent.id === node) return;
      if (parent.type === AST.TSModuleDeclaration && parent.id === node) return;
      if (parent.type === AST.TSTypeAliasDeclaration && parent.id === node) return;
      // dprint-ignore
      // Skip function parameters (Identifier directly inside a function params array)
      if ((parent.type === AST.FunctionDeclaration || parent.type === AST.FunctionExpression || parent.type === AST.ArrowFunctionExpression) && parent.params.some((p) => p === node)) {
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
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.Literal);
    expect((node as TSESTree.Literal | undefined)?.value).toBe(42);
  });

  it("should resolve a FunctionName to the FunctionDeclaration node", () => {
    const code = "function foo() {} foo;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "foo");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.FunctionDeclaration);
  });

  it("should resolve a ClassName to the ClassDeclaration node", () => {
    const code = "class Foo {} Foo;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "Foo");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.ClassDeclaration);
  });

  it("should return null for a Parameter since its value is supplied by the caller", () => {
    const code = "function bar(p) { p; }";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "p");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for an ImportBinding", () => {
    const code = 'import { x } from "mod"; x;';
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for a variable without an initializer", () => {
    const code = "let x; x;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for an object destructured binding instead of the source object", () => {
    const code = "const { a } = obj; a;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "a");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[refs.length - 1]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    // The declarator's `init` is the source object `obj`, not the value of `a`
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for a renamed object destructured binding", () => {
    const code = "const { b: a } = obj; a;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "a");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[refs.length - 1]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for an array destructured binding", () => {
    const code = "const [x] = arr; x;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[refs.length - 1]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for a nested destructured binding", () => {
    const code = "const { p: { q } } = obj; q;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "q");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[refs.length - 1]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for a destructured binding with a default value", () => {
    const code = "const { a = 1 } = obj; a;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "a");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[refs.length - 1]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should respect the `at` option to pick among multiple definitions", () => {
    const code = "var x = 1; var x = 2; x;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const ref = refs[refs.length - 1]!;
      const resolvedFirst = resolve(context, ref, { at: 0 });
      const resolvedLast = resolve(context, ref, { at: -1 });
      return [{ first: resolvedFirst, last: resolvedLast }];
    });
    expect(facts).toHaveLength(1);
    const { first, last } = facts[0] ?? {};
    expect(first).not.toBeNull();
    expect(first?.type).toBe(AST.Literal);
    expect((first as TSESTree.Literal | undefined)?.value).toBe(1);
    expect(last).not.toBeNull();
    expect(last?.type).toBe(AST.Literal);
    expect((last as TSESTree.Literal | undefined)?.value).toBe(2);
  });

  it("should find outer scope variable when localOnly is false but not when localOnly is true", () => {
    const code = "const outer = 99; function inner() { outer; }";
    const facts = runInRule(code, (context, ast) => {
      // Find the `outer` reference inside the function body
      const identifiers: TSESTree.Identifier[] = [];
      simpleTraverse(ast, {
        enter(node, parent) {
          if (!Check.isIdentifier(node, "outer")) return;
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
    expect(facts).toHaveLength(1);
    const { resolvedDefault, resolvedLocal } = facts[0] ?? {};
    // localOnly: false should resolve to the outer variable's initializer
    expect(resolvedDefault).not.toBeNull();
    expect(resolvedDefault?.type).toBe(AST.Literal);
    expect((resolvedDefault as TSESTree.Literal | undefined)?.value).toBe(99);
    // localOnly: true should not find it since it's in an outer scope
    expect(resolvedLocal).toBeNull();
  });

  it("should resolve a same-scope variable when localOnly is true", () => {
    const code = "const x = 1; x;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!, { localOnly: true });
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.Literal);
    expect((node as TSESTree.Literal | undefined)?.value).toBe(1);
  });

  it("should return null for an undeclared identifier", () => {
    const code = "undeclared;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "undeclared");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null when the `at` index is out of range", () => {
    const code = "const x = 1; x;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const ref = refs[0]!;
      return [{
        beyondEnd: resolve(context, ref, { at: 1 }),
        beforeStart: resolve(context, ref, { at: -2 }),
      }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.beyondEnd).toBeNull();
    expect(facts[0]?.beforeStart).toBeNull();
  });

  it("should resolve a named FunctionExpression to the FunctionExpression node", () => {
    const code = "const f = function g() { g; };";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "g");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.FunctionExpression);
  });

  it("should resolve a named ClassExpression to the ClassExpression node", () => {
    const code = "const C = class K { static { K; } };";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "K");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.ClassExpression);
  });

  it("should return null for an arrow function parameter", () => {
    const code = "const f = (p) => { p; };";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "p");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for a parameter of a function type signature", () => {
    const code = "type F = (p: number) => void;";
    const facts = runInRule(code, (context, ast) => {
      // The only `p` here is the parameter name inside the TSFunctionType
      const refs = findIdentifierReferences(ast, "p");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for a CatchClause binding", () => {
    const code = "try {} catch (e) { e; }";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "e");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[refs.length - 1]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should resolve a TSEnumName to the TSEnumDeclaration node", () => {
    const code = "enum Color { Red } Color;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "Color");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.TSEnumDeclaration);
  });

  it("should resolve a TSEnumMember to its initializer", () => {
    const code = "enum E { A = 1, B = A }";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "A");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.Literal);
    expect((node as TSESTree.Literal | undefined)?.value).toBe(1);
  });

  it("should return null for a TSEnumMember without an initializer", () => {
    const code = "enum E { A, B = A }";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "A");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for a TSModuleName", () => {
    const code = "namespace NS { export const v = 1; } NS.v;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "NS");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for a type alias reference", () => {
    const code = "type T = number; const x: T = 1;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "T");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolve(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });
});
