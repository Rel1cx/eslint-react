import { isOneOf, NodeType } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { isString } from "effect/Predicate";

/**
 * Check if a Literal or JSXText node is a line break
 * @param node The node to check
 * @returns boolean
 */
export function isLineBreak(node: TSESTree.Node) {
    const isLiteral = isOneOf([NodeType.Literal, NodeType.JSXText])(node);
    if (!("value" in node) || !isString(node.value)) {
        return false;
    }

    const isMultiline = node.loc.start.line !== node.loc.end.line;

    return isLiteral && isMultiline && node.value.trim() === "";
}
