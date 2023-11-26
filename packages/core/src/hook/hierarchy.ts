import { is, NodeType, traverseUp } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { unsafeIsReactHookCall } from "./hook-call";

export function unsafeIsInsideReactHookCall(node: TSESTree.Node): boolean {
  return O.isSome(traverseUp(node, n => is(NodeType.CallExpression)(n) && unsafeIsReactHookCall(n)));
}
