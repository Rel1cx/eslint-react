/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import tsx from "dedent";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";

import {
  getNestedCallExpressions,
  getNestedIdentifiers,
  getNestedNewExpressions,
  getNestedReturnStatements,
} from "./expression-nested";
import { isFunction } from "./node-is";
import type { TSESTreeFunction } from "./node-types";

function parse(code: string, tsx = true) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), tsx ? "estree.tsx" : "file.ts"),
  });
}

/**
 * Parse code as expression statement and return the expression node.
 */
function parseExpression(code: string): TSESTree.Node {
  const { ast } = parse(code);
  const stmt = ast.body[0];
  if (stmt == null || stmt.type !== AST.ExpressionStatement) {
    throw new Error(`Expected ExpressionStatement, got ${stmt?.type}`);
  }
  return stmt.expression;
}

/**
 * Find the first node of a given type inside the parsed AST.
 */
function findFirst<T extends AST>(code: string, type: T, tsx = true): Extract<TSESTree.Node, { type: T }> {
  const { ast } = parse(code, tsx);
  let found: Extract<TSESTree.Node, { type: T }> | null = null;
  simpleTraverse(ast, {
    enter(node) {
      if (found == null && node.type === type) {
        found = node as Extract<TSESTree.Node, { type: T }>;
      }
    },
  }, true);
  if (found == null) {
    throw new Error(`No node of type ${type} found in: ${code}`);
  }
  return found;
}

function identifierNames(node: TSESTree.Node): string[] {
  return getNestedIdentifiers(node).map((id) => id.name);
}

// ---------------------------------------------------------------------------
// getNestedReturnStatements (existing tests preserved)
// ---------------------------------------------------------------------------

describe("get nested return statements from function", () => {
  it.each([
    [
      tsx`
        function Foo() {
          return <div />;
        }
      `,
      [{ type: AST.ReturnStatement, argument: { type: AST.JSXElement } }],
    ],
    [
      tsx`
        function Bar() {
          return Math.random() > 0.5 ? <div /> : null;
        }
      `,
      [{ type: AST.ReturnStatement, argument: { type: AST.ConditionalExpression } }],
    ],
    [
      tsx`
        function Bar() {
          if (Math.random() > 0.5) {
            return <div />;
          } else {
            return null;
          }
        }
      `,
      [
        { type: AST.ReturnStatement, argument: { type: AST.JSXElement } },
        { type: AST.ReturnStatement, argument: { type: AST.Literal } },
      ],
    ],
    [
      tsx`
        function Baz() {
          if (Math.random() > 0.5) {
            return <div />;
          }
          switch (true) {
            case Math.random() > 0.5:
              return <span />;
            case Math.random() > 0.6:
              return 0;
          }
          return 0n;
        }
      `,
      [
        { type: AST.ReturnStatement, argument: { type: AST.JSXElement } },
        { type: AST.ReturnStatement, argument: { type: AST.JSXElement } },
        { type: AST.ReturnStatement, argument: { type: AST.Literal, value: 0 } },
        { type: AST.ReturnStatement, argument: { type: AST.Literal, value: 0n } },
      ],
    ],
    [
      tsx`
        function Baz() {
          if (Math.random() > 0.5) {
            return <div />;
          }
          function f() {
            return 0;
          }
          return 0n;
        }
      `,
      [
        { type: AST.ReturnStatement, argument: { type: AST.JSXElement } },
        { type: AST.ReturnStatement, argument: { type: AST.Literal, value: 0n } },
      ],
    ],
  ])("should return the nested return statements from %s", (code, expected) => {
    let n: null | TSESTreeFunction = null;
    const { ast } = parse(code);
    simpleTraverse(ast, {
      enter(node) {
        if (n != null) {
          return;
        }
        if (!isFunction(node)) {
          return;
        }
        const returnStatements = getNestedReturnStatements(node);
        for (const [index, statement] of returnStatements.entries()) {
          expect(statement).include(expected[index]);
        }
        n = node;
      },
    }, true);
    expect(n).not.eq(null);
  });
});

// ---------------------------------------------------------------------------
// getNestedIdentifiers
// ---------------------------------------------------------------------------

