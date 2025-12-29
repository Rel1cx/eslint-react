import * as AST from "@eslint-react/ast";
import { getJsxAttribute, isChildrenToArrayCall } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, report } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ReportDescriptor, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "missingKey"
  | "unexpectedFragmentSyntax";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows missing 'key' on items in list rendering.",
    },
    messages: {
      missingKey: "Missing 'key' for element when rendering list.",
      unexpectedFragmentSyntax: "Use fragment component instead of '<>' because it does not support `key`.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const state = {
    // Tracks whether the current traversal is within a `Children.toArray` call
    isWithinChildrenToArray: false,
  };

  // Checks if a given node in an iterator is a JSX element without a 'key' prop
  // or a JSX fragment, which can't have a key
  function checkIteratorElement(node: TSESTree.Node): null | ReportDescriptor<MessageID> {
    switch (node.type) {
      case T.JSXElement: {
        // Report an error if 'key' attribute is missing
        if (getJsxAttribute(context, node)("key") == null) {
          return {
            messageId: "missingKey",
            node,
          } as const;
        }
        return null;
      }
      case T.JSXFragment: {
        // Report an error for using JSX fragment syntax, which doesn't support keys
        return {
          messageId: "unexpectedFragmentSyntax",
          node,
        } as const;
      }
      default:
        return null;
    }
  }

  // Handles different types of expressions to find and check the underlying JSX element
  function checkExpression(node: TSESTree.Expression): null | ReportDescriptor<MessageID> {
    switch (node.type) {
      // For conditional expressions (a ? b : c), check both branches
      case T.ConditionalExpression:
        if ("consequent" in node) {
          return checkIteratorElement(node.consequent) ?? checkIteratorElement(node.alternate);
        }
        return null;
      case T.JSXElement:
      case T.JSXFragment:
        return checkIteratorElement(node);
      // For logical expressions (a && b), check both sides
      case T.LogicalExpression:
        if ("left" in node) {
          return checkIteratorElement(node.left) ?? checkIteratorElement(node.right);
        }
        return null;
      default:
        return null;
    }
  }

  // Finds all return statements within a block and checks their arguments
  function checkBlockStatement(node: TSESTree.BlockStatement) {
    const descriptors: ReportDescriptor<MessageID>[] = [];
    for (const statement of AST.getNestedReturnStatements(node)) {
      if (statement.argument == null) continue;
      const descriptor = checkIteratorElement(statement.argument);
      if (descriptor != null) descriptors.push(descriptor);
    }
    return descriptors;
  }

  return {
    // Visitor for array expressions, e.g., `[<div />, <div />]`
    ArrayExpression(node) {
      if (state.isWithinChildrenToArray) {
        return;
      }
      // Filter for JSX elements within the array
      const elements = node.elements.filter(AST.is(T.JSXElement));
      if (elements.length === 0) {
        return;
      }
      const initialScope = context.sourceCode.getScope(node);
      // Check each element for a 'key' prop
      for (const element of elements) {
        if (getJsxAttribute(context, element, initialScope)("key") == null) {
          context.report({
            messageId: "missingKey",
            node: element,
          });
        }
      }
    },
    // Visitor for call expressions, like `array.map(...)`
    CallExpression(node) {
      // Mark state if entering a `Children.toArray` call and skip further checks
      state.isWithinChildrenToArray ||= isChildrenToArrayCall(context, node);
      if (state.isWithinChildrenToArray) return;
      // Get the callback function from array methods like `map` or `from`
      const callback = match(node)
        .when(AST.isArrayMapCall, (n) => n.arguments[0])
        .when(AST.isArrayFromCall, (n) => n.arguments[1])
        .otherwise(() => null);
      if (!AST.isFunction(callback)) return;
      const body = callback.body;
      // If the callback body is a block statement, check its return statements
      if (body.type === T.BlockStatement) {
        checkBlockStatement(body)
          .forEach(report(context));
        return;
      }
      // Otherwise, check the expression directly
      report(context)(checkExpression(body));
    },
    // Resets the state when exiting a `Children.toArray` call
    "CallExpression:exit"(node) {
      if (!isChildrenToArrayCall(context, node)) {
        return;
      }
      state.isWithinChildrenToArray = false;
    },
    // Visitor for JSX fragments
    JSXFragment(node) {
      if (state.isWithinChildrenToArray) {
        return;
      }
      // Report an error if a fragment is used directly inside an array expression
      if (node.parent.type === T.ArrayExpression) {
        context.report({
          messageId: "unexpectedFragmentSyntax",
          node,
        });
      }
    },
  };
}
