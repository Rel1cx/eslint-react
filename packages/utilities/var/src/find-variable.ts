import { _, dual } from "@eslint-react/eff";
import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import * as ASTUtils from "@typescript-eslint/utils/ast-utils";

export const findVariable: {
  (initialScope: Scope): (nameOrNode: string | TSESTree.Identifier | _) => Variable | _;
  (nameOrNode: string | TSESTree.Identifier | _, initialScope: Scope): Variable | _;
} = dual(2, (nameOrNode: string | TSESTree.Identifier | _, initialScope: Scope) => {
  if (nameOrNode === _) return _;
  return ASTUtils.findVariable(initialScope, nameOrNode) ?? _;
});