describe("getNestedIdentifiers", () => {
  // -- ConditionalExpression --------------------------------------------------
  it("should collect identifiers from ConditionalExpression (test, consequent, alternate)", () => {
    const node = parseExpression("a ? b : c");
    expect(identifierNames(node)).toEqual(["a", "b", "c"]);
  });

  // -- AwaitExpression --------------------------------------------------------
  it("should collect identifiers from AwaitExpression", () => {
    const node = findFirst("async function f() { await foo }", AST.AwaitExpression);
    expect(identifierNames(node)).toEqual(["foo"]);
  });

  // -- YieldExpression --------------------------------------------------------
  it("should collect identifiers from YieldExpression", () => {
    const node = findFirst("function* g() { yield bar }", AST.YieldExpression);
    expect(identifierNames(node)).toEqual(["bar"]);
  });

  it("should handle YieldExpression without argument", () => {
    const node = findFirst("function* g() { yield }", AST.YieldExpression);
    expect(identifierNames(node)).toEqual([]);
  });

  // -- UpdateExpression -------------------------------------------------------
  it("should collect identifiers from UpdateExpression (prefix)", () => {
    const node = parseExpression("++x");
    expect(identifierNames(node)).toEqual(["x"]);
  });

  it("should collect identifiers from UpdateExpression (postfix)", () => {
    const node = parseExpression("y--");
    expect(identifierNames(node)).toEqual(["y"]);
  });

  // -- CallExpression callee --------------------------------------------------
  it("should collect identifiers from CallExpression callee", () => {
    const node = parseExpression("foo(bar)");
    // arguments: [bar], callee: foo
    expect(identifierNames(node)).toEqual(["bar", "foo"]);
  });

  // -- NewExpression callee ---------------------------------------------------
  it("should collect identifiers from NewExpression callee", () => {
    const node = parseExpression("new Foo(bar)");
    // arguments: [bar], callee: Foo
    expect(identifierNames(node)).toEqual(["bar", "Foo"]);
  });

  // -- TaggedTemplateExpression -----------------------------------------------
  it("should collect identifiers from TaggedTemplateExpression (tag + quasi expressions)", () => {
    const node = parseExpression("tag`hello ${x} world ${y}`");
    expect(identifierNames(node)).toEqual(["tag", "x", "y"]);
  });

  // -- ImportExpression -------------------------------------------------------
  it("should collect identifiers from ImportExpression source", () => {
    const node = findFirst("import(src)", AST.ImportExpression);
    expect(identifierNames(node)).toEqual(["src"]);
  });

  // -- TSTypeAssertion --------------------------------------------------------
  it("should collect identifiers from TSTypeAssertion", () => {
    // Must parse as .ts (not .tsx) to avoid <any> being treated as JSX
    const node = findFirst("(<any>foo)", AST.TSTypeAssertion, false);
    expect(identifierNames(node)).toEqual(["foo"]);
  });

  // -- TSInstantiationExpression ----------------------------------------------
  it("should collect identifiers from TSInstantiationExpression", () => {
    const node = findFirst("foo<string>", AST.TSInstantiationExpression);
    expect(identifierNames(node)).toEqual(["foo"]);
  });

  // -- MemberExpression computed property -------------------------------------
  it("should collect identifiers from MemberExpression computed property", () => {
    const node = parseExpression("obj[key]");
    expect(identifierNames(node)).toEqual(["obj", "key"]);
  });

  it("should NOT collect non-computed MemberExpression property", () => {
    const node = parseExpression("obj.prop");
    // Only obj, not prop (prop is not a reference identifier)
    expect(identifierNames(node)).toEqual(["obj"]);
  });

  // -- Compound expression combining multiple new node types ------------------
  it("should collect all identifiers from a complex nested expression", () => {
    const node = parseExpression("await foo(a ? b : c, ++d)");
    // AwaitExpression → CallExpression
    //   callee: foo
    //   arguments: [ConditionalExpression(a, b, c), UpdateExpression(d)]
    const names = identifierNames(node);
    expect(names).toContain("foo");
    expect(names).toContain("a");
    expect(names).toContain("b");
    expect(names).toContain("c");
    expect(names).toContain("d");
  });

  // -- Nested callee chain: foo()() ------------------------------------------
  it("should collect callee identifiers from nested call chains", () => {
    const node = parseExpression("foo(a)(b)");
    // Outer CallExpression: callee = CallExpression(foo, [a]), arguments = [b]
    const names = identifierNames(node);
    expect(names).toContain("foo");
    expect(names).toContain("a");
    expect(names).toContain("b");
  });

  // -- Existing functionality still works -------------------------------------
  it("should collect identifiers from Identifier", () => {
    const node = parseExpression("x");
    expect(identifierNames(node)).toEqual(["x"]);
  });

  it("should collect identifiers from BinaryExpression", () => {
    const node = parseExpression("a + b");
    expect(identifierNames(node)).toEqual(["a", "b"]);
  });

  it("should collect identifiers from LogicalExpression", () => {
    const node = parseExpression("a && b || c");
    expect(identifierNames(node)).toEqual(["a", "b", "c"]);
  });

  it("should collect identifiers from ArrayExpression", () => {
    const node = parseExpression("[a, b, c]");
    expect(identifierNames(node)).toEqual(["a", "b", "c"]);
  });

  it("should collect identifiers from ObjectExpression", () => {
    const node = parseExpression("({ key: val })");
    expect(identifierNames(node)).toEqual(["val"]);
  });

  it("should collect identifiers from SpreadElement", () => {
    const node = parseExpression("[...arr]");
    expect(identifierNames(node)).toEqual(["arr"]);
  });

  it("should collect identifiers from UnaryExpression", () => {
    const node = parseExpression("!flag");
    expect(identifierNames(node)).toEqual(["flag"]);
  });

  it("should collect identifiers from ChainExpression", () => {
    const node = parseExpression("obj?.prop");
    // ChainExpression → MemberExpression(obj, prop) — prop is not computed
    expect(identifierNames(node)).toEqual(["obj"]);
  });

  it("should collect identifiers from TSNonNullExpression", () => {
    const node = parseExpression("val!");
    expect(identifierNames(node)).toEqual(["val"]);
  });

  it("should collect identifiers from TSAsExpression", () => {
    const node = parseExpression("val as string");
    expect(identifierNames(node)).toEqual(["val"]);
  });

  it("should collect identifiers from TSSatisfiesExpression", () => {
    const node = parseExpression("val satisfies string");
    expect(identifierNames(node)).toEqual(["val"]);
  });

  it("should collect identifiers from AssignmentExpression", () => {
    const node = parseExpression("a = b");
    expect(identifierNames(node)).toEqual(["a", "b"]);
  });

  it("should collect identifiers from TemplateLiteral expressions", () => {
    const node = parseExpression("`${a} and ${b}`");
    expect(identifierNames(node)).toEqual(["a", "b"]);
  });

  it("should collect identifiers from SequenceExpression", () => {
    const node = parseExpression("(a, b, c)");
    expect(identifierNames(node)).toEqual(["a", "b", "c"]);
  });
});

