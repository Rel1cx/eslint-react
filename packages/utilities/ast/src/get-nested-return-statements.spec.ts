import path from "node:path";

import { O } from "@eslint-react/eff";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
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
      [{ type: T.ReturnStatement, argument: { type: T.JSXElement } }],
    ],
    [
      /* tsx */ `
        function Bar() {
          return Math.random() > 0.5 ? <div /> : null;
        }
      `,
      [{ type: T.ReturnStatement, argument: { type: T.ConditionalExpression } }],
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
        { type: T.ReturnStatement, argument: { type: T.JSXElement } },
        { type: T.ReturnStatement, argument: { type: T.Literal } },
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
        { type: T.ReturnStatement, argument: { type: T.JSXElement } },
        { type: T.ReturnStatement, argument: { type: T.JSXElement } },
        { type: T.ReturnStatement, argument: { type: T.Literal, value: 0 } },
        { type: T.ReturnStatement, argument: { type: T.Literal, value: 0n } },
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
        { type: T.ReturnStatement, argument: { type: T.JSXElement } },
        { type: T.ReturnStatement, argument: { type: T.Literal, value: 0n } },
      ],
    ],
  ])("should return the nested return statements from %s", (code, expected) => {
    let n = O.none<TSESTreeFunction>();
    const { ast } = parse(code);
    simpleTraverse(ast, {
      enter(node) {
        if (O.isSome(n)) return;
        if (!isFunction(node)) return;
        const returnStatements = getNestedReturnStatements(node);
        for (const [index, statement] of returnStatements.entries()) {
          expect(statement).include(expected[index]);
        }
        n = O.fromNullable(node);
      },
    }, true);
    expect(O.isSome(n)).toBe(true);
  });
});
