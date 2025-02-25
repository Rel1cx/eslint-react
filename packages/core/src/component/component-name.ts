import type * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { getFunctionComponentIdentifier } from "./component-id";

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

export function hasNoneOrValidComponentName(context: RuleContext, node: AST.TSESTreeFunction) {
  const id = getFunctionComponentIdentifier(context, node);
  if (id == null) return true;
  const name = Array.isArray(id)
    ? id.at(-1)?.name
    : id.name;
  return name != null && isComponentName(name);
}
