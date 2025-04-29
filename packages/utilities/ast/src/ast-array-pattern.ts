import type { TSESTree } from "@typescript-eslint/types";
import { _ } from "@eslint-react/eff";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function getArrayPatternElementNameAt(node: TSESTree.Identifier, at: number) {
  const { parent } = node;
  if (!("id" in parent) || parent.id?.type !== T.ArrayPattern) return true;
  const element = parent
    .id
    .elements[at];
  if (element?.type !== T.Identifier) return _;
  return element.name;
}
