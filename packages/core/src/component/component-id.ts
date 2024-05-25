import type { TSESTreeFunction } from "@eslint-react/ast";
import { getFunctionIdentifier, NodeType } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { Option as O } from "effect";

import { isReactHookCallWithNameLoose } from "../hook";
import { isForwardRefCall, isMemoCall } from "../react-api";

function isComponentWrapperCall(node: TSESTree.Node, context: RuleContext) {
  if (node.type !== NodeType.CallExpression) return false;

  return isMemoCall(node, context)
    || isForwardRefCall(node, context)
    || isReactHookCallWithNameLoose("useCallback")(node);
}

export function getFunctionComponentIdentifier(
  node: TSESTreeFunction,
  context: RuleContext,
): O.Option<TSESTree.Identifier | TSESTree.Identifier[]> {
  const functionId = getFunctionIdentifier(node);
  if (O.isSome(functionId)) return functionId;
  const { parent } = node;
  if (
    parent.type === NodeType.CallExpression
    && isComponentWrapperCall(parent, context)
    && parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.id.type === NodeType.Identifier
    && parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some(parent.parent.id);
  }

  if (
    parent.type === NodeType.CallExpression
    && isComponentWrapperCall(parent, context)
    && parent.parent.type === NodeType.CallExpression
    && isComponentWrapperCall(parent.parent, context)
    && parent.parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.parent.id.type === NodeType.Identifier
    && parent.parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some(parent.parent.parent.id);
  }

  return O.none();
}
