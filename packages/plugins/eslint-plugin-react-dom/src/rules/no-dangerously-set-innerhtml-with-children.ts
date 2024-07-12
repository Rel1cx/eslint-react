import { is, isOneOf, NodeType } from "@eslint-react/ast";
import { isCreateElementCall } from "@eslint-react/core";
import { findPropInProperties, hasProp, isLineBreak } from "@eslint-react/jsx";

import { F, O, Pred } from "@eslint-react/tools";
import { findVariable, getVariableInit } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function firstChildIsText(node: TSESTree.JSXElement) {
  const [firstChild] = node.children;
  return node.children.length > 0
    && !Pred.isNullable(firstChild)
    && !isLineBreak(firstChild);
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow when a DOM component is using both 'children' and 'dangerouslySetInnerHTML'",
    },
    messages: {
      NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN:
        "A DOM component cannot use both 'children' and 'dangerouslySetInnerHTML'.",
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
        const hasRestChildren = node.arguments.length > 2;
        if (
          hasDanger
          && (hasRestChildren || O.isSome(findPropInProperties(properties, context, initialScope)("children")))
        ) {
          context.report({
            messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN",
            node,
          });
        }
      },
      JSXElement(node) {
        const initialScope = context.sourceCode.getScope(node);
        const hasChildrenWithIn = () => node.children.length > 0 && firstChildIsText(node);
        const hasChildrenProp = () => hasProp(node.openingElement.attributes, "children", context, initialScope);
        // dprint-ignore
        const hasDanger = () => hasProp(node.openingElement.attributes, "dangerouslySetInnerHTML", context, initialScope);
        if (!(hasChildrenWithIn() || hasChildrenProp()) || !hasDanger()) return;
        context.report({
          messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