// ---------------------------------------------------------------------------
// getNestedCallExpressions (getNestedExpressionsOfType(AST.CallExpression))
// ---------------------------------------------------------------------------

describe("getNestedCallExpressions", () => {
  // -- AwaitExpression --------------------------------------------------------
  it("should find call expressions inside AwaitExpression", () => {
    const node = findFirst("async function f() { await foo() }", AST.AwaitExpression);
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(1);
    expect(calls[0]!.type).toBe(AST.CallExpression);
  });

  // -- YieldExpression --------------------------------------------------------
  it("should find call expressions inside YieldExpression", () => {
    const node = findFirst("function* g() { yield foo() }", AST.YieldExpression);
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(1);
  });

  it("should return empty for YieldExpression without argument", () => {
    const node = findFirst("function* g() { yield }", AST.YieldExpression);
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(0);
  });

  // -- UpdateExpression -------------------------------------------------------
  it("should find call expressions inside UpdateExpression argument (unlikely but correct)", () => {
    // UpdateExpression argument is typically an identifier, but the traversal should still work
    const node = parseExpression("++x");
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(0);
  });

  // -- CallExpression / NewExpression callee ----------------------------------
  it("should find nested call expressions in CallExpression callee (foo()())", () => {
    const node = parseExpression("foo()()");
    const calls = getNestedCallExpressions(node);
    // The outer call is itself a CallExpression, and its callee foo() is also one
    expect(calls).toHaveLength(2);
  });

  it("should find nested call expressions in NewExpression callee", () => {
    const node = parseExpression("new (getClass())()");
    const calls = getNestedCallExpressions(node);
    // getClass() is a CallExpression inside the NewExpression callee
    expect(calls).toHaveLength(1);
  });

  // -- TaggedTemplateExpression -----------------------------------------------
  it("should find call expressions in TaggedTemplateExpression tag", () => {
    const node = parseExpression("getTag()`template`");
    const calls = getNestedCallExpressions(node);
    // getTag() is a CallExpression in the tag position
    expect(calls).toHaveLength(1);
  });

  it("should find call expressions in TaggedTemplateExpression quasi expressions", () => {
    const node = parseExpression("tag`hello ${foo()} world`");
    const calls = getNestedCallExpressions(node);
    // foo() is inside the template literal's expressions
    expect(calls).toHaveLength(1);
  });

  // -- ImportExpression -------------------------------------------------------
  it("should find call expressions in ImportExpression source", () => {
    const node = findFirst("import(getPath())", AST.ImportExpression);
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(1);
  });

  // -- MemberExpression computed property -------------------------------------
  it("should find call expressions in MemberExpression computed property", () => {
    const node = parseExpression("obj[getKey()]");
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(1);
  });

  it("should not produce duplicates for nodes covered by generic 'expression' check", () => {
    // ChainExpression, TSNonNullExpression, TSAsExpression, TSSatisfiesExpression
    // are all covered by the generic "expression" in node check.
    // Previously they were also handled by explicit type checks, causing duplicates.
    const node = parseExpression("foo()!");
    const calls = getNestedCallExpressions(node);
    // foo() should appear exactly once, not twice
    expect(calls).toHaveLength(1);
  });

  it("should not produce duplicates for TSAsExpression wrapping a call", () => {
    const node = parseExpression("foo() as any");
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(1);
  });

  it("should not produce duplicates for TSSatisfiesExpression wrapping a call", () => {
    const node = parseExpression("foo() satisfies any");
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(1);
  });

  it("should not produce duplicates for ChainExpression wrapping a call", () => {
    const node = parseExpression("foo?.()");
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(1);
  });

  // -- ConditionalExpression (already supported, verify) ----------------------
  it("should find call expressions in all branches of ConditionalExpression", () => {
    const node = parseExpression("test() ? consequent() : alternate()");
    const calls = getNestedCallExpressions(node);
    expect(calls).toHaveLength(3);
  });

  // -- Complex combination ----------------------------------------------------
  it("should find all call expressions in a deeply nested expression", () => {
    const node = parseExpression("await foo(bar(), baz ? qux() : quux())");
    const calls = getNestedCallExpressions(node);
    // foo(...), bar(), qux(), quux()
    expect(calls).toHaveLength(4);
  });
});

