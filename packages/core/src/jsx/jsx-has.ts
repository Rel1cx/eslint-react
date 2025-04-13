import type { RuleContext } from "@eslint-react/kit";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { getAttribute } from "./jsx-attribute";

export function hasAttribute(
  context: RuleContext,
  name: string,
  attributes: TSESTree.JSXOpeningElement["attributes"],
  initialScope?: Scope,
) {
  return getAttribute(context, name, attributes, initialScope) != null;
}

export function hasAnyAttribute(
  context: RuleContext,
  names: string[],
  attributes: TSESTree.JSXOpeningElement["attributes"],
  initialScope?: Scope,
) {
  return names.some((n) => hasAttribute(context, n, attributes, initialScope));
}

export function hasEveryAttribute(
  context: RuleContext,
  names: string[],
  attributes: TSESTree.JSXOpeningElement["attributes"],
  initialScope?: Scope,
) {
  return names.every((n) => hasAttribute(context, n, attributes, initialScope));
}
