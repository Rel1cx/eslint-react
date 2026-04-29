import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import {
  type ReportFixFunction,
  type RuleContext,
  type RuleFeature,
  type RuleFixer,
  merge,
} from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { createRule } from "@/utils/create-rule";

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
      file:
        "Functions exported from files with `use server` directive are React Server Functions and therefore must be async.",
      fileDirectivePosition:
        "The '{{name}}' directive must be at the very beginning of the file, before any imports or other code.",
      fileDirectiveQuote: "The '{{name}}' directive must be written with single or double quotes, not backticks.",
      local: "Functions with `use server` directive are React Server Functions and therefore must be async.",
      localDirectivePosition: "The '{{name}}' directive must be at the very beginning of the function body.",
      localDirectiveQuote: "The '{{name}}' directive must be written with single or double quotes, not backticks.",
      localDirectiveUnexpected:
        "The '{{name}}' directive can only be used at the top of a file, not inside a function body.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const hasUseServer = context.sourceCode.text.includes("use server");
  const hasUseClient = context.sourceCode.text.includes("use client");

  // Fast path: skip if neither `use server` nor `use client` is present
  if (!hasUseServer && !hasUseClient) return {};

  const hasFileLevelUseServerDirective = context.sourceCode.ast.body.some(Check.isDirective("use server"));

  /**
   * Check if `node` is an async function, and report if not
   * @param node The function node to check
   * @returns Whether a report was made
   */
  function getAsyncFix(node: TSESTree.Node): ReportFixFunction | null {
    // Function declarations/expressions: insert before "function" token
    if (node.type === AST.FunctionDeclaration || node.type === AST.FunctionExpression) {
      const fnToken = context.sourceCode.getFirstToken(node);
      if (fnToken != null) {
        return (fixer: RuleFixer) => fixer.insertTextBefore(fnToken, "async ");
      }
      return null;
    }
    // Arrow functions: insert before the node (before parameters)
    if (node.type === AST.ArrowFunctionExpression) {
      return (fixer: RuleFixer) => fixer.insertTextBefore(node, "async ");
    }
    // Default: no fix available
    return null;
  }

  function reportNonAsyncFunction(node: TSESTree.Node | null, messageId: MessageID): boolean {
    if (node == null) return false;
    const unwrapped = Extract.unwrap(node);
    if (!Check.isFunction(unwrapped)) return false;
    if (!unwrapped.async) {
      context.report({ fix: getAsyncFix(unwrapped), messageId, node: unwrapped });
      return true;
    }
    return false;
  }

  /**
   * Check non-exported local functions for 'use server' directives, and report if they are not async
   * @param node The function node to check
   */
  function checkLocalServerFunction(
    node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
  ) {
    if (core.getFunctionDirectives(node).some((d) => d.directive === "use server")) {
      reportNonAsyncFunction(node, "local");
    }
  }

  /**
   * Find function declarations from exports and check them
   * @param id The identifier of the exported function
   */
  function findAndCheckExportedFunctionDeclarations(id: TSESTree.Identifier) {
    const initNode = resolve(context, id);
    if (initNode == null) return;
    const unwrapped = Extract.unwrap(initNode);
    if (!Check.isFunction(unwrapped)) return;
    reportNonAsyncFunction(unwrapped, "file");
  }

  /**
   * Check file-level directives for correct position and quote style.
   * Well-formed directives at the beginning of the file will have a `directive` property.
   * If they appear after other code, the parser will not set `directive`.
   */
  function checkFileLevelDirectives() {
    for (const node of context.sourceCode.ast.body) {
      if (node.type !== AST.ExpressionStatement) continue;

      if (Check.isLiteral("string")(node.expression)) {
        const value = node.expression.value;
        if ((value === "use server" || value === "use client") && node.directive == null) {
          context.report({
            data: { name: value },
            messageId: "fileDirectivePosition",
            node,
          });
        }
        continue;
      }

      if (
        node.expression.type === AST.TemplateLiteral
        && node.expression.quasis.length === 1
        && node.expression.expressions.length === 0
      ) {
        const value = node.expression.quasis[0]?.value.cooked;
        if (value === "use server" || value === "use client") {
          context.report({
            data: { name: value },
            messageId: "fileDirectiveQuote",
            node,
          });
        }
      }
    }
  }

  /**
   * Check function-level directives for correct position and quote style.
   * @param node The function node to check
   */
  function checkFunctionDirectives(
    node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
  ) {
    if (node.body.type !== AST.BlockStatement) return;

    for (const stmt of node.body.body) {
      if (stmt.type !== AST.ExpressionStatement) continue;

      if (Check.isLiteral("string")(stmt.expression)) {
        const value = stmt.expression.value;
        if (value === "use server" && stmt.directive == null) {
          context.report({
            data: { name: value },
            messageId: "localDirectivePosition",
            node: stmt,
          });
        }
        if (value === "use client") {
          context.report({
            data: { name: value },
            messageId: "localDirectiveUnexpected",
            node: stmt,
          });
        }
        continue;
      }

      if (
        stmt.expression.type === AST.TemplateLiteral
        && stmt.expression.quasis.length === 1
        && stmt.expression.expressions.length === 0
      ) {
        const value = stmt.expression.quasis[0]?.value.cooked;
        if (value === "use server" || value === "use client") {
          context.report({
            data: { name: value },
            messageId: "localDirectiveQuote",
            node: stmt,
          });
        }
      }
    }
  }

  return merge(
    {
      ArrowFunctionExpression(node) {
        checkFunctionDirectives(node);
        checkLocalServerFunction(node);
      },
      ExportDefaultDeclaration(node) {
        if (!hasFileLevelUseServerDirective) {
          return;
        }

        const decl = node.declaration;
        // export default function foo() {}
        if (reportNonAsyncFunction(decl, "file")) {
          return;
        }
        if (decl.type === AST.Identifier) {
          findAndCheckExportedFunctionDeclarations(decl);
        }
      },
      // Handle exported declarations like `export const foo = () => {}` or `export class A {}`
      ExportNamedDeclaration(node) {
        if (!hasFileLevelUseServerDirective) {
          return;
        }
        // Handle named export
        if (node.declaration != null) {
          const decl = node.declaration;
          // export function foo() {}
          if (reportNonAsyncFunction(decl, "file")) {
            return;
          }
          // export const foo = () => {}
          // export const foo = function() {}
          if (decl.type === AST.VariableDeclaration) {
            for (const declarator of decl.declarations) {
              reportNonAsyncFunction(declarator.init, "file");
            }
          }
          return;
        }
        // Handle `export { foo }` (local binding)
        if (node.source == null && node.specifiers.length > 0) {
          for (const spec of node.specifiers) {
            findAndCheckExportedFunctionDeclarations(spec.local);
          }
        }
      },
      FunctionDeclaration(node) {
        checkFunctionDirectives(node);
        checkLocalServerFunction(node);
      },
      FunctionExpression(node) {
        checkFunctionDirectives(node);
        checkLocalServerFunction(node);
      },
      Program() {
        checkFileLevelDirectives();
      },
    },
  );
}
