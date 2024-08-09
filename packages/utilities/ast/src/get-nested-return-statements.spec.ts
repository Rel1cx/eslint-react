import path from "node:path";

import { MutRef } from "@eslint-react/tools";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { getNestedReturnStatements } from "./get-nested-return-statements";
import { isFunction } from "./is";
import type { TSESTreeFunction } from "./types";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

describe("get nested return statements from function", () => {
  it.each([
    [
      /* tsx */ `
        function Foo() {
          return <div />;
        }
      `,
      [{ type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.JSXElement } }],
    ],
    [
      /* tsx */ `
        function Bar() {
          return Math.random() > 0.5 ? <div /> : null;
        }
      `,
      [{ type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.ConditionalExpression } }],
    ],
    [
      /* tsx */ `
        function Bar() {
          if (Math.random() > 0.5) {
            return <div />;
          } else {
            return null;
          }
        }
      `,
      [
        { type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.JSXElement } },
        { type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.Literal } },
      ],
    ],
    [
      /* tsx */ `
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
        { type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.JSXElement } },
        { type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.JSXElement } },
        { type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.Literal, value: 0 } },
        { type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.Literal, value: 0n } },
      ],
    ],
    [
      /* tsx */ `
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
        { type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.JSXElement } },
        { type: AST_NODE_TYPES.ReturnStatement, argument: { type: AST_NODE_TYPES.Literal, value: 0n } },
      ],
    ],
  ])("should return the nested return statements from %s", (code, expected) => {
    const n = MutRef.make<TSESTreeFunction | null>(null);
    const { ast } = parse(code);
    simpleTraverse(ast, {
      enter(node) {
        if (!isFunction(node)) return;
        if (MutRef.get(n)) return;
        const returnStatements = getNestedReturnStatements(node);
        for (const [i, statement] of returnStatements.entries()) {
          expect(statement).include({ type: AST_NODE_TYPES.ReturnStatement });
          expect(statement.argument).include(expected[i]?.argument);
        }
        MutRef.set(n, node);
      },
    }, true);
    expect(MutRef.get(n)).not.toBeNull();
  });
});
