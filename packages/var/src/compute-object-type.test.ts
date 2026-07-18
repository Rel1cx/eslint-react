import { runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { computeObjectType } from "./compute-object-type";

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
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.JSXElement>(ast, AST.JSXElement);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("jsx");
    });

    it("JSXFragment → kind: 'jsx'", () => {
      const code = "const x = <></>;";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.JSXFragment>(ast, AST.JSXFragment);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("jsx");
    });

    it("ArrayExpression → kind: 'array'", () => {
      const code = "const x = [1, 2, 3];";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ArrayExpression>(ast, AST.ArrayExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("ObjectExpression → kind: 'plain'", () => {
      const code = "const x = { a: 1 };";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ObjectExpression>(ast, AST.ObjectExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("ClassExpression → kind: 'class'", () => {
      const code = "const x = class {};";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ClassExpression>(ast, AST.ClassExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("class");
    });

    it("NewExpression → kind: 'instance'", () => {
      const code = "const x = new Foo();";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.NewExpression>(ast, AST.NewExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("instance");
    });

    it("ArrowFunctionExpression → kind: 'function'", () => {
      const code = "const x = () => {};";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ArrowFunctionExpression>(ast, AST.ArrowFunctionExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("function");
    });

    it("Regex literal → kind: 'regexp'", () => {
      const code = "const x = /abc/;";
      const fact = runInRule(code, (context, ast) => {
        // The regex literal is a Literal node with a `regex` property
        const literals = findAll<TSESTree.Literal>(ast, AST.Literal);
        const regexNode = literals.find((n) => "regex" in n);
        expect(regexNode).toBeDefined();
        return computeObjectType(context, regexNode!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("regexp");
    });

    it("CallExpression Array() → kind: 'array'", () => {
      const code = "const x = Array();";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("CallExpression Object() → kind: 'plain'", () => {
      const code = "const x = Object();";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("CallExpression RegExp() → kind: 'regexp'", () => {
      const code = 'const x = RegExp("abc");';
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("regexp");
    });

    it("ConditionalExpression picks first non-null (consequent)", () => {
      const code = "const cond = true; const x = cond ? [1] : {};";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.ConditionalExpression>(ast, AST.ConditionalExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      // consequent is [1] → array, so that wins via the ?? fallback
      expect(fact!.kind).toBe("array");
    });
  });

  describe("issue verification", () => {
    it("FIXED: LogicalExpression (||) now checks left side first", () => {
      // Previously only evaluated the right side. Now evaluates left first,
      // falling back to right — consistent with ConditionalExpression behavior.
      const code = "const arr = [1, 2]; const x = arr || {};";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.LogicalExpression>(ast, AST.LogicalExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      // Left side `arr` is an array — now correctly returned
      expect(fact!.kind).toBe("array");
    });

    it("FIXED: LogicalExpression (??) now checks left side first", () => {
      // The `??` operator returns left if not null/undefined, so the left side
      // should have priority. Now correctly evaluates left first.
      const code = "const arr = [1]; const x = arr ?? {};";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.LogicalExpression>(ast, AST.LogicalExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      // Left side `arr` is an array — now correctly returned
      expect(fact!.kind).toBe("array");
    });

    it("FIXED: CallExpression now recognizes Array.from()", () => {
      // Static factory methods like Array.from() are now recognized.
      const code = "const x = Array.from([1, 2]);";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("FIXED: CallExpression now recognizes Object.create()", () => {
      // Object.create() is now recognized as producing a plain object.
      const code = "const x = Object.create(null);";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
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

    it("FIXED: CallExpression callee wrapped in TSAsExpression is recognized", () => {
      const code = "const x = (Array as any)();";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("FIXED: CallExpression callee wrapped in TSSatisfiesExpression is recognized", () => {
      const code = "const x = (Array.from satisfies typeof Array.from)([1, 2]);";
      const fact = runInRule(code, (context, ast) => {
        const node = findFirst<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return computeObjectType(context, node!);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });
  });
});
