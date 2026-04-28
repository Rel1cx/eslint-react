/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../test";
import { isThisSetStateCall } from "./class-component";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

describe("isThisSetStateCall", () => {
  it("should return true for this.setState()", () => {
    const code = "this.setState({})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          result = isThisSetStateCall(node);
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should return true when callee is wrapped in TSAsExpression", () => {
    const code = "(this.setState as any)({})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          result = isThisSetStateCall(node);
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should return true when callee is wrapped in TSSatisfiesExpression", () => {
    const code = "(this.setState satisfies typeof this.setState)({})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          result = isThisSetStateCall(node);
        }
      },
    }, true);
    expect(result).toBe(true);
  });
});
