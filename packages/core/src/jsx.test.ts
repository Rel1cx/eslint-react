/// <reference types="node" />

import type { RuleContext } from "@eslint-react/eslint";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../test";
import { isJsxLike } from "./jsx";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

function findFirstCallExpression(node: TSESTree.Node): TSESTree.CallExpression | null {
  if (node.type === AST.CallExpression) return node;
  for (const key of Object.keys(node)) {
    const child = (node as unknown as Record<string, unknown>)[key];
    if (child != null && typeof child === "object") {
      if (Array.isArray(child)) {
        for (const item of child) {
          if (item != null && typeof item === "object" && "type" in item) {
            const found = findFirstCallExpression(item as TSESTree.Node);
            if (found != null) return found;
          }
        }
      } else if ("type" in child) {
        const found = findFirstCallExpression(child as TSESTree.Node);
        if (found != null) return found;
      }
    }
  }
  return null;
}

describe("isJsxLike", () => {
  it("should detect createElement when callee is wrapped in TSAsExpression", () => {
    const code = "(createElement as any)('div', null, null)";
    const ast = parse(code).ast;
    const callExpr = findFirstCallExpression(ast);
    expect(callExpr).not.toBeNull();
    const result = isJsxLike(
      { sourceCode: { getScope: () => ({}) } } as unknown as RuleContext,
      callExpr,
    );
    expect(result).toBe(true);
  });

  it("should detect React.createElement when callee is wrapped in TSAsExpression", () => {
    const code = "(React.createElement as any)('div', null, null)";
    const ast = parse(code).ast;
    const callExpr = findFirstCallExpression(ast);
    expect(callExpr).not.toBeNull();
    const result = isJsxLike(
      { sourceCode: { getScope: () => ({}) } } as unknown as RuleContext,
      callExpr,
    );
    expect(result).toBe(true);
  });
});
