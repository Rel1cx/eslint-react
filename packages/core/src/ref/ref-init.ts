import { unit } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/utils";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

import { isUseRefCall } from "../hook";
import { isRefLikeName } from "./ref-name";

/**
 * Check if the variable with the given name is initialized or derived from a ref
 * @param name The variable name
 * @param initialScope The initial scope
 * @returns True if the variable is derived from a ref, false otherwise
 */
export function isInitializedFromRef(name: string, initialScope: Scope) {
  return getRefInit(name, initialScope) != null;
}

/**
 * Get the init expression of a ref variable
 * @param name The variable name
 * @param initialScope The initial scope
 * @returns The init expression node if the variable is derived from a ref, or undefined otherwise
 */
export function getRefInit(name: string, initialScope: Scope): TSESTree.Expression | unit {
  for (const { node } of findVariable(initialScope, name)?.defs ?? []) {
    if (node.type !== AST.VariableDeclarator) continue;
    const init = node.init;
    if (init == null) continue;
    switch (true) {
      // const identifier = anotherRef.current;
      case init.type === AST.MemberExpression
        && init.object.type === AST.Identifier
        && isRefLikeName(init.object.name):
        return init;
      // const identifier = useRef();
      case init.type === AST.CallExpression
        && isUseRefCall(init):
        return init;
    }
  }
  return unit;
}
