import { findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { type ResolveOptions, getBinding, getBindingFromScope, projectBinding } from "./resolve-binding";

function bindingOf(code: string, name: string, options?: ResolveOptions) {
  return runInRule(code, (context, ast) => {
    const ref = findIdentifierReferences(ast, name).at(-1);
    if (ref == null) throw new Error(`no reference to ${name}`);
    return getBinding(context, ref, options);
  });
}

function projectionOf(code: string, name: string, projection: "value" | "origin") {
  return runInRule(code, (context, ast) => {
    const ref = findIdentifierReferences(ast, name).at(-1);
    if (ref == null) throw new Error(`no reference to ${name}`);
    const binding = getBinding(context, ref);
    if (binding?.definition == null) return null;
    return projectBinding(binding.definition, projection);
  });
}

describe("getBinding", () => {
  it("should resolve a variable to its variable and definition", () => {
    const binding = bindingOf("const x = 1; x;", "x");

    expect(binding).not.toBeNull();
    expect(binding!.variable.name).toBe("x");
    expect(binding!.definition?.node.type).toBe(AST.VariableDeclarator);
  });

  it("should select definitions using `at`", () => {
    const code = "var x = 1; var x = 2; x;";
    const facts = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "x").at(-1)!;
      const project = (at: number) => {
        const binding = getBinding(context, ref, { at });
        if (binding?.definition == null) return null;
        return projectBinding(binding.definition, "value") as TSESTree.Literal | null;
      };
      return {
        first: project(0)?.value,
        latest: project(-1)?.value,
        outOfRange: project(2),
      };
    });

    expect(facts.first).toBe(1);
    expect(facts.latest).toBe(2);
    expect(facts.outOfRange).toBeNull();
  });

  it("should respect `localOnly`", () => {
    const code = "const outer = 99; function inner() { outer; }";
    const facts = runInRule(code, (context, ast) => {
      const ref = findIdentifierReferences(ast, "outer").at(-1)!;
      return {
        default: getBinding(context, ref)?.variable.name,
        local: getBinding(context, ref, { localOnly: true }),
      };
    });

    expect(facts.default).toBe("outer");
    expect(facts.local).toBeNull();
  });

  it("should return null for an undeclared identifier", () => {
    expect(bindingOf("undeclared;", "undeclared")).toBeNull();
  });

  it("should return a binding without a definition for a configured global", () => {
    const binding = bindingOf("/* global EVENT */\nEVENT;", "EVENT");

    expect(binding).not.toBeNull();
    expect(binding!.definition).toBeNull();
    expect(binding!.variable.name).toBe("EVENT");
  });

  it("should resolve from an already-computed scope", () => {
    const fact = runInRule("const x = 1; x;", (context, ast) => {
      const ref = findIdentifierReferences(ast, "x").at(-1)!;
      const fromScope = getBindingFromScope(context.sourceCode.getScope(ref), ref);
      return fromScope?.variable === getBinding(context, ref)?.variable;
    });

    expect(fact).toBe(true);
  });
});

describe("projectBinding", () => {
  describe("value projection", () => {
    it("should return the initializer of a plain identifier binding", () => {
      const node = projectionOf("const x = 1; x;", "x", "value");

      expect(node?.type).toBe(AST.Literal);
      expect((node as TSESTree.Literal | null)?.value).toBe(1);
    });

    it("should return null for a destructured binding", () => {
      expect(projectionOf("const { a } = obj; a;", "a", "value")).toBeNull();
    });

    it("should return null for a binding without an initializer", () => {
      expect(projectionOf("let x; x;", "x", "value")).toBeNull();
    });

    it("should return function and class declaration nodes", () => {
      expect(projectionOf("function foo() {} foo;", "foo", "value")?.type).toBe(AST.FunctionDeclaration);
      expect(projectionOf("class C {} C;", "C", "value")?.type).toBe(AST.ClassDeclaration);
    });

    it("should return null for parameters", () => {
      expect(projectionOf("function f(p) { p; }", "p", "value")).toBeNull();
    });

    it("should return null for import bindings", () => {
      expect(projectionOf('import { x } from "mod"; x;', "x", "value")).toBeNull();
    });

    it("should return enum declarations and member initializers", () => {
      expect(projectionOf("enum E { A = 1 } E;", "E", "value")?.type).toBe(AST.TSEnumDeclaration);
      expect(projectionOf("enum E { A = 1, B = A }", "A", "value")?.type).toBe(AST.Literal);
    });

    it("should return null for enum members without an initializer", () => {
      expect(projectionOf("enum E { A, B = A }", "A", "value")).toBeNull();
    });

    it("should return null for catch, module, and type definitions", () => {
      expect(projectionOf("try {} catch (e) { e; }", "e", "value")).toBeNull();
      expect(projectionOf("namespace NS {} NS;", "NS", "value")).toBeNull();
      expect(projectionOf("type T = number; const x: T = 1;", "T", "value")).toBeNull();
    });
  });

  describe("origin projection", () => {
    it("should return the declarator initializer for destructured bindings", () => {
      const node = projectionOf("const { a } = obj; a;", "a", "origin");

      expect(node?.type).toBe(AST.Identifier);
      expect((node as TSESTree.Identifier | null)?.name).toBe("obj");
    });

    it("should return the containing function for parameters", () => {
      expect(projectionOf("function f(p) { p; }", "p", "origin")?.type).toBe(AST.FunctionDeclaration);
    });

    it("should return null for parameters of function type signatures", () => {
      expect(projectionOf("type F = (p: number) => void;", "p", "origin")).toBeNull();
    });

    it("should return the import specifier for import bindings", () => {
      expect(projectionOf('import { x } from "mod"; x;', "x", "origin")?.type).toBe(AST.ImportSpecifier);
    });

    it("should return the same initializer as the value projection for plain bindings", () => {
      const node = projectionOf("const x = 1; x;", "x", "origin");

      expect(node?.type).toBe(AST.Literal);
      expect((node as TSESTree.Literal | null)?.value).toBe(1);
    });
  });
});
