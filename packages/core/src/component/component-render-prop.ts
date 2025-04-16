import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import * as AST from "@eslint-react/ast";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isJsxLike, JSXDetectionHint } from "../jsx";

/**
 * Unsafe check whether given node is a render function
 * ```tsx
 * const renderRow = () => <div />
 * `                 ^^^^^^^^^^^^`
 * _ = <Component renderRow={() => <div />} />
 * `                         ^^^^^^^^^^^^^   `
 * ```
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if node is a render function, `false` if not
 */
export function isRenderFunctionLoose(context: RuleContext, node: AST.TSESTreeFunction) {
  const { body, parent } = node;
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (AST.getFunctionId(node)?.name.startsWith("render")) {
    return parent.type === T.JSXExpressionContainer
      && parent.parent.type === T.JSXAttribute
      && parent.parent.name.type === T.JSXIdentifier
      && parent.parent.name.name.startsWith("render");
  }
  return isJsxLike(
    context.sourceCode,
    body,
    JSXDetectionHint.SkipNullLiteral
      | JSXDetectionHint.SkipUndefined
      | JSXDetectionHint.StrictLogical
      | JSXDetectionHint.StrictConditional,
  );
}

/**
 * Unsafe check whether given JSXAttribute is a render prop
 * ```tsx
 * _ = <Component renderRow={() => <div />} />
 * `              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
 * ```
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if node is a render prop, `false` if not
 */
export function isRenderPropLoose(context: RuleContext, node: TSESTree.JSXAttribute) {
  if (node.name.type !== T.JSXIdentifier) {
    return false;
  }
  return node.name.name.startsWith("render")
    && node.value?.type === T.JSXExpressionContainer
    && AST.isFunction(node.value.expression)
    && isRenderFunctionLoose(context, node.value.expression);
}

/**
 * Unsafe check whether given node is declared directly inside a render property
 * ```tsx
 * const rows = { render: () => <div /> }
 * `                      ^^^^^^^^^^^^^ `
 * _ = <Component rows={ [{ render: () => <div /> }] } />
 * `                                ^^^^^^^^^^^^^       `
 *  ```
 * @internal
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render property, `false` if not
 */
export function isDirectValueOfRenderPropertyLoose(node: TSESTree.Node) {
  const matching = (node: TSESTree.Node) => {
    return node.type === T.Property
      && node.key.type === T.Identifier
      && node.key.name.startsWith("render");
  };
  return matching(node) || (node.parent != null && matching(node.parent));
}

/**
 * Unsafe check whether given node is declared inside a render prop
 * ```tsx
 * _ = <Component renderRow={"node"} />
 * `                         ^^^^^^   `
 * _ = <Component rows={ [{ render: "node" }] } />
 * `                                ^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render prop, `false` if not
 */
export function isDeclaredInRenderPropLoose(node: TSESTree.Node) {
  if (isDirectValueOfRenderPropertyLoose(node)) {
    return true;
  }
  const parent = AST.findParentNode(node, AST.is(T.JSXExpressionContainer))?.parent;
  if (parent?.type !== T.JSXAttribute) {
    return false;
  }
  return parent.name.type === T.JSXIdentifier && parent.name.name.startsWith("render");
}
