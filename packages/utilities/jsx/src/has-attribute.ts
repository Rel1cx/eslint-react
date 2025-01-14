import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { getAttributeNode } from "./get-attribute";

export function hasAttribute(
  name: string,
  initialScope: Scope,
  attributes: TSESTree.JSXOpeningElement["attributes"],
) {
  return getAttributeNode(name, initialScope, attributes) != null;
}

export function hasAnyAttribute(
  names: string[],
  initialScope: Scope,
  attributes: TSESTree.JSXOpeningElement["attributes"],
) {
  return names.some((n) => hasAttribute(n, initialScope, attributes));
}

export function hasEveryAttribute(
  names: string[],
  initialScope: Scope,
  attributes: TSESTree.JSXOpeningElement["attributes"],
) {
  return names.every((n) => hasAttribute(n, initialScope, attributes));
}
