import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { getAttribute } from "./get-attribute";

export function hasAttribute(
  name: string,
  attributes: TSESTree.JSXOpeningElement["attributes"],
  initialScope?: Scope,
) {
  return getAttribute(name, attributes, initialScope) != null;
}

export function hasAnyAttribute(
  names: string[],
  attributes: TSESTree.JSXOpeningElement["attributes"],
  initialScope?: Scope,
) {
  return names.some((n) => hasAttribute(n, attributes, initialScope));
}

export function hasEveryAttribute(
  names: string[],
  attributes: TSESTree.JSXOpeningElement["attributes"],
  initialScope?: Scope,
) {
  return names.every((n) => hasAttribute(n, attributes, initialScope));
}
