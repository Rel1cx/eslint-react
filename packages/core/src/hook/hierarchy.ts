import { isFunction, traverseUpGuard } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { isReactHook } from "./is";

export function isInsideReactHook(node: TSESTree.Node) {
  return O.exists(traverseUpGuard(node, isFunction), isReactHook);
}
