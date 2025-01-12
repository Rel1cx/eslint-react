/* eslint-disable perfectionist/sort-object-types */

import { _ } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

export type StaticValue =
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

export function toResolved(sv: StaticValue) {
  const { kind, node, initialScope } = sv;
  if (kind !== "lazy") {
    return sv;
  }
  const resolvedValue = initialScope === _
    ? getStaticValue(node)
    : getStaticValue(node, initialScope);
  return resolvedValue == null
    ? { kind: "none", node, initialScope } as const
    : { kind: "some", node, initialScope, value: resolvedValue.value } as const;
}
