import type { TSESTree } from "@typescript-eslint/types";
import { type } from "rambda";
import { replace, toDelimiterCase, toLowerCase } from "string-ts";

import * as AST from "./ast";

/**
 * Returns human readable node type for given AST node
 * @param node AST node
 * @returns Human readable node type
 */
export function readableNodeType(node: TSESTree.Node) {
    if (AST.isLiteral(node)) {
        if ("regex" in node) {
            return "RegExp literal";
        }

        return `${type(node.value)} literal` as const;
    }

    if (AST.isJSX(node)) {
        return `JSX ${toLowerCase(toDelimiterCase(replace(node.type, "JSX", ""), " "))}` as const;
    }

    return toLowerCase(toDelimiterCase(node.type, " "));
}

export type ReadableNodeType = ReturnType<typeof readableNodeType>;
