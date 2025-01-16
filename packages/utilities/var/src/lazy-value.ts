/* eslint-disable perfectionist/sort-object-types */

import type { _ } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

export type LazyValue =
  | {
    // Not resolved yet
    kind: "lazy";
    node: TSESTree.Node;
    initialScope: Scope | _;
  }
  | {
    // Resolved to nothing
    kind: "none";
    node: TSESTree.Node;
    initialScope: Scope | _;
  }
  | {
    // Resolved to something
    kind: "some";
    node: TSESTree.Node;
    value: unknown;
    initialScope: Scope | _;
  };

export function toStaticValue(lazyValue: LazyValue) {
  const { kind, node, initialScope } = lazyValue;
  if (kind !== "lazy") {
    return lazyValue;
  }
  const staticValue = initialScope == null
    ? getStaticValue(node)
    : getStaticValue(node, initialScope);
  return staticValue == null
    ? { kind: "none", node, initialScope } as const
    : { kind: "some", node, initialScope, value: staticValue.value } as const;
}
