import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import { isReactHook } from "./is";

export function isInsideReactHook(node: TSESTree.Node) {
  return isReactHook(AST.findParentNodeGuard(node, AST.isFunction));
}
