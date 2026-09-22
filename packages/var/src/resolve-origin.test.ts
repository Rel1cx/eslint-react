import { Check } from "@eslint-react/ast";
import { runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { resolveOrigin } from "./resolve-origin";

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

describe("resolveOrigin", () => {
  it("should resolve a plain identifier binding to its initializer", () => {
    const code = "const x = 42; x;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.Literal);
    expect((node as TSESTree.Literal | undefined)?.value).toBe(42);
  });

  it("should resolve an object destructured binding to the declarator's initializer", () => {
    const code = "const { a } = obj; a;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "a");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[refs.length - 1]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.Identifier);
    expect((node as TSESTree.Identifier | undefined)?.name).toBe("obj");
  });

  it("should resolve an array destructured binding to the declarator's initializer", () => {
    const code = "const [state, setState] = useState(); setState;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "setState");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[refs.length - 1]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.CallExpression);
    expect((node as TSESTree.CallExpression | undefined)?.callee.type).toBe(AST.Identifier);
  });

  it("should resolve a nested destructured binding to the declarator's initializer", () => {
    const code = "const { p: { q } } = obj; q;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "q");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[refs.length - 1]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.Identifier);
    expect((node as TSESTree.Identifier | undefined)?.name).toBe("obj");
  });

  it("should resolve a renamed object destructured binding to the declarator's initializer", () => {
    const code = "const { b: a } = obj; a;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "a");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[refs.length - 1]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.Identifier);
    expect((node as TSESTree.Identifier | undefined)?.name).toBe("obj");
  });

  it("should resolve a destructured binding with a default value to the declarator's initializer", () => {
    const code = "const { a = 1 } = obj; a;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "a");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[refs.length - 1]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.Identifier);
    expect((node as TSESTree.Identifier | undefined)?.name).toBe("obj");
  });

  it("should resolve a FunctionName to the FunctionDeclaration node", () => {
    const code = "function foo() {} foo;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "foo");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.FunctionDeclaration);
  });

  it("should resolve a Parameter to the containing function node", () => {
    const code = "function bar(p) { p; }";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "p");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.FunctionDeclaration);
  });

  it("should resolve an arrow function parameter to the ArrowFunctionExpression node", () => {
    const code = "const f = (p) => { p; };";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "p");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.ArrowFunctionExpression);
  });

  it("should return null for a parameter of a function type signature", () => {
    const code = "type F = (p: number) => void;";
    const facts = runInRule(code, (context, ast) => {
      // The only `p` here is the parameter name inside the TSFunctionType
      const refs = findIdentifierReferences(ast, "p");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[0]!);
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
      const resolved = resolveOrigin(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should return null for an undeclared identifier", () => {
    const code = "undeclared;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "undeclared");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[0]!);
      return [{ resolved }];
    });
    expect(facts).toHaveLength(1);
    expect(facts[0]?.resolved).toBeNull();
  });

  it("should resolve a named ImportBinding to the import specifier", () => {
    const code = 'import { x } from "mod"; x;';
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.ImportSpecifier);
    expect(node?.parent?.type).toBe(AST.ImportDeclaration);
    expect((node?.parent as TSESTree.ImportDeclaration | undefined)?.source.value).toBe("mod");
  });

  it("should resolve a default ImportBinding to the import specifier", () => {
    const code = 'import x from "mod"; x;';
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const resolved = resolveOrigin(context, refs[0]!);
      return [resolved];
    });
    expect(facts).toHaveLength(1);
    const node = facts[0];
    expect(node).not.toBeNull();
    expect(node?.type).toBe(AST.ImportDefaultSpecifier);
    expect(node?.parent?.type).toBe(AST.ImportDeclaration);
    expect((node?.parent as TSESTree.ImportDeclaration | undefined)?.source.value).toBe("mod");
  });

  it("should respect the `at` option to pick among multiple definitions", () => {
    const code = "var x = 1; var x = 2; x;";
    const facts = runInRule(code, (context, ast) => {
      const refs = findIdentifierReferences(ast, "x");
      expect(refs.length).toBeGreaterThanOrEqual(1);
      const ref = refs[refs.length - 1]!;
      const resolvedFirst = resolveOrigin(context, ref, { at: 0 });
      const resolvedLast = resolveOrigin(context, ref, { at: -1 });
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
      const ref = identifiers[identifiers.length - 1]!;
      const resolvedDefault = resolveOrigin(context, ref, { localOnly: false });
      const resolvedLocal = resolveOrigin(context, ref, { localOnly: true });
      return [{ resolvedDefault, resolvedLocal }];
    });
    expect(facts).toHaveLength(1);
    const { resolvedDefault, resolvedLocal } = facts[0] ?? {};
    expect(resolvedDefault).not.toBeNull();
    expect(resolvedDefault?.type).toBe(AST.Literal);
    expect((resolvedDefault as TSESTree.Literal | undefined)?.value).toBe(99);
    expect(resolvedLocal).toBeNull();
  });
});
