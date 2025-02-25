import * as AST from "@eslint-react/ast";
import { isChildrenToArrayCall } from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-key";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "missingKey"
  | "unexpectedFragmentSyntax";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "require 'key' when rendering list",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      missingKey: "Missing 'key' for element when rendering list.",
      unexpectedFragmentSyntax: "Use fragment component instead of '<>' because it does not support `key`.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const state = { isWithinChildrenToArray: false };
    function checkIteratorElement(node: TSESTree.Node): null | ReportDescriptor<MessageID> {
      switch (node.type) {
        case T.JSXElement: {
          const initialScope = context.sourceCode.getScope(node);
          if (!JSX.hasAttribute("key", node.openingElement.attributes, initialScope)) {
            return {
              messageId: "missingKey",
              node,
            } as const;
          }
          return null;
        }
        case T.JSXFragment: {
          return {
            messageId: "unexpectedFragmentSyntax",
            node,
          } as const;
        }
        default:
          return null;
      }
    }

    function checkExpression(node: TSESTree.Expression): null | ReportDescriptor<MessageID> {
      switch (node.type) {
        case T.ConditionalExpression:
          if ("consequent" in node) {
            return checkIteratorElement(node.consequent) ?? checkIteratorElement(node.alternate);
          }
          return null;
        case T.JSXElement:
        case T.JSXFragment:
          return checkIteratorElement(node);
        case T.LogicalExpression:
          if ("left" in node) {
            return checkIteratorElement(node.left) ?? checkIteratorElement(node.right);
          }
          return null;
        default:
          return null;
      }
    }

    function checkBlockStatement(node: TSESTree.BlockStatement) {
      const descriptors: ReportDescriptor<MessageID>[] = [];
      for (const statement of AST.getNestedReturnStatements(node)) {
        if (statement.argument == null) {
          continue;
        }
        const descriptor = checkIteratorElement(statement.argument);
        if (descriptor != null) {
          descriptors.push(descriptor);
        }
      }
      return descriptors;
    }

    return {
      ArrayExpression(node) {
        if (state.isWithinChildrenToArray) {
          return;
        }
        const elements = node.elements.filter(AST.is(T.JSXElement));
        if (elements.length === 0) {
          return;
        }
        const initialScope = context.sourceCode.getScope(node);
        for (const element of elements) {
          if (!JSX.hasAttribute("key", element.openingElement.attributes, initialScope)) {
            context.report({
              messageId: "missingKey",
              node: element,
            });
          }
        }
      },
      CallExpression(node) {
        state.isWithinChildrenToArray ||= isChildrenToArrayCall(context, node);
        if (state.isWithinChildrenToArray) {
          return;
        }
        const isMapCallLike = AST.isMapCallLoose(node);
        if (!isMapCallLike && !isArrayFromCall(node)) {
          return;
        }
        const fn = node.arguments[isMapCallLike ? 0 : 1];
        if (fn?.type !== T.ArrowFunctionExpression && fn?.type !== T.FunctionExpression) {
          return;
        }
        if (fn.body.type === T.BlockStatement) {
          for (const descriptor of checkBlockStatement(fn.body)) {
            context.report(descriptor);
          }
          return;
        }
        const descriptor = checkExpression(fn.body);
        if (descriptor != null) {
          context.report(descriptor);
        }
      },
      "CallExpression:exit"(node) {
        if (!isChildrenToArrayCall(context, node)) {
          return;
        }
        state.isWithinChildrenToArray = false;
      },
      JSXFragment(node) {
        if (state.isWithinChildrenToArray) {
          return;
        }
        if (node.parent.type === T.ArrayExpression) {
          context.report({
            messageId: "unexpectedFragmentSyntax",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});

function isArrayFromCall(node: TSESTree.Node): node is TSESTree.CallExpression {
  return node.type === T.CallExpression
    && node.callee.type === T.MemberExpression
    && node.callee.property.type === T.Identifier
    && node.callee.property.name === "from";
}
