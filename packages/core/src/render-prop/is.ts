import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

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
export function isRenderFunctionLoose(node: AST.TSESTreeFunction, context: RuleContext) {
  const { body, parent } = node;
  if (O.exists(AST.getFunctionIdentifier(node), (id) => id.name.startsWith("render"))) {
    return parent.type === T.JSXExpressionContainer
      && parent.parent.type === T.JSXAttribute
      && parent.parent.name.type === T.JSXIdentifier
      && parent.parent.name.name.startsWith("render");
  }
  return JSX.isJSXValue(
    body,
    {
      getScope: (node: TSESTree.Node) => context.sourceCode.getScope(node),
    },
    JSX.JSXValueHint.SkipNullLiteral
      | JSX.JSXValueHint.SkipUndefined
      | JSX.JSXValueHint.StrictLogical
      | JSX.JSXValueHint.StrictConditional,
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
  if (node.name.type !== T.JSXIdentifier) {
    return false;
  }
  return node.name.name.startsWith("render")
    && node.value?.type === T.JSXExpressionContainer
    && AST.isFunction(node.value.expression)
    && isRenderFunctionLoose(node.value.expression, context);
}
