import { is, NodeType, traverseUp } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import { unsafeIsReactHookCall } from "./hook-call";

export function unsafeIsInsideReactHookCall(node: TSESTree.Node): boolean {
  return !!traverseUp(node, n => is(NodeType.CallExpression)(n) && unsafeIsReactHookCall(n));
}
