import { NodeType } from "@eslint-react/ast";
import { getESLintReactSettings } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { isInitializedFromReact } from "../internal";

/**
 * Check if a node is `<Fragment></Fragment>` or `<Pragma.Fragment></Pragma.Fragment>`
 * @param node The JSX element node to check
 * @param context The rule context
 * @returns `true` if the node is a fragment element, `false` otherwise
 */
export function isFragmentElement(node: TSESTree.JSXElement, context: RuleContext) {
  const { jsxPragma = "React", jsxPragmaFrag = "Fragment" } = getESLintReactSettings(context.settings);
  const { name } = node.openingElement;
  // <Fragment>
  if (name.type === NodeType.JSXIdentifier && name.name === jsxPragmaFrag) return true;
  // <Pragma.Fragment>
  return name.type === NodeType.JSXMemberExpression
    && name.object.type === NodeType.JSXIdentifier
    && (
      name.object.name === jsxPragma
      || isInitializedFromReact(name.object.name, context, context.sourceCode.getScope(node))
    )
    && name.property.name === jsxPragmaFrag;
}
