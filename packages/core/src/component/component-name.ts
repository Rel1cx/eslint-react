import { getFunctionIdentifier, type TSESTreeFunction } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

export const RE_COMPONENT_NAME = /^[A-Z]/u;

export function getComponentNameFromIdentifier(node: TSESTree.Identifier | TSESTree.Identifier[]) {
  return Array.isArray(node)
    ? node.reduce((acc, cur) => `${acc}.${cur.name}`, "")
    : node.name;
}

export function isValidComponentName(name: null | string | undefined): name is string {
  return !!name && RE_COMPONENT_NAME.test(name);
}

export function hasNoneOrValidComponentName(node: TSESTreeFunction) {
  const id = getFunctionIdentifier(node);

  return !id || isValidComponentName(id.name);
}
