/// <reference types="node" />

import * as tsParser from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { Linter } from "eslint";
import { describe, expect, it } from "vitest";

import { computeObjectType } from "./compute-object-type";

// Helper: run code through eslint with a custom rule, call fn inside rule listener
function runInRule<T>(code: string, fn: (context: any, ast: TSESTree.Program) => T): T {
  let result: T | undefined;
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
                  result = fn(context, programNode);
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
  return result as T;
}

// Helper: find first node of a given type
function findFirst<T extends TSESTree.Node>(ast: TSESTree.Node, type: AST): T | undefined {
  let found: T | undefined;
  simpleTraverse(ast, {
    enter(node) {
      if (found == null && node.type === type) found = node as T;
    },
  }, true);
  return found;
}

// Helper: find all nodes of a given type
function findAll<T extends TSESTree.Node>(ast: TSESTree.Node, type: AST): T[] {
  const result: T[] = [];
  simpleTraverse(ast, {
    enter(node) {
      if (node.type === type) result.push(node as T);
    },
  }, true);
  return result;
}

describe("computeObjectType", () => {
  describe("basic type detection", () => {
    it("JSXElement → kind: 'jsx'", () => {
      const code = "const x = <div />;";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.JSXElement>(ast, AST.JSXElement);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("jsx");
    });

    it("JSXFragment → kind: 'jsx'", () => {
      const code = "const x = <></>;";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.JSXFragment>(ast, AST.JSXFragment);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("jsx");
    });

    it("ArrayExpression → kind: 'array'", () => {
      const code = "const x = [1, 2, 3];";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ArrayExpression>(ast, AST.ArrayExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("array");
    });

    it("ObjectExpression → kind: 'plain'", () => {
      const code = "const x = { a: 1 };";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ObjectExpression>(ast, AST.ObjectExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("plain");
    });

    it("ClassExpression → kind: 'class'", () => {
      const code = "const x = class {};";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ClassExpression>(ast, AST.ClassExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("class");
    });

    it("NewExpression → kind: 'instance'", () => {
      const code = "const x = new Foo();";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.NewExpression>(ast, AST.NewExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("instance");
    });

    it("ArrowFunctionExpression → kind: 'function'", () => {
      const code = "const x = () => {};";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ArrowFunctionExpression>(ast, AST.ArrowFunctionExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("function");
    });

    it("Regex literal → kind: 'regexp'", () => {
      const code = "const x = /abc/;";
      const result = runInRule(code, (context, ast) => {
        // The regex literal is a Literal node with a `regex` property
        const literals = findAll<TSESTree.Literal>(ast, AST.Literal);
        const regexNode = literals.find((n) => "regex" in n);
        expect(regexNode).toBeDefined();
        return computeObjectType(context, regexNode!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("regexp");
    });

    it("CallExpression Array() → kind: 'array'", () => {
      const code = "const x = Array();";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("array");
    });

    it("CallExpression Object() → kind: 'plain'", () => {
      const code = "const x = Object();";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("plain");
    });

    it("CallExpression RegExp() → kind: 'regexp'", () => {
      const code = 'const x = RegExp("abc");';
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("regexp");
    });

    it("ConditionalExpression picks first non-null (consequent)", () => {
      const code = "const cond = true; const x = cond ? [1] : {};";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ConditionalExpression>(ast, AST.ConditionalExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      // consequent is [1] → array, so that wins via the ?? fallback
      expect(result!.kind).toBe("array");
    });
  });

  describe("issue verification", () => {
    it("FIXED: LogicalExpression (||) now checks left side first", () => {
      // Previously only evaluated the right side. Now evaluates left first,
      // falling back to right — consistent with ConditionalExpression behavior.
      const code = "const arr = [1, 2]; const x = arr || {};";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.LogicalExpression>(ast, AST.LogicalExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      // Left side `arr` is an array — now correctly returned
      expect(result!.kind).toBe("array");
    });

    it("FIXED: LogicalExpression (??) now checks left side first", () => {
      // The `??` operator returns left if not null/undefined, so the left side
      // should have priority. Now correctly evaluates left first.
      const code = "const arr = [1]; const x = arr ?? {};";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.LogicalExpression>(ast, AST.LogicalExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      // Left side `arr` is an array — now correctly returned
      expect(result!.kind).toBe("array");
    });

    it("FIXED: CallExpression now recognizes Array.from()", () => {
      // Static factory methods like Array.from() are now recognized.
      const code = "const x = Array.from([1, 2]);";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("array");
    });

    it("FIXED: CallExpression now recognizes Object.create()", () => {
      // Object.create() is now recognized as producing a plain object.
      const code = "const x = Object.create(null);";
      const result = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(result).not.toBeNull();
      expect(result!.kind).toBe("plain");
    });

    it("FIXED: Dead code in MemberExpression guard removed — 'object' property always exists", () => {
      // The guard `if (!("object" in node)) return null;` was dead code and has been removed.
      // MemberExpression nodes always have an `object` property by the TSESTree specification.
      const code = "const a = {}; const x = a.b;";
      runInRule(code, (_context, ast) => {
        const node = findFirst<TSESTree.MemberExpression>(ast, AST.MemberExpression);
        expect(node).toBeDefined();
        expect("object" in node!).toBe(true);
        expect(node!.object).toBeDefined();
        return null;
      });
    });

    it("FIXED: Dead code in AssignmentExpression guard removed — 'right' property always exists", () => {
      // The guard `if (!("right" in node)) return null;` was dead code and has been removed.
      // AssignmentExpression nodes always have a `right` property by the TSESTree specification.
      const code = "let x; x = 1;";
      runInRule(code, (_context, ast) => {
        const node = findFirst<TSESTree.AssignmentExpression>(ast, AST.AssignmentExpression);
        expect(node).toBeDefined();
        expect("right" in node!).toBe(true);
        expect(node!.right).toBeDefined();
        return null;
      });
    });
  });
});
