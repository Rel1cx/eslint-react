import { hasProperty } from "@local/eff";
import { collectNodes, findIdentifierReferences, getFirstNodeOfType, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { resolveObjectType } from "./resolve-object-type";

describe("resolveObjectType", () => {
  describe("basic type detection", () => {
    it("JSXElement → kind: 'jsx'", () => {
      const code = "const x = <div />;";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.JSXElement>(ast, AST.JSXElement);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("jsx");
    });

    it("JSXFragment → kind: 'jsx'", () => {
      const code = "const x = <></>;";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.JSXFragment>(ast, AST.JSXFragment);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("jsx");
    });

    it("ArrayExpression → kind: 'array'", () => {
      const code = "const x = [1, 2, 3];";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.ArrayExpression>(ast, AST.ArrayExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("ObjectExpression → kind: 'plain'", () => {
      const code = "const x = { a: 1 };";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.ObjectExpression>(ast, AST.ObjectExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("ClassExpression → kind: 'class'", () => {
      const code = "const x = class {};";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.ClassExpression>(ast, AST.ClassExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("class");
    });

    it("ClassDeclaration → kind: 'class'", () => {
      const code = "class Foo {}";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.ClassDeclaration>(ast, AST.ClassDeclaration);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("class");
    });

    it("NewExpression → kind: 'instance'", () => {
      const code = "const x = new Foo();";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.NewExpression>(ast, AST.NewExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("instance");
    });

    it("ArrowFunctionExpression → kind: 'function'", () => {
      const code = "const x = () => {};";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(ast, AST.ArrowFunctionExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("function");
    });

    it("Regex literal → kind: 'regexp'", () => {
      const code = "const x = /abc/;";
      const fact = runInRule(code, (context, ast) => {
        // The regex literal is a Literal node with a `regex` property
        const literals = collectNodes<TSESTree.Literal>(ast, AST.Literal);
        const regexNode = literals.find((n) => hasProperty(n, "regex"));
        expect(regexNode).toBeDefined();
        return resolveObjectType(context, regexNode);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("regexp");
    });

    it("CallExpression Array() → kind: 'array'", () => {
      const code = "const x = Array();";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("CallExpression Object() → kind: 'plain'", () => {
      const code = "const x = Object();";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("CallExpression RegExp() → kind: 'regexp'", () => {
      const code = 'const x = RegExp("abc");';
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("regexp");
    });

    it("ConditionalExpression picks first non-null (consequent)", () => {
      const code = "const cond = true; const x = cond ? [1] : {};";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.ConditionalExpression>(ast, AST.ConditionalExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      // consequent is [1] → array, so the ?? fallback selects it
      expect(fact!.kind).toBe("array");
    });
  });

  describe("issue verification", () => {
    it("FIXED: LogicalExpression (||) now checks left side first", () => {
      // Previously only evaluated the right side. Now evaluates left first,
      // falling back to right — consistent with ConditionalExpression behavior.
      const code = "const arr = [1, 2]; const x = arr || {};";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.LogicalExpression>(ast, AST.LogicalExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
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
        const node = getFirstNodeOfType<TSESTree.LogicalExpression>(ast, AST.LogicalExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      // Left side `arr` is an array — now correctly returned
      expect(fact!.kind).toBe("array");
    });

    it("FIXED: CallExpression now recognizes Array.from()", () => {
      // Static factory methods like Array.from() are now recognized.
      const code = "const x = Array.from([1, 2]);";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("FIXED: CallExpression now recognizes Object.create()", () => {
      // Object.create() is now recognized as producing a plain object.
      const code = "const x = Object.create(null);";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("FIXED: Dead code in MemberExpression guard removed — 'object' property always exists", () => {
      // The guard `if (!("object" in node)) return null;` was dead code and has been removed.
      // MemberExpression nodes always have an `object` property by the TSESTree specification.
      const code = "const a = {}; const x = a.b;";
      runInRule(code, (_context, ast) => {
        const node = getFirstNodeOfType<TSESTree.MemberExpression>(ast, AST.MemberExpression);
        expect(node).toBeDefined();
        expect(hasProperty(node, "object")).toBe(true);
        expect(node.object).toBeDefined();
        return null;
      });
    });

    it("FIXED: Dead code in AssignmentExpression guard removed — 'right' property always exists", () => {
      // The guard `if (!("right" in node)) return null;` was dead code and has been removed.
      // AssignmentExpression nodes always have a `right` property by the TSESTree specification.
      const code = "let x; x = 1;";
      runInRule(code, (_context, ast) => {
        const node = getFirstNodeOfType<TSESTree.AssignmentExpression>(ast, AST.AssignmentExpression);
        expect(node).toBeDefined();
        expect(hasProperty(node, "right")).toBe(true);
        expect(node.right).toBeDefined();
        return null;
      });
    });

    it("FIXED: CallExpression callee wrapped in TSAsExpression is recognized", () => {
      const code = "const x = (Array as any)();";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("FIXED: CallExpression callee wrapped in TSSatisfiesExpression is recognized", () => {
      const code = "const x = (Array.from satisfies typeof Array.from)([1, 2]);";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });
  });

  describe("behavior boundaries", () => {
    it("null input → null", () => {
      const fact = runInRule("const x = 1;", (context) => resolveObjectType(context, null));
      expect(fact).toBeNull();
    });

    it("non-regex Literal (string) → null", () => {
      const code = 'const x = "abc";';
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.Literal>(ast, AST.Literal);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).toBeNull();
    });

    it("ThisExpression → kind: 'instance'", () => {
      const code = "class A { m() { return this; } }";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.ThisExpression>(ast, AST.ThisExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("instance");
    });

    it("FunctionDeclaration → kind: 'function'", () => {
      const code = "function f() {}";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("function");
    });

    it("FunctionExpression → kind: 'function'", () => {
      const code = "const f = function() {};";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.FunctionExpression>(ast, AST.FunctionExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("function");
    });

    it("Identifier resolves to the type of its initializer", () => {
      const code = "const x = {}; x;";
      const fact = runInRule(code, (context, ast) => {
        const node = collectNodes<TSESTree.Identifier>(ast, AST.Identifier).findLast((n) => n.name === "x");
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("Identifier bound to a parameter → null (externally supplied value)", () => {
      const code = "function f(props) { return props; }";
      const fact = runInRule(code, (context, ast) => {
        const node = collectNodes<TSESTree.Identifier>(ast, AST.Identifier).findLast((n) => n.name === "props");
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).toBeNull();
    });

    it("Identifier referencing an outer-scope binding → null (local-only resolution)", () => {
      const code = "const x = []; function f() { return x; }";
      const fact = runInRule(code, (context, ast) => {
        const node = collectNodes<TSESTree.Identifier>(ast, AST.Identifier).findLast((n) => n.name === "x");
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).toBeNull();
    });

    it("Redeclared variable resolves to the latest definition (var x = []; var x = {})", () => {
      const code = "var x = []; var x = {}; x;";
      const fact = runInRule(code, (context, ast) => {
        const node = collectNodes<TSESTree.Identifier>(ast, AST.Identifier).findLast((n) => n.name === "x");
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("Undeclared identifier → null", () => {
      const code = "foo;";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.Identifier>(ast, AST.Identifier);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).toBeNull();
    });

    it("MemberExpression reports the type of its object, not the property", () => {
      // `a.b` resolves to the type of `a` (plain object), even though `b` is an array.
      const code = "const a = { b: [] }; a.b;";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.MemberExpression>(ast, AST.MemberExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("AssignmentExpression → type of the right-hand side", () => {
      const code = "let x; x = [1];";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.AssignmentExpression>(ast, AST.AssignmentExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("AssignmentPattern (default parameter) → type of the right-hand side", () => {
      const code = "function f(a = {}) {}";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.AssignmentPattern>(ast, AST.AssignmentPattern);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("LogicalExpression falls back to the right side when the left side is undetectable", () => {
      const code = "const x = foo || [];";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.LogicalExpression>(ast, AST.LogicalExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("ConditionalExpression falls back to the alternate when the consequent is undetectable", () => {
      const code = "const x = cond ? foo : {};";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.ConditionalExpression>(ast, AST.ConditionalExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("plain");
    });

    it("SequenceExpression → type of the last expression", () => {
      const code = "const x = (0, []);";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.SequenceExpression>(ast, AST.SequenceExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("CallExpression Boolean()/String()/Number() → null (primitive wrappers are not objects)", () => {
      const code = "Boolean(x); String(x); Number(x);";
      const facts = runInRule(code, (context, ast) => {
        const nodes = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(nodes).toHaveLength(3);
        return nodes.map((node) => resolveObjectType(context, node));
      });
      expect(facts).toEqual([null, null, null]);
    });

    it("CallExpression Array.of() → kind: 'array'", () => {
      const code = "const x = Array.of(1, 2);";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("CallExpression Object.assign()/Object.fromEntries() → kind: 'plain'", () => {
      const code = "const a = Object.assign({}, x); const b = Object.fromEntries([]);";
      const facts = runInRule(code, (context, ast) => {
        const nodes = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(nodes).toHaveLength(2);
        return nodes.map((node) => resolveObjectType(context, node));
      });
      expect(facts[0]!.kind).toBe("plain");
      expect(facts[1]!.kind).toBe("plain");
    });

    it("Unlisted static method (Array.map) → kind: 'unknown'", () => {
      // Only `from`/`of` are recognized for Array; other methods are unknown.
      const code = "const x = Array.map([1], (n) => n);";
      const fact = runInRule(code, (context, ast) => {
        const node = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression)
          .find((n) => n.callee.type === AST.MemberExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("unknown");
    });

    it("Nested callee object (window.Array.from) → kind: 'unknown'", () => {
      // The factory-method check requires the callee object to be a bare Identifier.
      const code = "const x = window.Array.from([1]);";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("unknown");
    });

    it("Unknown call → kind: 'unknown' with reason 'call-expression'", () => {
      const code = "const x = foo();";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("unknown");
      expect(fact!.kind === "unknown" && fact!.reason).toBe("call-expression");
    });

    it("TSAsExpression unwraps to the type of the inner expression", () => {
      const code = "const x = [] as const;";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.TSAsExpression>(ast, AST.TSAsExpression);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("TemplateLiteral (no `expression` property to unwrap) → null", () => {
      const code = "const x = `a${1}b`;";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.TemplateLiteral>(ast, AST.TemplateLiteral);
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).toBeNull();
    });

    it("Identifier bound to a ClassDeclaration → kind: 'class'", () => {
      const code = "class Foo {} Foo;";
      const fact = runInRule(code, (context, ast) => {
        const node = collectNodes<TSESTree.Identifier>(ast, AST.Identifier).findLast((n) => n.name === "Foo");
        expect(node).toBeDefined();
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("class");
    });
  });

  describe("cycle safety", () => {
    it("should return null instead of overflowing on a cyclic alias chain", () => {
      const code = "const a = b; const b = a; a;";
      const fact = runInRule(code, (context, ast) => {
        const ref = findIdentifierReferences(ast, "a").at(-1)!;
        return resolveObjectType(context, ref);
      });
      expect(fact).toBeNull();
    });

    it("should return null instead of overflowing on a self-referential binding", () => {
      const code = "const a = a; a;";
      const fact = runInRule(code, (context, ast) => {
        const ref = findIdentifierReferences(ast, "a").at(-1)!;
        return resolveObjectType(context, ref);
      });
      expect(fact).toBeNull();
    });

    it("should still resolve a non-cyclic alias chain", () => {
      const code = "const a = b; const b = []; a;";
      const fact = runInRule(code, (context, ast) => {
        const ref = findIdentifierReferences(ast, "a").at(-1)!;
        return resolveObjectType(context, ref);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });
  });

  describe("construction source (via)", () => {
    function viaOf<T extends TSESTree.Node>(code: string, type: T["type"]) {
      return runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<T>(ast, type);
        const result = resolveObjectType(context, node);
        return result != null && "via" in result ? result.via : null;
      });
    }

    it("should report the source of arrays and objects", () => {
      expect(viaOf<TSESTree.ArrayExpression>("const x = [];", AST.ArrayExpression)).toBe("literal");
      expect(viaOf<TSESTree.CallExpression>("const x = Array();", AST.CallExpression)).toBe("call");
      expect(viaOf<TSESTree.ObjectExpression>("const x = {};", AST.ObjectExpression)).toBe("literal");
      expect(viaOf<TSESTree.CallExpression>("const x = Object();", AST.CallExpression)).toBe("call");
    });

    it("should report the source of classes", () => {
      expect(viaOf<TSESTree.ClassDeclaration>("class C {}", AST.ClassDeclaration)).toBe("declaration");
      expect(viaOf<TSESTree.ClassExpression>("const C = class {};", AST.ClassExpression)).toBe("expression");
    });

    it("should report the source of instances", () => {
      expect(viaOf<TSESTree.NewExpression>("new Foo();", AST.NewExpression)).toBe("new");
      expect(viaOf<TSESTree.ThisExpression>("this;", AST.ThisExpression)).toBe("this");
    });

    it("should report the source of functions", () => {
      expect(viaOf<TSESTree.FunctionDeclaration>("function f() {}", AST.FunctionDeclaration)).toBe("declaration");
      expect(viaOf<TSESTree.FunctionExpression>("const f = function () {};", AST.FunctionExpression)).toBe("expression");
      expect(viaOf<TSESTree.ArrowFunctionExpression>("const f = () => {};", AST.ArrowFunctionExpression)).toBe("arrow");
    });

    it("should report the source of regular expressions", () => {
      expect(viaOf<TSESTree.Literal>("const x = /a/;", AST.Literal)).toBe("literal");
      expect(viaOf<TSESTree.CallExpression>('const x = RegExp("a");', AST.CallExpression)).toBe("call");
    });

    it("should report JSX sources", () => {
      expect(viaOf<TSESTree.JSXElement>("const x = <div />;", AST.JSXElement)).toBe("jsx");
    });
  });

  describe("resolution options", () => {
    it("should select the first definition when `at` is 0", () => {
      const code = "var x = []; var x = {}; x;";
      const fact = runInRule(code, (context, ast) => {
        const node = collectNodes<TSESTree.Identifier>(ast, AST.Identifier).findLast((n) => n.name === "x");
        expect(node).toBeDefined();
        return resolveObjectType(context, node, { at: 0 });
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("array");
    });

    it("should follow enclosing scopes when `scope` is 'chain'", () => {
      const code = "const x = []; function f() { return x; }";
      const facts = runInRule(code, (context, ast) => {
        const node = collectNodes<TSESTree.Identifier>(ast, AST.Identifier).findLast((n) => n.name === "x");
        expect(node).toBeDefined();
        return {
          local: resolveObjectType(context, node),
          chain: resolveObjectType(context, node, { scope: "chain" }),
        };
      });
      expect(facts.local).toBeNull();
      expect(facts.chain).not.toBeNull();
      expect(facts.chain!.kind).toBe("array");
    });

    it("should thread options through alias chains", () => {
      const code = "const outer = {}; function f() { const local = outer; return local; }";
      const facts = runInRule(code, (context, ast) => {
        const node = collectNodes<TSESTree.Identifier>(ast, AST.Identifier).findLast((n) => n.name === "local");
        expect(node).toBeDefined();
        return {
          local: resolveObjectType(context, node),
          chain: resolveObjectType(context, node, { scope: "chain" }),
        };
      });
      expect(facts.local).toBeNull();
      expect(facts.chain).not.toBeNull();
      expect(facts.chain!.kind).toBe("plain");
    });
  });

  describe("global shadowing", () => {
    it("should treat a shadowed Array() call as unknown", () => {
      const code = "const Array = () => 1; Array();";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("unknown");
    });

    it("should treat a shadowed Object() call as unknown", () => {
      const code = "const Object = () => 1; Object();";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("unknown");
    });

    it("should treat a shadowed Boolean() call as unknown", () => {
      const code = "function f(Boolean) { return Boolean(); }";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("unknown");
    });

    it("should treat a shadowed Object.fromEntries() call as unknown", () => {
      const code = "const Object = { fromEntries: () => 1 }; Object.fromEntries([]);";
      const fact = runInRule(code, (context, ast) => {
        const node = getFirstNodeOfType<TSESTree.CallExpression>(ast, AST.CallExpression);
        return resolveObjectType(context, node);
      });
      expect(fact).not.toBeNull();
      expect(fact!.kind).toBe("unknown");
    });
  });
});
