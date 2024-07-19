import { F, O } from "@eslint-react/tools";
import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import { findVariable as TSEFindVariable } from "@typescript-eslint/utils/ast-utils";

export const findVariable: {
  (initialScope: Scope): (name: string) => O.Option<Variable>;
  (name: string, initialScope: Scope): O.Option<Variable>;
} = F.dual(2, (name: string, initialScope: Scope) => {
  return O.fromNullable(TSEFindVariable(initialScope, name));
});
