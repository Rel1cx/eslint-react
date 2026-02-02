import * as ast from "@eslint-react/ast";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { findVariable, getVariableDefinitionNode } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "function-definition";

export type MessageID = "default";

export const RULE_FEATURES = [
  "FIX",
  "EXP",
] as const satisfies RuleFeature[];

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validate and transform React Client/Server Function definitions.",
    },
    fixable: "code",
    messages: {
      default: "Server functions must be async.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `use server` is not present in the entire file for performance
  if (!context.sourceCode.text.includes("use server")) return {};

  const hasFileLevelUseServerDirective = ast.getFileDirectives(context.sourceCode.ast)
    .some((d) => d.directive === "use server");

  /**
   * Check if `node` is an async function, and report if not
   * @param node The function node to check
   * @returns Whether a report was made
   */
  function getAsyncFix(node: TSESTree.Node) {
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

  function reportNonAsyncFunction(node: TSESTree.Node | undefined | null) {
    if (!ast.isFunction(node)) return false;
    if (!node.async) {
      context.report({ messageId: "default", node, fix: getAsyncFix(node) });
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
      reportNonAsyncFunction(node);
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
    const variable = findVariable(id.name, context.sourceCode.getScope(node));
    const variableNode = getVariableDefinitionNode(variable, 0);
    if (variableNode == null) return;
    reportNonAsyncFunction(variableNode);
  }

  return {
    ArrowFunctionExpression(node) {
      checkLocalServerFunction(node);
    },
    ExportDefaultDeclaration(node) {
      if (!hasFileLevelUseServerDirective) {
        return;
      }

      const decl = node.declaration;
      // export default function foo() {}
      if (reportNonAsyncFunction(decl)) {
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
        if (reportNonAsyncFunction(decl)) {
          return;
        }
        // export const foo = () => {}
        // export const foo = function() {}
        if (decl.type === AST.VariableDeclaration) {
          for (const declarator of decl.declarations) {
            reportNonAsyncFunction(declarator.init);
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
  };
}
