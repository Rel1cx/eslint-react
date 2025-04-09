import type * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import { _ } from "@eslint-react/eff";
import { RE } from "@eslint-react/kit";

import { getFunctionComponentId } from "./component-id";

export function isComponentName(name: string) {
  return RE.COMPONENT_NAME.test(name);
}

export function isComponentNameLoose(name: string) {
  return RE.COMPONENT_NAME_LOOSE.test(name);
}

export function getComponentNameFromId(id: TSESTree.Identifier | TSESTree.Identifier[] | _) {
  if (id == null) return _;
  return Array.isArray(id)
    ? id.map((n) => n.name).join(".")
    : id.name;
}

export function hasNoneOrLooseComponentName(context: RuleContext, fn: AST.TSESTreeFunction) {
  const id = getFunctionComponentId(context, fn);
  if (id == null) return true;
  const name = Array.isArray(id)
    ? id.at(-1)?.name
    : id.name;
  return name != null && isComponentNameLoose(name);
}
