import { getNestedReturnStatements, is, isMapCallLoose, isOneOf } from "@eslint-react/ast";
import { isChildrenToArrayCall } from "@eslint-react/core";
import { hasProp } from "@eslint-react/jsx";
import { MutRef, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { isMatching, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-key";

export type MessageID =
  | "noMissingKey"
  | "noMissingKeyWithFragment";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "require 'key' when rendering list",
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
      const initialScope = context.sourceCode.getScope(node);

      if (
        node.type === AST_NODE_TYPES.JSXElement
        && !hasProp(node.openingElement.attributes, "key", initialScope)
      ) {
        return O.some({
          messageId: "noMissingKey",
          node,
        });
      }
      if (node.type === AST_NODE_TYPES.JSXFragment) {
        return O.some({
          messageId: "noMissingKeyWithFragment",
          node,
        });
      }

      return O.none();
    }

    function checkExpression(node: TSESTree.Expression): O.Option<ReportDescriptor<MessageID>> {
      return match(node)
        .with({ type: AST_NODE_TYPES.JSXElement }, checkIteratorElement)
        .with({ type: AST_NODE_TYPES.JSXFragment }, checkIteratorElement)
        .with({ type: AST_NODE_TYPES.ConditionalExpression }, (n) => {
          if (!("consequent" in n)) return O.none();
          return O.orElse(checkIteratorElement(n.consequent), () => checkIteratorElement(n.alternate));
        })
        .with({ type: AST_NODE_TYPES.LogicalExpression }, (n) => {
          if (!("left" in n)) return O.none();
          return O.orElse(checkIteratorElement(n.left), () => checkIteratorElement(n.right));
        })
        .otherwise(O.none);
    }

    function checkBlockStatement(node: TSESTree.BlockStatement) {
      return getNestedReturnStatements(node)
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
        const elements = node.elements.filter(is(AST_NODE_TYPES.JSXElement));
        if (elements.length === 0) return;
        const initialScope = context.sourceCode.getScope(node);
        for (const element of elements) {
          if (!hasProp(element.openingElement.attributes, "key", initialScope)) {
            context.report({
              messageId: "noMissingKey",
              node: element,
            });
          }
        }
      },
      CallExpression(node) {
        if (isChildrenToArrayCall(node, context)) MutRef.set(isWithinChildrenToArrayRef, true);
        const isMapCall = isMapCallLoose(node);
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
        if (!isOneOf([AST_NODE_TYPES.ArrowFunctionExpression, AST_NODE_TYPES.FunctionExpression])(fn)) return;
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
}) satisfies ESLintUtils.RuleModule<MessageID>;
