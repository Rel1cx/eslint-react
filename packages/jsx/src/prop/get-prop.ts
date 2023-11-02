import { getStaticValue, NodeType } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { findPropInAttributes } from "./find-prop-in-attributes";

export function getProp(
  props: TSESTree.JSXAttribute[],
  propName: string,
  context: RuleContext,
): O.Option<TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute> {
  return findPropInAttributes(props, context)(propName);
}

/**
 * Gets and resolves the static value of a JSX attribute
 * @param attribute The JSX attribute to get the value of
 * @param context The rule context
 * @returns  The static value of the given JSX attribute
 */
export function getPropValue(
  attribute: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute,
  context: RuleContext,
) {
  const scope = context.getScope();
  if (attribute.type === NodeType.JSXAttribute && "value" in attribute) {
    const { value } = attribute;
    if (value === null) {
      return O.none();
    }
    if (value.type === NodeType.Literal) {
      return O.some(getStaticValue(value, scope));
    }
    if (value.type === NodeType.JSXExpressionContainer) {
      return O.some(getStaticValue(value.expression, scope));
    }

    return O.none();
  }
  const { argument } = attribute;

  return O.some(getStaticValue(argument, scope));
}
