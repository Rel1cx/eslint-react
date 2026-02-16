import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "error-boundaries";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "tryCatchWithJsx" | "tryCatchWithUse";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates usage of Error Boundaries instead of try/catch for errors in child components.",
    },
    messages: {
      tryCatchWithJsx:
        "Use an Error Boundary to catch errors in child components. Try/catch can't catch errors during React's rendering process.",
      tryCatchWithUse:
        "Use an Error Boundary instead of try/catch around the 'use' hook. The 'use' hook suspends the component, and its errors can only be caught by Error Boundaries.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `try` is not present in the file
  if (!context.sourceCode.text.includes("try")) return {};

  /**
   * Check if a function node has a component-like name (starts with uppercase).
   * @param node The function node to check.
   */
  function isComponentLikeFunction(node: ast.TSESTreeFunction): boolean {
    const id = ast.getFunctionId(node);
    if (id == null) return false;
    if (id.type === AST.Identifier) {
      return core.isComponentName(id.name);
    }
    if (id.type === AST.MemberExpression && id.property.type === AST.Identifier) {
      return core.isComponentName(id.property.name);
    }
    return false;
  }

  /**
   * Check if a node contains JSX elements (used to check return statement arguments).
   * Handles conditionals, logical expressions, and type assertions.
   * @param node The node to check for JSX.
   */
  function containsJsx(node: TSESTree.Node): boolean {
    switch (node.type) {
      case AST.JSXElement:
      case AST.JSXFragment:
        return true;
      case AST.ConditionalExpression:
        return containsJsx(node.consequent) || containsJsx(node.alternate);
      case AST.LogicalExpression:
        return containsJsx(node.left) || containsJsx(node.right);
      case AST.TSAsExpression:
      case AST.TSSatisfiesExpression:
      case AST.TSNonNullExpression:
      case AST.TSTypeAssertion:
        return containsJsx(node.expression);
      case AST.SequenceExpression:
        return node.expressions.some(containsJsx);
      default:
        return false;
    }
  }

  /**
   * Check if a statement (or nested control-flow statements) contains a return
   * statement with JSX. Stops at function boundaries to avoid false positives
   * from nested functions / callbacks.
   * @param node The statement node to check for JSX returns.
   */
  function hasJsxReturnInStatement(node: TSESTree.Statement): boolean {
    switch (node.type) {
      case AST.ReturnStatement:
        return node.argument != null && containsJsx(node.argument);
      case AST.IfStatement:
        return (
          hasJsxReturnInStatement(node.consequent)
          || (node.alternate != null && hasJsxReturnInStatement(node.alternate))
        );
      case AST.BlockStatement:
        return node.body.some(hasJsxReturnInStatement);
      case AST.SwitchStatement:
        return node.cases.some((c) => c.consequent.some(hasJsxReturnInStatement));
      case AST.TryStatement:
        return (
          hasJsxReturnInStatement(node.block)
          || (node.handler != null && hasJsxReturnInStatement(node.handler.body))
          || (node.finalizer != null && hasJsxReturnInStatement(node.finalizer))
        );
      case AST.LabeledStatement:
        return hasJsxReturnInStatement(node.body);
      default:
        // Do NOT recurse into function expressions / declarations
        return false;
    }
  }

  /**
   * Check if a statement (or nested control-flow statements) contains a `use()`
   * call at the component level. Stops at function boundaries to avoid false
   * positives from nested functions / callbacks.
   * @param node The statement node to check for `use()` calls.
   */
  function hasUseCallInStatement(node: TSESTree.Statement): boolean {
    switch (node.type) {
      case AST.ExpressionStatement:
        return core.isUseCall(node.expression);
      case AST.VariableDeclaration:
        return node.declarations.some(
          (d) => d.init != null && core.isUseCall(d.init),
        );
      case AST.ReturnStatement:
        return node.argument != null && core.isUseCall(node.argument);
      case AST.IfStatement:
        return (
          hasUseCallInStatement(node.consequent)
          || (node.alternate != null && hasUseCallInStatement(node.alternate))
        );
      case AST.BlockStatement:
        return node.body.some(hasUseCallInStatement);
      case AST.SwitchStatement:
        return node.cases.some((c) => c.consequent.some(hasUseCallInStatement));
      case AST.TryStatement:
        return (
          hasUseCallInStatement(node.block)
          || (node.handler != null && hasUseCallInStatement(node.handler.body))
          || (node.finalizer != null && hasUseCallInStatement(node.finalizer))
        );
      case AST.LabeledStatement:
        return hasUseCallInStatement(node.body);
      default:
        // Do NOT recurse into function expressions / declarations
        return false;
    }
  }

  return {
    TryStatement(node: TSESTree.TryStatement) {
      // Only check try/catch (not bare try/finally without catch)
      if (node.handler == null) return;

      // Check that the nearest enclosing function is a component-like function.
      // This avoids false positives for try/catch in event handlers, callbacks,
      // utility functions, etc.
      const parentFn = ast.findParentNode(node, ast.isFunction);
      if (parentFn == null) return;
      if (!isComponentLikeFunction(parentFn as ast.TSESTreeFunction)) return;

      const block = node.block;

      // Check for `use()` calls in the try block (more specific message)
      if (hasUseCallInStatement(block)) {
        context.report({
          messageId: "tryCatchWithUse",
          node,
        });
        return;
      }

      // Check for JSX returns in the try block
      if (hasJsxReturnInStatement(block)) {
        context.report({
          messageId: "tryCatchWithJsx",
          node,
        });
      }
    },
  };
}
