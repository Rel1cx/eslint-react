import { is, isOneOf, NodeType } from "@eslint-react/ast";
import { findPropInAttributes, findPropInProperties, isCreateElementCall } from "@eslint-react/jsx";
import { findVariable, getVariableInit } from "@eslint-react/var";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, Option as O } from "effect";
import type { ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow when a DOM component is using 'dangerouslySetInnerHTML'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_DANGEROUSLY_SET_INNERHTML: "Using 'dangerouslySetInnerHTML' may have security implications.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        const initialScope = context.sourceCode.getScope(node);
        if (node.arguments.length < 2 || !isCreateElementCall(node, context)) return;
        const props = node.arguments[1];
        if (!props) return;
        const maybeProperties = match(props)
          .when(isOneOf([NodeType.ObjectExpression, NodeType.ObjectPattern]), (n) => {
            return "properties" in n ? O.some(n.properties) : O.none();
          })
          .when(is(NodeType.Identifier), (n) => {
            const initialScope = context.sourceCode.getScope(n);

            return F.pipe(
              findVariable(n.name, initialScope),
              O.flatMap(getVariableInit(0)),
              O.flatMap((n) => "properties" in n ? O.fromNullable(n.properties) : O.none()),
            );
          })
          .otherwise(O.none);

        if (O.isNone(maybeProperties)) return;
        const properties = maybeProperties.value;
        const hasDanger = O.isSome(findPropInProperties(properties, context, initialScope)("dangerouslySetInnerHTML"));
        if (hasDanger) {
          context.report({
            messageId: "NO_DANGEROUSLY_SET_INNERHTML",
            node,
          });
        }
      },
      JSXElement(node) {
        const initialScope = context.sourceCode.getScope(node);
        const maybeDanger = findPropInAttributes(node.openingElement.attributes, context, initialScope)(
          "dangerouslySetInnerHTML",
        );
        if (O.isSome(maybeDanger)) {
          context.report({
            messageId: "NO_DANGEROUSLY_SET_INNERHTML",
            node,
          });
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
