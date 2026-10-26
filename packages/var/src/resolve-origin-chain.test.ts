import { findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { resolveOriginChain } from "./resolve-origin-chain";

function resolveLast(code: string, name: string) {
  return runInRule(code, (context, ast) => {
    const ref = findIdentifierReferences(ast, name).at(-1)!;
    return resolveOriginChain(context, ref);
  });
}

describe("resolveOriginChain", () => {
  describe("alias chains", () => {
    it("should follow a single alias to its origin", () => {
      const code = "const a = {}; const b = a; b;";
      const fact = resolveLast(code, "b");

      expect(fact?.type).toBe(AST.ObjectExpression);
    });

    it("should follow a multi-step alias chain", () => {
      const code = "const a = {}; const b = a; const c = b; c;";
      const fact = resolveLast(code, "c");

      expect(fact?.type).toBe(AST.ObjectExpression);
    });

    it("should unwrap TypeScript type expressions at every step", () => {
      const code = "const a = {}; const b = a as {}; const c = b; c;";
      const fact = resolveLast(code, "c");

      expect(fact?.type).toBe(AST.ObjectExpression);
    });

    it("should stop at the first non-identifier origin", () => {
      const code = "const a = create(); const b = a; b;";
      const fact = resolveLast(code, "b");

      expect(fact?.type).toBe(AST.CallExpression);
    });

    it("should resolve a function name origin", () => {
      const code = "function foo() {} const bar = foo; bar;";
      const fact = resolveLast(code, "bar");

      expect(fact?.type).toBe(AST.FunctionDeclaration);
    });

    it("should resolve a parameter to its containing function", () => {
      const code = "function f(p) { const q = p; q; }";
      const fact = resolveLast(code, "q");

      expect(fact?.type).toBe(AST.FunctionDeclaration);
    });

    it("should resolve an import binding to its import specifier", () => {
      const code = 'import { useState } from "react"; const use = useState; use;';
      const fact = resolveLast(code, "use");

      expect(fact?.type).toBe(AST.ImportSpecifier);
    });
  });

  describe("options", () => {
    it("should respect the `at` option at every step", () => {
      const code = "var x = 1; var x = {}; const y = x; y;";
      const facts = runInRule(code, (context, ast) => {
        const ref = findIdentifierReferences(ast, "y").at(-1)!;
        return {
          first: resolveOriginChain(context, ref, { at: 0 }),
          latest: resolveOriginChain(context, ref, { at: -1 }),
        };
      });

      expect(facts.first?.type).toBe(AST.Literal);
      expect(facts.latest?.type).toBe(AST.ObjectExpression);
    });

    it("should only resolve same-scope identifiers when `localOnly` is set", () => {
      const code = "const a = {}; function f() { const b = a; b; }";
      const facts = runInRule(code, (context, ast) => {
        const ref = findIdentifierReferences(ast, "b").at(-1)!;
        return {
          chained: resolveOriginChain(context, ref),
          local: resolveOriginChain(context, ref, { localOnly: true }),
        };
      });

      expect(facts.chained?.type).toBe(AST.ObjectExpression);
      expect(facts.local).toBeNull();
    });

    it("should give up when the chain exceeds `maxDepth`", () => {
      const code = "const a = {}; const b = a; const c = b; c;";
      const facts = runInRule(code, (context, ast) => {
        const ref = findIdentifierReferences(ast, "c").at(-1)!;
        return {
          shallow: resolveOriginChain(context, ref, { maxDepth: 2 }),
          deep: resolveOriginChain(context, ref, { maxDepth: 3 }),
        };
      });

      expect(facts.shallow).toBeNull();
      expect(facts.deep?.type).toBe(AST.ObjectExpression);
    });
  });

  describe("cycle safety", () => {
    it("should return null for a two-variable cycle", () => {
      const code = "const a = b; const b = a; a;";
      const fact = resolveLast(code, "a");

      expect(fact).toBeNull();
    });

    it("should return null for a longer cycle", () => {
      const code = "const a = b; const b = c; const c = a; a;";
      const fact = resolveLast(code, "a");

      expect(fact).toBeNull();
    });

    it("should return null for a self-referential binding", () => {
      const code = "const a = a; a;";
      const fact = resolveLast(code, "a");

      expect(fact).toBeNull();
    });

    it("should return null when an alias has no initializer", () => {
      const code = "let a; const b = a; b;";
      const fact = resolveLast(code, "b");

      expect(fact).toBeNull();
    });
  });
});
