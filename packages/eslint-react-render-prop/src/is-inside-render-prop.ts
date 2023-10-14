import { is, NodeType, traverseUpGuard } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { isMatching, P } from "ts-pattern";

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
    const matching = isMatching({
        type: NodeType.Property,
        key: {
            type: NodeType.Identifier,
            name: P.string.startsWith("render"),
        },
    });

    return matching(node) || matching(node.parent);
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
    if (unsafeIsDirectValueOfRenderProperty(node)) {
        return true;
    }

    const maybeJSXExpressionContainer = traverseUpGuard(node, is(NodeType.JSXExpressionContainer));
    const maybeJSXAttribute = maybeJSXExpressionContainer?.parent;

    return isMatching({
        type: NodeType.JSXAttribute,
        name: {
            type: NodeType.JSXIdentifier,
            name: P.string.startsWith("render"),
        },
    })(maybeJSXAttribute);
}
