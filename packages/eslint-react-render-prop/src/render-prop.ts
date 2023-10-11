import { getFunctionIdentifier, is, isFunction, NodeType, traverseUpGuard, type TSESTreeFunction } from "@eslint-react/ast";
import { isJSXValue } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Unsafe check whether given node is a render function
 * ```jsx
 * const renderRow = () => <div />
 * `                 ^^^^^^^^^^^^`
 * _ = <Component renderRow={() => <div />} />
 * `                         ^^^^^^^^^^^^^   `
 * ```
 * @param node The AST node to check
 * @param context Rule context
 * @returns `true` if node is a render function, `false` if not
 */
export function unsafeIsRenderFunction(node: TSESTreeFunction, context: RuleContext) {
    const { body, parent } = node;

    const id = getFunctionIdentifier(node);

    if (!id?.name.startsWith("render")) {
        return parent.type === NodeType.JSXExpressionContainer
            && parent.parent.type === NodeType.JSXAttribute
            && parent.parent.name.type === NodeType.JSXIdentifier
            && parent.parent.name.name.startsWith("render");
    }

    return isJSXValue(body, context, true, true);
}

/**
 * Unsafe check whether given JSXAttribute is a render prop
 * ```jsx
 * _ = <Component renderRow={() => <div />} />
 * `              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
 * ```
 * @param node The AST node to check
 * @param context Rule context
 * @returns `true` if node is a render prop, `false` if not
 */
export function unsafeIsRenderProp(node: TSESTree.JSXAttribute, context: RuleContext) {
    return node.name.type === NodeType.JSXIdentifier
        && node.name.name.startsWith("render")
        && node.value
        && node.value.type === NodeType.JSXExpressionContainer
        && isFunction(node.value.expression)
        && unsafeIsRenderFunction(node.value.expression, context);
}

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
