import {
  getNestedReturnStatements,
  is,
  isNodeEqual,
  isOneOf,
  NodeType,
  unsafeIsArrayFromCall,
  unsafeIsMapCall,
} from "@eslint-react/ast";
import { findPropInAttributes, getPragmaFromContext } from "@eslint-react/jsx";
import { F, MutRef, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { ConstantCase } from "string-ts";
import { isMatching, match } from "ts-pattern";

import { createRule, getChildrenToArraySelector } from "../utils";

export const RULE_NAME = "no-duplicate-key";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow duplicate keys in `key` prop when rendering list",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_DUPLICATE_KEY: "Duplicate key value `{{value}}` found.",
    },
  },
  defaultOptions: [],
  create(context) {
    const reactPragma = getPragmaFromContext(context);
    const childrenToArraySelector = getChildrenToArraySelector(reactPragma);
    const isWithinChildrenToArrayRef = MutRef.make(false);

    function checkIteratorElement(node: TSESTree.Node): O.Option<ReportDescriptor<MessageID>> {
      if (node.type !== NodeType.JSXElement) {
        return O.none();
      }

      const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

      return F.pipe(
        findPropInAttributes(node.openingElement.attributes, context, initialScope)("key"),
        O.flatMap((k) => "value" in k ? O.fromNullable(k.value) : O.none()),
        O.flatMap((v) => {
          return isNodeEqual(v, v)
            ? O.some({
              data: {
                value: context.sourceCode.getText(v),
              },
              messageId: "NO_DUPLICATE_KEY",
              node: v,
            })
            : O.none();
        }),
      );
    }

    function checkExpression(node: TSESTree.Expression): O.Option<ReportDescriptor<MessageID>> {
      return match(node)
        .with({ type: NodeType.JSXElement }, checkIteratorElement)
        .with({ type: NodeType.JSXFragment }, checkIteratorElement)
        .with({ type: NodeType.ConditionalExpression }, (n) => {
          if (!("consequent" in n)) {
            return O.none();
          }

          return O.orElse(checkIteratorElement(n.consequent), () => checkIteratorElement(n.alternate));
        })
        .with({ type: NodeType.LogicalExpression }, (n) => {
          if (!("left" in n)) {
            return O.none();
          }

          return O.orElse(checkIteratorElement(n.left), () => checkIteratorElement(n.right));
        })
        .otherwise(O.none);
    }

    function checkBlockStatement(node: TSESTree.BlockStatement) {
      return getNestedReturnStatements(node)
        .reduce<ReportDescriptor<MessageID>[]>((acc, statement) => {
          if (!statement.argument) {
            return acc;
          }
          const maybeDescriptor = checkIteratorElement(statement.argument);
          if (O.isNone(maybeDescriptor)) {
            return acc;
          }
          const descriptor = maybeDescriptor.value;

          return [...acc, descriptor];
        }, []);
    }

    const seen = new WeakSet<TSESTree.JSXElement>();

    return {
      [childrenToArraySelector]() {
        MutRef.set(isWithinChildrenToArrayRef, true);
      },
      [`${childrenToArraySelector}:exit`]() {
        MutRef.set(isWithinChildrenToArrayRef, false);
      },
      "ArrayExpression, JSXElement > JSXElement"(node: TSESTree.ArrayExpression | TSESTree.JSXElement) {
        if (MutRef.get(isWithinChildrenToArrayRef)) {
          return;
        }

        const elements = match(node)
          .with({ type: NodeType.ArrayExpression }, ({ elements }) => elements)
          .with({ type: NodeType.JSXElement }, ({ parent }) => "children" in parent ? parent.children : [])
          .otherwise(() => [])
          .filter(is(NodeType.JSXElement))
          .filter((element) => !seen.has(element));

        const keys = elements.reduce<[
          TSESTree.JSXElement,
          TSESTree.JSXAttribute,
          TSESTree.JSXExpression | TSESTree.Literal,
        ][]>(
          (acc, element) => {
            const attr = element.openingElement.attributes
              .findLast(isMatching({
                type: NodeType.JSXAttribute,
                name: {
                  name: "key",
                },
              }));

            if (
              !attr
              || !("value" in attr)
              || attr.value === null
            ) {
              return acc;
            }

            const { value } = attr;
            if (acc.length === 0) {
              return [[element, attr, value]];
            }

            if (acc.some(([_, _1, v]) => isNodeEqual(v, value))) {
              return [...acc, [element, attr, value]];
            }

            return acc;
          },
          [],
        );
        if (keys.length < 2) {
          return;
        }
        for (const [element, attr, value] of keys) {
          seen.add(element);
          context.report({
            data: {
              value: context.sourceCode.getText(value),
            },
            messageId: "NO_DUPLICATE_KEY",
            node: attr,
          });
        }
      },
      CallExpression(node) {
        const isMapCall = unsafeIsMapCall(node);
        const isArrayFromCall = unsafeIsArrayFromCall(node);
        if (!isMapCall && !isArrayFromCall) {
          return;
        }
        if (MutRef.get(isWithinChildrenToArrayRef)) {
          return;
        }
        const fn = node.arguments[isMapCall ? 0 : 1];
        if (!isOneOf([NodeType.ArrowFunctionExpression, NodeType.FunctionExpression])(fn)) {
          return;
        }
        if (fn.body.type === NodeType.BlockStatement) {
          for (const descriptor of checkBlockStatement(fn.body)) {
            context.report(descriptor);
          }

          return;
        }
        O.map(checkExpression(fn.body), context.report);
      },
    };
  },
});
