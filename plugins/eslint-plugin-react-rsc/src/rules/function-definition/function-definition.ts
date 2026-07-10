import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type ReportFixFunction, type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching } from "ts-pattern";

export const RULE_NAME = "function-definition";

export type MessageID =
  | "file"
  | "fileDirectivePosition"
  | "fileDirectiveQuote"
  | "local"
  | "localDirectivePosition"
  | "localDirectiveQuote"
  | "localDirectiveUnexpected";

export const RULE_FEATURES = [
  "FIX",
  "EXP",
] as const satisfies RuleFeature[];

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates and transforms React Client/Server Function definitions.",
    },
    fixable: "code",
    messages: {
      file: "Functions exported from files with `use server` directive are React Server Functions and therefore must be async.",
      fileDirectivePosition: "The '{{name}}' directive must be at the very beginning of the file, before any imports or other code.",
      fileDirectiveQuote: "The '{{name}}' directive must be written with single or double quotes, not backticks.",
      local: "Functions with `use server` directive are React Server Functions and therefore must be async.",
      localDirectivePosition: "The '{{name}}' directive must be at the very beginning of the function body.",
      localDirectiveQuote: "The '{{name}}' directive must be written with single or double quotes, not backticks.",
      localDirectiveUnexpected: "The '{{name}}' directive can only be used at the top of a file, not inside a function body.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

type DirectiveName = "use client" | "use server";

interface DirectiveMatch {
  /**
   * - `well-formed`: a string literal recognized by the parser as a directive
   * - `misplaced`: a string literal that appears after other code, so the parser did not treat it as a directive
   * - `backtick`: a template literal, which is never a valid directive
   */
  kind: "backtick" | "misplaced" | "well-formed";
  name: DirectiveName;
  node: TSESTree.ExpressionStatement;
}

function isDirectiveName(value: unknown): value is DirectiveName {
  return value === "use client" || value === "use server";
}

function matchDirective(stmt: TSESTree.Statement): DirectiveMatch | null {
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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if neither `use server` nor `use client` is present
  const text = context.sourceCode.text;
  if (!text.includes("use server") && !text.includes("use client")) return {};

  const hasFileLevelUseServerDirective = context.sourceCode.ast.body.some((stmt) => Check.isDirective(stmt, "use server"));

  function buildFixForAsync(node: TSESTreeFunction): ReportFixFunction | null {
    // Arrow functions: insert before the node (before parameters)
    if (node.type === AST.ArrowFunctionExpression) {
      return (fixer) => fixer.insertTextBefore(node, "async ");
    }
    if (node.type === AST.FunctionExpression) {
      const { parent } = node;
      if (parent.type === AST.Property && parent.value === node) {
        if (parent.kind !== "init") return null;
        if (parent.method) return (fixer) => fixer.insertTextBefore(parent, "async ");
      }
      if (parent.type === AST.MethodDefinition && parent.value === node) {
        if (parent.kind !== "method") return null;
        let target: TSESTree.Node | TSESTree.Token = parent.key;
        if (parent.computed) {
          const openBracket = context.sourceCode.getTokenBefore(parent.key);
          if (openBracket?.value !== "[") return null;
          target = openBracket;
        }
        if (node.generator) {
          const star = context.sourceCode.getTokenBefore(target);
          if (star?.value !== "*") return null;
          target = star;
        }
        return (fixer) => fixer.insertTextBefore(target, "async ");
      }
    }
    // Function declarations/expressions: insert before the "function" token
    const functionToken = context.sourceCode.getFirstToken(node);
    if (functionToken == null) return null;
    return (fixer) => fixer.insertTextBefore(functionToken, "async ");
  }

  function reportNonAsyncFunction(node: TSESTree.Node | null, messageId: MessageID) {
    if (node == null) return;
    const fn = Extract.unwrap(node);
    if (!Check.isFunction(fn) || fn.async) return;
    context.report({ fix: buildFixForAsync(fn), messageId, node: fn });
  }

  function checkFileDirectives(program: TSESTree.Program) {
    for (const stmt of program.body) {
      const match = matchDirective(stmt);
      if (match == null || match.kind === "well-formed") continue;
      context.report({
        data: { name: match.name },
        messageId: match.kind === "backtick" ? "fileDirectiveQuote" : "fileDirectivePosition",
        node: match.node,
      });
    }
  }

  function checkFunction(node: TSESTreeFunction) {
    if (node.body.type !== AST.BlockStatement) return;
    for (const stmt of node.body.body) {
      const match = matchDirective(stmt);
      if (match == null) continue;
      switch (true) {
        case match.kind === "backtick":
          context.report({ data: { name: match.name }, messageId: "localDirectiveQuote", node: match.node });
          break;
        case match.name === "use client":
          context.report({ data: { name: match.name }, messageId: "localDirectiveUnexpected", node: match.node });
          break;
        case match.kind === "misplaced":
          context.report({ data: { name: match.name }, messageId: "localDirectivePosition", node: match.node });
          break;
      }
    }
    if (core.isFunctionHasDirective(node, "use server")) {
      reportNonAsyncFunction(node, "local");
    }
  }

  return {
    ArrowFunctionExpression: checkFunction,
    ExportDefaultDeclaration(node) {
      if (!hasFileLevelUseServerDirective) return;
      const decl = Extract.unwrap(node.declaration);
      // export default serverFunction;
      if (decl.type === AST.Identifier) {
        reportNonAsyncFunction(resolve(context, decl), "file");
        return;
      }
      // export default function serverFunction() {}
      reportNonAsyncFunction(decl, "file");
    },
    ExportNamedDeclaration(node) {
      if (!hasFileLevelUseServerDirective) return;
      const decl = node.declaration;
      if (decl != null) {
        // export const foo = () => {}
        // export const foo = function() {}
        if (decl.type === AST.VariableDeclaration) {
          for (const declarator of decl.declarations) {
            reportNonAsyncFunction(declarator.init, "file");
          }
          return;
        }
        // export function foo() {}
        reportNonAsyncFunction(decl, "file");
        return;
      }
      // Skip re-exports like `export { foo } from "./mod"`, which have no local binding
      if (node.source != null) return;
      // export { foo }
      for (const spec of node.specifiers) {
        reportNonAsyncFunction(resolve(context, spec.local), "file");
      }
    },
    FunctionDeclaration: checkFunction,
    FunctionExpression: checkFunction,
    Program: checkFileDirectives,
  };
}
