import { NodeType } from "@eslint-react/ast";
import { ESLintSettingsSchema } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { parse } from "valibot";

import { isInitializedFromReact } from "../internal";

/**
 * Check if a node is `<Fragment></Fragment>` or `<Pragma.Fragment></Pragma.Fragment>`
 * @param node
 * @param pragma
 * @param fragment
 */
export function isFragmentElement(node: TSESTree.JSXElement, context: RuleContext) {
  const fragment = parse(ESLintSettingsSchema, context.settings).reactOptions?.jsxPragmaFrag ?? "Fragment";
  const { name } = node.openingElement;

  // <Fragment>
  if (name.type === NodeType.JSXIdentifier && name.name === fragment) return true;

  // <Pragma.Fragment>
  const initialScope = context.sourceCode.getScope(node);
  return name.type === NodeType.JSXMemberExpression
    && name.object.type === NodeType.JSXIdentifier
    && isInitializedFromReact(name.object.name, context, initialScope)
    && name.property.name === fragment;
}
