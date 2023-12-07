import { findVariableByNameUpToGlobal, getVariableInit, is, isOneOf, NodeType } from "@eslint-react/ast";
import { findPropInProperties, hasChildren, hasProp, isCreateElementCall, isLineBreak } from "@eslint-react/jsx";
import { F, M, O, P } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function firstChildIsText(node: TSESTree.JSXElement) {
  const [firstChild] = node.children;

  return node.children.length > 0
    && !P.isNullable(firstChild)
    && !isLineBreak(firstChild);
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow when a DOM element is using both `children` and `dangerouslySetInnerHTML`",
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
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        if (node.arguments.length < 2 || !isCreateElementCall(node, context)) {
          return;
        }
        const props = node.arguments[1];
        const maybeProperties = M.match(props)
          .when(isOneOf([NodeType.ObjectExpression, NodeType.ObjectPattern]), (n) => {
            return "properties" in n ? O.some(n.properties) : O.none();
          })
          .when(is(NodeType.Identifier), (n) => {
            const initialScope = context.sourceCode.getScope?.(n) ?? context.getScope();

            return F.pipe(
              findVariableByNameUpToGlobal(n.name, initialScope),
              O.flatMap(getVariableInit(0)),
              O.flatMapNullable((n) => "properties" in n ? n.properties : null),
            );
          })
          .otherwise(O.none);
        if (O.isNone(maybeProperties)) {
          return;
        }
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
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        const hasChildrenWithIn = () => hasChildren(node) && firstChildIsText(node);
        const hasChildrenProp = () => hasProp(node.openingElement.attributes, "children", context, initialScope);
        // dprint-ignore
        const hasDanger = () => hasProp(node.openingElement.attributes, "dangerouslySetInnerHTML", context, initialScope);

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
