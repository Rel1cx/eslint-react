import type { TSESTreeFunction } from "@eslint-react/ast";
import * as astUtils from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isReactHookCallWithNameLoose } from "../hook";
import { isForwardRefCall, isMemoCall } from "../react-api";

function isComponentWrapperCall(node: TSESTree.Node, context: RuleContext) {
  if (node.type !== AST_NODE_TYPES.CallExpression) return false;
  return isMemoCall(node, context)
    || isForwardRefCall(node, context)
    || isReactHookCallWithNameLoose(node)("useCallback");
}

export function getFunctionComponentIdentifier(
  node: TSESTreeFunction,
  context: RuleContext,
): O.Option<TSESTree.Identifier | TSESTree.Identifier[]> {
  const functionId = astUtils.getFunctionIdentifier(node);
  if (O.isSome(functionId)) return functionId;
  const { parent } = node;
  // Get function component identifier from `const Component = memo(() => {});`
  if (
    parent.type === AST_NODE_TYPES.CallExpression
    && isComponentWrapperCall(parent, context)
    && parent.parent.type === AST_NODE_TYPES.VariableDeclarator
    && parent.parent.id.type === AST_NODE_TYPES.Identifier
    && parent.parent.parent.type === AST_NODE_TYPES.VariableDeclaration
  ) {
    return O.some(parent.parent.id);
  }
  // Get function component identifier from `const Component = memo(forwardRef(() => {}));`
  if (
    parent.type === AST_NODE_TYPES.CallExpression
    && isComponentWrapperCall(parent, context)
    && parent.parent.type === AST_NODE_TYPES.CallExpression
    && isComponentWrapperCall(parent.parent, context)
    && parent.parent.parent.type === AST_NODE_TYPES.VariableDeclarator
    && parent.parent.parent.id.type === AST_NODE_TYPES.Identifier
    && parent.parent.parent.parent.type === AST_NODE_TYPES.VariableDeclaration
  ) {
    return O.some(parent.parent.parent.id);
  }
  return O.none();
}
