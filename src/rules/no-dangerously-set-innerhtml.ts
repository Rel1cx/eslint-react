import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { F, O } from "../lib/primitives";
import { AST } from "../utils/ast";
import { isCreateElement } from "../utils/is-create-element";
import { findPropInAttributes, findPropInProperties } from "../utils/jsx";
import { findVariableByNameUpToGlobal } from "../utils/variable";

export const RULE_NAME = "no-dangerously-set-innerhtml";

type MessageID = "INVALID";

export default createEslintRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow when a DOM element is using both children and dangerouslySetInnerHTML'",
            recommended: "recommended",
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
                if (node.arguments.length < 2 || !isCreateElement(node, context)) {
                    return;
                }
                const props = node.arguments[1];
                const properties = match(props)
                    .when(AST.isOneOf([N.ObjectExpression, N.ObjectPattern]), (n) => {
                        return "properties" in n ? n.properties : [];
                    })
                    .when(AST.is(N.Identifier), (n) => {
                        return F.pipe(
                            findVariableByNameUpToGlobal(n.name, context.getScope()),
                            O.flatMapNullable((v) => v.defs.at(0)),
                            O.flatMapNullable((d) => d.node),
                            O.flatMapNullable((n) => ("init" in n ? n.init : null)),
                            O.flatMapNullable((n) => ("properties" in n ? n.properties : null)),
                            O.getOrElse(() => []),
                        );
                    })
                    .otherwise(() => []);

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
