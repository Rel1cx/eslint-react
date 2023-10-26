import { findVariableByNameUpToGlobal, getVariableNthDefNodeInit, is, isOneOf, NodeType } from "@eslint-react/ast";
import { findPropInAttributes, findPropInProperties, isCreateElementCall } from "@eslint-react/jsx";
import { createRule } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

export const RULE_NAME = "no-dangerously-set-innerhtml";

type MessageID = "INVALID";

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
            INVALID: "Only set one of `children` or `dangerouslySetInnerHTML`.",
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
                if (hasDanger) {
                    context.report({
                        messageId: "INVALID",
                        node,
                    });
                }
            },
            JSXElement(node) {
                const maybeDanger = findPropInAttributes(node.openingElement.attributes, context)("dangerouslySetInnerHTML");
                if (O.isSome(maybeDanger)) {
                    context.report({
                        messageId: "INVALID",
                        node,
                    });
                }
            },
        };
    },
});
