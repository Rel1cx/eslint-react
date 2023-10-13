import { getFunctionIdentifier, isFunction, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { isJSXValue } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
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

    return isJSXValue(body, context, {
        ignoreNull: true,
        strict: true,
    });
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
