/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../test";
import { getFunctionInitPath, isFunctionHasCallInInitPath } from "./function";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

describe("isFunctionHasCallInInitPath", () => {
  it("should detect memo call when callee is wrapped in TSAsExpression", () => {
    const code = "const Component = (memo as any)(() => {})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          const initPath = getFunctionInitPath(node);
          if (initPath != null) {
            result = isFunctionHasCallInInitPath("memo", initPath);
          }
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should detect React.memo call when callee is wrapped in TSAsExpression", () => {
    const code = "const Component = (React.memo as any)(() => {})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          const initPath = getFunctionInitPath(node);
          if (initPath != null) {
            result = isFunctionHasCallInInitPath("memo", initPath);
          }
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should detect memo call when callee is wrapped in TSSatisfiesExpression", () => {
    const code = "const Component = (memo satisfies typeof memo)(() => {})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          const initPath = getFunctionInitPath(node);
          if (initPath != null) {
            result = isFunctionHasCallInInitPath("memo", initPath);
          }
        }
      },
    }, true);
    expect(result).toBe(true);
  });
});
