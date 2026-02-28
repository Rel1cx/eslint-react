import * as ast from "@eslint-react/ast";
import {
  type ReportFixFunction,
  type RuleContext,
  type RuleFeature,
  type RuleFixer,
  defineRuleListener,
} from "@eslint-react/shared";
import type { ScopeVariable } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

import { createRule } from "../../utils";

export const RULE_NAME = "function-definition";

export type MessageID = "file" | "local";

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
      local: "Functions with `use server` directive are React Server Functions and therefore must be async.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `use server` is not present in the entire file for performance
  if (!context.sourceCode.text.includes("use server")) return {};

  const hasFileLevelUseServerDirective = ast.isDirectiveInFile(context.sourceCode.ast, "use server");

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
    if (!ast.isFunction(node)) return false;
    if (!node.async) {
      context.report({ fix: getAsyncFix(node), messageId, node });
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
    if (ast.getFunctionDirectives(node).some((d) => d.directive === "use server")) {
      reportNonAsyncFunction(node, "local");
    }
  }

  /**
   * Find function declarations from exports and check them
   * @param id The identifier of the exported function
   * @param node The export declaration node
   */
  function findAndCheckExportedFunctionDeclarations(
    id: TSESTree.Identifier,
    node: TSESTree.ExportDefaultDeclaration | TSESTree.ExportNamedDeclaration,
  ) {
    const variable = findVariable(context.sourceCode.getScope(node), id.name);
    const initNode = resolve(variable);
    if (initNode == null || !ast.isFunction(initNode)) return;
    reportNonAsyncFunction(initNode, "file");
  }

  return defineRuleListener(
    {
      ArrowFunctionExpression(node) {
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
        if (ast.isIdentifier(decl)) {
          findAndCheckExportedFunctionDeclarations(decl, node);
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
            findAndCheckExportedFunctionDeclarations(spec.local, node);
          }
        }
      },
      FunctionDeclaration(node) {
        checkLocalServerFunction(node);
      },
      FunctionExpression(node) {
        checkLocalServerFunction(node);
      },
    },
  );
}

function resolve(v: ScopeVariable | null) {
  if (v == null) return null;
  const def = v.defs.at(0);
  if (def == null) return null;
  if (
    "init" in def.node
    && def.node.init != null
    && !("declarations" in def.node.init)
  ) {
    return def.node.init;
  }
  return def.node;
}
