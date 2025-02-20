import * as AST from "@eslint-react/ast";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { isNodeValueEqual } from "./is-node-value-equal";

export function isVariableIdEqual(
  a: TSESTree.Node,
  b: TSESTree.Node,
  initialScopes: [
    aScope: Scope,
    bScope: Scope,
  ],
) {
  return AST.isNodeEqual(a, b) || isNodeValueEqual(a, b, initialScopes);
}
