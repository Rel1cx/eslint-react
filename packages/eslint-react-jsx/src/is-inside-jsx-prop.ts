import { NodeType, traverseUpGuard } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

export function isInsideJSXAttribute(node: TSESTree.Node) {
    const matcher = (node: TSESTree.Node): node is TSESTree.JSXAttribute => {
        return node.type === NodeType.JSXAttribute
            && node.value?.type === NodeType.JSXExpressionContainer;
    };

    return !!traverseUpGuard(node, matcher);
}
