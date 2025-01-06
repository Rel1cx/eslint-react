import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import { isReactHook } from "./is";

export function isInsideReactHook(node: TSESTree.Node) {
  return O.exists(AST.findParentNodeGuard(node, AST.isFunction), isReactHook);
}
