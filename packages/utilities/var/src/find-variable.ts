import { F, O } from "@eslint-react/eff";
import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import * as ASTUtils from "@typescript-eslint/utils/ast-utils";

export const findVariable: {
  (initialScope: Scope): (nameOrNode: string | TSESTree.Identifier) => O.Option<Variable>;
  (nameOrNode: string | TSESTree.Identifier, initialScope: Scope): O.Option<Variable>;
} = F.dual(2, (nameOrNode: string | TSESTree.Identifier, initialScope: Scope) => {
  return O.fromNullable(ASTUtils.findVariable(initialScope, nameOrNode));
});
