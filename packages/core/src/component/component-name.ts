import type * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import { _ } from "@eslint-react/eff";

import { getFunctionComponentIdentifier } from "./component-id";

export const RE_COMPONENT_NAME = /^[A-Z]/u;

export const RE_COMPONENT_NAME_LOOSE = /^_?[A-Z]/u;

export function isComponentName(name: string) {
  return RE_COMPONENT_NAME.test(name);
}

export function isComponentNameLoose(name: string) {
  return RE_COMPONENT_NAME_LOOSE.test(name);
}

export function getComponentNameFromIdentifier(node: TSESTree.Identifier | TSESTree.Identifier[] | _) {
  if (node == null) return _;
  return Array.isArray(node)
    ? node.map((n) => n.name).join(".")
    : node.name;
}

export function hasNoneOrLooseComponentName(context: RuleContext, node: AST.TSESTreeFunction) {
  const id = getFunctionComponentIdentifier(context, node);
  if (id == null) return true;
  const name = Array.isArray(id)
    ? id.at(-1)?.name
    : id.name;
  return name != null && isComponentNameLoose(name);
}
