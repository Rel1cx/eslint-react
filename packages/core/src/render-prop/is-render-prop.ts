import { getFunctionIdentifier, isFunction, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { isJSXValue, JSXValueCheckHint } from "@eslint-react/jsx";
import { M, O } from "@eslint-react/tools";
import type * as ER from "@eslint-react/types";
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
export function unsafeIsRenderFunction(node: TSESTreeFunction, context: ER.RuleContext) {
  const { body, parent } = node;

  const maybeId = getFunctionIdentifier(node);

  if (O.isSome(maybeId) && !maybeId.value.name.startsWith("render")) {
    return M.isMatching({
      type: NodeType.JSXExpressionContainer,
      parent: {
        type: NodeType.JSXAttribute,
        name: {
          type: NodeType.JSXIdentifier,
          name: M.P.string.startsWith("render"),
        },
      },
    }, parent);
  }

  return isJSXValue(
    body,
    context,
    JSXValueCheckHint.SkipNullLiteral
      | JSXValueCheckHint.SkipUndefinedLiteral
      | JSXValueCheckHint.StrictLogical
      | JSXValueCheckHint.StrictConditional,
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
export function unsafeIsRenderProp(node: TSESTree.JSXAttribute, context: ER.RuleContext) {
  return M.isMatching({
    type: NodeType.JSXAttribute,
    name: {
      type: NodeType.JSXIdentifier,
      name: M.P.string.startsWith("render"),
    },
    value: {
      type: NodeType.JSXExpressionContainer,
      expression: M.P.when(isFunction),
    },
  }, node) && unsafeIsRenderFunction(node.value.expression, context);
}
