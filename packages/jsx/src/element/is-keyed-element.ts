import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isJSXAttributeKey } from "../attribute";

export function isKeyedElement(node: TSESTree.Node) {
  return node.type === AST_NODE_TYPES.JSXElement
    && node.openingElement.attributes.some(isJSXAttributeKey);
}
