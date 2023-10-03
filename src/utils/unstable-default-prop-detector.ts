import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import * as AST from "../utils/ast";

export type UnstableDefaultPropDetail = Readonly<
    | ["NONE"]
    // eslint-disable-next-line perfectionist/sort-union-types
    | ["ARRAY_LITERAL", TSESTree.ArrayExpression]
    | ["ARROW_FUNCTION", TSESTree.ArrowFunctionExpression]
    | ["CLASS_EXPRESSION", TSESTree.ClassExpression]
    | ["FUNCTION_EXPRESSION", TSESTree.FunctionExpression]
    | ["JSX_ELEMENT", TSESTree.JSXElement]
    | ["NEW_EXPRESSION", TSESTree.NewExpression]
    | ["OBJECT_LITERAL", TSESTree.ObjectExpression]
    | ["REGEX_LITERAL", TSESTree.Literal]
    | ["SYMBOL_LITERAL", TSESTree.CallExpression]
>;

const none = ["NONE"] as const satisfies UnstableDefaultPropDetail;

export function detectUnstableDefaultProp(prop: TSESTree.Property | TSESTree.RestElement): UnstableDefaultPropDetail {
    if (!AST.is(N.Property)(prop) || !AST.is(N.AssignmentPattern)(prop.value)) {
        return none;
    }

    const { value } = prop;
    const { right } = value;

    switch (right.type) {
        case N.Literal: {
            if ("regex" in right) {
                return ["REGEX_LITERAL", right];
            }

            return none;
        }
        case N.CallExpression: {
            if (
                "callee" in right
                && AST.is(N.Identifier)(right.callee)
                && right.callee.name === "Symbol"
            ) {
                return ["SYMBOL_LITERAL", right];
            }

            return none;
        }
        case N.ArrayExpression: {
            return ["ARRAY_LITERAL", right];
        }
        case N.ArrowFunctionExpression: {
            return ["ARROW_FUNCTION", right];
        }
        case N.ClassExpression: {
            return ["CLASS_EXPRESSION", right];
        }
        case N.FunctionExpression: {
            return ["FUNCTION_EXPRESSION", right];
        }
        case N.JSXElement: {
            return ["JSX_ELEMENT", right];
        }
        case N.NewExpression: {
            return ["NEW_EXPRESSION", right];
        }
        case N.ObjectExpression: {
            return ["OBJECT_LITERAL", right];
        }
        default: {
            return none;
        }
    }
}