// ---------------------------------------------------------------------------
// getNestedNewExpressions (getNestedExpressionsOfType(AST.NewExpression))
// ---------------------------------------------------------------------------

describe("getNestedNewExpressions", () => {
  it("should find NewExpression inside AwaitExpression", () => {
    const node = findFirst("async function f() { await new Promise(r => r()) }", AST.AwaitExpression);
    const exprs = getNestedNewExpressions(node);
    expect(exprs).toHaveLength(1);
    expect(exprs[0]!.type).toBe(AST.NewExpression);
  });

  it("should find NewExpression inside ConditionalExpression branches", () => {
    const node = parseExpression("flag ? new Foo() : new Bar()");
    const exprs = getNestedNewExpressions(node);
    expect(exprs).toHaveLength(2);
  });

  it("should find NewExpression in TaggedTemplateExpression quasi", () => {
    const node = parseExpression("tag`${new Foo()}`");
    const exprs = getNestedNewExpressions(node);
    expect(exprs).toHaveLength(1);
  });

  it("should find NewExpression inside CallExpression callee", () => {
    // new Foo().bar() — the outer is a CallExpression whose callee contains
    // a MemberExpression whose object is a NewExpression
    const node = parseExpression("new Foo().bar()");
    const exprs = getNestedNewExpressions(node);
    expect(exprs).toHaveLength(1);
  });

  it("should find NewExpression in computed MemberExpression property", () => {
    const node = parseExpression("obj[new Key()]");
    const exprs = getNestedNewExpressions(node);
    expect(exprs).toHaveLength(1);
  });
});
