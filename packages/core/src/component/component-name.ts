import type { TSESTree } from "@typescript-eslint/types";

export const RE_COMPONENT_NAME = /^[A-Z]/u;

export function getComponentNameFromIdentifier(node: TSESTree.Identifier | TSESTree.Identifier[]) {
  return Array.isArray(node)
    ? node.map(n => n.name).join(".")
    : node.name;
}

export function isComponentName(name: string) {
  return !!name && RE_COMPONENT_NAME.test(name);
}
