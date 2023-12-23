import { getFunctionIdentifier, type TSESTreeFunction } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export const RE_COMPONENT_NAME = /^[A-Z]/u;

export function getComponentNameFromIdentifier(node: TSESTree.Identifier | TSESTree.Identifier[]) {
  return Array.isArray(node)
    ? node.map(n => n.name).join(".")
    : node.name;
}

export function isComponentName(name: string): name is string {
  return !!name && RE_COMPONENT_NAME.test(name);
}

export function hasNoneOrValidComponentName(node: TSESTreeFunction) {
  return O.match(
    getFunctionIdentifier(node),
    {
      onNone: F.constTrue,
      onSome: id => isComponentName(id.name),
    },
  );
}
