import * as AST from "@eslint-react/ast";
import { isChildrenToArrayCall } from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";
import { MutRef, O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
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
    const isWithinChildrenToArrayRef = MutRef.make(false);
    function checkIteratorElement(node: TSESTree.Node): O.Option<ReportDescriptor<MessageID>> {
      switch (node.type) {
        case AST_NODE_TYPES.JSXElement: {
          const initialScope = context.sourceCode.getScope(node);
          if (!JSX.hasProp(node.openingElement.attributes, "key", initialScope)) {
            return O.some({
              messageId: "noMissingKey",
              node,
            });
          }
          return O.none();
        }
        case AST_NODE_TYPES.JSXFragment: {
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
        case AST_NODE_TYPES.ConditionalExpression:
          if (!("consequent" in node)) return O.none();
          return O.orElse(checkIteratorElement(node.consequent), () => checkIteratorElement(node.alternate));
        case AST_NODE_TYPES.JSXElement:
        case AST_NODE_TYPES.JSXFragment:
          return checkIteratorElement(node);
        case AST_NODE_TYPES.LogicalExpression:
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
          const maybeDescriptor = checkIteratorElement(statement.argument);
          if (O.isNone(maybeDescriptor)) return acc;
          const descriptor = maybeDescriptor.value;

          return [...acc, descriptor];
        }, []);
    }

    return {
      ArrayExpression(node) {
        if (MutRef.get(isWithinChildrenToArrayRef)) return;
        const elements = node.elements.filter(AST.is(AST_NODE_TYPES.JSXElement));
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
        if (isChildrenToArrayCall(node, context)) MutRef.set(isWithinChildrenToArrayRef, true);
        const isMapCall = AST.isMapCallLoose(node);
        const isArrayFromCall = isMatching({
          type: AST_NODE_TYPES.CallExpression,
          callee: {
            type: AST_NODE_TYPES.MemberExpression,
            property: {
              name: "from",
            },
          },
        }, node);
        if (!isMapCall && !isArrayFromCall) return;
        if (MutRef.get(isWithinChildrenToArrayRef)) return;
        const fn = node.arguments[isMapCall ? 0 : 1];
        if (!AST.isOneOf([AST_NODE_TYPES.ArrowFunctionExpression, AST_NODE_TYPES.FunctionExpression])(fn)) return;
        if (fn.body.type === AST_NODE_TYPES.BlockStatement) {
          for (const descriptor of checkBlockStatement(fn.body)) {
            context.report(descriptor);
          }
          return;
        }
        O.map(checkExpression(fn.body), context.report);
      },
      "CallExpression:exit"(node) {
        if (isChildrenToArrayCall(node, context)) MutRef.set(isWithinChildrenToArrayRef, false);
      },
      JSXFragment(node) {
        if (MutRef.get(isWithinChildrenToArrayRef)) return;
        if (node.parent.type === AST_NODE_TYPES.ArrayExpression) {
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
