import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import type { RuleContext } from "../../typings";
import * as AST from "./ast";
import { isCreateElement } from "./is-create-element";

/**
 * Determines whether inside createElement prop
 * @param node
 * @param context
 * @returns `true` if the node is inside createElement prop.
 */
export function isInsideCreateElementProp(node: TSESTree.Node, context: RuleContext) {
    const parentCreateElement = AST.traverseUpWithContext(node, context, isCreateElement);

    return parentCreateElement?.arguments.at(1) === AST.traverseUp(node, AST.is(N.ObjectExpression));
}
