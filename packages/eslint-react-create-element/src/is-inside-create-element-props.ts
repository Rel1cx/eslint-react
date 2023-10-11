import { is, NodeType, traverseUp } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { isCreateElement } from "./is-create-element";

/**
 * Determines whether inside createElement's props.
 * @param node
 * @param context
 * @returns `true` if the node is inside createElement's props.
 */
export function isInsideCreateElementProps(node: TSESTree.Node, context: RuleContext) {
    const parentCreateElement = traverseUp(node, n => isCreateElement(n, context));

    if (parentCreateElement?.type !== NodeType.CallExpression) {
        return false;
    }

    return parentCreateElement.arguments.at(1) === traverseUp(node, is(NodeType.ObjectExpression));
}
