import * as AST from "@eslint-react/ast";
import { isChildrenToArrayCall } from "@eslint-react/core";
import { O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-key";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "noMissingKey"
  | "noMissingKeyWithFragment";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "require 'key' when rendering list",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingKey: "Missing 'key' for element when rendering list.",
      noMissingKeyWithFragment: "Use fragment component instead of '<>' because it does not support `key`.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const state = { isWithinChildrenToArray: false };
    function checkIteratorElement(node: TSESTree.Node): O.Option<ReportDescriptor<MessageID>> {
      switch (node.type) {
        case T.JSXElement: {
          const initialScope = context.sourceCode.getScope(node);
          if (!JSX.hasProp(node.openingElement.attributes, "key", initialScope)) {
            return O.some({
              messageId: "noMissingKey",
              node,
            });
          }
          return O.none();
        }
        case T.JSXFragment: {
          return O.some({
            messageId: "noMissingKeyWithFragment",
            node,
          });
        }
        default:
          return O.none();
      }
    }

    function checkExpression(node: TSESTree.Expression): O.Option<ReportDescriptor<MessageID>> {
      switch (node.type) {
        case T.ConditionalExpression:
          if (!("consequent" in node)) return O.none();
          return O.orElse(checkIteratorElement(node.consequent), () => checkIteratorElement(node.alternate));
        case T.JSXElement:
        case T.JSXFragment:
          return checkIteratorElement(node);
        case T.LogicalExpression:
          if (!("left" in node)) return O.none();
          return O.orElse(checkIteratorElement(node.left), () => checkIteratorElement(node.right));
        default:
          return O.none();
      }
    }

    function checkBlockStatement(node: TSESTree.BlockStatement) {
      return AST.getNestedReturnStatements(node)
        .reduce<ReportDescriptor<MessageID>[]>((acc, statement) => {
          if (!statement.argument) return acc;
          return O.match(checkIteratorElement(statement.argument), {
            onNone: () => acc,
            onSome: descriptor => [...acc, descriptor],
          });
        }, []);
    }

    return {
      ArrayExpression(node) {
        if (state.isWithinChildrenToArray) return;
        const elements = node.elements.filter(AST.is(T.JSXElement));
        if (elements.length === 0) return;
        const initialScope = context.sourceCode.getScope(node);
        for (const element of elements) {
          if (!JSX.hasProp(element.openingElement.attributes, "key", initialScope)) {
            context.report({
              messageId: "noMissingKey",
              node: element,
            });
          }
        }
      },
      CallExpression(node) {
        state.isWithinChildrenToArray ||= isChildrenToArrayCall(node, context);
        if (state.isWithinChildrenToArray) return;
        const isMapCall = AST.isMapCallLoose(node);
        const isArrayFromCall = isMatching({
          type: T.CallExpression,
          callee: {
            type: T.MemberExpression,
            property: {
              name: "from",
            },
          },
        }, node);
        if (!isMapCall && !isArrayFromCall) return;
        const fn = node.arguments[isMapCall ? 0 : 1];
        if (!AST.isOneOf([T.ArrowFunctionExpression, T.FunctionExpression])(fn)) return;
        if (fn.body.type === T.BlockStatement) {
          for (const descriptor of checkBlockStatement(fn.body)) {
            context.report(descriptor);
          }
          return;
        }
        O.map(checkExpression(fn.body), context.report);
      },
      "CallExpression:exit"(node) {
        if (!isChildrenToArrayCall(node, context)) return;
        state.isWithinChildrenToArray = false;
      },
      JSXFragment(node) {
        if (state.isWithinChildrenToArray) return;
        if (node.parent.type === T.ArrayExpression) {
          context.report({
            messageId: "noMissingKeyWithFragment",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
