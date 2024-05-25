import type { TSESTreeFunction } from "@eslint-react/ast";
import { getFunctionIdentifier, isFunction, NodeType } from "@eslint-react/ast";
import { isJSXValue, JSXValueHint } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { Option as O } from "effect";
import { isMatching, P } from "ts-pattern";

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
export function unsafeIsRenderFunction(node: TSESTreeFunction, context: RuleContext) {
  const { body, parent } = node;

  const maybeId = getFunctionIdentifier(node);

  if (O.isSome(maybeId) && !maybeId.value.name.startsWith("render")) {
    return isMatching({
      type: NodeType.JSXExpressionContainer,
      parent: {
        type: NodeType.JSXAttribute,
        name: {
          type: NodeType.JSXIdentifier,
          name: P.string.startsWith("render"),
        },
      },
    }, parent);
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
export function unsafeIsRenderProp(node: TSESTree.JSXAttribute, context: RuleContext) {
  return isMatching({
    type: NodeType.JSXAttribute,
    name: {
      type: NodeType.JSXIdentifier,
      name: P.string.startsWith("render"),
    },
    value: {
      type: NodeType.JSXExpressionContainer,
      expression: P.when(isFunction),
    },
  }, node) && unsafeIsRenderFunction(node.value.expression, context);
}
