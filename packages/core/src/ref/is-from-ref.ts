import { findVariable } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";

import { isUseRefCall } from "../hook";
import { isRefName } from "./ref-name";

/**
 * Checks if the variable with the given name is initialized or derived from a ref
 * @param name The variable name
 * @param initialScope The initial scope
 * @returns True if the variable is derived from a ref, false otherwise
 */
export function isInitializedFromRef(name: string, initialScope: Scope) {
  for (const { node } of findVariable(initialScope)(name)?.defs ?? []) {
    if (node.type !== T.VariableDeclarator) continue;
    const init = node.init;
    if (init == null) continue;
    switch (true) {
      // const identifier = anotherRef.current;
      case init.type === T.MemberExpression
        && init.object.type === T.Identifier
        && isRefName(init.object.name):
        return true;
      // const identifier = useRef();
      case init.type === T.CallExpression
        && isUseRefCall(init):
        return true;
    }
  }
  return false;
}
