import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching } from "ts-pattern";

export type DirectiveName = "use client" | "use server";

export interface DirectiveMatch {
  /**
   * - `well-formed`: a string literal recognized by the parser as a directive
   * - `misplaced`: a string literal that appears after other code, so the parser did not treat it as a directive
   * - `backtick`: a template literal, which is never a valid directive
   */
  kind: "backtick" | "misplaced" | "well-formed";
  name: DirectiveName;
  node: TSESTree.ExpressionStatement;
}

export function isDirectiveName(value: unknown): value is DirectiveName {
  return value === "use client" || value === "use server";
}

export function matchDirective(stmt: TSESTree.Statement): DirectiveMatch | null {
  if (stmt.type !== AST.ExpressionStatement) return null;
  const { expression } = stmt;
  if (isMatching({ type: AST.Literal, value: P.string }, expression)) {
    if (!isDirectiveName(expression.value)) return null;
    return {
      kind: stmt.directive != null ? "well-formed" : "misplaced",
      name: expression.value,
      node: stmt,
    };
  }
  if (expression.type === AST.TemplateLiteral && expression.expressions.length === 0 && expression.quasis.length === 1) {
    const value = expression.quasis[0]?.value.cooked;
    if (!isDirectiveName(value)) return null;
    return { kind: "backtick", name: value, node: stmt };
  }
  return null;
}
