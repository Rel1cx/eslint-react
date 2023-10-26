import { is, NodeType, traverseUp } from "@eslint-react/ast";
import { isCreateElementCall } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Determines whether inside createElement's props.
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is inside createElement's props
 */
export function isInsideCreateElementProps(node: TSESTree.Node, context: RuleContext) {
    const parentCreateElement = traverseUp(node, n => isCreateElementCall(n, context));

    if (parentCreateElement?.type !== NodeType.CallExpression) {
        return false;
    }

    return parentCreateElement.arguments.at(1) === traverseUp(node, is(NodeType.ObjectExpression));
}
