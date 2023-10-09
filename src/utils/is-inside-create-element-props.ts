import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import type { RuleContext } from "../../typings";
import { traverseUp } from "./ast-traverse";
import * as AST from "./ast-types";
import { isCreateElement } from "./is-create-element";

/**
 * Determines whether inside createElement's props.
 * @param node
 * @param context
 * @returns `true` if the node is inside createElement's props.
 */
export function isInsideCreateElementProps(node: TSESTree.Node, context: RuleContext) {
    const parentCreateElement = traverseUp(node, n => isCreateElement(n, context));

    if (parentCreateElement?.type !== N.CallExpression) {
        return false;
    }

    return parentCreateElement.arguments.at(1) === traverseUp(node, AST.is(N.ObjectExpression));
}
