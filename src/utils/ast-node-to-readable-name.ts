import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { type } from "rambda";
import { replace, toDelimiterCase, toLowerCase } from "string-ts";

import * as AST from "./ast";

/**
 * Gets readable node name from AST node
 * @param node AST node
 * @returns Human readable node name
 */
export function astNodeToReadableName(node: TSESTree.Node) {
    if (node.type === N.Literal) {
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
