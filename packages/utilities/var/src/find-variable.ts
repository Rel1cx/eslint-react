import { dual, unit } from "@eslint-react/eff";
import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import * as astUtils from "@typescript-eslint/utils/ast-utils";

/**
 * Find a variable by name or identifier node in the scope chain
 * @param initialScope The scope to start searching from
 * @returns The found variable or unit if not found
 * @overload
 * @param nameOrNode The variable name or identifier node to find
 * @param initialScope The scope to start searching from
 * @returns The found variable or unit if not found
 */
export const findVariable: {
  (initialScope: Scope): (nameOrNode: string | TSESTree.Identifier | unit) => Variable | unit;
  (nameOrNode: string | TSESTree.Identifier | unit, initialScope: Scope): Variable | unit;
} = dual(2, (nameOrNode: string | TSESTree.Identifier | unit, initialScope: Scope) => {
  if (nameOrNode == null) return unit;
  return astUtils.findVariable(initialScope, nameOrNode) ?? unit;
});
