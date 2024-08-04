import type { TSESTreeFunction } from "@eslint-react/ast";
import { getFunctionIdentifier, isFunction, NodeType } from "@eslint-react/ast";
import { isJSXValue, JSXValueHint } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
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
 * @param context The rule context
 * @returns `true` if node is a render function, `false` if not
 */
export function isRenderFunctionLoose(node: TSESTreeFunction, context: RuleContext) {
  const { body, parent } = node;
  const maybeId = getFunctionIdentifier(node);
  if (O.isSome(maybeId) && !maybeId.value.name.startsWith("render")) {
    return  parent.type === NodeType.JSXExpressionContainer
      && parent.parent.type === NodeType.JSXAttribute
      && parent.parent.name.type === NodeType.JSXIdentifier
      && parent.parent.name.name.startsWith("render");
  }
  return isJSXValue(
    body,
    context,
    JSXValueHint.SkipNullLiteral
      | JSXValueHint.SkipUndefinedLiteral
      | JSXValueHint.StrictLogical
      | JSXValueHint.StrictConditional,
  );
}

/**
 * Unsafe check whether given JSXAttribute is a render prop
 * ```jsx
 * _ = <Component renderRow={() => <div />} />
 * `              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
 * ```
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if node is a render prop, `false` if not
 */
export function isRenderPropLoose(node: TSESTree.JSXAttribute, context: RuleContext) {
  if (node.name.type !== NodeType.JSXIdentifier) return false;
  return node.name.name.startsWith("render")
    && node.value?.type === NodeType.JSXExpressionContainer
    && isFunction(node.value.expression)
    && isRenderFunctionLoose(node.value.expression, context);
}
