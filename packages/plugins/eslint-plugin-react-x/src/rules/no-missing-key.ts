import { getNestedReturnStatements, is, isMapCallLoose, isOneOf, NodeType } from "@eslint-react/ast";
import { isChildrenToArrayCall } from "@eslint-react/core";
import { hasProp } from "@eslint-react/jsx";
import { MutRef, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
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

      if (node.type === NodeType.JSXElement && !hasProp(node.openingElement.attributes, "key", context, initialScope)) {
        return O.some({
          messageId: "noMissingKey",
          node,
        });
      }
      if (node.type === NodeType.JSXFragment) {
        return O.some({
          messageId: "noMissingKeyWithFragment",
          node,
        });
      }

      return O.none();
    }

    function checkExpression(node: TSESTree.Expression): O.Option<ReportDescriptor<MessageID>> {
      return match(node)
        .with({ type: NodeType.JSXElement }, checkIteratorElement)
        .with({ type: NodeType.JSXFragment }, checkIteratorElement)
        .with({ type: NodeType.ConditionalExpression }, (n) => {
          if (!("consequent" in n)) return O.none();
          return O.orElse(checkIteratorElement(n.consequent), () => checkIteratorElement(n.alternate));
        })
        .with({ type: NodeType.LogicalExpression }, (n) => {
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
        const elements = node.elements.filter(is(NodeType.JSXElement));
        if (elements.length === 0) return;
        const initialScope = context.sourceCode.getScope(node);
        for (const element of elements) {
          if (!hasProp(element.openingElement.attributes, "key", context, initialScope)) {
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
          type: NodeType.CallExpression,
          callee: {
            type: NodeType.MemberExpression,
            property: {
              name: "from",
            },
          },
        }, node);
        if (!isMapCall && !isArrayFromCall) return;
        if (MutRef.get(isWithinChildrenToArrayRef)) return;
        const fn = node.arguments[isMapCall ? 0 : 1];
        if (!isOneOf([NodeType.ArrowFunctionExpression, NodeType.FunctionExpression])(fn)) return;
        if (fn.body.type === NodeType.BlockStatement) {
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
        if (node.parent.type === NodeType.ArrayExpression) {
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
