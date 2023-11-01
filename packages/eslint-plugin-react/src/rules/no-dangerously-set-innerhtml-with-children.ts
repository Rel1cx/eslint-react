import { findVariableByNameUpToGlobal, getVariableNthDefNodeInit, is, isOneOf, NodeType } from "@eslint-react/ast";
import { findPropInProperties, hasChildren, hasProp, isCreateElementCall, isLineBreak } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { isNullable } from "effect/Predicate";
import type { ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function firstChildIsText(node: TSESTree.JSXElement) {
  const [firstChild] = node.children;

  return node.children.length > 0
    && !isNullable(firstChild)
    && !isLineBreak(firstChild);
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow when a DOM element is using both children and dangerouslySetInnerHTML'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN: "Only set one of `children` or `dangerouslySetInnerHTML`.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (node.arguments.length < 2 || !isCreateElementCall(node, context)) {
          return;
        }
        const props = node.arguments[1];
        const maybeProperties = match(props)
          .when(isOneOf([NodeType.ObjectExpression, NodeType.ObjectPattern]), (n) => {
            return "properties" in n ? O.some(n.properties) : O.none();
          })
          .when(is(NodeType.Identifier), (n) => {
            return F.pipe(
              findVariableByNameUpToGlobal(n.name, context.getScope()),
              O.flatMap(getVariableNthDefNodeInit(0)),
              O.flatMapNullable((n) => "properties" in n ? n.properties : null),
            );
          })
          .otherwise(O.none);
        if (O.isNone(maybeProperties)) {
          return;
        }
        const properties = maybeProperties.value;
        const hasDanger = O.isSome(findPropInProperties(properties, context)("dangerouslySetInnerHTML"));
        const hasRestChildren = node.arguments.length > 2;
        if (hasDanger && (hasRestChildren || O.isSome(findPropInProperties(properties, context)("children")))) {
          context.report({
            messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN",
            node,
          });
        }
      },
      JSXElement(node) {
        const hasChildrenWithIn = () => hasChildren(node) && firstChildIsText(node);
        const hasChildrenProp = () => hasProp(node.openingElement.attributes, "children", context);
        const hasDanger = () => hasProp(node.openingElement.attributes, "dangerouslySetInnerHTML", context);

        if (!(hasChildrenWithIn() || hasChildrenProp()) || !hasDanger()) {
          return;
        }

        context.report({
          messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN",
          node,
        });
      },
    };
  },
});
