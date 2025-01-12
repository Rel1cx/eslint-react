import { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

export const RE_COMPONENT_NAME = /^_?[A-Z]/u;

export function getComponentNameFromIdentifier(node: TSESTree.Identifier | TSESTree.Identifier[] | _) {
  if (node == null) return _;
  return Array.isArray(node)
    ? node.map((n) => n.name).join(".")
    : node.name;
}

export function isComponentName(name: string) {
  return RE_COMPONENT_NAME.test(name);
}
