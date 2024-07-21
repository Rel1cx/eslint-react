import { is, isOneOf, NodeType } from "@eslint-react/ast";
import { isCreateElementCall } from "@eslint-react/core";
import { findPropInAttributes, findPropInProperties } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import { findVariable, getVariableNode } from "@eslint-react/var";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml";

export type MessageID = ConstantCase<typeof RULE_NAME>;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that use different properties to receive HTML and set them internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow when a DOM component is using 'dangerouslySetInnerHTML'",
    },
    messages: {
      NO_DANGEROUSLY_SET_INNERHTML: "Using 'dangerouslySetInnerHTML' may have security implications.",
    },
    schema: [],
  },
  name: RULE_NAME,
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
              O.flatMap(getVariableNode(0)),
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
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
