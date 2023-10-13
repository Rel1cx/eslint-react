import { is, NodeType, traverseUpGuard } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Unsafe check whether given node is declared directly inside a render property
 * ```jsx
 * const rows = { render: () => <div /> }
 * `                      ^^^^^^^^^^^^^ `
 * _ = <Component rows={ [{ render: () => <div /> }] } />
 * `                                ^^^^^^^^^^^^^       `
 *  ```
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render property, `false` if not
 */
export function unsafeIsDirectValueOfRenderProperty(node: TSESTree.Node) {
    return (
        node.parent?.type === NodeType.Property
        && "key" in node.parent
        && node.parent.key.type === NodeType.Identifier
        && node.parent.key.name.startsWith("render")
    );
}

/**
 * Unsafe check whether given node is declared inside a render prop
 * ```jsx
 * _ = <Component renderRow={"node"} />
 * `                         ^^^^^^   `
 * _ = <Component rows={ [{ render: "node" }] } />
 * `                                ^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render prop, `false` if not
 */
export function unsafeIsDeclaredInRenderProp(node: TSESTree.Node) {
    if (
        node.parent
        && node.parent.type === NodeType.Property
        && "key" in node.parent
        && "name" in node.parent.key
        && node.parent.key.name.startsWith("render")
    ) {
        return true;
    }

    const jsxExpressionContainer = traverseUpGuard(node, is(NodeType.JSXExpressionContainer));

    return (
        jsxExpressionContainer?.parent
        && jsxExpressionContainer.parent.type === NodeType.JSXAttribute
        && "name" in jsxExpressionContainer.parent
        && jsxExpressionContainer.parent.name.type === NodeType.JSXIdentifier
        && jsxExpressionContainer.parent.name.name.startsWith("render")
    );
}
