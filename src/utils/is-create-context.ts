import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { F, I } from "../lib/primitives/data";
import { AST } from "./ast";

export function isCreateContext(node: TSESTree.Node) {
    if ("init" in node) {
        return match(node.init)
            .with({ type: AST_NODE_TYPES.CallExpression, callee: { name: "createContext" } }, F.constTrue)
            .with(
                { callee: { type: AST_NODE_TYPES.MemberExpression, property: { name: "createContext" } } },
                F.constTrue,
            )
            .otherwise(F.constFalse);
    }

    if (
        "expression" in node &&
        I.isObject(node.expression) &&
        AST.is(AST_NODE_TYPES.AssignmentExpression)(node.expression) &&
        node.expression.operator === "="
    ) {
        return match(node.expression.right)
            .with({ type: AST_NODE_TYPES.CallExpression, callee: { name: "createContext" } }, F.constTrue)
            .with(
                { callee: { type: AST_NODE_TYPES.MemberExpression, property: { name: "createContext" } } },
                F.constTrue,
            )
            .otherwise(F.constFalse);
    }

    return false;
}
