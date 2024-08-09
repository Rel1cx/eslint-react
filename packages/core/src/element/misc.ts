import { decodeSettings } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isInitializedFromReact } from "../internal";

/**
 * Check if a node is `<Fragment></Fragment>` or `<Pragma.Fragment></Pragma.Fragment>`
 * @param node The JSX element node to check
 * @param context The rule context
 * @returns `true` if the node is a fragment element, `false` otherwise
 */
export function isFragmentElement(node: TSESTree.JSXElement, context: RuleContext) {
  const settings = decodeSettings(context.settings);
  const { jsxPragma = "React", jsxPragmaFrag = "Fragment" } = settings;
  const { name } = node.openingElement;
  // <Fragment>
  if (name.type === AST_NODE_TYPES.JSXIdentifier && name.name === jsxPragmaFrag) return true;
  // <Pragma.Fragment>
  return name.type === AST_NODE_TYPES.JSXMemberExpression
    && name.object.type === AST_NODE_TYPES.JSXIdentifier
    && (
      name.object.name === jsxPragma
      || isInitializedFromReact(name.object.name, context.sourceCode.getScope(node), settings)
    )
    && name.property.name === jsxPragmaFrag;
}
